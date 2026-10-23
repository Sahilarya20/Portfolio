import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import { SECTION_BY_ID, SPAWN } from '../sections';
import { avatarShared, getState } from '../store';

const { damp, clamp } = MathUtils;

const YAW_LIMIT = 1.25;
const PITCH_MIN = -0.45;
const PITCH_MAX = 0.6;
const ZOOM_MIN = 0.2;
const ZOOM_MAX = 1.5;

export default function CameraRig() {
  const gl = useThree((s) => s.gl);
  const look = useRef(new Vector3(...SPAWN.cam.look));
  const shift = useRef({ x: 0, y: 0 });
  const init = useRef(false);
  const seen = useRef({ nav: getState().navToken, move: getState().moveToken, view: getState().viewToken });
  // `goal` is what the user asked for with mouse/touch; `cur` eases toward it.
  const orbit = useRef({ goal: { yaw: 0, pitch: 0, zoom: 1 }, cur: { yaw: 0, pitch: 0, zoom: 1 } });
  const tmp = useRef(new Vector3());

  useEffect(() => {
    const el = gl.domElement;
    const g = orbit.current.goal;
    const pointers = new Map();
    let pinch = 0;

    const spread = () => {
      const [a, b] = [...pointers.values()];
      return Math.hypot(a.x - b.x, a.y - b.y);
    };
    const down = (e) => {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      pinch = pointers.size === 2 ? spread() : 0;
    };
    const move = (e) => {
      const p = pointers.get(e.pointerId);
      if (!p) return;
      const dx = e.clientX - p.x;
      const dy = e.clientY - p.y;
      p.x = e.clientX;
      p.y = e.clientY;
      if (pointers.size === 1) {
        g.yaw = clamp(g.yaw - dx * 0.006, -YAW_LIMIT, YAW_LIMIT);
        g.pitch = clamp(g.pitch + dy * 0.004, PITCH_MIN, PITCH_MAX);
      } else if (pointers.size === 2) {
        const d = spread();
        if (pinch && d) g.zoom = clamp(g.zoom * (pinch / d), ZOOM_MIN, ZOOM_MAX);
        pinch = d;
      }
    };
    const up = (e) => {
      pointers.delete(e.pointerId);
      pinch = 0;
    };
    const wheel = (e) => {
      e.preventDefault();
      g.zoom = clamp(g.zoom * Math.exp(e.deltaY * 0.001), ZOOM_MIN, ZOOM_MAX);
    };
    const reset = () => {
      g.yaw = 0;
      g.pitch = 0;
      g.zoom = 1;
    };

    el.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    el.addEventListener('wheel', wheel, { passive: false });
    el.addEventListener('dblclick', reset);
    return () => {
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      el.removeEventListener('wheel', wheel);
      el.removeEventListener('dblclick', reset);
    };
  }, [gl]);

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const { camera, size } = state;
    const st = getState();
    const station = st.active ? SECTION_BY_ID[st.active] : null;
    const a = avatarShared;
    const o = orbit.current;

    // Choosing a destination or pressing "reset view" returns to the authored framing.
    if (st.navToken !== seen.current.nav || st.moveToken !== seen.current.move || st.viewToken !== seen.current.view) {
      seen.current = { nav: st.navToken, move: st.moveToken, view: st.viewToken };
      o.goal.yaw = 0;
      o.goal.pitch = 0;
      o.goal.zoom = 1;
    }

    let pos;
    let target;
    if (station) {
      pos = station.cam.pos;
      target = station.cam.look;
    } else {
      pos = [clamp(a.x * 0.7, -6.5, 6.5), 4.5, a.z + 8.4];
      target = [a.x * 0.85, 1.2, a.z - 1.0];
    }

    // Reduced motion shortens the camera glide rather than removing it.
    const lambda = st.reducedMotion ? 9 : station ? 2.4 : 3.2;
    const orbitLambda = st.reducedMotion ? 20 : 8;
    o.cur.yaw = damp(o.cur.yaw, o.goal.yaw, orbitLambda, dt);
    o.cur.pitch = damp(o.cur.pitch, o.goal.pitch, orbitLambda, dt);
    o.cur.zoom = damp(o.cur.zoom, o.goal.zoom, orbitLambda, dt);

    if (!init.current) {
      init.current = true;
      camera.position.set(...pos);
      look.current.set(...target);
    }

    // Orbit the authored camera position around its target.
    const v = tmp.current.set(pos[0] - target[0], pos[1] - target[1], pos[2] - target[2]);
    const len = v.length() || 1;
    const r = len * o.cur.zoom;
    const yaw = Math.atan2(v.x, v.z) + o.cur.yaw;
    const phi = clamp(Math.asin(v.y / len) + o.cur.pitch, 0.05, 1.4);
    // Zooming in re-centres the orbit on the avatar so the character can be inspected up close.
    const k = clamp((1 - o.cur.zoom) / 0.8, 0, 1);
    const fx = target[0] + (a.x - target[0]) * k;
    const fy = target[1] + (1.4 - target[1]) * k;
    const fz = target[2] + (a.z - target[2]) * k;
    // Stay inside the walls so the view is never blocked from outside.
    const gx = clamp(fx + r * Math.cos(phi) * Math.sin(yaw), -8.6, 8.6);
    const gy = Math.max(0.7, fy + r * Math.sin(phi));
    const gz = clamp(fz + r * Math.cos(phi) * Math.cos(yaw), -6.0, 16);

    camera.position.set(
      damp(camera.position.x, gx, lambda, dt),
      damp(camera.position.y, gy, lambda, dt),
      damp(camera.position.z, gz, lambda, dt)
    );
    look.current.set(
      damp(look.current.x, fx, lambda, dt),
      damp(look.current.y, fy, lambda, dt),
      damp(look.current.z, fz, lambda, dt)
    );
    camera.lookAt(look.current);

    // Movement keys are relative to the camera heading.
    avatarShared.camYaw = Math.atan2(camera.position.x - look.current.x, camera.position.z - look.current.z);

    // Slide the scene clear of the open content panel (right on desktop, bottom on mobile).
    const wide = size.width >= 900;
    const open = st.panelOpen && st.active !== null;
    const tx = open && wide ? 0.17 * size.width : 0;
    const ty = open && !wide ? 0.2 * size.height : 0;
    shift.current.x = damp(shift.current.x, tx, 4, dt);
    shift.current.y = damp(shift.current.y, ty, 4, dt);
    if (Math.abs(shift.current.x) > 0.5 || Math.abs(shift.current.y) > 0.5) {
      camera.setViewOffset(size.width, size.height, shift.current.x, shift.current.y, size.width, size.height);
    } else if (camera.view && camera.view.enabled) {
      camera.clearViewOffset();
    }
  });

  return null;
}
