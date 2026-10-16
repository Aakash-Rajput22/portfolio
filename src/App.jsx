import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import "./App.css";

const githubUrl = "https://github.com/Aakash-Rajput22";
const contactEmail = "thakurakashrajput45@gmail.com";
const linkedInUrl = "https://www.linkedin.com/in/akash-rajput22";
const resumeAvailable = true;
const resumePath = "/assets/resume.pdf";

const navigation = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

const unsplash = (id, w = 1600, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

const heroImage = unsplash("1498050108023-c5249f4df085", 2000, 85);
const storyImage = unsplash("1461749280684-dccba630e2f6", 2000, 80);
const contactImage = unsplash("1497366754035-f200968a6e72", 2000, 80);

const BELIEF =
  "I believe great web experiences are not defined by frameworks alone, but by thoughtful planning, clean code and genuine attention to the people using them — from the first conversation to the final deployment.";
const BIO =
  "I'm Akash Rajput, a software developer focused on React, JavaScript and Firebase. I turn ideas into clear, practical interfaces that solve real user needs.";

const processSteps = [
  { num: "01", label: "The conversation", title: "It starts by understanding the problem.", text: "Goals, users and requirements come first — before a single line of code is written." },
  { num: "02", label: "The blueprint", title: "We give it structure.", text: "Wireframes, data models, technology choices and a clear architecture for the build." },
  { num: "03", label: "The scope", title: "Clarity before code.", text: "A transparent plan, timeline and set of deliverables agreed up front — no surprises later." },
  { num: "04", label: "The build", title: "Your vision comes to life.", text: "Clean, component-driven development with regular demos and honest progress updates." },
  { num: "05", label: "The handover", title: "Built to last.", text: "Deployment, documentation and post-launch support so the product keeps working after ship day." },
];

const buildCards = [
  {
    image: unsplash("1555066931-4365d14bab8c", 1200),
    meta: "React · JavaScript · CSS",
    title: "Frontend Interfaces",
    text: "Responsive, accessible interfaces built with React — clean components, sensible states and details that hold up on every screen.",
  },
  {
    image: unsplash("1551288049-bebda4e38f71", 1200),
    meta: "Firebase · Firestore",
    title: "Full-stack Web Apps",
    text: "Authentication, data models and realtime features with Firebase — products that work end to end, not just mockups.",
  },
  {
    image: unsplash("1522071820081-009f0129c71c", 1200),
    meta: "REST · Razorpay",
    title: "APIs & Integrations",
    text: "Connecting apps to external services — payments, data and third-party APIs wired up carefully and documented.",
  },
  {
    image: unsplash("1517694712202-14dd9538aa97", 1200),
    meta: "Responsive · Optimised",
    title: "Performance & Polish",
    text: "Fast loads, smooth interactions and layouts refined down to the last pixel, from mobile to widescreen.",
  },
];

const techMarquee = ["React", "JavaScript", "Firebase", "Firestore", "REST APIs", "Git", "GitHub", "HTML", "CSS"];

const projects = [
  {
    chip: "Featured",
    image: unsplash("1546519638-68e109498ffc", 1400),
    title: "Knowora",
    category: "Sports · Community Platform",
    year: "2026",
    text: "A modern, responsive sports matchmaking platform where users can discover matches, connect with players, join games and manage their profiles and wallet.",
    features: [
      "Authentication, matchmaking, game joining and profiles",
      "Wallet/credits and Razorpay test integration",
      "Firebase/Firestore with leaderboards, friends and badges",
    ],
    tags: ["React", "JavaScript", "Firebase", "Firestore", "Razorpay", "Responsive UI"],
    demo: "https://knowora-app.vercel.app",
  },
  {
    chip: "Archive",
    image: unsplash("1600585154340-be6161a56a0c", 1400),
    title: "W3 Villa",
    category: "Web Project",
    year: "—",
    text: "Project details have not been added to this portfolio yet — add a verified description and technology stack here when available.",
    features: [],
    tags: [],
    demo: "https://w3-assignment-three.vercel.app/",
  },
];

const skillGroups = [
  {
    title: "Frontend",
    text: "Interfaces people enjoy using — responsive layouts, clean components and thoughtful interaction design, from first concept to polished UI.",
    chips: ["HTML", "CSS", "JavaScript", "React.js", "Responsive UI"],
    image: unsplash("1555066931-4365d14bab8c", 1200),
  },
  {
    title: "Backend & Database",
    text: "Firebase authentication, Firestore data models and REST API integrations that keep apps fast, secure and reliable.",
    chips: ["Firebase", "Firestore", "REST APIs"],
    image: unsplash("1551288049-bebda4e38f71", 1200),
  },
  {
    title: "Tools & Workflow",
    text: "Version control and collaborative workflows that keep projects organised from the first commit to deployment.",
    chips: ["Git", "GitHub"],
    image: unsplash("1517694712202-14dd9538aa97", 1200),
  },
];

const stats = [
  { value: 2, suffix: "", label: "Projects showcased" },
  { value: 10, suffix: "+", label: "Technologies in the toolkit" },
  { value: 3, suffix: "", label: "Core focus areas" },
  { value: 100, suffix: "%", label: "Responsive by default" },
];

const journey = [
  {
    meta: "2026 — Present",
    title: "Software Developer Intern",
    text: "Building real-world project experience with React, JavaScript, Firebase and modern web development workflows.",
    tags: ["React", "JavaScript", "Firebase"],
  },
  {
    meta: "Education",
    title: "B.Tech, Computer Science & Engineering",
    text: "AKTU — fundamentals of software development, computer science and hands-on project work.",
    tags: [],
  },
  {
    meta: "Currently",
    title: "Focused on product engineering",
    text: "Sharpening frontend craft through hands-on projects — turning ideas into clear, practical interfaces.",
    tags: [],
  },
  {
    meta: "Open to",
    title: "Internships & junior roles",
    text: "Available for frontend and full-stack opportunities where ownership and learning matter.",
    tags: [],
  },
];

// Replace these placeholders with real recommendations, or delete this array and the Quotes section.
const testimonials = [
  {
    text: "Add a real recommendation here — someone who has seen your work up close: a teammate, mentor, professor or client.",
    name: "Your reference",
    role: "Recommendation placeholder",
  },
  {
    text: "Another short, specific quote works best — mention a project, a result, or what it was like to work with you.",
    name: "Second reference",
    role: "Recommendation placeholder",
  },
  {
    text: "Once you have real quotes, replace them in the testimonials array in App.jsx — or remove this carousel entirely.",
    name: "Third reference",
    role: "Recommendation placeholder",
  },
];

function Icon({ name, size = 20 }) {
  const paths = {
    github: (
      <path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.2.65-.46v-1.82c-2.65.58-3.2-1.12-3.2-1.12-.43-1.1-1.06-1.39-1.06-1.39-.87-.59.07-.58.07-.58.96.07 1.47.99 1.47.99.85 1.46 2.24 1.04 2.78.8.09-.62.33-1.04.6-1.28-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.89.98-2.56-.1-.24-.42-1.21.09-2.52 0 0 .8-.26 2.62.98a9.07 9.07 0 0 1 4.77 0c1.82-1.24 2.62-.98 2.62-.98.51 1.31.19 2.28.09 2.52.61.67.98 1.52.98 2.56 0 3.67-2.24 4.47-4.37 4.71.34.3.65.9.65 1.82v2.7c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z" />
    ),
    linkedin: (
      <path d="M6.5 8.5H3.3V20h3.2V8.5ZM4.9 3A1.9 1.9 0 1 0 4.9 6.8 1.9 1.9 0 0 0 4.9 3ZM20.7 13.4c0-3.47-1.85-5.08-4.32-5.08-1.99 0-2.88 1.1-3.38 1.87V8.5H9.8V20H13v-5.7c0-1.5.28-2.95 2.14-2.95 1.83 0 1.85 1.71 1.85 3.05V20h3.2v-6.6h.5Z" />
    ),
    mail: <path d="M3.5 5.5h17v13h-17v-13Zm.9 1.3L12 12.3l7.6-5.5M4.5 17.2l5.2-4M19.5 17.2l-5.2-4" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    arrowLeft: <path d="M19 12H5m6-6-6 6 6 6" />,
    external: <path d="M14 4h6v6M20 4l-9 9M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6" />,
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={name === "github" || name === "linkedin" ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Word({ text, progress, start }) {
  const opacity = useTransform(progress, [start, start + 0.08], [0.14, 1]);
  return <motion.span className="motion-span" style={{ opacity }}>{text} </motion.span>;
}

function Stat({ value, suffix, label }) {
  const ref = useRef(null);
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [count, setCount] = useState(0);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!seen || reduced) return undefined;
    let frame;
    const started = performance.now();
    const duration = 1500;
    const tick = (now) => {
      const p = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(value * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seen, reduced, value]);

  return (
    <div className="stat" ref={ref}>
      <b>
        {String(reduced ? value : count).padStart(2, "0")}
        {suffix}
      </b>
      <p>{label}</p>
    </div>
  );
}

function Story() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const clip = useTransform(scrollYProgress, [0, 0.18], ["inset(22% 24% round 24px)", "inset(0% 0% round 0px)"]);
  const scale = useTransform(scrollYProgress, [0, 0.18], [1.3, 1]);
  const dim = useTransform(scrollYProgress, [0.2, 0.4], [0, 0.6]);
  const x = useTransform(scrollYProgress, [0.2, 1], ["0%", "-80%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.08, 0.16, 0.22], [0, 1, 1, 0]);
  const barWidth = useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}%`);

  const panels = processSteps.map((step) => (
    <article className="story-panel" key={step.num}>
      <span className="story-num">{step.num}</span>
      <p className="story-label">{step.label}</p>
      <h3 className="display-3">{step.title}</h3>
      <p className="story-text">{step.text}</p>
    </article>
  ));

  if (reduce) {
    return (
      <section className="story static" ref={ref} aria-label="How I build">
        <div className="story-sticky">
          <div className="story-media">
            <img src={storyImage} alt="" />
          </div>
          <div className="story-title">
            <p className="eyebrow">How I build</p>
            <h2 className="display-2">A clear path from first idea to shipped product.</h2>
          </div>
          <div className="story-track">{panels}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="story" ref={ref} aria-label="How I build">
      <div className="story-sticky">
        <motion.div className="story-media" style={{ clipPath: clip, scale }}>
          <img src={storyImage} alt="" />
        </motion.div>
        <motion.div className="story-dim" style={{ opacity: dim }} aria-hidden="true" />
        <motion.div className="story-title" style={{ opacity: titleOpacity }}>
          <p className="eyebrow">How I build</p>
          <h2 className="display-2">A clear path from first idea to shipped product.</h2>
        </motion.div>
        <motion.div className="story-track" style={{ x }}>{panels}</motion.div>
        <div className="story-progress" aria-hidden="true">
          <motion.span style={{ width: barWidth }} />
        </div>
      </div>
    </section>
  );
}

function Belief() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "center 0.5"] });
  const words = BELIEF.split(" ");

  return (
    <section id="about" className="section belief" ref={ref}>
      <div className="container-x belief-grid">
        <div className="belief-aside reveal">
          <p className="eyebrow">My belief</p>
          <p className="bio">{BIO}</p>
          <a className="link-underline" href="#contact">Start a conversation</a>
        </div>
        <p className="belief-copy">
          {reduce
            ? BELIEF
            : words.map((word, index) => (
                <Word
                  key={`${word}-${index}`}
                  text={word}
                  progress={scrollYProgress}
                  start={(index / words.length) * 0.92}
                />
              ))}
        </p>
      </div>
    </section>
  );
}

function Skills() {
  const [open, setOpen] = useState(0);
  return (
    <section id="skills" className="section">
      <div className="container-x">
        <header className="section-head reveal">
          <div>
            <p className="eyebrow">Toolkit</p>
            <h2 className="display-2">A complete toolkit, end to end.</h2>
          </div>
        </header>
        <div className="skills-layout">
          <div className="skill-list reveal">
            {skillGroups.map((group, index) => (
              <div className={`skill-row${open === index ? " open" : ""}`} key={group.title}>
                <h3>
                  <button
                    className="skill-head"
                    aria-expanded={open === index}
                    onClick={() => setOpen(open === index ? -1 : index)}
                  >
                    <span className="num">{String(index + 1).padStart(2, "0")}</span>
                    <span className="title">{group.title}</span>
                    <span className="plus" aria-hidden="true" />
                  </button>
                </h3>
                <div className="skill-panel">
                  <div className="skill-inner">
                    <div>
                      <p>{group.text}</p>
                      <div className="skill-chips">
                        {group.chips.map((chip) => (
                          <span key={chip}>{chip}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="skills-visual reveal" aria-hidden="true">
            {skillGroups.map((group, index) => (
              <img key={group.title} src={group.image} alt="" className={open === index ? "active" : ""} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Quotes() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const count = testimonials.length;

  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(() => setIndex((v) => (v + 1) % count), 5500);
    return () => clearInterval(id);
  }, [count, reduce]);

  const item = testimonials[index];
  return (
    <section className="section quotes-section">
      <div className="container-x">
        <header className="section-head reveal">
          <div>
            <p className="eyebrow">In their words</p>
            <h2 className="display-2">The measure of work is how it helps people.</h2>
          </div>
        </header>
        <div className="quote-stage">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="quote-mark" aria-hidden="true">&ldquo;</span>
              <p className="quote-text">{item.text}</p>
              <cite className="quote-cite">
                <b>{item.name}</b>
                <span>{item.role}</span>
              </cite>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="quote-nav">
          <button
            className="icon-btn"
            onClick={() => setIndex((v) => (v - 1 + count) % count)}
            aria-label="Previous testimonial"
          >
            <Icon name="arrowLeft" />
          </button>
          <button className="icon-btn" onClick={() => setIndex((v) => (v + 1) % count)} aria-label="Next testimonial">
            <Icon name="arrow" />
          </button>
          <span className="quote-counter">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>
        <p className="quote-note">
          Placeholder quotes — replace the testimonials array in App.jsx with real recommendations, or remove this
          section.
        </p>
      </div>
    </section>
  );
}

function Contact() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

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

  return (
    <section id="contact" className="section contact" ref={ref}>
      <motion.div className="contact-bg" style={reduce ? undefined : { y }} aria-hidden="true">
        <img src={contactImage} alt="" />
      </motion.div>
      <div className="contact-overlay" aria-hidden="true" />
      <div className="container-x contact-grid">
        <div className="contact-intro reveal">
          <p className="eyebrow">Your idea starts here</p>
          <h2 className="display-2" style={{ marginTop: "1rem" }}>Let&rsquo;s build something worth using.</h2>
          <p className="lead">
            Have a project, internship or opportunity to discuss? I&rsquo;d be glad to hear from you — I usually reply
            within a day.
          </p>
          <div className="contact-methods">
            <a href={`mailto:${contactEmail}`}>
              <Icon name="mail" /> {contactEmail} <Icon name="arrow" size={16} />
            </a>
            <a href={githubUrl} target="_blank" rel="noreferrer">
              <Icon name="github" /> GitHub <Icon name="arrow" size={16} />
            </a>
            <a href={linkedInUrl} target="_blank" rel="noreferrer">
              <Icon name="linkedin" /> LinkedIn <Icon name="arrow" size={16} />
            </a>
            {resumeAvailable && (
              <a href={resumePath} target="_blank" rel="noreferrer">
                <Icon name="external" /> Download resume <Icon name="arrow" size={16} />
              </a>
            )}
          </div>
        </div>
        <form className="contact-form reveal" onSubmit={handleSubmit}>
          <p className="form-intro">This form opens your email app; no message is stored on this website.</p>
          <label>
            Name
            <input required name="name" placeholder="Your name" autoComplete="name" />
          </label>
          <label>
            Email
            <input required type="email" name="email" placeholder="you@example.com" autoComplete="email" />
          </label>
          <label>
            Message
            <textarea required name="message" rows="4" placeholder="Tell me a little about your project or opportunity" />
          </label>
          <button className="btn btn-primary" type="submit">
            Open email draft <Icon name="arrow" size={16} />
          </button>
          {sent && <p className="form-note">Opening your email client…</p>}
        </form>
      </div>
    </section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [evening, setEvening] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (items) =>
        items.forEach((item) => {
          if (item.isIntersecting) {
            item.target.classList.add("is-visible");
            observer.unobserve(item.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    const updateNavbar = () => setScrolled(window.scrollY > 18);
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateNavbar);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <header className={`site-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " menu-open" : ""}`}>
        <a className="logo" href="#home" onClick={closeMenu}>Akash</a>
        <button
          className="menu-button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
        <nav className={`main-nav${menuOpen ? " open" : ""}`} aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>
          ))}
          <a className="btn header-cta" href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        {menuOpen && <button className="nav-backdrop" aria-label="Close menu" onClick={closeMenu} />}
      </header>

      <main>
        <section id="home" className={`hero${evening ? " is-evening" : ""}`}>
          <div className="hero-media">
            <img src={heroImage} alt="Laptop with code in a warm-lit workspace" />
          </div>
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-night" aria-hidden="true" />
          <div className="container-x hero-inner hero-entrance">
            <p className="eyebrow">Software Developer · Available 2026</p>
            <h1 className="display-1">Web experiences, <em className="italic-accent">made</em> inevitable.</h1>
            <p className="hero-lead">
              I&rsquo;m Akash Rajput. I build modern, responsive web applications with React, JavaScript and Firebase —
              thoughtful interfaces that solve real user needs.
            </p>
            <div className="hero-actions">
              <a className="btn btn-cream" href="#projects">View my work <Icon name="arrow" size={16} /></a>
              {resumeAvailable && (
                <a className="btn btn-light" href={resumePath} target="_blank" rel="noreferrer">Download resume</a>
              )}
              <a className="link-underline" href="#contact">Let&rsquo;s talk</a>
            </div>
          </div>
          <button className="hero-mode" onClick={() => setEvening(!evening)} aria-pressed={evening}>
            <Icon name="moon" size={15} /> {evening ? "Day" : "Evening"}
          </button>
          <div className="hero-scroll" aria-hidden="true">Scroll <i /></div>
        </section>

        <Story />

        <Belief />

        <section className="section">
          <div className="container-x">
            <header className="section-head reveal">
              <div>
                <p className="eyebrow">What I do</p>
                <h2 className="display-2">Thoughtfully built products that feel fast, clear and reliable.</h2>
              </div>
              <div className="head-aside">
                <a className="link-underline" href="#projects">See my work</a>
              </div>
            </header>
            <div className="build-grid">
              {buildCards.map((card, index) => (
                <article className="build-card reveal" key={card.title} style={{ transitionDelay: `${index * 60}ms` }}>
                  <div className="thumb">
                    <img src={card.image} alt="" loading="lazy" />
                  </div>
                  <div className="build-meta">
                    <span>{card.meta}</span>
                    <span className="index">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
            <div className="build-cta reveal">
              <div>
                <h3>Not sure what you need? Tell me about your idea — I&rsquo;ll shape the rest.</h3>
                <p>Internships, freelance builds and collaborations welcome.</p>
              </div>
              <a className="btn btn-primary" href="#contact">Start a conversation</a>
            </div>
          </div>
        </section>

        <section className="marquee-section">
          <p className="eyebrow">Tools I build with</p>
          <div className="marquee" aria-hidden="true">
            <ul>
              {techMarquee.map((tech) => <li key={tech}>{tech}</li>)}
            </ul>
            <ul>
              {techMarquee.map((tech) => <li key={tech}>{tech}</li>)}
            </ul>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container-x">
            <header className="section-head reveal">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2 className="display-2">Work that ships and solves.</h2>
              </div>
              <div className="head-aside">
                <a className="link-underline" href={githubUrl} target="_blank" rel="noreferrer">All projects</a>
              </div>
            </header>
            <div className="work-grid">
              {projects.map((project) => (
                <article className="project-card reveal" key={project.title}>
                  <div className="thumb">
                    <img src={project.image} alt="" loading="lazy" />
                    <span className="chip">{project.chip}</span>
                  </div>
                  <div className="project-head">
                    <h3>{project.title}</h3>
                    <span className="year">{project.year}</span>
                  </div>
                  <p className="project-meta">{project.category}</p>
                  <p className="project-desc">{project.text}</p>
                  {project.features.length > 0 && (
                    <ul className="feature-list">
                      {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                    </ul>
                  )}
                  {project.tags.length > 0 && (
                    <div className="tags">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  )}
                  <div className="project-actions">
                    <a className="btn btn-primary small" href={project.demo} target="_blank" rel="noreferrer">
                      Live demo <Icon name="external" size={15} />
                    </a>
                    <a className="link-underline" href={githubUrl} target="_blank" rel="noreferrer">
                      <Icon name="github" size={17} /> GitHub
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Skills />

        <section className="section stats-section">
          <div className="container-x">
            <header className="section-head reveal">
              <div>
                <p className="eyebrow">By the numbers</p>
                <h2 className="display-2">Early in the journey. Building at full commitment.</h2>
              </div>
            </header>
            <div className="stats-grid">
              {stats.map((stat) => (
                <Stat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section journey">
          <div className="container-x">
            <header className="section-head reveal">
              <div>
                <p className="eyebrow">My journey</p>
                <h2 className="display-2">Learning by building.</h2>
              </div>
              <div className="head-aside">
                <a className="link-underline" href="#contact">Get in touch</a>
              </div>
            </header>
            <div className="journey-grid">
              {journey.map((item, index) => (
                <article className="journey-card reveal" key={item.title} style={{ transitionDelay: `${index * 60}ms` }}>
                  <p className="meta">{item.meta}</p>
                  <h3>{item.title}</h3>
                  <p className="body">{item.text}</p>
                  {item.tags.length > 0 && (
                    <div className="tags">
                      {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <Quotes />

        <Contact />
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <div>
            <p className="eyebrow" style={{ color: "var(--bronze)" }}>Let&rsquo;s begin</p>
            <h2 className="display-2" style={{ marginTop: "1rem" }}>Have an idea worth building?</h2>
          </div>
          <a className="btn btn-cream" href="#contact">Start a conversation</a>
        </div>
        <div className="footer-links">
          <div className="footer-group">
            <h4>Studio</h4>
            <ul>
              {navigation.map((item) => (
                <li key={item}><a href={`#${item.toLowerCase()}`}>{item}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-group">
            <h4>Work</h4>
            <ul>
              <li><a href="#projects">Selected work</a></li>
              <li><a href="#experience">Journey</a></li>
              <li><a href="#skills">Toolkit</a></li>
              <li><a href={githubUrl} target="_blank" rel="noreferrer">GitHub profile</a></li>
            </ul>
          </div>
          <div className="footer-group">
            <h4>Connect</h4>
            <ul>
              <li><a href={linkedInUrl} target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href={`mailto:${contactEmail}`}>Email</a></li>
              {resumeAvailable && <li><a href={resumePath} target="_blank" rel="noreferrer">Resume</a></li>}
              <li><a href="#home">Back to top</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="socials">
            <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" size={18} /></a>
            <a href={linkedInUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={18} /></a>
            <a href={`mailto:${contactEmail}`} aria-label="Email"><Icon name="mail" size={18} /></a>
          </div>
          <p>© 2026 Akash Rajput. Software Developer.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
