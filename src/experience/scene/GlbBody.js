import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { Box3, LoopOnce, LoopRepeat, MathUtils, Vector3 } from 'three';
import { AVATAR } from './config';
import { actions } from '../store';

const findClip = (names, candidates) => {
  for (const c of candidates) {
    const hit = names.find((n) => n.toLowerCase().includes(c));
    if (hit) return hit;
  }
  return null;
};

/** Plays clips from any rigged GLB; used when AVATAR.mode === 'glb'. */
export default function GlbBody({ pose }) {
  const root = useRef();
  const fit = useRef();
  const { scene, animations } = useGLTF(AVATAR.url);
  const { actions: clipActions, mixer, names } = useAnimations(animations, root);
  const clips = useMemo(
    () => Object.fromEntries(Object.entries(AVATAR.clips).map(([k, v]) => [k, findClip(names, v)])),
    [names]
  );
  const st = useRef({ action: null, oneShot: false, token: pose.token });

  // Normalise any model to a known height and put its feet on the floor.
  useLayoutEffect(() => {
    scene.updateMatrixWorld(true);
    const box = new Box3().setFromObject(scene, true);
    const size = box.getSize(new Vector3());
    const k = size.y > 0 ? AVATAR.height / size.y : 1;
    fit.current.scale.setScalar(k);
    fit.current.position.set(0, -box.min.y * k, 0);
    scene.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.frustumCulled = false;
      }
    });
  }, [scene]);

  useEffect(() => {
    actions.setSceneReady(true);
  }, []);

  useEffect(() => {
    const onFinished = () => {
      st.current.oneShot = false;
    };
    mixer.addEventListener('finished', onFinished);
    return () => mixer.removeEventListener('finished', onFinished);
  }, [mixer]);

  const play = (key, { once = false, timeScale = 1, fade = 0.25 } = {}) => {
    const name = clips[key];
    const next = name && clipActions[name];
    if (!next) return false;
    const s = st.current;
    if (s.action === next && !once) {
      next.timeScale = timeScale;
      return true;
    }
    next.reset();
    next.enabled = true;
    next.setEffectiveTimeScale(timeScale);
    next.setEffectiveWeight(1);
    next.setLoop(once ? LoopOnce : LoopRepeat, once ? 1 : Infinity);
    next.clampWhenFinished = once;
    next.play();
    if (s.action && s.action !== next) s.action.crossFadeTo(next, fade, true);
    s.action = next;
    return true;
  };

  useFrame(() => {
    const s = st.current;
    if (pose.token !== s.token) {
      s.token = pose.token;
      if (pose.action && play(pose.action, { once: true, fade: 0.2 })) s.oneShot = true;
    }
    if (!pose.action) s.oneShot = false;
    if (s.oneShot) return;
    if (pose.speed > 0.2) play('walk', { timeScale: MathUtils.clamp(pose.speed / 1.9, 0.5, 1.5) });
    else if (pose.turning) play(clips.turn ? 'turn' : 'walk', { timeScale: 0.6 });
    else play('idle', { fade: 0.3 });
  });

  return (
    <group ref={root}>
      <group ref={fit}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload(AVATAR.url);
