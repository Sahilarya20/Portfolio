import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useCursor } from '@react-three/drei';
import { AdditiveBlending, Color, DoubleSide, Object3D, PlaneGeometry } from 'three';
import { SECTIONS } from '../sections';
import { actions, getState, useStore } from '../store';
import { hologramSkills } from '../../data/portfolio';
import {
  drawAbout,
  drawContact,
  drawProjectsHolo,
  drawSign,
  drawTimeline,
  drawWelcome,
  makeCodeDrawer,
  makeTagDrawer,
  useScreenTexture,
} from './textures';

const Em = ({ color, i = 2, ...rest }) => (
  <meshStandardMaterial color="#000" emissive={color} emissiveIntensity={i} toneMapped={false} {...rest} />
);
const Metal = ({ color = '#141a33', ...rest }) => (
  <meshStandardMaterial color={color} metalness={0.7} roughness={0.35} {...rest} />
);

function useFloat(ref, amp = 0.06, speed = 1, phase = 0) {
  const base = useRef(null);
  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g) return;
    if (base.current === null) base.current = g.position.y;
    g.position.y = base.current + (getState().reducedMotion ? 0 : Math.sin(clock.elapsedTime * speed + phase) * amp);
  });
}

const useHover = (id) => useStore((s) => s.hovered === id);

// Makes everything inside behave like the matching sidebar button.
function Hotspot({ id, children }) {
  const [hover, setHover] = useState(false);
  useCursor(hover);
  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        if (e.delta > 5) return;
        actions.go(id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        actions.setHovered(id);
      }}
      onPointerOut={() => {
        setHover(false);
        actions.setHovered(null);
      }}
    >
      {children}
    </group>
  );
}

function StationLabel({ section }) {
  const hovered = useHover(section.id);
  const active = useStore((s) => s.active === section.id);
  return (
    <Html position={section.label3d} center zIndexRange={[5, 0]} style={{ pointerEvents: 'none' }}>
      <div
        aria-hidden="true"
        className={`xp-tag${hovered ? ' is-hover' : ''}${active ? ' is-active' : ''}`}
        style={{ '--tag': section.color }}
      >
        {section.label}
      </div>
    </Html>
  );
}

function StationPad({ section }) {
  const mat = useRef();
  const ring = useRef();
  const hovered = useHover(section.id);
  useFrame(({ clock }) => {
    const st = getState();
    const active = st.active === section.id;
    const pulse = st.reducedMotion ? 0 : Math.sin(clock.elapsedTime * 2.5) * 0.4;
    if (mat.current) mat.current.emissiveIntensity = 0.9 + (hovered ? 2.2 : 0) + (active ? 1.2 : 0) + pulse;
    if (ring.current) ring.current.scale.setScalar(hovered ? 1.12 : 1);
  });
  return (
    <group position={[section.stand[0], 0.02, section.stand[1]]} rotation-x={-Math.PI / 2}>
      <mesh ref={ring}>
        <ringGeometry args={[0.46, 0.54, 48]} />
        <meshStandardMaterial ref={mat} color="#000" emissive={section.color} emissiveIntensity={1} toneMapped={false} transparent opacity={0.9} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.46, 40]} />
        <meshBasicMaterial color={section.color} transparent opacity={0.08} depthWrite={false} />
      </mesh>
    </group>
  );
}

function HoloPanel({ texture, size, position, rotation, color = '#38bdf8', float = true }) {
  const group = useRef();
  const [pw, ph] = size;
  const frame = useMemo(() => new PlaneGeometry(pw, ph), [pw, ph]);
  useFloat(float ? group : { current: null }, 0.05, 1.1);
  // Hide hologram panels the camera passes right next to so they never fill the screen.
  useFrame(({ camera }) => {
    if (group.current) group.current.visible = camera.position.distanceTo(group.current.position) > 5.5;
  });
  return (
    <group ref={group} position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={size} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} side={DoubleSide} depthWrite={false} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[frame]} />
        <lineBasicMaterial color={color} toneMapped={false} />
      </lineSegments>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[size[0] * 1.04, size[1] * 1.06]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} blending={AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Monitor({ position, rotationY = 0, size = [1.2, 0.7], texture }) {
  const [w, h] = size;
  return (
    <group position={position} rotation-y={rotationY}>
      <mesh position={[0, h / 2 + 0.2, 0]} castShadow>
        <boxGeometry args={[w + 0.06, h + 0.06, 0.05]} />
        <Metal color="#0b0f1f" />
      </mesh>
      <mesh position={[0, h / 2 + 0.2, 0.03]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.12, -0.04]}>
        <boxGeometry args={[0.07, 0.3, 0.04]} />
        <Metal />
      </mesh>
      <mesh position={[0, 0.0, 0]}>
        <boxGeometry args={[0.42, 0.02, 0.24]} />
        <Metal />
      </mesh>
    </group>
  );
}

function Desk() {
  const hovered = useHover('projects');
  const left = useScreenTexture(1024, 600, useMemo(() => makeCodeDrawer(11, '1platform / etl-pipeline.ts'), []));
  const mid = useScreenTexture(1024, 600, useMemo(() => makeCodeDrawer(42, 'packetlens / parser.js'), []));
  const right = useScreenTexture(1024, 600, useMemo(() => makeCodeDrawer(77, 'portfolio / Scene.jsx'), []));
  const holo = useScreenTexture(800, 440, drawProjectsHolo);
  const sign = useScreenTexture(1400, 240, drawSign);
  const strip = hovered ? 4 : 2;
  return (
    <group>
      <Hotspot id="projects">
        <group position={[0, 0, -5.65]}>
          <mesh position={[0, 0.78, 0]} castShadow receiveShadow>
            <boxGeometry args={[3.8, 0.07, 1.3]} />
            <meshStandardMaterial color="#1a1f3a" metalness={0.6} roughness={0.25} />
          </mesh>
          {[-1.8, 1.8].map((x) => (
            <mesh key={x} position={[x, 0.39, 0]} castShadow>
              <boxGeometry args={[0.08, 0.78, 1.2]} />
              <Metal color="#0d1226" />
            </mesh>
          ))}
          <mesh position={[0, 0.5, -0.55]}>
            <boxGeometry args={[3.6, 0.5, 0.04]} />
            <Metal color="#0d1226" />
          </mesh>
          <mesh position={[0, 0.745, 0.62]}>
            <boxGeometry args={[3.7, 0.015, 0.03]} />
            <Em color="#22d3ee" i={strip} />
          </mesh>
          <Monitor position={[0, 0.82, -0.3]} size={[1.5, 0.85]} texture={mid} />
          <Monitor position={[-1.4, 0.82, -0.18]} rotationY={0.42} size={[1.1, 0.68]} texture={left} />
          <Monitor position={[1.4, 0.82, -0.18]} rotationY={-0.42} size={[1.1, 0.68]} texture={right} />
          <mesh position={[0, 0.83, 0.25]}>
            <boxGeometry args={[0.55, 0.025, 0.18]} />
            <Metal color="#0b0f1f" />
          </mesh>
          <mesh position={[0, 0.845, 0.25]}>
            <boxGeometry args={[0.5, 0.004, 0.13]} />
            <Em color="#6366f1" i={1.2} />
          </mesh>
          <mesh position={[0.5, 0.83, 0.27]}>
            <boxGeometry args={[0.07, 0.025, 0.11]} />
            <Metal color="#0b0f1f" />
          </mesh>
          <mesh position={[1.45, 0.88, 0.2]}>
            <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
          </mesh>
          <mesh position={[-1.55, 0.95, -0.45]}>
            <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
            <Metal />
          </mesh>
          <mesh position={[-1.55, 1.12, -0.38]} rotation-x={0.8}>
            <coneGeometry args={[0.1, 0.14, 20, 1, true]} />
            <Em color="#a5f3fc" i={2} side={DoubleSide} />
          </mesh>
          <mesh position={[-0.9, 0.84, 0.3]} rotation-x={Math.PI / 2}>
            <torusGeometry args={[0.1, 0.025, 8, 20, Math.PI]} />
            <Metal color="#202850" />
          </mesh>
          <mesh position={[1.5, 0.35, -0.35]}>
            <boxGeometry args={[0.28, 0.6, 0.55]} />
            <Metal color="#0b0f1f" />
          </mesh>
          <mesh position={[1.5, 0.35, -0.07]}>
            <planeGeometry args={[0.02, 0.5]} />
            <Em color="#a855f7" i={2} />
          </mesh>
        </group>
        <HoloPanel texture={holo} size={[2.6, 1.43]} position={[0, 2.75, -5.85]} color="#22d3ee" />
        <mesh position={[0, 3.95, -6.45]}>
          <planeGeometry args={[4.4, 0.75]} />
          <meshBasicMaterial map={sign} transparent toneMapped={false} depthWrite={false} />
        </mesh>
      </Hotspot>
      <Chair />
    </group>
  );
}

function Chair() {
  return (
    <group position={[2.0, 0, -4.2]} rotation-y={-2.2}>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.04, 5]} />
        <Metal />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.4, 10]} />
        <Metal />
      </mesh>
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#1c2347" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.9, -0.23]} rotation-x={-0.1} castShadow>
        <boxGeometry args={[0.48, 0.7, 0.07]} />
        <meshStandardMaterial color="#1c2347" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.9, -0.27]}>
        <boxGeometry args={[0.3, 0.02, 0.01]} />
        <Em color="#a855f7" i={2} />
      </mesh>
    </group>
  );
}

function Books({ count, width, rows, rowHeight, seed }) {
  const ref = useRef();
  useLayoutEffect(() => {
    const mesh = ref.current;
    const dummy = new Object3D();
    const palette = ['#2563eb', '#7c3aed', '#0891b2', '#475569', '#4f46e5', '#be185d', '#0f766e', '#94a3b8'];
    let s = seed;
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    let idx = 0;
    for (let r = 0; r < rows; r += 1) {
      let x = -width / 2 + 0.06;
      while (idx < (r + 1) * (count / rows) && x < width / 2 - 0.1) {
        const bw = 0.04 + rnd() * 0.05;
        const bh = 0.2 + rnd() * 0.16;
        dummy.position.set(x + bw / 2, r * rowHeight + 0.06 + bh / 2, 0);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(bw, bh, 0.28);
        dummy.updateMatrix();
        mesh.setMatrixAt(idx, dummy.matrix);
        mesh.setColorAt(idx, new Color(palette[Math.floor(rnd() * palette.length)]));
        x += bw + 0.005;
        idx += 1;
      }
    }
    mesh.count = idx;
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [count, width, rows, rowHeight, seed]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial roughness={0.7} />
    </instancedMesh>
  );
}

function Bookshelf({ position, rotationY = 0, width = 1.8, height = 3.0, seed = 1 }) {
  const rows = 5;
  const rowH = (height - 0.1) / rows;
  return (
    <group position={position} rotation-y={rotationY}>
      <mesh position={[0, height / 2, -0.2]}>
        <boxGeometry args={[width, height, 0.03]} />
        <Metal color="#0a0e20" />
      </mesh>
      {[-width / 2, width / 2].map((x) => (
        <mesh key={x} position={[x, height / 2, 0]}>
          <boxGeometry args={[0.04, height, 0.45]} />
          <Metal color="#101630" />
        </mesh>
      ))}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <mesh key={i} position={[0, 0.05 + i * rowH, 0]}>
          <boxGeometry args={[width, 0.04, 0.45]} />
          <Metal color="#101630" />
        </mesh>
      ))}
      <mesh position={[0, height - 0.02, 0.2]}>
        <boxGeometry args={[width - 0.06, 0.015, 0.015]} />
        <Em color="#6366f1" i={2.2} />
      </mesh>
      <group position={[0, 0.05, -0.02]}>
        <Books count={rows * 24} width={width} rows={rows} rowHeight={rowH} seed={seed} />
      </group>
    </group>
  );
}

function WallDisplay({ id, position, rotationY, size, texture, color }) {
  const hovered = useHover(id);
  const [w, h] = size;
  return (
    <Hotspot id={id}>
      <group position={position} rotation-y={rotationY}>
        <mesh position={[0, 0, -0.03]}>
          <boxGeometry args={[w + 0.16, h + 0.16, 0.06]} />
          <Metal color="#0a0e20" />
        </mesh>
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={size} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
        {/* oversized invisible hit area so the display is easy to click */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[w + 0.8, h + 0.8]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        {[
          [0, h / 2 + 0.09, w + 0.16, 0.025],
          [0, -h / 2 - 0.09, w + 0.16, 0.025],
          [-w / 2 - 0.09, 0, 0.025, h + 0.16],
          [w / 2 + 0.09, 0, 0.025, h + 0.16],
        ].map(([x, y, bw, bh], i) => (
          <mesh key={i} position={[x, y, 0.01]}>
            <planeGeometry args={[bw, bh]} />
            <Em color={color} i={hovered ? 5 : 2.4} />
          </mesh>
        ))}
        <pointLight position={[0, 0, 1.4]} color={color} intensity={hovered ? 9 : 4} distance={5} />
      </group>
    </Hotspot>
  );
}

function SkillsHologram() {
  const hovered = useHover('skills');
  const core = useRef();
  const ringA = useRef();
  const ringB = useRef();
  const orbit = useRef();
  const holo = useRef();
  useFloat(holo, 0.06, 1.4);
  const particles = useMemo(() => {
    const arr = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i += 1) {
      const r = 0.5 + Math.random() * 0.9;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(ph) * Math.cos(th);
      arr[i * 3 + 1] = r * Math.cos(ph);
      arr[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    return arr;
  }, []);

  useFrame((_, dt) => {
    if (getState().reducedMotion) return;
    if (core.current) {
      core.current.rotation.y += dt * 0.5;
      core.current.rotation.x += dt * 0.2;
    }
    if (ringA.current) ringA.current.rotation.z += dt * 0.8;
    if (ringB.current) ringB.current.rotation.x += dt * 0.6;
    if (orbit.current) orbit.current.rotation.y -= dt * 0.35;
  });

  const color = hovered ? '#d8b4fe' : '#a855f7';
  return (
    <Hotspot id="skills">
      <group position={[-5.3, 0, 3.9]}>
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.6, 0.7, 0.4, 32]} />
          <Metal />
        </mesh>
        <mesh position={[0, 0.41, 0]} rotation-x={-Math.PI / 2}>
          <ringGeometry args={[0.35, 0.5, 40]} />
          <Em color={color} i={hovered ? 4 : 2.5} />
        </mesh>
        <mesh position={[0, 1.0, 0]} raycast={() => null}>
          <cylinderGeometry args={[0.08, 0.5, 1.2, 24, 1, true]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.1} blending={AdditiveBlending} side={DoubleSide} depthWrite={false} toneMapped={false} />
        </mesh>
        <group ref={holo} position={[0, 1.65, 0]}>
          <mesh ref={core}>
            <icosahedronGeometry args={[0.5, 1]} />
            <Em color={color} i={2} wireframe />
          </mesh>
          <mesh>
            <octahedronGeometry args={[0.22, 0]} />
            <Em color="#67e8f9" i={3} />
          </mesh>
          <mesh ref={ringA}>
            <torusGeometry args={[0.75, 0.012, 8, 64]} />
            <Em color="#22d3ee" i={3} />
          </mesh>
          <mesh ref={ringB}>
            <torusGeometry args={[0.65, 0.012, 8, 64]} />
            <Em color="#818cf8" i={3} />
          </mesh>
          <points raycast={() => null}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" array={particles} count={particles.length / 3} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial color="#c4b5fd" size={0.03} sizeAttenuation transparent opacity={0.8} depthWrite={false} toneMapped={false} />
          </points>
          <group ref={orbit}>
            {hologramSkills.map((name, i) => (
              <SkillTag key={name} name={name} index={i} total={hologramSkills.length} />
            ))}
          </group>
        </group>
        <pointLight position={[0, 1.7, 0]} color="#a855f7" intensity={hovered ? 16 : 9} distance={7} />
      </group>
    </Hotspot>
  );
}

function SkillTag({ name, index, total }) {
  const tex = useScreenTexture(256, 64, useMemo(() => makeTagDrawer(name), [name]));
  const a = (index / total) * Math.PI * 2;
  const r = 1.25;
  return (
    <sprite raycast={() => null} position={[Math.cos(a) * r, ((index % 3) - 1) * 0.38, Math.sin(a) * r]} scale={[0.85, 0.21, 1]}>
      <spriteMaterial map={tex} transparent depthWrite={false} toneMapped={false} />
    </sprite>
  );
}

function ContactStation() {
  const hovered = useHover('contact');
  const screen = useScreenTexture(640, 376, drawContact);
  const mail = useRef();
  useFloat(mail, 0.06, 1.6);
  useFrame((_, dt) => {
    if (mail.current && !getState().reducedMotion) mail.current.rotation.y += dt * 0.6;
  });
  return (
    <Hotspot id="contact">
      <group position={[7.4, 0, 2.4]}>
        <group rotation-y={-Math.PI / 2}>
          <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.1, 0.9, 0.7]} />
            <Metal />
          </mesh>
          <mesh position={[0, 1.0, 0.12]} rotation-x={-0.55}>
            <boxGeometry args={[1.0, 0.62, 0.05]} />
            <Metal color="#0a0e20" />
          </mesh>
          <mesh position={[0, 1.0, 0.147]} rotation-x={-0.55}>
            <planeGeometry args={[0.92, 0.54]} />
            <meshBasicMaterial map={screen} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0.9, 0.355]}>
            <boxGeometry args={[1.08, 0.02, 0.01]} />
            <Em color="#60a5fa" i={hovered ? 5 : 2.5} />
          </mesh>
        </group>
        <group ref={mail} position={[0, 1.85, 0]}>
          <mesh>
            <boxGeometry args={[0.6, 0.4, 0.04]} />
            <Em color="#60a5fa" i={2.5} wireframe />
          </mesh>
          <mesh position={[0, 0.07, 0.025]} rotation-z={Math.PI}>
            <coneGeometry args={[0.3, 0.2, 3]} />
            <Em color="#22d3ee" i={3} wireframe />
          </mesh>
        </group>
        <mesh position={[0, 0.02, 0]} rotation-x={-Math.PI / 2}>
          <ringGeometry args={[0.8, 0.86, 48]} />
          <Em color="#60a5fa" i={hovered ? 4 : 1.6} />
        </mesh>
        <pointLight position={[0, 1.8, 0]} color="#60a5fa" intensity={hovered ? 14 : 7} distance={6} />
      </group>
    </Hotspot>
  );
}

function Sofa() {
  return (
    <group position={[8.4, 0, -1.6]} rotation-y={-Math.PI / 2}>
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.4, 0.95]} />
        <meshStandardMaterial color="#1b2147" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.65, -0.38]} castShadow>
        <boxGeometry args={[2.4, 0.5, 0.2]} />
        <meshStandardMaterial color="#222a58" roughness={0.8} />
      </mesh>
      {[-1.15, 1.15].map((x) => (
        <mesh key={x} position={[x, 0.45, 0]} castShadow>
          <boxGeometry args={[0.15, 0.55, 0.95]} />
          <meshStandardMaterial color="#222a58" roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[-0.6, 0.55, 0.05]} rotation-z={0.15}>
        <boxGeometry args={[0.4, 0.4, 0.12]} />
        <meshStandardMaterial color="#6d28d9" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Plant({ position }) {
  const leaves = [0, 1, 2, 3, 4, 5];
  return (
    <group position={position}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.17, 0.4, 16]} />
        <meshStandardMaterial color="#1e2448" roughness={0.6} />
      </mesh>
      {leaves.map((i) => (
        <mesh key={i} position={[Math.cos(i * 1.05) * 0.14, 0.65 + (i % 3) * 0.14, Math.sin(i * 1.05) * 0.14]} rotation={[Math.sin(i) * 0.4, i, Math.cos(i) * 0.4]} scale={[0.12, 0.5, 0.05]}>
          <sphereGeometry args={[1, 10, 8]} />
          <meshStandardMaterial color={i % 2 ? '#0f766e' : '#155e75'} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function FloorLamp({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.04, 20]} />
        <Metal />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 1.7, 8]} />
        <Metal />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.12, 0.2, 0.3, 20, 1, true]} />
        <Em color="#a78bfa" i={2.2} side={DoubleSide} />
      </mesh>
      <pointLight position={[0, 1.7, 0.1]} color="#a78bfa" intensity={6} distance={6} />
    </group>
  );
}

function Rug() {
  return (
    <group position={[0, 0.012, 1.4]} rotation-x={-Math.PI / 2}>
      <mesh>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#111633" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0, 0.002]}>
        <ringGeometry args={[1.6, 1.64, 64]} />
        <Em color="#38bdf8" i={1.2} />
      </mesh>
      <mesh position={[0, 0, 0.002]}>
        <ringGeometry args={[1.9, 1.92, 64]} />
        <Em color="#6366f1" i={1} />
      </mesh>
    </group>
  );
}

export default function Stations() {
  const welcome = useScreenTexture(1024, 576, drawWelcome);
  const about = useScreenTexture(1280, 750, drawAbout);
  const timeline = useScreenTexture(1024, 660, drawTimeline);
  const hoverHome = useHover('home');
  return (
    <group>
      <Rug />
      <Hotspot id="home">
        <HoloPanel texture={welcome} size={[2.2, 1.24]} position={[1.9, 3.05, 1.2]} color={hoverHome ? '#bae6fd' : '#38bdf8'} />
      </Hotspot>
      <WallDisplay id="about" position={[-8.93, 2.3, -3.0]} rotationY={Math.PI / 2} size={[3.6, 2.1]} texture={about} color="#818cf8" />
      <WallDisplay id="experience" position={[6.2, 2.3, -6.43]} rotationY={0} size={[3.3, 2.1]} texture={timeline} color="#6366f1" />
      <Desk />
      <SkillsHologram />
      <ContactStation />
      <Bookshelf position={[-6.9, 0, -6.27]} width={1.9} seed={3} />
      <Bookshelf position={[-4.8, 0, -6.27]} width={1.9} seed={9} />
      <Bookshelf position={[-8.77, 0, 1.0]} rotationY={Math.PI / 2} width={2.2} seed={5} />
      <Bookshelf position={[-8.77, 0, 3.9]} rotationY={Math.PI / 2} width={2.2} seed={7} />
      <Sofa />
      <Plant position={[-8.0, 0, 5.1]} />
      <Plant position={[8.0, 0, 5.1]} />
      <Plant position={[8.0, 0, -5.1]} />
      <FloorLamp position={[-8.4, 0, -5.6]} />
      {SECTIONS.map((s) => (
        <React.Fragment key={s.id}>
          <StationPad section={s} />
          <StationLabel section={s} />
        </React.Fragment>
      ))}
    </group>
  );
}

