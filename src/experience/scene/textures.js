import { CanvasTexture, SRGBColorSpace } from 'three';
import { useEffect, useMemo } from 'react';
import { profile, about, experience, projects } from '../../data/portfolio';

const FONT = 'Inter, system-ui, -apple-system, "Segoe UI", sans-serif';

export function createTexture(w, h, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  draw(canvas.getContext('2d'), w, h);
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export function useScreenTexture(w, h, draw) {
  // draw functions are module-level, so the texture is built once per mount
  const tex = useMemo(() => createTexture(w, h, draw), [w, h, draw]);
  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
}

const roundRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

const background = (ctx, w, h, a = '#0a1230', b = '#150a33', alpha = 1) => {
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, a);
  g.addColorStop(1, b);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 1;
  ctx.strokeStyle = 'rgba(120,160,255,0.08)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
};

const border = (ctx, w, h, color) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  roundRect(ctx, 6, 6, w - 12, h - 12, 18);
  ctx.stroke();
};

const wrap = (ctx, text, x, y, maxW, lineH, maxLines = 99) => {
  const words = text.split(' ');
  let line = '';
  let lines = 0;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, y);
      y += lineH;
      lines += 1;
      line = word;
      if (lines >= maxLines) return y;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, y);
  return y + lineH;
};

export const drawWelcome = (ctx, w, h) => {
  ctx.clearRect(0, 0, w, h);
  background(ctx, w, h, '#0b1840', '#1d0f4a', 0.82);
  border(ctx, w, h, '#38bdf8');
  ctx.fillStyle = '#7dd3fc';
  ctx.font = `600 30px ${FONT}`;
  ctx.fillText('WELCOME TO MY WORKSPACE', 48, 74);
  ctx.fillStyle = '#ffffff';
  ctx.font = `700 76px ${FONT}`;
  ctx.fillText(profile.name, 48, 160);
  ctx.fillStyle = '#c4b5fd';
  ctx.font = `500 36px ${FONT}`;
  ctx.fillText(profile.title, 48, 214);
  ctx.fillStyle = 'rgba(226,232,255,0.75)';
  ctx.font = `400 26px ${FONT}`;
  ctx.fillText('Walk with WASD / arrows, click the floor,', 48, 282);
  ctx.fillText('or pick a station from the sidebar.', 48, 318);
};

export const drawAbout = (ctx, w, h) => {
  background(ctx, w, h, '#0a1230', '#1a0d3d');
  border(ctx, w, h, '#818cf8');
  ctx.fillStyle = '#a5b4fc';
  ctx.font = `600 34px ${FONT}`;
  ctx.fillText('ABOUT', 56, 80);
  ctx.fillStyle = '#fff';
  ctx.font = `700 52px ${FONT}`;
  const y = wrap(ctx, about.headline, 56, 150, w - 112, 62, 2);
  ctx.fillStyle = 'rgba(226,232,255,0.82)';
  ctx.font = `400 32px ${FONT}`;
  const bullets = [
    'Polestar Analytics · Noida',
    'Microfrontend migration · 4+ teams',
    '5+ Python microservices · gRPC · Redis',
    'AI / LLM: PromoPulse & OCR pipelines',
  ];
  bullets.forEach((b, i) => {
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(56, y + 22 + i * 58 - 22, 10, 10);
    ctx.fillStyle = 'rgba(226,232,255,0.88)';
    ctx.fillText(b, 86, y + 22 + i * 58);
  });
  about.stats.forEach((s, i) => {
    const x = 56 + i * ((w - 112) / 4);
    ctx.fillStyle = '#fff';
    ctx.font = `700 54px ${FONT}`;
    ctx.fillText(s.value, x, h - 90);
    ctx.fillStyle = 'rgba(165,180,252,0.9)';
    ctx.font = `500 22px ${FONT}`;
    ctx.fillText(s.label, x, h - 56);
  });
};

export const drawTimeline = (ctx, w, h) => {
  background(ctx, w, h, '#0a1230', '#16103f');
  border(ctx, w, h, '#6366f1');
  ctx.fillStyle = '#a5b4fc';
  ctx.font = `600 34px ${FONT}`;
  ctx.fillText('EXPERIENCE TIMELINE', 56, 80);
  const lineX = 86;
  const top = 140;
  const bottom = h - 70;
  const g = ctx.createLinearGradient(0, top, 0, bottom);
  g.addColorStop(0, '#22d3ee');
  g.addColorStop(1, '#a855f7');
  ctx.strokeStyle = g;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(lineX, top);
  ctx.lineTo(lineX, bottom);
  ctx.stroke();
  const items = [...experience].reverse();
  items.forEach((e, i) => {
    const y = top + 100 + i * 190;
    ctx.fillStyle = '#05060f';
    ctx.strokeStyle = i === items.length - 1 ? '#22d3ee' : '#a855f7';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(lineX, y, 17, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#7dd3fc';
    ctx.font = `600 26px ${FONT}`;
    ctx.fillText(e.short, 130, y - 22);
    ctx.fillStyle = '#fff';
    ctx.font = `700 40px ${FONT}`;
    ctx.fillText(e.title, 130, y + 20);
    ctx.fillStyle = 'rgba(226,232,255,0.75)';
    ctx.font = `400 28px ${FONT}`;
    ctx.fillText(`${e.company} · ${e.location}`, 130, y + 62);
  });
};

export const drawContact = (ctx, w, h) => {
  background(ctx, w, h, '#0a1230', '#12123f');
  border(ctx, w, h, '#60a5fa');
  ctx.fillStyle = '#93c5fd';
  ctx.font = `600 30px ${FONT}`;
  ctx.fillText('CONTACT', 40, 64);
  ctx.fillStyle = '#fff';
  ctx.font = `700 40px ${FONT}`;
  ctx.fillText("Let's build together", 40, 128);
  ctx.fillStyle = 'rgba(226,232,255,0.85)';
  ctx.font = `400 28px ${FONT}`;
  ctx.fillText(profile.email, 40, 184);
  ctx.fillText(profile.phone, 40, 226);
};

const CODE_COLORS = ['#22d3ee', '#a78bfa', '#f472b6', '#facc15', '#60a5fa', '#94a3b8'];

export const makeCodeDrawer = (seed, title) => (ctx, w, h) => {
  ctx.fillStyle = '#070b1d';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#101a3c';
  ctx.fillRect(0, 0, w, 44);
  ['#f87171', '#fbbf24', '#4ade80'].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(28 + i * 26, 22, 7, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = 'rgba(226,232,255,0.7)';
  ctx.font = `500 20px ${FONT}`;
  ctx.fillText(title, 120, 29);
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let row = 0; row < 14; row += 1) {
    const indent = Math.floor(rnd() * 3) * 36;
    let x = 28 + indent;
    ctx.fillStyle = 'rgba(148,163,184,0.5)';
    ctx.font = `400 16px ${FONT}`;
    ctx.fillText(String(row + 1).padStart(2, '0'), 8, 92 + row * 34);
    for (let k = 0; k < 2 + Math.floor(rnd() * 3); k += 1) {
      const len = 50 + rnd() * 150;
      ctx.fillStyle = CODE_COLORS[Math.floor(rnd() * CODE_COLORS.length)];
      roundRect(ctx, x + 22, 80 + row * 34, len, 12, 6);
      ctx.fill();
      x += len + 14;
    }
  }
};

export const drawProjectsHolo = (ctx, w, h) => {
  ctx.clearRect(0, 0, w, h);
  background(ctx, w, h, '#06223a', '#0d1650', 0.78);
  border(ctx, w, h, '#22d3ee');
  ctx.fillStyle = '#67e8f9';
  ctx.font = `600 28px ${FONT}`;
  ctx.fillText('FEATURED PROJECTS', 40, 62);
  projects.forEach((p, i) => {
    ctx.fillStyle = '#fff';
    ctx.font = `700 46px ${FONT}`;
    ctx.fillText(p.title, 40, 140 + i * 92);
    ctx.fillStyle = 'rgba(196,181,253,0.9)';
    ctx.font = `400 24px ${FONT}`;
    ctx.fillText(p.category, 40, 172 + i * 92);
  });
};

export const drawSign = (ctx, w, h) => {
  ctx.clearRect(0, 0, w, h);
  ctx.textAlign = 'center';
  ctx.font = `700 120px ${FONT}`;
  ctx.shadowColor = '#22d3ee';
  ctx.shadowBlur = 28;
  ctx.fillStyle = '#e0f7ff';
  ctx.fillText('</> SAHIL ARYA', w / 2, h / 2 + 40);
};

export const makeTagDrawer = (text) => (ctx, w, h) => {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(10,18,48,0.72)';
  roundRect(ctx, 4, 4, w - 8, h - 8, h / 2 - 4);
  ctx.fill();
  ctx.strokeStyle = 'rgba(103,232,249,0.9)';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = '#e6faff';
  ctx.font = `600 ${Math.round(h * 0.46)}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, w / 2, h / 2 + 2);
};

export const drawFloorGrid = (ctx, w, h) => {
  ctx.fillStyle = '#0a0e22';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(96,130,255,0.22)';
  ctx.lineWidth = 3;
  const n = 7;
  for (let i = 0; i <= n; i += 1) {
    const p = (i / n) * w;
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, h);
    ctx.moveTo(0, p);
    ctx.lineTo(w, p);
    ctx.stroke();
  }
};
