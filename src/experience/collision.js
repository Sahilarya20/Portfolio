import { SECTIONS } from './sections';

export const ROOM = { minX: -8.2, maxX: 8.2, minZ: -5.9, maxZ: 5.9 };
export const AVATAR_RADIUS = 0.35;

// Footprints of furniture, shared with the scene so visuals and collisions agree.
export const OBSTACLES = [
  { type: 'rect', minX: -1.9, maxX: 1.9, minZ: -7, maxZ: -4.9 }, // desk
  { type: 'circle', x: 2.0, z: -4.2, r: 0.45 }, // desk chair
  { type: 'circle', x: -5.3, z: 3.9, r: 0.8 }, // skills hologram pedestal
  { type: 'circle', x: 7.4, z: 2.4, r: 0.7 }, // contact terminal
  { type: 'rect', minX: 7.6, maxX: 9.2, minZ: -2.9, maxZ: -0.3 }, // sofa
  { type: 'circle', x: -8.0, z: 5.1, r: 0.4 }, // plants
  { type: 'circle', x: 8.0, z: 5.1, r: 0.4 },
  { type: 'circle', x: 8.0, z: -5.1, r: 0.4 },
];

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export const clampToRoom = (x, z, r = AVATAR_RADIUS) => [
  clamp(x, ROOM.minX + (r - AVATAR_RADIUS), ROOM.maxX - (r - AVATAR_RADIUS)),
  clamp(z, ROOM.minZ + (r - AVATAR_RADIUS), ROOM.maxZ - (r - AVATAR_RADIUS)),
];

// Pushes a circle of radius r out of an obstacle. Returns the penetration vector or null.
function pushOut(o, x, z, r) {
  if (o.type === 'circle') {
    const dx = x - o.x;
    const dz = z - o.z;
    const d = Math.hypot(dx, dz);
    const min = o.r + r;
    if (d >= min) return null;
    if (d < 1e-6) return [min, 0];
    return [(dx / d) * (min - d), (dz / d) * (min - d)];
  }
  const cx = clamp(x, o.minX, o.maxX);
  const cz = clamp(z, o.minZ, o.maxZ);
  const dx = x - cx;
  const dz = z - cz;
  const d = Math.hypot(dx, dz);
  if (d >= r) return null;
  if (d > 1e-6) return [(dx / d) * (r - d), (dz / d) * (r - d)];
  // Centre is inside the rectangle: exit through the nearest face.
  const left = x - o.minX;
  const right = o.maxX - x;
  const back = z - o.minZ;
  const front = o.maxZ - z;
  const m = Math.min(left, right, back, front);
  if (m === left) return [-(left + r), 0];
  if (m === right) return [right + r, 0];
  if (m === back) return [0, -(back + r)];
  return [0, front + r];
}

export function resolveCollisions(x, z, r = AVATAR_RADIUS) {
  let px = x;
  let pz = z;
  for (let i = 0; i < 3; i += 1) {
    [px, pz] = clampToRoom(px, pz, r);
    for (const o of OBSTACLES) {
      const push = pushOut(o, px, pz, r);
      if (push) {
        px += push[0];
        pz += push[1];
      }
    }
  }
  return clampToRoom(px, pz, r);
}

export const isWalkable = (x, z, r = AVATAR_RADIUS) =>
  x >= ROOM.minX + (r - AVATAR_RADIUS) &&
  x <= ROOM.maxX - (r - AVATAR_RADIUS) &&
  z >= ROOM.minZ + (r - AVATAR_RADIUS) &&
  z <= ROOM.maxZ - (r - AVATAR_RADIUS) &&
  !OBSTACLES.some((o) => pushOut(o, x, z, r));

// Pathfinding: A* on a coarse grid, then line-of-sight smoothing.
const CELL = 0.2;
const PLAN_R = AVATAR_RADIUS + 0.04;
const COLS = Math.floor((ROOM.maxX - ROOM.minX) / CELL) + 1;
const ROWS = Math.floor((ROOM.maxZ - ROOM.minZ) / CELL) + 1;

let grid = null;
const getGrid = () => {
  if (!grid) {
    grid = new Uint8Array(COLS * ROWS);
    for (let j = 0; j < ROWS; j += 1) {
      for (let i = 0; i < COLS; i += 1) {
        grid[j * COLS + i] = isWalkable(ROOM.minX + i * CELL, ROOM.minZ + j * CELL, PLAN_R) ? 0 : 1;
      }
    }
  }
  return grid;
};

const toCell = (x, z) => [
  clamp(Math.round((x - ROOM.minX) / CELL), 0, COLS - 1),
  clamp(Math.round((z - ROOM.minZ) / CELL), 0, ROWS - 1),
];
const toWorld = (i, j) => [ROOM.minX + i * CELL, ROOM.minZ + j * CELL];

function nearestFree(g, i, j) {
  if (!g[j * COLS + i]) return [i, j];
  for (let rad = 1; rad < 20; rad += 1) {
    let best = null;
    let bestD = Infinity;
    for (let dj = -rad; dj <= rad; dj += 1) {
      for (let di = -rad; di <= rad; di += 1) {
        const ci = i + di;
        const cj = j + dj;
        if (ci < 0 || cj < 0 || ci >= COLS || cj >= ROWS || g[cj * COLS + ci]) continue;
        const d = di * di + dj * dj;
        if (d < bestD) {
          bestD = d;
          best = [ci, cj];
        }
      }
    }
    if (best) return best;
  }
  return [i, j];
}

function lineClear(ax, az, bx, bz) {
  const len = Math.hypot(bx - ax, bz - az);
  const steps = Math.max(1, Math.ceil(len / 0.1));
  for (let s = 1; s < steps; s += 1) {
    const t = s / steps;
    if (!isWalkable(ax + (bx - ax) * t, az + (bz - az) * t, PLAN_R - 0.02)) return false;
  }
  return true;
}

const NEIGHBOURS = [
  [1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1],
  [1, 1, Math.SQRT2], [1, -1, Math.SQRT2], [-1, 1, Math.SQRT2], [-1, -1, Math.SQRT2],
];

// Returns world-space waypoints [x, z] from `from` to the closest reachable point to `to`.
export function findPath(from, to) {
  const g = getGrid();
  const [si, sj] = nearestFree(g, ...toCell(from[0], from[1]));
  const [gi, gj] = nearestFree(g, ...toCell(to[0], to[1]));
  const goalWorld = toWorld(gi, gj);
  const startKey = sj * COLS + si;
  const goalKey = gj * COLS + gi;

  const cost = new Float32Array(COLS * ROWS).fill(Infinity);
  const parent = new Int32Array(COLS * ROWS).fill(-1);
  const closed = new Uint8Array(COLS * ROWS);
  const open = [[0, startKey]];
  cost[startKey] = 0;

  const h = (i, j) => {
    const dx = Math.abs(i - gi);
    const dz = Math.abs(j - gj);
    return dx + dz + (Math.SQRT2 - 2) * Math.min(dx, dz);
  };

  while (open.length) {
    let bi = 0;
    for (let k = 1; k < open.length; k += 1) if (open[k][0] < open[bi][0]) bi = k;
    const [, key] = open.splice(bi, 1)[0];
    if (closed[key]) continue;
    closed[key] = 1;
    if (key === goalKey) break;
    const ci = key % COLS;
    const cj = Math.floor(key / COLS);
    for (const [di, dj, c] of NEIGHBOURS) {
      const ni = ci + di;
      const nj = cj + dj;
      if (ni < 0 || nj < 0 || ni >= COLS || nj >= ROWS) continue;
      const nk = nj * COLS + ni;
      if (g[nk] || closed[nk]) continue;
      if (di !== 0 && dj !== 0 && (g[cj * COLS + ni] || g[nj * COLS + ci])) continue;
      const nc = cost[key] + c;
      if (nc < cost[nk]) {
        cost[nk] = nc;
        parent[nk] = key;
        open.push([nc + h(ni, nj), nk]);
      }
    }
  }

  if (!closed[goalKey]) return [goalWorld];

  const cells = [];
  for (let k = goalKey; k !== -1; k = parent[k]) cells.push(toWorld(k % COLS, Math.floor(k / COLS)));
  cells.reverse();
  cells[0] = [from[0], from[1]];

  const out = [];
  let anchor = 0;
  while (anchor < cells.length - 1) {
    let far = anchor + 1;
    for (let k = cells.length - 1; k > anchor + 1; k -= 1) {
      if (lineClear(cells[anchor][0], cells[anchor][1], cells[k][0], cells[k][1])) {
        far = k;
        break;
      }
    }
    out.push(cells[far]);
    anchor = far;
  }
  return out.length ? out : [goalWorld];
}

// Stations must stay reachable when furniture is moved.
export const stationsAreWalkable = () => SECTIONS.every((s) => isWalkable(s.stand[0], s.stand[1], PLAN_R));
