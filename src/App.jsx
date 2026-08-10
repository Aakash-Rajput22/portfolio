import { useEffect, useState } from "react";
import "./App.css";

const githubUrl = "https://github.com/Aakash-Rajput22";
// Add your public contact details here when they are ready.
const contactEmail = "thakurakashrajput45@gmail.com";
const linkedInUrl = "https://www.linkedin.com/in/akash-rajput22";
const resumeUrl = "/assets/Akash-Rajput-Resume.docx";

const navigation = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

const skills = [
  ["HTML", "<>"], ["CSS", "#"], ["JavaScript", "JS"], ["React.js", "◉"],
  ["Firebase", "F"], ["Git", "⌘"], ["GitHub", "GH"], ["REST APIs", "↔"], ["Responsive Design", "⌗"],
];

function Icon({ name, size = 20 }) {
  const paths = {
    github: <path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.2.65-.46v-1.82c-2.65.58-3.2-1.12-3.2-1.12-.43-1.1-1.06-1.39-1.06-1.39-.87-.59.07-.58.07-.58.96.07 1.47.99 1.47.99.85 1.46 2.24 1.04 2.78.8.09-.62.33-1.04.6-1.28-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.89.98-2.56-.1-.24-.42-1.21.09-2.52 0 0 .8-.26 2.62.98a9.07 9.07 0 0 1 4.77 0c1.82-1.24 2.62-.98 2.62-.98.51 1.31.19 2.28.09 2.52.61.67.98 1.52.98 2.56 0 3.67-2.24 4.47-4.37 4.71.34.3.65.9.65 1.82v2.7c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z" />,
    linkedin: <><path d="M6.5 8.5H3.3V20h3.2V8.5ZM4.9 3A1.9 1.9 0 1 0 4.9 6.8 1.9 1.9 0 0 0 4.9 3ZM20.7 13.4c0-3.47-1.85-5.08-4.32-5.08-1.99 0-2.88 1.1-3.38 1.87V8.5H9.8V20H13v-5.7c0-1.5.28-2.95 2.14-2.95 1.83 0 1.85 1.71 1.85 3.05V20h3.2v-6.6h.5Z" /></>,
    mail: <path d="M3.5 5.5h17v13h-17v-13Zm.9 1.3L12 12.3l7.6-5.5M4.5 17.2l5.2-4M19.5 17.2l-5.2-4" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />, close: <path d="m6 6 12 12M18 6 6 18" />,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />, external: <path d="M14 4h6v6M20 4l-9 9M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={name === "github" || name === "linkedin" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function SectionHeading({ eyebrow, title }) {
  return <header className="section-heading reveal"><p>{eyebrow}</p><h2>{title}</h2></header>;
}

function App() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((items) => items.forEach((item) => item.isIntersecting && item.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setOpen(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (contactEmail) {
      const formData = new FormData(event.currentTarget);
      const subject = encodeURIComponent(`Portfolio enquiry from ${formData.get("name")}`);
      const body = encodeURIComponent(`${formData.get("message")}\n\nReply to: ${formData.get("email")}`);
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    }
    setSent(true);
  };

  return <>
    <header className="navbar">
      <a className="logo" href="#home" onClick={closeMenu}>AKASH<span>.</span></a>
      <button className="menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button>
      <nav className={open ? "nav-menu open" : "nav-menu"} aria-label="Main navigation">
        {navigation.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>)}
        <a className="nav-github" href={githubUrl} target="_blank" rel="noreferrer"><Icon name="github" size={17} /> GitHub</a>
      </nav>
    </header>

    <main>
      <section id="home" className="hero">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="hero-copy reveal is-visible">
          <p className="eyebrow"><span /> Hello, I&apos;m</p>
          <h1>Akash <em>Rajput</em></h1>
          <p className="role">Software Developer <span>⌁</span> Building for the web</p>
          <p className="hero-description">I build modern, responsive and user-friendly web applications using React, JavaScript and Firebase.</p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">View My Work <Icon name="arrow" size={18} /></a>
            <a className="button secondary" href={resumeUrl || "#resume-note"} download={resumeUrl ? "Akash-Rajput-Resume.docx" : undefined}>Download Resume</a>
            <a className="button text-button" href="#contact">Contact Me</a>
          </div>
          <div className="socials" aria-label="Social links">
            <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="Akash on GitHub"><Icon name="github" /></a>
            {linkedInUrl ? <a href={linkedInUrl} target="_blank" rel="noreferrer" aria-label="Akash on LinkedIn"><Icon name="linkedin" /></a> : <span className="social-disabled" title="Add LinkedIn URL in App.jsx"><Icon name="linkedin" /></span>}
            {contactEmail ? <a href={`mailto:${contactEmail}`} aria-label="Email Akash"><Icon name="mail" /></a> : <a href="#contact" aria-label="Contact Akash"><Icon name="mail" /></a>}
          </div>
        </div>
        <div className="hero-panel reveal is-visible" aria-hidden="true">
          <div className="code-window"><div className="window-top"><i /><i /><i /><span>akash.dev</span></div><pre><code><b>const</b> developer = {'{'}{`\n`}  name: <strong>&quot;Akash Rajput&quot;</strong>,{`\n`}  stack: [<strong>&quot;React&quot;</strong>, <strong>&quot;Firebase&quot;</strong>],{`\n`}  focus: <strong>&quot;thoughtful web experiences&quot;</strong>{`\n`}{'}'};</code></pre><div className="window-status"><span /> available to build</div></div>
        </div>
      </section>

      <section id="about" className="section about"><SectionHeading eyebrow="01 / ABOUT" title="Crafting practical digital experiences." /><div className="about-grid"><div className="about-copy reveal"><p>I&apos;m a software developer developing my web development skills through real-world applications. I enjoy shaping ideas into interfaces that are clear, responsive, and genuinely useful.</p><p>My current toolkit centers on React, JavaScript, Firebase and the web fundamentals that make an experience feel solid across devices.</p></div><aside className="focus-card reveal"><span className="card-label">CURRENT FOCUS</span><div><b>01</b><p>Real-world projects</p></div><div><b>02</b><p>Frontend development</p></div><div><b>03</b><p>Continuous learning</p></div></aside></div></section>

      <section id="skills" className="section"><SectionHeading eyebrow="02 / TOOLKIT" title="The tools I use to ship." /><div className="skills-grid">{skills.map(([skill, symbol], index) => <article className="skill-card reveal" key={skill} style={{ transitionDelay: `${index * 40}ms` }}><span className="skill-symbol">{symbol}</span><h3>{skill}</h3><span className="skill-line" /></article>)}</div></section>

      <section id="projects" className="section projects"><SectionHeading eyebrow="03 / SELECTED WORK" title="Projects with purpose." /><div className="project-list">
        <article className="project featured reveal"><div className="project-visual knowora-visual"><div className="match-chip">LIVE MATCHES <i /></div><div className="score-card"><span>FIND YOUR GAME</span><b>KNOWORA</b><small>sports · community · play</small></div><div className="visual-grid" /></div><div className="project-content"><p className="project-kicker">FEATURED PROJECT <span>2026</span></p><h3>Knowora</h3><p>A modern sports matchmaking platform where users can discover matches, connect with players, join games and manage their profiles and wallet.</p><ul className="feature-list"><li>Authentication, matchmaking, game joining and profiles</li><li>Wallet/credits and Razorpay test integration</li><li>Firebase/Firestore with leaderboards, friends and badges</li></ul><div className="tags">{["React", "JavaScript", "Firebase", "Firestore", "Razorpay"].map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-actions"><a className="button primary small" href="https://knowora-app.vercel.app" target="_blank" rel="noreferrer">Live Demo <Icon name="external" size={16} /></a><a className="project-link" href={githubUrl} target="_blank" rel="noreferrer"><Icon name="github" size={18} /> View GitHub</a></div></div></article>
        <article className="project w3-project reveal"><div className="project-visual w3-visual"><span>W3</span><div className="villa-lines"><i /><i /><i /></div><small>VILLA</small></div><div className="project-content"><p className="project-kicker">PROJECT ARCHIVE</p><h3>W3 Villa</h3><p>Project details have not been included in this portfolio repository yet. Add its verified description and technology stack here when available.</p><div className="project-actions"><a className="button primary small" href="https://w3-assignment-three.vercel.app/" target="_blank" rel="noreferrer">Live Demo <Icon name="external" size={16} /></a><a className="project-link" href={githubUrl} target="_blank" rel="noreferrer"><Icon name="github" size={18} /> View GitHub</a></div></div></article>
      </div></section>

      <section id="experience" className="section"><SectionHeading eyebrow="04 / JOURNEY" title="Learning by building." /><div className="journey-grid"><article className="timeline-card reveal"><p className="date">2026 — Present</p><h3>Software Developer Intern</h3><p>Developing practical experience through real-world project work with React, JavaScript, Firebase, Git/GitHub and modern web development workflows.</p><div className="tags"><span>React</span><span>JavaScript</span><span>Firebase</span><span>Git/GitHub</span></div></article><article className="timeline-card education reveal"><p className="date">EDUCATION</p><h3>B.Tech Computer Science and Engineering</h3><p>AKTU</p></article></div></section>

      <section id="contact" className="section contact"><SectionHeading eyebrow="05 / CONTACT" title="Let&apos;s start a conversation." /><div className="contact-grid"><div className="contact-intro reveal"><p>Have a project, opportunity, or idea to discuss? I&apos;d be glad to hear from you.</p><div className="contact-methods"><a href={githubUrl} target="_blank" rel="noreferrer"><Icon name="github" /> GitHub <Icon name="arrow" size={16} /></a>{linkedInUrl ? <a href={linkedInUrl} target="_blank" rel="noreferrer"><Icon name="linkedin" /> LinkedIn <Icon name="arrow" size={16} /></a> : <span><Icon name="linkedin" /> LinkedIn <small>Add URL in App.jsx</small></span>}{contactEmail ? <a href={`mailto:${contactEmail}`}><Icon name="mail" /> {contactEmail} <Icon name="arrow" size={16} /></a> : <span><Icon name="mail" /> Email <small>Add email in App.jsx</small></span>}</div></div><form className="contact-form reveal" onSubmit={handleSubmit}><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@example.com" /></label><label>Message<textarea required name="message" rows="4" placeholder="Tell me a little about your project" /></label><button className="button primary" type="submit">Send Message <Icon name="arrow" size={18} /></button>{sent && <p className="form-note">{contactEmail ? "Opening your email client…" : "Add your email address in App.jsx to connect this form to a mailto fallback."}</p>}</form></div></section>
    </main>
    {!resumeUrl && <p id="resume-note" className="resume-note">Add your PDF at <code>public/assets/resume.pdf</code> to enable this download.</p>}
    <footer><a className="logo" href="#home">AKASH<span>.</span></a><p>Software Developer</p><div><a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a><a href={linkedInUrl} target="_blank" rel="noreferrer">LinkedIn</a><a href={`mailto:${contactEmail}`}>Email</a></div><small>© 2026 Akash Rajput. All rights reserved.</small></footer>
  </>;
}

export default App;
