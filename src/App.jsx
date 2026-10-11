import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import portrait from "./Mainak Roy PNG.png";
import { EDUCATION, EXPERIENCE, HIGHLIGHTS, NAV_LINKS, PROJECTS, SKILL_GROUPS, SOCIAL } from "./data";

const roles = ["AI/ML Engineer", "Data Scientist", "Agentic AI Builder"];
let keyboardAudioContext;

function playKeySound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    keyboardAudioContext ??= new AudioContextClass();
    const audio = keyboardAudioContext;
    if (audio.state === "suspended") audio.resume().catch(() => {});

    const now = audio.currentTime;
    const thock = audio.createOscillator();
    const thockGain = audio.createGain();
    thock.type = "triangle";
    thock.frequency.setValueAtTime(210, now);
    thock.frequency.exponentialRampToValueAtTime(82, now + 0.045);
    thockGain.gain.setValueAtTime(0.0001, now);
    thockGain.gain.exponentialRampToValueAtTime(0.12, now + 0.003);
    thockGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);
    thock.connect(thockGain);
    thockGain.connect(audio.destination);
    thock.start(now);
    thock.stop(now + 0.07);

    const buffer = audio.createBuffer(1, Math.floor(audio.sampleRate * 0.025), audio.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let index = 0; index < samples.length; index += 1) samples[index] = (Math.random() * 2 - 1) * (1 - index / samples.length);
    const click = audio.createBufferSource();
    const filter = audio.createBiquadFilter();
    const clickGain = audio.createGain();
    click.buffer = buffer;
    filter.type = "highpass";
    filter.frequency.value = 1000;
    clickGain.gain.setValueAtTime(0.07, now);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
    click.connect(filter);
    filter.connect(clickGain);
    clickGain.connect(audio.destination);
    click.start(now);
  } catch {
    // Keep the skill controls usable if audio is unavailable or blocked.
  }
}

function SectionHeading({ eyebrow, title, note }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {note && <p>{note}</p>}
    </div>
  );
}

function Arrow() {
  return <span aria-hidden="true" className="arrow">↗</span>;
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [formStatus, setFormStatus] = useState("idle");

  useEffect(() => {
    const timer = window.setInterval(() => setRoleIndex((index) => (index + 1) % roles.length), 3200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.15, 0.35, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigateTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pressSkill = () => playKeySound();

  const sendEmail = async (event) => {
    event.preventDefault();
    setFormStatus("sending");
    const form = event.currentTarget;
    try {
      await emailjs.sendForm("service_9k3qcde", "template_fw64p8k", form, "o0vlF1tk5B4fj0sAk");
      form.reset();
      setFormStatus("sent");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="portfolio-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />

      <header className="site-header">
        <div className="nav-shell">
          <a className="wordmark" href="#home" onClick={(event) => { event.preventDefault(); navigateTo("home"); }} aria-label="Mainak Roy portfolio home">
            PORTFOLIO
          </a>
          <nav className={`desktop-nav${menuOpen ? " nav-open" : ""}`} aria-label="Main navigation">
            {NAV_LINKS.map(({ label, id }) => (
              <button key={id} className={activeSection === id ? "nav-link active" : "nav-link"} onClick={() => navigateTo(id)}>
                {label}
              </button>
            ))}
          </nav>
          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close main menu" : "Open main menu"}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero section-anchor">
          <div className="hero-copy">
            <div className="breadcrumb"><span>HOME</span><i>/</i> PORTFOLIO</div>
            <p className="hero-greeting">Hello, I’m</p>
            <h1>Mainak <span>Roy</span><b className="cursor">_</b></h1>
            <p className="hero-role">I’m an <strong key={roles[roleIndex]}>{roles[roleIndex]}</strong></p>
            <p className="hero-description">
              I build thoughtful machine-learning and AI systems, from research and data products to reliable backend workflows.
            </p>
            <div className="hero-status"><span className="status-light" /> OPEN TO OPPORTUNITIES <span className="status-divider">·</span> NIIT UNIVERSITY ’27</div>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => navigateTo("projects")}>Explore projects <Arrow /></button>
              <button className="button button-quiet" onClick={() => navigateTo("contact")}>Get in touch</button>
            </div>
            <div className="hero-socials" aria-label="Social profiles">
              {SOCIAL.map(({ name, url, short }) => <a key={name} href={url} target={url.startsWith("http") ? "_blank" : undefined} rel={url.startsWith("http") ? "noreferrer" : undefined}>{short}<span>{name}</span></a>)}
            </div>
          </div>

          <div className="hero-visual">
            <div className="lanyard" aria-hidden="true"><span>MAINAK ROY · DATA SCIENCE · MAINAK ROY</span></div>
            <div className="card-controls">
              <span className="card-prompt">A LITTLE ABOUT ME</span>
              <button className="flip-button" onClick={() => setCardFlipped((flipped) => !flipped)} aria-label={cardFlipped ? "Show profile card front" : "Flip profile card to details"}>
                {cardFlipped ? "↺" : "⟳"}
              </button>
            </div>
            <button className="profile-card-button" onClick={() => setCardFlipped((flipped) => !flipped)} aria-label="Flip profile card">
              <span className={`profile-card${cardFlipped ? " is-flipped" : ""}`}>
                <span className="profile-face profile-front">
                  <span className="profile-photo-wrap"><img src={portrait} alt="Portrait of Mainak Roy" /></span>
                  <span className="profile-name">Mainak Roy</span>
                  <span className="profile-title">{roles[roleIndex]}</span>
                  <span className="profile-line" />
                  <span className="profile-serial">NIIT UNIVERSITY · 2027</span>
                  <span className="profile-stamp">MR<span>AI / ML</span></span>
                </span>
                <span className="profile-face profile-back">
                  <span className="back-label">CURRENT FOCUS</span>
                  <strong>Agentic AI<br />& decision systems</strong>
                  <span className="back-rule" />
                  <span className="back-label">BUILDING WITH</span>
                  <span className="back-chips">Python · LangGraph · RAG · ML</span>
                  <span className="back-profile">github.com/Mainaky <Arrow /></span>
                </span>
              </span>
            </button>
            <p className="card-footnote">TAP TO FLIP <span>·</span> DESIGNED TO THINK IN SYSTEMS</p>
          </div>
          <button className="scroll-cue" onClick={() => navigateTo("about")} aria-label="Scroll to about section"><span /> SCROLL TO EXPLORE</button>
        </section>

        <section id="about" className="section section-anchor">
          <div className="section-wrap about-grid">
            <div className="about-intro">
              <SectionHeading eyebrow="A QUICK INTRODUCTION" title={<>Curiosity, turned<br /><span>into useful systems.</span></>} />
              <p className="body-copy">I’m a Data Science undergraduate at NIIT University with hands-on experience across agentic AI, retrieval-augmented generation, machine learning, and Python backend development. I enjoy taking complex workflows and making them clearer, measurable, and dependable.</p>
              <p className="body-copy">My work spans healthcare AI, travel planning, supply-chain decision support, demand forecasting, computer vision, and algorithm research. I’m especially interested in the engineering choices that make AI systems useful beyond a demo.</p>
              <div className="about-tags"><span>AI systems</span><span>Applied ML</span><span>Data products</span><span>Backend engineering</span></div>
            </div>
            <div className="education-card glass-card">
              <div className="education-top"><span className="education-icon">⌂</span><span className="education-caption">EDUCATION</span><span className="education-index">01 / 01</span></div>
              <h3>{EDUCATION.university}</h3>
              <p className="education-place">{EDUCATION.location}</p>
              <div className="education-rule" />
              <p className="education-degree">{EDUCATION.degree}</p>
              <div className="education-meta"><span>{EDUCATION.dates}</span><strong>CGPA {EDUCATION.cgpa}</strong></div>
              <p className="education-caption coursework-label">RELEVANT COURSEWORK</p>
              <div className="coursework">{EDUCATION.coursework.map((course) => <span key={course}>{course}</span>)}</div>
            </div>
          </div>
        </section>

        <section id="skills" className="section section-anchor section-tinted section-skills">
          <div className="section-wrap">
            <SectionHeading eyebrow="TOOLS, METHODS & TECHNOLOGIES" title={<>A broad toolkit.<br /><span>One curious engineer.</span></>} note="Grouped around the kinds of problems I like solving." />
            <div className="skill-stage">
              <div className="keyboard-art" aria-hidden="true">
                {["⌘", "Py", "JS", "λ", "AI", "◈", "SQL", "{}", "ML", "<>", "◉", "Go", "TS", "{}", "↗", "DB", "∑", "⌥", "☁", "▦", "⌘", "API", "∴", "Git", "◌", "✓", "∞", "npm", "R", "⎈", "Jv", "CSS", "↻", "ML", "⌂", "↗"].map((key, index) => <span className={`keyboard-key key-${index % 7}`} key={`${key}-${index}`}>{key}</span>)}
              </div>
              <div className="skill-grid">
              {SKILL_GROUPS.map((group, index) => (
                <article className="skill-card glass-card" key={group.title}>
                  <div className="skill-card-top"><span className="skill-number">0{index + 1}</span><span className="skill-mark">✳</span></div>
                  <h3>{group.title}</h3>
                  <div className="skill-chips">{group.skills.map((skill) => (
                    <button
                      className="skill-key"
                      key={skill}
                      onClick={pressSkill}
                      onKeyDown={(event) => { if (event.repeat && ["Enter", " "].includes(event.key)) event.preventDefault(); }}
                      aria-label={`${skill}; play keyboard switch sound`}
                      type="button"
                    >
                      {skill}
                    </button>
                  ))}</div>
                </article>
              ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section section-anchor">
          <div className="section-wrap">
            <SectionHeading eyebrow={`SELECTED WORK · ${PROJECTS.length} PROJECTS`} title={<>Ideas made<br /><span>concrete.</span></>} note="From systems that coordinate specialist AI agents to applied ML, data products, and research. The project details below combine the work already on my portfolio with the additional projects in my resumes." />
            <div className="project-grid">
              {PROJECTS.map((project, index) => (
                <article key={project.id} className={`project-card glass-card tone-${project.color}${index === 0 ? " project-featured" : ""}`}>
                  <div className="project-topline"><span>{project.category}</span><span className="project-index">{String(index + 1).padStart(2, "0")}</span></div>
                  <div className="project-icon">{project.emoji}</div>
                  <h3>{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p className="project-description">{project.description}</p>
                  <ul className="project-details">{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                  <div className="project-tech">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
                  <div className="project-footer">
                    <span className="project-status"><i /> {project.status}</span>
                    {project.href && <a href={project.href} target="_blank" rel="noreferrer">{project.linkLabel} <Arrow /></a>}
                    {project.sourceHref && <a href={project.sourceHref} target="_blank" rel="noreferrer">View source <Arrow /></a>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section section-anchor section-tinted">
          <div className="section-wrap experience-layout">
            <div className="experience-heading">
              <SectionHeading eyebrow="EXPERIENCE & RESEARCH" title={<>Learning by<br /><span>doing the work.</span></>} note="Industry experience, research, and campus leadership." />
            </div>
            <div className="timeline">
              {EXPERIENCE.map((item) => (
                <article key={item.role} className={`timeline-item tone-${item.color}`}>
                  <div className="timeline-marker"><i /></div>
                  <div className="timeline-card glass-card">
                    <div className="timeline-date">{item.date}</div>
                    <h3>{item.role}</h3>
                    <p className="timeline-org">{item.organization}</p>
                    <p className="timeline-description">{item.description}</p>
                    <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
                    {item.href && <a className="text-link" href={item.href} target="_blank" rel="noreferrer">View related work <Arrow /></a>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="highlights" className="section section-anchor">
          <div className="section-wrap">
            <SectionHeading eyebrow="RECOGNITION & LEADERSHIP" title={<>Milestones along<br /><span>the way.</span></>} note="Research, technical contributions, and the communities I’ve helped build." />
            <div className="highlight-grid">
              {HIGHLIGHTS.map((item, index) => (
                <article className={`highlight-card glass-card tone-${item.color}`} key={item.title}>
                  <div className="highlight-top"><span className="highlight-icon">{item.icon}</span><span>0{index + 1}</span></div>
                  <span className="highlight-label">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  {item.href && <a className="text-link" href={item.href} target="_blank" rel="noreferrer">See project <Arrow /></a>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section section-anchor contact-section">
          <div className="section-wrap contact-grid">
            <div>
              <SectionHeading eyebrow="START A CONVERSATION" title={<>Let’s build<br /><span>something useful.</span></>} />
              <p className="body-copy contact-copy">Have a role, research idea, or interesting problem in mind? I’d be glad to hear from you.</p>
              <a className="email-link" href="mailto:mainak.roy23@st.niituniversity.in">mainak.roy23@st.niituniversity.in <Arrow /></a>
              <div className="contact-socials">{SOCIAL.filter((item) => item.name !== "Email").map((item) => <a key={item.name} href={item.url} target="_blank" rel="noreferrer">{item.name} <Arrow /></a>)}</div>
            </div>
            <form className="contact-form glass-card" onSubmit={sendEmail}>
              <div className="form-heading"><span className="eyebrow">SEND A NOTE</span><span className="form-live"><i /> OPEN TO OPPORTUNITIES</span></div>
              <label htmlFor="contact-name">NAME</label>
              <input id="contact-name" name="name" placeholder="Your name" autoComplete="name" required />
              <label htmlFor="contact-email">EMAIL</label>
              <input id="contact-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
              <label htmlFor="contact-message">MESSAGE</label>
              <textarea id="contact-message" name="message" rows="4" placeholder="What would you like to talk about?" required />
              <button className="button button-primary send-button" type="submit" disabled={formStatus === "sending"}>{formStatus === "sending" ? "Sending…" : <>Send message <Arrow /></>}</button>
              {formStatus === "sent" && <p className="form-feedback success" role="status">Thanks — your message has been sent.</p>}
              {formStatus === "error" && <p className="form-feedback error" role="alert">The message could not be sent. Please email me directly.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main section-wrap">
          <div className="footer-brand"><a className="wordmark" href="#home" onClick={(event) => { event.preventDefault(); navigateTo("home"); }}><span className="wordmark-dot">●</span> PORTFOLIO</a><p>Data science, AI engineering, and thoughtful systems.</p></div>
          <div className="footer-links"><span className="eyebrow">EXPLORE</span>{NAV_LINKS.map(({ label, id }) => <button key={id} onClick={() => navigateTo(id)}>{label}</button>)}</div>
          <div className="footer-links"><span className="eyebrow">CONNECT</span>{SOCIAL.map(({ name, url }) => <a key={name} href={url} target={url.startsWith("http") ? "_blank" : undefined} rel={url.startsWith("http") ? "noreferrer" : undefined}>{name} <Arrow /></a>)}</div>
        </div>
        <div className="footer-bottom section-wrap"><span>© {new Date().getFullYear()} Mainak Roy</span><button onClick={() => navigateTo("home")}>Back to top ↑</button><span>BUILT WITH CURIOSITY</span></div>
      </footer>
    </div>
  );
}
