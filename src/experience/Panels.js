import React, { useState } from 'react';
import {
  EnvironmentOutlined,
  GithubOutlined,
  LinkOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  SendOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import {
  about,
  achievements,
  education,
  experience,
  profile,
  projects,
  skillCategories,
} from '../data/portfolio';
import { actions } from './store';

const Chips = ({ items }) => (
  <ul className="xp-chips">
    {items.map((t) => (
      <li key={t}>{t}</li>
    ))}
  </ul>
);

const ExternalLink = ({ href, children, icon, primary }) => (
  <a className={`xp-btn${primary ? ' is-primary' : ''}`} href={href} target="_blank" rel="noopener noreferrer">
    {icon}
    {children}
    <span className="xp-sr">(opens in a new tab)</span>
  </a>
);

function HomePanel() {
  return (
    <>
      <p className="xp-eyebrow">Welcome</p>
      <p className="xp-lead">
        Hi, I&apos;m <strong>{profile.name}</strong> — {profile.title}.
      </p>
      <p>{profile.tagline}</p>
      <Chips items={profile.roles} />
      <div className="xp-actions">
        <button type="button" className="xp-btn is-primary" onClick={() => actions.go('projects')}>
          See my projects
        </button>
        <button type="button" className="xp-btn" onClick={() => actions.go('contact')}>
          <MailOutlined aria-hidden="true" /> Get in touch
        </button>
        <a className="xp-btn" href={profile.resume} download="Sahil_Arya_Resume.pdf">
          <DownloadOutlined aria-hidden="true" /> Resume
        </a>
      </div>
      <h3>How to explore</h3>
      <ul className="xp-list">
        <li>Walk with <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> or the arrow keys, or use the on-screen pad.</li>
        <li>Click the floor to walk there, or click a glowing station in the room.</li>
        <li>Drag with the mouse (or one finger) to rotate the camera, scroll or pinch to zoom, double-click to reset.</li>
        <li>Use the sidebar to jump straight to any section. <kbd>Esc</kbd> closes this panel.</li>
      </ul>
    </>
  );
}

function AboutPanel() {
  return (
    <>
      <p className="xp-lead">{about.headline}</p>
      {about.paragraphs.map((p) => (
        <p key={p.slice(0, 24)}>{p}</p>
      ))}
      <dl className="xp-stats">
        {about.stats.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
      <h3>Highlights</h3>
      <div className="xp-cards">
        {about.highlights.map((h) => (
          <article key={h.title} className="xp-card">
            <h4>{h.title}</h4>
            <p>{h.text}</p>
          </article>
        ))}
      </div>
      <h3>Education</h3>
      <article className="xp-card">
        <h4>{education.degree}</h4>
        <p>
          {education.institution} · {education.location}
        </p>
        <p className="xp-muted">
          {education.duration} · CGPA {education.cgpa}
        </p>
      </article>
    </>
  );
}

function SkillsPanel() {
  return (
    <div className="xp-cards">
      {skillCategories.map((c) => (
        <article key={c.title} className="xp-card">
          <h4>{c.title}</h4>
          <Chips items={c.skills} />
        </article>
      ))}
    </div>
  );
}

function ProjectPreview({ project }) {
  const [failed, setFailed] = useState(false);
  if (failed || !project.preview) {
    return (
      <div className="xp-preview is-fallback" aria-hidden="true">
        {project.title}
      </div>
    );
  }
  return (
    <img
      className="xp-preview"
      src={project.preview}
      alt={`${project.title} preview`}
      loading="lazy"
      width="1280"
      height="720"
      onError={() => setFailed(true)}
    />
  );
}

function ProjectsPanel() {
  return (
    <>
      {projects.map((p) => (
        <article key={p.id} className="xp-card xp-project">
          <ProjectPreview project={p} />
          <p className="xp-eyebrow">{p.category}</p>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <ul className="xp-list">
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Chips items={p.technologies} />
          <div className="xp-actions">
            {p.links.live && (
              <ExternalLink href={p.links.live} icon={<LinkOutlined aria-hidden="true" />} primary>
                Live demo
              </ExternalLink>
            )}
            {p.links.github && (
              <ExternalLink href={p.links.github} icon={<GithubOutlined aria-hidden="true" />}>
                View code
              </ExternalLink>
            )}
          </div>
        </article>
      ))}
      <p className="xp-muted">
        More work on{' '}
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        .
      </p>
    </>
  );
}

function ExperiencePanel() {
  return (
    <>
      <ol className="xp-timeline">
        {experience.map((e) => (
          <li key={e.duration}>
            <p className="xp-eyebrow">{e.duration}</p>
            <h3>{e.title}</h3>
            <p className="xp-muted">
              {e.company} · {e.location}
            </p>
            <ul className="xp-list">
              {e.achievements.map((a) => (
                <li key={a.slice(0, 30)}>{a}</li>
              ))}
            </ul>
            <Chips items={e.technologies} />
          </li>
        ))}
      </ol>
      <h3>Achievements &amp; recognition</h3>
      <div className="xp-cards">
        {achievements.map((a) => (
          <article key={a.title} className="xp-card">
            <h4>{a.title}</h4>
            <p className="xp-muted">
              {a.org} · {a.date}
            </p>
            <p>{a.text}</p>
          </article>
        ))}
      </div>
    </>
  );
}

const ENDPOINT = process.env.REACT_APP_CONTACT_ENDPOINT;

function ContactForm() {
  const [status, setStatus] = useState({ kind: 'idle', text: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data._gotcha) return;
    if (ENDPOINT) {
      setStatus({ kind: 'busy', text: 'Sending…' });
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name: data.name, email: data.email, subject: data.subject, message: data.message }),
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setStatus({ kind: 'ok', text: "Message sent. I'll get back to you soon." });
      } catch (err) {
        setStatus({ kind: 'error', text: `Could not send the message. Please email ${profile.email} directly.` });
      }
      return;
    }
    const body = `${data.message}\n\n— ${data.name} (${data.email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
    setStatus({
      kind: 'ok',
      text: `Your email app should open with the message ready to send. If not, write to ${profile.email}.`,
    });
  };

  return (
    <form className="xp-form" onSubmit={onSubmit}>
      <label>
        Full name
        <input name="name" type="text" autoComplete="name" required maxLength={120} />
      </label>
      <label>
        Email address
        <input name="email" type="email" autoComplete="email" required maxLength={200} />
      </label>
      <label>
        Subject
        <input name="subject" type="text" required maxLength={200} />
      </label>
      <label>
        Message
        <textarea name="message" rows={5} required maxLength={4000} />
      </label>
      <input name="_gotcha" type="text" tabIndex={-1} autoComplete="off" className="xp-hp" aria-hidden="true" />
      <button type="submit" className="xp-btn is-primary" disabled={status.kind === 'busy'}>
        <SendOutlined aria-hidden="true" /> {status.kind === 'busy' ? 'Sending…' : 'Send message'}
      </button>
      <p className={`xp-status is-${status.kind}`} role="status" aria-live="polite">
        {status.text}
      </p>
    </form>
  );
}

function ContactPanel() {
  const rows = [
    { icon: <MailOutlined aria-hidden="true" />, label: 'Email', text: profile.email, href: `mailto:${profile.email}` },
    { icon: <PhoneOutlined aria-hidden="true" />, label: 'Phone', text: profile.phone, href: profile.phoneHref },
    { icon: <LinkedinOutlined aria-hidden="true" />, label: 'LinkedIn', text: 'sahil-a-4a262211a', href: profile.linkedin, external: true },
    { icon: <GithubOutlined aria-hidden="true" />, label: 'GitHub', text: 'Sahilarya20', href: profile.github, external: true },
  ];
  return (
    <>
      <p>Have a project in mind or want to collaborate? I&apos;d love to hear from you.</p>
      <ul className="xp-contact">
        {rows.map((r) => (
          <li key={r.label}>
            <a href={r.href} {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              {r.icon}
              <span>
                <small>{r.label}</small>
                {r.text}
              </span>
            </a>
          </li>
        ))}
        <li>
          <span className="xp-contact-static">
            <EnvironmentOutlined aria-hidden="true" />
            <span>
              <small>Location</small>
              {profile.location}
            </span>
          </span>
        </li>
      </ul>
      <h3>Send a message</h3>
      <ContactForm />
    </>
  );
}

export const PANELS = {
  home: HomePanel,
  about: AboutPanel,
  skills: SkillsPanel,
  projects: ProjectsPanel,
  experience: ExperiencePanel,
  contact: ContactPanel,
};
