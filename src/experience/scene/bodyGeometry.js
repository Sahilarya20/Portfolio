import { BufferAttribute, BufferGeometry, CatmullRomCurve3, MathUtils, SphereGeometry, Vector3 } from 'three';

const { smoothstep } = MathUtils;

/**
 * Smooth lofted solid. Each ring is [y, rx, rz, cx, cz, n]: elliptical (superelliptical for n > 2)
 * cross-section centred at (cx, cz). Rings must be listed from top to bottom.
 */
export function loft(rings, { radial = 32, sub = 5 } = {}) {
  const sizes = new CatmullRomCurve3(
    rings.map(([y, rx, rz]) => new Vector3(rx, y, rz)),
    false,
    'catmullrom',
    0.5
  );
  const extras = new CatmullRomCurve3(
    rings.map(([, , , cx = 0, cz = 0, n = 2]) => new Vector3(cx, cz, n)),
    false,
    'catmullrom',
    0.5
  );
  const count = (rings.length - 1) * sub + 1;
  const pos = new Float32Array(count * radial * 3);
  for (let k = 0; k < count; k += 1) {
    const t = k / (count - 1);
    const s = sizes.getPoint(t);
    const e = extras.getPoint(t);
    const power = 2 / Math.max(1.6, e.z);
    for (let i = 0; i < radial; i += 1) {
      const a = (i / radial) * Math.PI * 2;
      const c = Math.cos(a);
      const sn = Math.sin(a);
      const o = (k * radial + i) * 3;
      pos[o] = e.x + s.x * Math.sign(c) * Math.abs(c) ** power;
      pos[o + 1] = s.y;
      pos[o + 2] = e.y + s.z * Math.sign(sn) * Math.abs(sn) ** power;
    }
  }
  const idx = [];
  for (let k = 0; k < count - 1; k += 1) {
    for (let i = 0; i < radial; i += 1) {
      const a = k * radial + i;
      const b = k * radial + ((i + 1) % radial);
      const c = (k + 1) * radial + i;
      const d = (k + 1) * radial + ((i + 1) % radial);
      idx.push(a, b, c, b, d, c);
    }
  }
  // Close both ends so no interior shows through.
  const total = count * radial;
  const closed = new Float32Array(pos.length + 6);
  closed.set(pos);
  const first = sizes.getPoint(0);
  const last = sizes.getPoint(1);
  const e0 = extras.getPoint(0);
  const e1 = extras.getPoint(1);
  closed.set([e0.x, first.y, e0.y, e1.x, last.y, e1.y], pos.length);
  for (let i = 0; i < radial; i += 1) {
    const nxt = (i + 1) % radial;
    idx.push(total, nxt, i);
    idx.push(total + 1, (count - 1) * radial + i, (count - 1) * radial + nxt);
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(closed, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

// Head: a sphere pulled into a skull with cheekbones, a tapering jaw, a chin and a nose.
// With `uv`, texture coordinates are a front planar projection matching the face photo.
export function makeHead({
  thetaStart = 0,
  thetaLength = Math.PI,
  phiStart = 0,
  phiLength = Math.PI * 2,
  grow = 1,
  uv = false,
} = {}) {
  const g = new SphereGeometry(1, 56, 36, phiStart, phiLength, thetaStart, thetaLength);
  const p = g.attributes.position;
  const uvs = new Float32Array(p.count * 2);
  for (let i = 0; i < p.count; i += 1) {
    let x = p.getX(i);
    const y = p.getY(i);
    let z = p.getZ(i);
    const jaw = smoothstep(-y, 0.1, 1);
    x *= 1 - 0.3 * jaw;
    z *= 1 - 0.08 * jaw;
    z += smoothstep(-y, 0.35, 0.9) * Math.max(0, z) * 0.16;
    x *= 1 + 0.05 * Math.exp(-(y * y) / 0.12) + 0.07 * Math.exp(-((y + 0.5) * (y + 0.5)) / 0.05);
    z += Math.max(0, z) * 0.17 * Math.exp(-((x * x) / 0.018 + ((y + 0.15) * (y + 0.15)) / 0.03));
    const fx = x * 0.095 * grow;
    const fy = y * 0.115 * grow;
    p.setXYZ(i, fx, fy, z * 0.108 * grow);
    uvs[i * 2] = 0.5 + fx / grow / 0.238;
    uvs[i * 2 + 1] = 0.493 + (fy / grow - 0.018) / 0.336;
  }
  if (uv) g.setAttribute('uv', new BufferAttribute(uvs, 2));
  g.computeVertexNormals();
  return g;
}
// Ring tables (top to bottom, metres). Limbs hang down from their joint.
export const RINGS = {
  upperArm: [
    [0.07, 0.012, 0.012], [0.06, 0.045, 0.045], [0.035, 0.066, 0.064], [-0.02, 0.068, 0.066],
    [-0.09, 0.06, 0.066, 0, 0.003], [-0.16, 0.052, 0.056], [-0.23, 0.044, 0.046], [-0.3, 0.04, 0.04],
  ],
  forearm: [
    [0.02, 0.04, 0.04], [-0.04, 0.048, 0.05], [-0.1, 0.05, 0.052], [-0.18, 0.04, 0.039],
    [-0.25, 0.03, 0.027], [-0.275, 0.027, 0.024],
  ],
  hand: [[0.01, 0.024, 0.017], [-0.025, 0.04, 0.022], [-0.065, 0.042, 0.02], [-0.1, 0.032, 0.017], [-0.12, 0.01, 0.01]],
  thigh: [
    [0.06, 0.095, 0.105], [0, 0.12, 0.128], [-0.1, 0.126, 0.132], [-0.22, 0.122, 0.128],
    [-0.33, 0.11, 0.114], [-0.44, 0.1, 0.105],
  ],
  shin: [
    [0.02, 0.1, 0.105], [-0.06, 0.1, 0.106], [-0.15, 0.102, 0.11],
    [-0.26, 0.098, 0.102], [-0.36, 0.092, 0.095], [-0.415, 0.088, 0.09],
  ],
  cuff: [[-0.36, 0.089, 0.092], [-0.375, 0.094, 0.097], [-0.405, 0.094, 0.097], [-0.418, 0.088, 0.09]],
  pelvis: [[0.1, 0.16, 0.115], [0.04, 0.19, 0.13], [-0.06, 0.195, 0.135], [-0.14, 0.16, 0.12], [-0.2, 0.06, 0.06]],
  waistband: [[0.125, 0.152, 0.112], [0.1, 0.158, 0.116], [0.075, 0.166, 0.122], [0.06, 0.158, 0.116]],
  abdomen: [[0.2, 0.16, 0.108, 0, 0, 2.3], [0.1, 0.148, 0.104], [0, 0.142, 0.1], [-0.1, 0.158, 0.108]],
  abdomenVest: [[0.2, 0.167, 0.115, 0, 0, 2.3], [0.1, 0.155, 0.111], [0, 0.149, 0.107], [-0.06, 0.16, 0.113]],
  chest: [
    [0.345, 0.012, 0.012], [0.33, 0.05, 0.045], [0.305, 0.1, 0.075], [0.285, 0.17, 0.095, 0, 0, 2.2],
    [0.25, 0.2, 0.115, 0, 0, 2.3], [0.19, 0.215, 0.128, 0, 0.004, 2.5], [0.1, 0.2, 0.122, 0, 0, 2.4],
    [0.02, 0.16, 0.108, 0, 0, 2.3], [-0.03, 0.148, 0.104],
  ],
  chestVest: [
    [0.268, 0.19, 0.113, 0, 0, 2.2], [0.25, 0.207, 0.122, 0, 0, 2.3], [0.19, 0.222, 0.135, 0, 0.004, 2.5],
    [0.1, 0.207, 0.129, 0, 0, 2.4], [0.02, 0.167, 0.115, 0, 0, 2.3], [-0.03, 0.155, 0.111],
  ],
  neck: [[0.12, 0.058, 0.056], [0.06, 0.062, 0.06], [0, 0.07, 0.068], [-0.05, 0.09, 0.08]],
};
