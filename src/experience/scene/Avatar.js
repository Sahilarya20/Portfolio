import React, { Suspense, lazy, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import { ACTION_SECONDS, AVATAR } from './config';
const ProceduralHuman = lazy(() => import('./ProceduralHuman'));
import { SECTION_BY_ID } from '../sections';
import { findPath, resolveCollisions } from '../collision';
import { actions as storeActions, avatarShared, getState, readInput } from '../store';

const GlbBody = lazy(() => import('./GlbBody'));

let introPlayed = false;

// Rim lights stay behind the character as seen from the camera so its outline separates from the dark room.
const RIM = [
  { c: -1.5, z: -1.6, color: '#3b82f6' },
  { c: 1.5, z: -1.6, color: '#8b5cf6' },
];

/**
 * Movement, pathing and collisions. The visible body (procedural human or GLB)
 * only reads `pose`, so either can be swapped without touching this logic.
 */
export default function Avatar() {
  const root = useRef();
  const rim = useRef([]);
  const pose = useRef({ speed: 0, turning: false, yaw: 0, yawRate: 0, action: null, age: 0, token: 0 }).current;

  const sim = useRef({
    x: avatarShared.x,
    z: avatarShared.z,
    vx: 0,
    vz: 0,
    yaw: avatarShared.yaw,
    path: null,
    dest: null,
    stuck: 0,
    intro: !introPlayed,
    seen: { nav: getState().navToken, move: getState().moveToken, wave: getState().waveToken },
  });

  const trigger = (kind) => {
    pose.action = kind;
    pose.age = 0;
    pose.token += 1;
  };

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const s = sim.current;
    const st = getState();

    if (s.intro) {
      s.intro = false;
      introPlayed = true;
      trigger('wave');
    }

    if (st.navToken !== s.seen.nav) {
      s.seen.nav = st.navToken;
      const sec = SECTION_BY_ID[st.destination];
      if (sec) {
        s.path = findPath([s.x, s.z], sec.stand);
        s.dest = sec;
      }
    }
    if (st.moveToken !== s.seen.move) {
      s.seen.move = st.moveToken;
      if (st.moveTarget) {
        s.path = findPath([s.x, s.z], st.moveTarget);
        s.dest = null;
      }
    }
    if (st.waveToken !== s.seen.wave) {
      s.seen.wave = st.waveToken;
      if (Math.hypot(s.vx, s.vz) < 0.3) trigger('wave');
    }

    const [rx, rz] = readInput();
    const manual = rx !== 0 || rz !== 0;
    if (manual) {
      s.path = null;
      s.dest = null;
      if (st.active !== null || st.destination !== null) storeActions.depart();
    }

    let dx = 0;
    let dz = 0;
    let maxSpeed = AVATAR.speed;
    if (manual) {
      // Keys are relative to where the camera is looking, so "up" is always away from the viewer.
      const len = Math.hypot(rx, rz);
      const c = Math.cos(avatarShared.camYaw);
      const sn = Math.sin(avatarShared.camYaw);
      dx = (rx * c + rz * sn) / len;
      dz = (-rx * sn + rz * c) / len;
    } else if (s.path && s.path.length) {
      const wp = s.path[0];
      const tx = wp[0] - s.x;
      const tz = wp[1] - s.z;
      const dist = Math.hypot(tx, tz);
      const last = s.path.length === 1;
      if (dist < (last ? 0.08 : 0.25)) {
        s.path.shift();
        if (!s.path.length) {
          s.path = null;
          if (s.dest) {
            storeActions.arrive(s.dest.id);
            trigger(s.dest.id === 'home' ? 'wave' : 'greet');
            s.dest = null;
          }
        }
      } else {
        dx = tx / dist;
        dz = tz / dist;
        if (last) maxSpeed *= MathUtils.clamp(dist / 0.9, 0.25, 1);
      }
    }

    // Acceleration / deceleration toward the desired velocity.
    const tvx = dx * maxSpeed;
    const tvz = dz * maxSpeed;
    const ax = tvx - s.vx;
    const az = tvz - s.vz;
    const dv = Math.hypot(ax, az);
    const rate = Math.hypot(tvx, tvz) > Math.hypot(s.vx, s.vz) ? AVATAR.accel : AVATAR.decel;
    const step = rate * dt;
    if (dv <= step) {
      s.vx = tvx;
      s.vz = tvz;
    } else {
      s.vx += (ax / dv) * step;
      s.vz += (az / dv) * step;
    }

    const [nx, nz] = resolveCollisions(s.x + s.vx * dt, s.z + s.vz * dt);
    const intended = Math.hypot(s.vx, s.vz) * dt;
    const actual = Math.hypot(nx - s.x, nz - s.z);
    if (dt > 0) {
      s.vx = (nx - s.x) / dt;
      s.vz = (nz - s.z) / dt;
    }
    s.x = nx;
    s.z = nz;

    // Give up on a path that keeps pushing into furniture.
    if (s.path && intended > 0.005 && actual < intended * 0.2) {
      s.stuck += dt;
      if (s.stuck > 0.8) {
        s.stuck = 0;
        s.path = null;
        if (s.dest) storeActions.arrive(s.dest.id);
        else storeActions.depart();
        s.dest = null;
      }
    } else {
      s.stuck = 0;
    }

    // Face the travel direction; turn to the viewer for the wave/pose, or to the display when parked.
    const speed = Math.hypot(s.vx, s.vz);
    let targetYaw = s.yaw;
    if (speed > 0.25) targetYaw = Math.atan2(s.vx, s.vz);
    else if (pose.action === 'wave') targetYaw = avatarShared.camYaw;
    else if (st.active) targetYaw = SECTION_BY_ID[st.active].yaw;
    const diff = Math.atan2(Math.sin(targetYaw - s.yaw), Math.cos(targetYaw - s.yaw));
    const turnStep = diff * (1 - Math.exp(-AVATAR.turnRate * dt));
    s.yaw += turnStep;

    if (pose.action) {
      pose.age += dt;
      if (speed > 0.4 || pose.age > ACTION_SECONDS[pose.action]) pose.action = null;
    }
    pose.speed = speed;
    pose.turning = speed < 0.2 && Math.abs(diff) > 0.4;
    pose.yaw = s.yaw;
    pose.yawRate = dt > 0 ? turnStep / dt : 0;

    root.current.position.set(s.x, 0, s.z);
    root.current.rotation.y = s.yaw + AVATAR.forwardOffset;
    avatarShared.x = s.x;
    avatarShared.z = s.z;
    avatarShared.yaw = s.yaw;
    avatarShared.speed = speed;
    storeActions.setMoving(speed > 0.2);

    // Place the rim lights relative to the camera heading.
    const cs = Math.cos(avatarShared.camYaw);
    const sn = Math.sin(avatarShared.camYaw);
    RIM.forEach((r, i) => {
      const l = rim.current[i];
      if (!l) return;
      l.position.set(s.x + r.c * cs + r.z * sn, 2.1, s.z - r.c * sn + r.z * cs);
    });
  });

  return (
    <>
      <group ref={root} name="avatar">
        <Suspense fallback={null}>
          {AVATAR.mode === 'glb' ? <GlbBody pose={pose} /> : <ProceduralHuman pose={pose} />}
        </Suspense>
        <mesh rotation-x={-Math.PI / 2} position-y={0.012}>
          <circleGeometry args={[0.55, 28]} />
          <meshBasicMaterial color="#000" transparent opacity={0.3} depthWrite={false} />
        </mesh>
      </group>
      {RIM.map((r, i) => (
        <pointLight
          key={r.color}
          ref={(el) => {
            rim.current[i] = el;
          }}
          color={r.color}
          intensity={6}
          distance={6}
          decay={2}
        />
      ))}
    </>
  );
}
