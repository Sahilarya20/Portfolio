import { SECTIONS } from './sections';
import { findPath, isWalkable, resolveCollisions, stationsAreWalkable, ROOM, AVATAR_RADIUS } from './collision';

describe('collision', () => {
  it('keeps every station reachable', () => {
    expect(stationsAreWalkable()).toBe(true);
  });

  it('clamps positions to the room', () => {
    const [x, z] = resolveCollisions(99, -99);
    expect(x).toBeCloseTo(ROOM.maxX);
    expect(z).toBeCloseTo(ROOM.minZ);
  });

  it('pushes the avatar out of the desk', () => {
    const [x, z] = resolveCollisions(0, -4.7);
    expect(isWalkable(x, z, AVATAR_RADIUS - 0.01)).toBe(true);
    expect(z).toBeGreaterThanOrEqual(-4.9 + AVATAR_RADIUS - 0.001);
  });
});

describe('findPath', () => {
  it.each(SECTIONS.map((s) => [s.id, s.stand]))('walks from spawn to %s without crossing furniture', (_id, stand) => {
    const path = findPath([-1.6, 3.2], stand);
    expect(path.length).toBeGreaterThan(0);
    const last = path[path.length - 1];
    expect(Math.hypot(last[0] - stand[0], last[1] - stand[1])).toBeLessThan(0.25);
    let prev = [-1.6, 3.2];
    path.forEach((p) => {
      for (let t = 0; t <= 1; t += 0.05) {
        const x = prev[0] + (p[0] - prev[0]) * t;
        const z = prev[1] + (p[1] - prev[1]) * t;
        expect(isWalkable(x, z, AVATAR_RADIUS - 0.03)).toBe(true);
      }
      prev = p;
    });
  });

  it('routes around the skills pedestal', () => {
    const path = findPath([-7.5, 3.9], [-3.0, 3.9]);
    expect(path.length).toBeGreaterThan(1);
  });
});
