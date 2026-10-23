import { useSyncExternalStore } from 'react';

// Tiny external store so DOM overlays and the R3F reconciler share state without context bridging.
const listeners = new Set();

let state = {
  active: 'home', // section the avatar is standing at (null while walking)
  panelOpen: true,
  destination: null, // section requested through navigate()
  navToken: 0,
  moveTarget: null, // [x, z] requested through click-to-move
  moveToken: 0,
  waveToken: 0,
  viewToken: 0,
  hovered: null,
  moving: false,
  sceneReady: false,
  progress: 0,
  reducedMotion: false,
  quality: 'high',
};

export const getState = () => state;

const set = (patch) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const useStore = (selector) => useSyncExternalStore(subscribe, () => selector(state));

export const actions = {
  navigate: (id) => set({ destination: id, navToken: state.navToken + 1, active: null, panelOpen: false }),
  // Re-opens the panel when already standing at the station, otherwise walks there.
  go: (id) => (state.active === id ? set({ panelOpen: true }) : actions.navigate(id)),
  moveTo: (x, z) => set({ moveTarget: [x, z], moveToken: state.moveToken + 1, destination: null, active: null, panelOpen: false }),
  arrive: (id) => set({ active: id, destination: null, panelOpen: true }),
  depart: () => set({ active: null, destination: null, panelOpen: false }),
  closePanel: () => set({ panelOpen: false }),
  openPanel: () => set({ panelOpen: state.active !== null }),
  wave: () => set({ waveToken: state.waveToken + 1 }),
  resetView: () => set({ viewToken: state.viewToken + 1 }),
  setHovered: (id) => state.hovered !== id && set({ hovered: id }),
  setMoving: (v) => state.moving !== v && set({ moving: v }),
  setSceneReady: (v) => state.sceneReady !== v && set({ sceneReady: v }),
  setProgress: (p) => state.progress !== p && set({ progress: p }),
  setReducedMotion: (v) => state.reducedMotion !== v && set({ reducedMotion: v }),
  setQuality: (q) => state.quality !== q && set({ quality: q }),
};

// Mutable per-frame data; read from useFrame, never rendered through React.
export const avatarShared = { x: -1.6, z: 3.2, yaw: 0, speed: 0, camYaw: 0 };

// Cursor position in -1..1 across the window; the avatar's head follows it.
export const pointer = { x: 0, y: 0 };

// Merged input from keyboard and the on-screen pad.
export const input = {
  keys: { up: false, down: false, left: false, right: false },
  pad: { up: false, down: false, left: false, right: false },
};

export const readInput = () => {
  const k = input.keys;
  const p = input.pad;
  const x = (k.right || p.right ? 1 : 0) - (k.left || p.left ? 1 : 0);
  const z = (k.down || p.down ? 1 : 0) - (k.up || p.up ? 1 : 0);
  return [x, z];
};

