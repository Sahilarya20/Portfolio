// World units are metres. Forward direction of an avatar at yaw is (sin(yaw), cos(yaw)) in (x, z).

const yawTo = (from, to) => Math.atan2(to[0] - from[0], to[1] - from[1]);

const make = (s) => ({ ...s, yaw: s.yaw ?? yawTo(s.stand, s.focus) });

export const SECTIONS = [
  make({
    id: 'home',
    label: 'Home',
    color: '#38bdf8',
    stand: [-1.6, 3.2],
    focus: [-1.6, 5],
    yaw: 0,
    label3d: [-1.6, 2.5, 3.2],
    cam: { pos: [-1.6, 4.4, 11.6], look: [-1.0, 1.3, 1.4] },
  }),
  make({
    id: 'about',
    label: 'About',
    color: '#818cf8',
    stand: [-6.9, -1.2],
    focus: [-8.9, -3.0],
    label3d: [-8.6, 3.9, -3.0],
    cam: { pos: [1.4, 2.8, 2.0], look: [-7.2, 1.5, -2.3] },
  }),
  make({
    id: 'skills',
    label: 'Skills',
    color: '#a855f7',
    stand: [-3.6, 3.4],
    focus: [-5.3, 3.9],
    label3d: [-5.3, 3.6, 3.9],
    cam: { pos: [1.2, 2.9, 8.8], look: [-4.4, 1.5, 3.6] },
  }),
  make({
    id: 'projects',
    label: 'Projects',
    color: '#22d3ee',
    stand: [-1.2, -3.6],
    focus: [0.2, -5.4],
    label3d: [0, 3.7, -5.7],
    cam: { pos: [0.8, 3.5, 3.6], look: [0, 1.9, -4.8] },
  }),
  make({
    id: 'experience',
    label: 'Experience',
    color: '#6366f1',
    stand: [5.1, -3.9],
    focus: [6.2, -6.4],
    label3d: [6.2, 4.1, -6.3],
    cam: { pos: [4.5, 3.3, 2.5], look: [6.1, 1.8, -5.3] },
  }),
  make({
    id: 'contact',
    label: 'Contact',
    color: '#60a5fa',
    stand: [5.8, 1.6],
    focus: [7.4, 2.4],
    label3d: [7.4, 3.2, 2.4],
    cam: { pos: [1.6, 2.9, 5.6], look: [6.6, 1.3, 2.0] },
  }),
];
export const SECTION_BY_ID = Object.fromEntries(SECTIONS.map((s) => [s.id, s]));

export const SPAWN = SECTION_BY_ID.home;
