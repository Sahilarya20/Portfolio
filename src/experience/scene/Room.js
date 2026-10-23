import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, MeshReflectorMaterial, useCursor } from '@react-three/drei';
import { RepeatWrapping } from 'three';
import { ROOM } from '../collision';
import { actions, useStore } from '../store';
import { drawFloorGrid, useScreenTexture } from './textures';

const WALL = '#0c1124';

function Em({ color, i = 2, ...rest }) {
  return <meshStandardMaterial color="#000" emissive={color} emissiveIntensity={i} toneMapped={false} {...rest} />;
}

function Floor({ reflective }) {
  const tex = useScreenTexture(1024, 1024, drawFloorGrid);
  useMemo(() => {
    tex.wrapS = RepeatWrapping;
    tex.wrapT = RepeatWrapping;
    tex.repeat.set(18 / 7, 13 / 7);
  }, [tex]);
  const [hover, setHover] = useState(false);
  const marker = useRef();
  const age = useRef(99);
  useCursor(hover, 'crosshair');

  useFrame((_, dt) => {
    const m = marker.current;
    if (!m) return;
    age.current += dt;
    m.visible = age.current < 0.9;
    if (m.visible) {
      m.scale.setScalar(1 + age.current * 1.4);
      m.material.opacity = 1 - age.current / 0.9;
    }
  });

  return (
    <group>
      <mesh
        rotation-x={-Math.PI / 2}
        position={[0, 0, 0]}
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          if (e.delta > 5) return;
          const x = Math.min(ROOM.maxX, Math.max(ROOM.minX, e.point.x));
          const z = Math.min(ROOM.maxZ, Math.max(ROOM.minZ, e.point.z));
          actions.moveTo(x, z);
          marker.current.position.set(e.point.x, 0.03, e.point.z);
          age.current = 0;
        }}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <planeGeometry args={[18, 13]} />
        {reflective ? (
          <MeshReflectorMaterial
            map={tex}
            blur={[300, 100]}
            resolution={512}
            mixBlur={1}
            mixStrength={0.55}
            roughness={0.85}
            depthScale={0.8}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#9aa6d8"
            metalness={0.5}
            mirror={0}
          />
        ) : (
          <meshStandardMaterial map={tex} roughness={0.4} metalness={0.5} />
        )}
      </mesh>
      <mesh ref={marker} rotation-x={-Math.PI / 2} visible={false}>
        <ringGeometry args={[0.14, 0.2, 32]} />
        <meshBasicMaterial color="#67e8f9" transparent toneMapped={false} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Walls() {
  const H = 4.6;
  return (
    <group>
      <mesh position={[0, H / 2, -6.6]} receiveShadow>
        <boxGeometry args={[18.4, H, 0.2]} />
        <meshStandardMaterial color={WALL} roughness={0.85} metalness={0.1} />
      </mesh>
      <mesh position={[-9.1, H / 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, H, 13.4]} />
        <meshStandardMaterial color={WALL} roughness={0.85} metalness={0.1} />
      </mesh>
      <mesh position={[9.1, H / 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, H, 13.4]} />
        <meshStandardMaterial color={WALL} roughness={0.85} metalness={0.1} />
      </mesh>
      {/* baseboards and top cove lights */}
      {[
        { p: [0, 0.06, -6.47], s: [18, 0.1, 0.06], c: '#2563eb' },
        { p: [-8.97, 0.06, 0], s: [0.06, 0.1, 13], c: '#7c3aed' },
        { p: [8.97, 0.06, 0], s: [0.06, 0.1, 13], c: '#7c3aed' },
        { p: [0, H - 0.08, -6.47], s: [18, 0.06, 0.06], c: '#22d3ee' },
        { p: [-8.97, H - 0.08, 0], s: [0.06, 0.06, 13], c: '#6366f1' },
        { p: [8.97, H - 0.08, 0], s: [0.06, 0.06, 13], c: '#6366f1' },
      ].map((t, i) => (
        <mesh key={i} position={t.p}>
          <boxGeometry args={t.s} />
          <Em color={t.c} i={2.2} />
        </mesh>
      ))}
      {/* right wall light frame */}
      <mesh position={[8.96, 2.5, 4.4]} rotation-y={-Math.PI / 2}>
        <planeGeometry args={[0.06, 1.6]} />
        <Em color="#a855f7" i={2} />
      </mesh>
      <mesh position={[8.96, 2.5, -4.4]} rotation-y={-Math.PI / 2}>
        <planeGeometry args={[0.06, 1.6]} />
        <Em color="#22d3ee" i={2} />
      </mesh>
    </group>
  );
}

function Lights({ shadows }) {
  return (
    <>
      <ambientLight intensity={0.55} color="#6b7cff" />
      <hemisphereLight args={['#7f8cff', '#1a0f3a', 0.6]} />
      <directionalLight
        position={[3, 8, 6]}
        intensity={1.1}
        color="#b4c2ff"
        castShadow={shadows}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-bias={-0.0005}
      />
      <pointLight position={[-6, 3.8, -1]} color="#7c3aed" intensity={30} distance={13} />
      <pointLight position={[6, 3.6, -3]} color="#2563eb" intensity={30} distance={13} />
      <pointLight position={[0, 3.4, 4]} color="#22d3ee" intensity={20} distance={12} />
      <pointLight position={[-1.4, 1.7, -5.4]} color="#7dd3fc" intensity={5} distance={4} />
    </>
  );
}

export default function Room({ shadows, reflective }) {
  const quality = useStore((s) => s.quality);
  return (
    <>
      <Lights shadows={shadows && quality === 'high'} />
      <Environment resolution={128} frames={1} environmentIntensity={0.7}>
        <Lightformer form="rect" intensity={2.5} color="#4f7cff" position={[0, 4, -6]} scale={[16, 2, 1]} />
        <Lightformer form="rect" intensity={2} color="#a855f7" position={[-8, 3, 0]} rotation-y={Math.PI / 2} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={2} color="#22d3ee" position={[8, 3, 0]} rotation-y={-Math.PI / 2} scale={[10, 2, 1]} />
        <Lightformer form="ring" intensity={1.5} color="#ffffff" position={[0, 6, 2]} scale={4} />
      </Environment>
      <Floor reflective={reflective && quality === 'high'} />
      <Walls />
    </>
  );
}
