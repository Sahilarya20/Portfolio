import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, useProgress } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import Room from './Room';
import Stations from './Stations';
import Avatar from './Avatar';
import CameraRig from './CameraRig';
import { SPAWN } from '../sections';
import { actions, useStore } from '../store';

function Effects() {
  const quality = useStore((s) => s.quality);
  if (quality !== 'high') return null;
  return (
    <EffectComposer multisampling={0} disableNormalPass>
      <Bloom intensity={0.75} luminanceThreshold={1} luminanceSmoothing={0.25} mipmapBlur radius={0.7} />
      <Vignette offset={0.3} darkness={0.55} />
    </EffectComposer>
  );
}

export default function Scene({ active, onFail }) {
  const quality = useStore((s) => s.quality);
  const high = quality === 'high';
  const { progress } = useProgress();
  useEffect(() => {
    actions.setProgress(progress);
  }, [progress]);
  return (
    <Canvas
      className="xp-canvas"
      frameloop={active ? 'always' : 'never'}
      dpr={[1, high ? 1.75 : 1.25]}
      shadows={high}
      camera={{ position: SPAWN.cam.pos, fov: 45, near: 0.1, far: 60 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          onFail('WebGL context lost');
        });
      }}
    >
      <color attach="background" args={['#05060f']} />
      <fog attach="fog" args={['#05060f', 16, 34]} />
      <PerformanceMonitor onDecline={() => actions.setQuality('low')} flipflops={2} />
      <Suspense fallback={null}>
        <Room shadows reflective />
        <Stations />
        <Avatar />
        <Effects />
      </Suspense>
      <CameraRig />
    </Canvas>
  );
}
