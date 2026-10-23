import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  BoxGeometry,
  CircleGeometry,
  DoubleSide,
  MathUtils,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  SphereGeometry,
  SRGBColorSpace,
  TextureLoader,
  TorusGeometry,
} from 'three';
import { HUMAN } from './config';
import { loft, makeHead, RINGS } from './bodyGeometry';
import { createTexture } from './textures';
import { actions, avatarShared, getState, pointer } from '../store';

const { damp, clamp, smoothstep } = MathUtils;

const SPHERE = new SphereGeometry(1, 24, 16);
const RING = new TorusGeometry(1, 0.1, 8, 32);
const SMILE = new TorusGeometry(1, 0.1, 6, 18, Math.PI);
const LENS = new CircleGeometry(1, 28);
const BOX = new BoxGeometry(1, 1, 1);
const HEAD = makeHead();
const BEARD = makeHead({ thetaStart: 2.24, thetaLength: Math.PI - 2.24, grow: 1.05 });
const STUBBLE = makeHead({ thetaStart: 1.72, thetaLength: Math.PI - 1.72, grow: 1.014 });
const HAIR = makeHead({ thetaStart: 0, thetaLength: 1.3, grow: 1.045 });
// Front of the face, textured from the reference photo and sitting just above the hair/beard shells.
const FACE_DECAL = makeHead({
  thetaStart: 0.62,
  thetaLength: 2.28,
  phiStart: Math.PI / 2 - 1.05,
  phiLength: 2.1,
  grow: 1.06,
  uv: true,
});
const GEO = Object.fromEntries(Object.entries(RINGS).map(([k, v]) => [k, loft(v)]));

// Soft-edged alpha so the photo fades into the sculpted head at the temples, forehead and jaw.
const drawFaceMask = (ctx, w, h) => {
  const img = ctx.createImageData(w, h);
  for (let y = 0; y < h; y += 1) {
    const v = 1 - y / h;
    for (let x = 0; x < w; x += 1) {
      const dx = Math.abs(x / w - 0.5);
      const a = (1 - smoothstep(dx, 0.3, 0.42)) * (1 - smoothstep(v, 0.64, 0.72)) * smoothstep(v, 0.1, 0.16);
      const o = (y * w + x) * 4;
      img.data[o] = a * 255;
      img.data[o + 1] = a * 255;
      img.data[o + 2] = a * 255;
      img.data[o + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
};

const JOINTS = [
  'body', 'hips', 'spine', 'chest', 'neck', 'head',
  'armL', 'armR', 'elbowL', 'elbowR',
  'thighL', 'thighR', 'kneeL', 'kneeR', 'footL', 'footR',
  'eyeL', 'eyeR',
];

// Unit ellipsoid helper for small details.
function E({ g = SPHERE, m, s = 1, p = [0, 0, 0], r = [0, 0, 0], cast = true }) {
  return <mesh geometry={g} material={m} position={p} rotation={r} scale={s} castShadow={cast} />;
}

// Lofted body part.
function L({ k, m, p = [0, 0, 0], s = 1, cast = true }) {
  return <mesh geometry={GEO[k]} material={m} position={p} scale={s} castShadow={cast} />;
}

const mix = (a, b, w) => [a[0] + (b[0] - a[0]) * w, a[1] + (b[1] - a[1]) * w, a[2] + (b[2] - a[2]) * w];
const wrapAngle = (a) => Math.atan2(Math.sin(a), Math.cos(a));

function useMaterials(faceTex) {
  const mask = useMemo(() => createTexture(256, 256, drawFaceMask), []);
  return useMemo(() => {
    const std = (color, roughness, metalness = 0, extra = {}) =>
      new MeshStandardMaterial({ color, roughness, metalness, ...extra });
    return {
      decal: faceTex
        ? new MeshStandardMaterial({
            map: faceTex,
            alphaMap: mask,
            transparent: true,
            roughness: 0.62,
            emissive: '#ffffff',
            emissiveMap: faceTex,
            emissiveIntensity: 0.3,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -2,
          })
        : null,
      lid: std('#a77857', 0.55),
      cream: std('#efe6d4', 0.7),
      skin: new MeshPhysicalMaterial({
        color: HUMAN.skin,
        roughness: 0.5,
        sheen: 0.7,
        sheenColor: '#ff9d73',
        sheenRoughness: 0.45,
        emissive: '#6b2f17',
        emissiveIntensity: 0.32,
      }),
      lips: std('#a5534a', 0.5),
      hair: std(HUMAN.hair, 0.5, 0.08),
      beard: std(HUMAN.beard, 0.9),
      stubble: std('#5b4236', 0.85),
      vest: std(HUMAN.vest, 0.62, 0.15),
      joggers: std(HUMAN.joggers, 0.8),
      band: std('#3a4152', 0.7),
      sole: std('#ece3d2', 0.55),
      upper: std('#cdbda3', 0.6),
      upper2: std('#b3a287', 0.6),
      accent: new MeshStandardMaterial({ color: '#000', emissive: '#22d3ee', emissiveIntensity: 2.2, toneMapped: false }),
      white: std('#f2efe9', 0.35),
      iris: std('#2a1a11', 0.3),
      tilak: std('#c2271c', 0.5),
      frame: new MeshStandardMaterial({ color: '#d9dee8', roughness: 0.2, metalness: 0.4, transparent: true, opacity: 0.85 }),
      lens: new MeshStandardMaterial({
        color: '#cfeaff',
        roughness: 0.05,
        transparent: true,
        opacity: 0.12,
        side: DoubleSide,
        depthWrite: false,
      }),
    };
  }, [faceTex, mask]);
}

function Arm({ side, armRef, elbowRef, m }) {
  return (
    <group ref={armRef} position={[side * 0.24, 0.25, 0]}>
      <L k="upperArm" m={m.skin} />
      <group ref={elbowRef} position={[0, -0.3, 0]}>
        <E m={m.skin} s={0.042} />
        <L k="forearm" m={m.skin} />
        <group position={[0, -0.27, 0]}>
          <L k="hand" m={m.skin} />
          <E m={m.skin} s={[0.014, 0.032, 0.014]} p={[-side * 0.034, -0.045, 0.014]} r={[0, 0, side * 0.3]} />
        </group>
      </group>
    </group>
  );
}

function Leg({ side, thighRef, kneeRef, footRef, m }) {
  return (
    <group ref={thighRef} position={[side * 0.115, 0, 0]}>
      <L k="thigh" m={m.joggers} />
      <group ref={kneeRef} position={[0, -0.43, 0]}>
        <E m={m.joggers} s={0.1} />
        <L k="shin" m={m.joggers} />
        <L k="cuff" m={m.band} cast={false} />
        <group ref={footRef} position={[0, -0.41, 0]}>
          <mesh geometry={BOX} material={m.sole} position={[0, -0.0725, 0.06]} scale={[0.118, 0.04, 0.3]} castShadow />
          <E m={m.upper} s={[0.06, 0.058, 0.13]} p={[0, -0.03, 0.05]} />
          <E m={m.upper} s={[0.058, 0.04, 0.07]} p={[0, -0.05, 0.13]} />
          <E m={m.upper} s={[0.054, 0.05, 0.055]} p={[0, -0.038, -0.045]} />
          <mesh geometry={BOX} material={m.upper2} position={[0, -0.045, 0.06]} scale={[0.122, 0.012, 0.18]} />
        </group>
      </group>
    </group>
  );
}

// Hand-built features, used only when the face photo texture is unavailable.
function LegacyFeatures({ m, eyeLRef, eyeRRef }) {
  return (
    <>
      <E m={m.skin} s={[0.013, 0.032, 0.016]} p={[0, 0.106, 0.093]} />
      <E m={m.hair} s={[0.034, 0.0075, 0.011]} p={[0.038, 0.141, 0.09]} r={[0, 0, 0.16]} cast={false} />
      <E m={m.hair} s={[0.034, 0.0075, 0.011]} p={[-0.038, 0.141, 0.09]} r={[0, 0, -0.16]} cast={false} />
      {[[eyeLRef, 1], [eyeRRef, -1]].map(([ref, sx]) => (
        <group key={sx} ref={ref} position={[sx * 0.037, 0.118, 0.084]}>
          <E m={m.white} s={0.0165} cast={false} />
          <E m={m.iris} s={[0.0092, 0.0092, 0.004]} p={[0, 0, 0.0157]} cast={false} />
        </group>
      ))}
      {[1, -1].map((sx) => (
        <group key={sx} position={[sx * 0.037, 0.118, 0.112]}>
          <mesh geometry={RING} material={m.frame} scale={[0.031, 0.024, 0.026]} />
          <mesh geometry={LENS} material={m.lens} scale={[0.03, 0.023, 1]} />
        </group>
      ))}
      <E m={m.lips} s={[0.021, 0.0065, 0.008]} p={[0, 0.043, 0.1]} cast={false} />
      <mesh geometry={SMILE} material={m.lips} position={[0, 0.052, 0.103]} rotation={[0, 0, Math.PI]} scale={0.019} />
      <E m={m.beard} s={[0.036, 0.009, 0.013]} p={[0, 0.059, 0.101]} cast={false} />
      {HUMAN.tilak && <E m={m.tilak} s={[0.0055, 0.008, 0.003]} p={[0, 0.158, 0.09]} cast={false} />}
    </>
  );
}

function Face({ m, eyeLRef, eyeRRef, photo }) {
  return (
    <>
      <mesh geometry={HEAD} material={m.skin} position={[0, 0.1, 0]} castShadow />
      <E m={m.skin} s={[0.017, 0.032, 0.015]} p={[0.098, 0.095, -0.005]} />
      <E m={m.skin} s={[0.017, 0.032, 0.015]} p={[-0.098, 0.095, -0.005]} />
      {photo ? (
        <>
          <mesh geometry={FACE_DECAL} material={m.decal} position={[0, 0.1, 0]} renderOrder={2} />
          {/* eyelids: invisible until a blink */}
          {[[eyeLRef, 1], [eyeRRef, -1]].map(([ref, sx]) => (
            <group key={sx} ref={ref} position={[sx * 0.0488, 0.118, 0.1]}>
              <E m={m.lid} s={[0.021, 0.011, 0.009]} cast={false} />
            </group>
          ))}
          {/* glasses temples, visible from the side */}
          {[1, -1].map((sx) => (
            <mesh key={sx} geometry={BOX} material={m.frame} position={[sx * 0.093, 0.122, 0.035]} scale={[0.0025, 0.003, 0.1]} />
          ))}
        </>
      ) : (
        <LegacyFeatures m={m} eyeLRef={eyeLRef} eyeRRef={eyeRRef} />
      )}
      <mesh geometry={STUBBLE} material={m.stubble} position={[0, 0.1, 0]} />
      <mesh geometry={BEARD} material={m.beard} position={[0, 0.1, 0]} castShadow />
      {/* short faded hair, full on top and swept up */}
      <mesh geometry={HAIR} material={m.hair} position={[0, 0.1, 0]} rotation={[-0.75, 0, 0]} castShadow />
      <E m={m.hair} s={[0.075, 0.034, 0.095]} p={[0.006, 0.222, 0.004]} r={[-0.2, 0, 0.12]} />
      <E m={m.hair} s={[0.052, 0.024, 0.05]} p={[0.012, 0.205, 0.065]} r={[-0.55, 0, 0.1]} cast={false} />
    </>
  );
}
export default function ProceduralHuman({ pose }) {
  const [faceTex, setFaceTex] = useState(null);
  const m = useMaterials(faceTex);
  const photoRef = useRef(false);
  photoRef.current = !!faceTex;
  const J = useMemo(() => Object.fromEntries(JOINTS.map((k) => [k, React.createRef()])), []);
  const S = useRef({
    phase: 0, walk: 0, turn: 0, wave: 0, gym: 0, greet: 0,
    blinkIn: 2.2, blinking: 0, gazeYaw: 0, gazePitch: 0, sway: 0,
  });

  useEffect(() => {
    actions.setSceneReady(true);
  }, []);

  useEffect(() => {
    if (!HUMAN.faceTexture) return undefined;
    let cancelled = false;
    new TextureLoader().load(
      HUMAN.faceTexture,
      (tex) => {
        if (cancelled) return;
        tex.colorSpace = SRGBColorSpace;
        tex.anisotropy = 4;
        setFaceTex(tex);
      },
      undefined,
      () => {}
    );
    return () => {
      cancelled = true;
    };
  }, []);

  useFrame(({ clock }, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const t = clock.elapsedTime;
    const s = S.current;
    const reduced = getState().reducedMotion;
    const calm = reduced ? 0.4 : 1;
    const speed = pose.speed;

    s.walk = damp(s.walk, speed > 0.2 ? 1 : 0, 9, dt);
    s.turn = damp(s.turn, pose.turning ? 1 : 0, 9, dt);
    s.phase += dt * (speed > 0.2 ? speed * 2.7 : pose.turning ? 4.2 : 0);
    const amt = Math.max(s.walk * clamp(speed / 2.3, 0.35, 1.25), s.turn * 0.45);
    const sw = Math.sin(s.phase);
    const cw = Math.cos(s.phase);
    const breath = Math.sin(t * 1.7) * (1 - amt * 0.6);
    const idle = Math.sin(t * 0.7) * calm;

    // Action weights: "wave" = quick hello followed by a gym pose; "greet" = short hello.
    const age = pose.age;
    let wave = 0;
    let gym = 0;
    let greet = 0;
    if (pose.action === 'wave') {
      wave = smoothstep(age, 0, 0.25) * (1 - smoothstep(age, 0.95, 1.25));
      gym = smoothstep(age, 1.1, 1.55) * (1 - smoothstep(age, 3.4, 3.85));
    } else if (pose.action === 'greet') {
      greet = smoothstep(age, 0, 0.25) * (1 - smoothstep(age, 1.4, 1.8));
    }
    s.wave = damp(s.wave, wave, 14, dt);
    s.gym = damp(s.gym, gym, 12, dt);
    s.greet = damp(s.greet, greet, 14, dt);

    // Idle / walk / turn layer. Positive X rotation swings a hanging limb backwards.
    const kneeL = 0.05 + Math.max(0, cw) * 0.85 * amt;
    const kneeR = 0.05 + Math.max(0, -cw) * 0.85 * amt;
    const T = {
      spine: [-0.05 * amt, sw * 0.14 * amt + idle * 0.015, clamp(-pose.yawRate * 0.012, -0.1, 0.1) * s.walk],
      chest: [-0.03 + breath * 0.02, -sw * 0.1 * amt, 0],
      neck: [0.03, 0, 0],
      armL: [sw * 0.55 * amt + breath * 0.01, 0, 0.15 + breath * 0.02],
      armR: [-sw * 0.55 * amt + breath * 0.01, 0, -0.15 - breath * 0.02],
      elbowL: [-(0.2 + 0.55 * amt * Math.max(0, -sw)), 0, 0],
      elbowR: [-(0.2 + 0.55 * amt * Math.max(0, sw)), 0, 0],
      thighL: [-sw * 0.62 * amt, 0, 0.07],
      thighR: [sw * 0.62 * amt, 0, -0.07],
      kneeL: [kneeL, 0, 0],
      kneeR: [kneeR, 0, 0],
    };

    // Front double biceps.
    const G = {
      spine: [-0.05, 0, 0],
      chest: [-0.12, 0, 0],
      neck: [0.1, 0, 0],
      armL: [0, -0.4, 1.45],
      armR: [0, 0.4, -1.45],
      elbowL: [0, 0, 1.9],
      elbowR: [0, 0, -1.9],
      thighL: [-0.05, 0, 0.18],
      thighR: [-0.05, 0, -0.18],
      kneeL: [0.14, 0, 0],
      kneeR: [0.14, 0, 0],
    };
    // Right-hand wave; greet is the same gesture, lower and shorter.
    const wob = Math.sin(t * 10) * calm;
    const Wv = { armR: [0.25, 0, -2.55], elbowR: [0, 0, -0.35 - wob * 0.45], neck: [0.02, 0.18, 0.1] };
    const Gr = { armR: [0.3, 0, -2.0], elbowR: [0, 0, -0.5 - wob * 0.4], neck: [0.12, 0.1, 0] };
    const tremble = s.gym > 0.6 ? Math.sin(t * 38) * 0.012 * calm : 0;

    const F = {};
    Object.keys(T).forEach((k) => {
      let v = T[k];
      if (s.gym > 0.001 && G[k]) v = mix(v, G[k], s.gym);
      if (s.wave > 0.001 && Wv[k]) v = mix(v, Wv[k], s.wave);
      if (s.greet > 0.001 && Gr[k]) v = mix(v, Gr[k], s.greet);
      F[k] = v;
    });
    F.armL = [F.armL[0], F.armL[1], F.armL[2] + tremble];
    F.armR = [F.armR[0], F.armR[1], F.armR[2] - tremble];
    // Keep feet flat and pointing forward whatever the legs do.
    F.footL = [-(F.thighL[0] + F.kneeL[0]) * 0.85, 0, -F.thighL[2]];
    F.footR = [-(F.thighR[0] + F.kneeR[0]) * 0.85, 0, -F.thighR[2]];

    // Head follows the cursor, mostly while standing still.
    const focus = pose.action === 'wave' && s.gym > 0.3 ? 0.2 : speed > 0.2 ? 0.4 : 1;
    const toCursor = avatarShared.camYaw + Math.PI - Math.atan(pointer.x * 0.85);
    const rel = clamp(wrapAngle(toCursor - pose.yaw), -1, 1);
    s.gazeYaw = damp(s.gazeYaw, rel * 0.8 * focus, 6, dt);
    s.gazePitch = damp(s.gazePitch, pointer.y * 0.28 * focus, 6, dt);
    F.head = [s.gazePitch, s.gazeYaw, 0];

    const lam = 20;
    Object.entries(F).forEach(([k, v]) => {
      const o = J[k].current;
      if (!o) return;
      o.rotation.x = damp(o.rotation.x, v[0], lam, dt);
      o.rotation.y = damp(o.rotation.y, v[1], lam, dt);
      o.rotation.z = damp(o.rotation.z, v[2], lam, dt);
    });

    // Body bob, weight shift and breathing.
    s.sway = damp(s.sway, idle * 0.012 * (1 - amt), 4, dt);
    J.body.current.position.y = damp(J.body.current.position.y, (Math.abs(cw) - 0.6) * 0.05 * amt - s.gym * 0.03, 14, dt);
    J.hips.current.position.x = s.sway + sw * 0.012 * amt;
    const pump = 1 + s.gym * 0.05;
    J.chest.current.scale.set(pump + breath * 0.006, 1 + breath * 0.01, pump + breath * 0.012);

    // Eyes: look toward the cursor and blink.
    s.blinkIn -= dt;
    if (s.blinkIn <= 0 && s.blinking <= 0) {
      s.blinking = 0.16;
      s.blinkIn = 2.4 + Math.random() * 3;
    }
    let lid = 1;
    if (s.blinking > 0) {
      s.blinking -= dt;
      lid = 0.1 + 0.9 * Math.abs(s.blinking / 0.16 - 0.5) * 2;
    }
    [J.eyeL.current, J.eyeR.current].forEach((e) => {
      if (!e) return;
      if (photoRef.current) {
        // Eyelids start flat (hidden) and swell to cover the painted eye.
        e.scale.y = Math.max(0.001, 1.001 - lid);
        return;
      }
      e.scale.y = lid;
      e.rotation.y = damp(e.rotation.y, clamp(rel, -1, 1) * 0.22 * focus, 10, dt);
      e.rotation.x = damp(e.rotation.x, pointer.y * 0.18 * focus, 10, dt);
    });
  });


  return (
    <group ref={J.body}>
      <group ref={J.hips} position={[0, 0.93, 0]}>
        <L k="pelvis" m={m.joggers} />
        <L k="waistband" m={m.band} cast={false} />
        <E m={m.cream} s={0.012} p={[0, 0.085, 0.126]} cast={false} />
        {[-1, 1].map((sx) => (
          <mesh key={sx} geometry={BOX} material={m.cream} position={[sx * 0.022, 0.02, 0.131]} scale={[0.006, 0.12, 0.006]} />
        ))}
        <Leg side={1} thighRef={J.thighL} kneeRef={J.kneeL} footRef={J.footL} m={m} />
        <Leg side={-1} thighRef={J.thighR} kneeRef={J.kneeR} footRef={J.footR} m={m} />

        <group ref={J.spine} position={[0, 0.07, 0]}>
          <L k="abdomen" m={m.skin} />
          <L k="abdomenVest" m={m.vest} cast={false} />
          <group ref={J.chest} position={[0, 0.18, 0]}>
            <L k="chest" m={m.skin} />
            <L k="chestVest" m={m.vest} cast={false} />
            <Arm side={1} armRef={J.armL} elbowRef={J.elbowL} m={m} />
            <Arm side={-1} armRef={J.armR} elbowRef={J.elbowR} m={m} />
            <group ref={J.neck} position={[0, 0.31, 0]}>
              <L k="neck" m={m.skin} />
              <group ref={J.head} position={[0, 0.08, 0]} scale={1.15}>
                <Face m={m} eyeLRef={J.eyeL} eyeRRef={J.eyeR} photo={!!faceTex} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
