import React, { Component, Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AimOutlined,
  AppstoreOutlined,
  CloseOutlined,
  CodeOutlined,
  DownOutlined,
  DownloadOutlined,
  HistoryOutlined,
  HomeOutlined,
  LaptopOutlined,
  LeftOutlined,
  MailOutlined,
  QuestionCircleOutlined,
  RightOutlined,
  SmileOutlined,
  UpOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { SECTIONS, SECTION_BY_ID } from './sections';
import { PANELS } from './Panels';
import { actions, input, pointer, useStore } from './store';
import { profile } from '../data/portfolio';
import './experience.css';

const Scene = lazy(() => import('./scene/Scene'));

const ICONS = {
  home: <HomeOutlined aria-hidden="true" />,
  about: <UserOutlined aria-hidden="true" />,
  skills: <CodeOutlined aria-hidden="true" />,
  projects: <LaptopOutlined aria-hidden="true" />,
  experience: <HistoryOutlined aria-hidden="true" />,
  contact: <MailOutlined aria-hidden="true" />,
};

const KEY_MAP = {
  ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down',
  ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right',
};

export function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) {
    return false;
  }
}

class SceneBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error('[3D workspace] falling back to the classic view:', error);
    this.props.onFail(error && error.message ? error.message : 'The 3D scene failed to load');
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function useKeyboardInput() {
  useEffect(() => {
    const typing = (el) => el && (['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) || el.isContentEditable);
    const down = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const dir = KEY_MAP[e.code];
      if (!dir || typing(e.target)) return;
      const arrow = e.code.startsWith('Arrow');
      // Inside the scrolling panel the arrows keep scrolling it.
      if (arrow && e.target.closest && e.target.closest('[data-xp-scroll]')) return;
      if (arrow) e.preventDefault();
      input.keys[dir] = true;
    };
    const up = (e) => {
      const dir = KEY_MAP[e.code];
      if (dir) input.keys[dir] = false;
    };
    const reset = () => Object.keys(input.keys).forEach((k) => { input.keys[k] = false; });
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', reset);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', reset);
      reset();
    };
  }, []);
}

function useSceneVisible(ref) {
  const [visible, setVisible] = useState(true);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);
  return visible && tabVisible;
}

function useEnvironmentPrefs() {
  useEffect(() => {
    const track = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', track);
    return () => window.removeEventListener('pointermove', track);
  }, []);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => actions.setReducedMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const lowMem = navigator.deviceMemory && navigator.deviceMemory <= 4;
    if (coarse || lowMem || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)) actions.setQuality('low');
    return () => mq.removeEventListener('change', apply);
  }, []);
}

function Loader({ onExit }) {
  const progress = useStore((s) => s.progress);
  const ready = useStore((s) => s.sceneReady);
  if (ready) return null;
  return (
    <div className="xp-loader" role="status" aria-live="polite">
      <div className="xp-loader-card">
        <p className="xp-eyebrow">{progress >= 100 ? 'Preparing the scene' : 'Loading 3D workspace'}</p>
        <div className="xp-loader-bar" aria-hidden="true">
          <i style={{ width: `${Math.max(8, Math.round(progress))}%` }} />
        </div>
        <p className="xp-muted">{Math.round(progress)}%</p>
        <button type="button" className="xp-btn" onClick={() => onExit()}>
          Skip to classic view
        </button>
      </div>
    </div>
  );
}

function Sidebar({ onExit }) {
  const active = useStore((s) => s.active);
  const destination = useStore((s) => s.destination);
  const [help, setHelp] = useState(false);
  const current = destination || active;
  return (
    <>
      <nav className="xp-sidebar" aria-label="Portfolio sections">
        <span className="xp-brand" aria-hidden="true">SA</span>
        <ul>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                className={current === s.id ? 'is-current' : ''}
                style={{ '--tag': s.color }}
                aria-current={current === s.id ? 'true' : undefined}
                onClick={() => actions.go(s.id)}
              >
                {ICONS[s.id]}
                <span>{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <ul className="xp-util">
          <li>
            <button type="button" onClick={() => actions.wave()} aria-label="Wave hello and strike a gym pose">
              <SmileOutlined aria-hidden="true" />
              <span>Wave</span>
            </button>
          </li>
          <li>
            <button type="button" onClick={() => actions.resetView()} aria-label="Reset camera view">
              <AimOutlined aria-hidden="true" />
              <span>View</span>
            </button>
          </li>
          <li>
            <a href={profile.resume} download="Sahil_Arya_Resume.pdf" aria-label="Download resume">
              <DownloadOutlined aria-hidden="true" />
              <span>Resume</span>
            </a>
          </li>
          <li>
            <button type="button" onClick={() => setHelp((v) => !v)} aria-expanded={help} aria-controls="xp-help" aria-label="Controls help">
              <QuestionCircleOutlined aria-hidden="true" />
              <span>Help</span>
            </button>
          </li>
          <li>
            <button type="button" onClick={() => onExit()} aria-label="Switch to classic scrolling portfolio">
              <AppstoreOutlined aria-hidden="true" />
              <span>Classic</span>
            </button>
          </li>
        </ul>
      </nav>
      {help && (
        <div id="xp-help" className="xp-help" role="region" aria-label="Controls help">
          <button type="button" className="xp-close" onClick={() => setHelp(false)} aria-label="Close help">
            <CloseOutlined aria-hidden="true" />
          </button>
          <h2>Controls</h2>
          <ul>
            <li><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> / arrows — walk</li>
            <li>Click the floor — walk there</li>
            <li>Drag — rotate the camera; scroll or pinch — zoom</li>
            <li>Double-click or the View button — reset the camera</li>
            <li>Click a glowing object — go to that section</li>
            <li>Sidebar — keyboard-friendly navigation</li>
            <li><kbd>Esc</kbd> — close the content panel</li>
          </ul>
        </div>
      )}
    </>
  );
}

const PAD = [
  ['up', 'Walk forward', <UpOutlined key="u" aria-hidden="true" />],
  ['left', 'Walk left', <LeftOutlined key="l" aria-hidden="true" />],
  ['down', 'Walk backward', <DownOutlined key="d" aria-hidden="true" />],
  ['right', 'Walk right', <RightOutlined key="r" aria-hidden="true" />],
];

function DPad() {
  const press = (dir, on) => {
    input.pad[dir] = on;
  };
  useEffect(
    () => () => {
      Object.keys(input.pad).forEach((k) => { input.pad[k] = false; });
    },
    []
  );
  return (
    <div className="xp-dpad" role="group" aria-label="On-screen movement controls">
      {PAD.map(([dir, label, icon]) => (
        <button
          key={dir}
          type="button"
          className={`xp-dpad-${dir}`}
          aria-label={label}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            press(dir, true);
          }}
          onPointerUp={() => press(dir, false)}
          onPointerCancel={() => press(dir, false)}
          onLostPointerCapture={() => press(dir, false)}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              press(dir, true);
            }
          }}
          onKeyUp={(e) => {
            if (e.key === ' ' || e.key === 'Enter') press(dir, false);
          }}
          onBlur={() => press(dir, false)}
          onContextMenu={(e) => e.preventDefault()}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}

function PanelHost() {
  const active = useStore((s) => s.active);
  const open = useStore((s) => s.panelOpen);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') actions.closePanel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const section = active && SECTION_BY_ID[active];
  const Body = section && PANELS[section.id];
  return (
    <AnimatePresence>
      {section && open && (
        <motion.aside
          key={section.id}
          id="xp-panel"
          className="xp-panel"
          style={{ '--tag': section.color }}
          aria-labelledby="xp-panel-title"
          initial={{ opacity: 0, x: reduce ? 0 : 36 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: reduce ? 0 : 36 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: 'easeOut' }}
        >
          <header>
            <h2 id="xp-panel-title">{section.label}</h2>
            <button type="button" className="xp-close" onClick={actions.closePanel} aria-label={`Close ${section.label} panel`}>
              <CloseOutlined aria-hidden="true" />
            </button>
          </header>
          <div className="xp-panel-body" data-xp-scroll tabIndex={0} aria-label={`${section.label} content`}>
            <Body />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function Status() {
  const active = useStore((s) => s.active);
  const destination = useStore((s) => s.destination);
  const moving = useStore((s) => s.moving);
  let text = 'Exploring the workspace';
  if (active) text = `At ${SECTION_BY_ID[active].label}`;
  else if (destination) text = `Walking to ${SECTION_BY_ID[destination].label}…`;
  else if (moving) text = 'Walking…';
  return (
    <>
      <div className="xp-hud" aria-hidden="true">
        <span className={active || !moving ? '' : 'is-moving'}>{text}</span>
      </div>
      <p className="xp-sr" role="status" aria-live="polite">
        {active || destination ? text : ''}
        {active ? '. Content panel opened.' : ''}
      </p>
    </>
  );
}

export default function Experience3D({ onExit }) {
  const stage = useRef(null);
  const visible = useSceneVisible(stage);
  const hasPanel = useStore((s) => s.panelOpen && s.active !== null);
  useKeyboardInput();
  useEnvironmentPrefs();

  useEffect(() => {
    document.body.classList.add('xp-open');
    return () => document.body.classList.remove('xp-open');
  }, []);

  const fail = useCallback((reason) => onExit(reason || 'The 3D scene could not be started.'), [onExit]);

  return (
    <div className={`xp${hasPanel ? ' has-panel' : ''}`}>
      <a className="xp-skip" href="#xp-panel" onClick={(e) => { e.preventDefault(); const p = document.querySelector('.xp-panel-body'); if (p) p.focus(); }}>
        Skip to content panel
      </a>
      <Sidebar onExit={onExit} />
      <main className="xp-stage" ref={stage} aria-label="Interactive 3D developer workspace. Use the sidebar to navigate, or walk with WASD or the arrow keys.">
        <SceneBoundary onFail={fail}>
          <Suspense fallback={null}>
            <Scene active={visible} onFail={fail} />
          </Suspense>
        </SceneBoundary>
        <Loader onExit={() => onExit()} />
        <Status />
      </main>
      <PanelHost />
      <DPad />
    </div>
  );
}
