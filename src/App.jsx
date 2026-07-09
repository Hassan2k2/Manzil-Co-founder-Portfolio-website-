import photo from './assets/WhatsApp_Image_2026-03-10_at_11.42.43_PM-removebg-preview.png';
import { motion } from 'framer-motion';
import './index.css';
import femaleCofounderPic from './assets/ChatGPT Image Jun 25, 2026, 12_04_01 PM.png';
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  Mail, Phone, User, ArrowRight, Menu, X, Target, TrendingUp,
  Users, Database, Sparkles, GraduationCap, BookOpen, Compass,
  Layers, CheckCircle2, MapPin, Quote, ChevronRight
} from "lucide-react";

/* =========================================================
   DATA
   ========================================================= */
const PHOTO = femaleCofounderPic;

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "manzil", label: "Manzil" },
  { id: "contact", label: "Contact" },
];

const EXPERIENCE = [
  {
    when: "Sept 2016 – Aug 2020", tag: "Education",
    title: "Bachelor's in International Relations",
    org: "National Defence University, Islamabad",
    bullets: ["Awarded the Merit Award and Chancellor's Gold Medal for the highest GPA in the graduating class."],
  },
  {
    when: "Sept 2020 – June 2022", tag: "Teach for Pakistan",
    title: "Teaching and Leadership Fellow",
    org: "Islamabad, Pakistan",
    bullets: [
      "Selected for an internationally recognised fellowship with a 3% acceptance rate.",
      "Raised average formative math and English scores from 40% to 75% across partner classrooms.",
      "Built a community literacy project reaching 1,200+ children; raised PKR 600,000 through targeted networking.",
      "Liaised with 20+ stakeholders to lead a community library-building partnership.",
    ],
  },
  {
    when: "July 2022 – Dec 2022", tag: "Remoto",
    title: "Communications and Partnerships Lead",
    org: "Madrid, Spain",
    bullets: [
      "Prospected 50+ strategic innovation and research partnerships across Europe, the UK, and the US.",
      "Strengthened internal tracking systems across remote, cross-functional teams.",
    ],
  },
  {
    when: "Jan 2023 – Aug 2023", tag: "Tabadlab",
    title: "Associate, Policy and Communications",
    org: "Islamabad, Pakistan",
    bullets: [
      "Grew stakeholder engagement 40% with federal ministries, private actors, and donors (World Bank, BMGF).",
      "Ran a policy dialogue roadmap across 20+ stakeholders, producing 10 reform recommendations.",
      "Authored the policy brief \u201cIslahati Jaiza: Punjab Education Sector Reforms.\u201d",
      "Grew organizational reach and public-sector voice by 80% via digital advocacy campaigns.",
    ],
  },
  {
    when: "Oct 2023 – Jul 2024", tag: "Education",
    title: "MPhil, Education, Globalisation & International Development",
    org: "University of Cambridge, United Kingdom",
    bullets: [
      "Fully-funded Chevening Scholar.",
      "Published research on gender differences in EdTech use in developing economies.",
    ],
  },
  {
    when: "Oct 2024 – Present", tag: "CERP", current: true,
    title: "Project Manager",
    org: "Centre for Economic Research and Policy, Lahore",
    bullets: [
      "Lead M&E system design for a public-school EdTech intervention across 341 schools.",
      "Map the regional EdTech landscape and assess AI-readiness for government partners.",
      "Manage multi-source data (Stata, SQL, Excel, NVivo) for 10,000+ participants.",
      "Translate technical data into policy briefs and dashboards for senior decision-makers.",
    ],
  },
];

/* =========================================================
   STYLES
   ========================================================= */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

  :root{
    --ink: #150B33;
    --ink2: #1B0F3D;
    --violet: #5B2EE0;
    --violet-soft: #7C5CF0;
    --coral: #FF6B4A;
    --lavender: #EDE6FB;
    --lavender-deep: #DCCCFB;
    --paper: #FAF8FF;
    --line: rgba(21,11,51,0.12);
    --lineD: rgba(255,255,255,0.14);
    --soft: rgba(21,11,51,0.62);
    --softD: rgba(255,255,255,0.66);
  }
  .prx *{ box-sizing:border-box; }
  .prx{
    font-family:'Inter',sans-serif;
    background:var(--paper);
    color:var(--ink);
    line-height:1.6;
    overflow-x:hidden;
    -webkit-font-smoothing:antialiased;
  }
  .prx h1,.prx h2,.prx h3,.prx h4{ font-family:'Fraunces',serif; font-weight:600; letter-spacing:-0.01em; margin:0; }
  .prx a{ color:inherit; }
  .wrap{ max-width:1180px; margin:0 auto; padding:0 32px; }
  .mono{ font-family:'Space Mono',monospace; }

  .eyebrow{ font-family:'Space Mono',monospace; font-size:12.5px; letter-spacing:.14em; text-transform:uppercase; color:var(--coral); display:inline-flex; align-items:center; gap:10px; }
  .eyebrow::before{ content:""; width:22px; height:1px; background:var(--coral); }

  @keyframes pageIn{ from{ opacity:0; transform:translateY(18px);} to{ opacity:1; transform:none; } }
  .page-enter{ animation:pageIn .55s cubic-bezier(.22,1,.36,1) both; }

  .reveal{ opacity:0; transform:translateY(26px); transition:opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
  .reveal.in{ opacity:1; transform:none; }

  .nav{ position:sticky; top:0; z-index:100; background:rgba(250,248,255,0.86); backdrop-filter:blur(12px); border-bottom:1px solid var(--line); }
  .navrow{ display:flex; align-items:center; justify-content:space-between; height:76px; }
  .brand{ display:flex; align-items:center; gap:11px; font-family:'Fraunces',serif; font-size:19px; font-weight:600; cursor:pointer; background:none; border:none; color:var(--ink); }
  .navlinks{ display:flex; gap:8px; position:relative; align-items:center; }
  .navlink{ position:relative; background:none; border:none; cursor:pointer; padding:9px 16px; font-size:14.5px; font-weight:500; color:var(--soft); font-family:'Inter',sans-serif; z-index:2; border-radius:100px; transition:color .3s ease; }
  .navlink.active{ color:var(--ink); }
  .navlink:hover{ color:var(--ink); }
  .navindicator{ position:absolute; top:6px; bottom:6px; background:var(--lavender); border-radius:100px; transition:left .4s cubic-bezier(.22,1,.36,1), width .4s cubic-bezier(.22,1,.36,1); z-index:1; }
  .navcta{ background:var(--ink); color:#fff; padding:10px 20px; border-radius:100px; font-size:14px; font-weight:600; border:none; cursor:pointer; display:flex; align-items:center; gap:6px; font-family:'Inter',sans-serif; transition:transform .25s ease; }
  .navcta:hover{ transform:translateY(-2px); }
  .navtoggle{ display:none; background:none; border:none; cursor:pointer; }

  @media (max-width:860px){
    .navlinks{ position:fixed; inset:76px 0 0 0; background:var(--paper); flex-direction:column; align-items:stretch; padding:26px 32px; gap:6px; transform:translateX(100%); transition:transform .4s cubic-bezier(.22,1,.36,1); }
    .navlinks.open{ transform:translateX(0); }
    .navindicator{ display:none; }
    .navlink{ text-align:left; font-size:19px; padding:14px 6px; border-bottom:1px solid var(--line); border-radius:0; }
    .navtoggle{ display:flex; }
    .navcta{ display:none; }
    .navlinks .navcta{ display:flex; margin-top:14px; justify-content:center; }
  }

  .btn{ display:inline-flex; align-items:center; gap:9px; padding:15px 28px; border-radius:100px; font-weight:600; font-size:14.5px; border:none; cursor:pointer; font-family:'Inter',sans-serif; transition:transform .2s ease, box-shadow .2s ease; }
  .btn-primary{ background:var(--coral); color:#fff; box-shadow:0 10px 30px -10px rgba(255,107,74,.6); }
  .btn-primary:hover{ box-shadow:0 16px 38px -8px rgba(255,107,74,.72); }
  .btn-ghost{ border:1px solid var(--lineD); color:#fff; background:transparent; }
  .btn-ghost:hover{ background:rgba(255,255,255,.08); }
  .btn-ghost-light{ border:1px solid var(--line); color:var(--ink); background:transparent; }
  .btn-ghost-light:hover{ background:rgba(21,11,51,.05); }

  .hero{ position:relative; background:radial-gradient(120% 140% at 78% 8%, #2A1966 0%, var(--ink2) 46%, var(--ink) 100%); color:#fff; overflow:hidden; padding:64px 0 96px; }
  .hero .glow{ position:absolute; inset:0; z-index:1; pointer-events:none; transition:background .15s ease; }
  .hero .wrap{ display:grid; grid-template-columns:1.25fr .85fr; gap:50px; align-items:center; position:relative; z-index:3; }
  .hero.center-hero .wrap{ grid-template-columns:1fr; }
  .hero h1{ font-size:clamp(38px,5.4vw,64px); line-height:1.06; color:#fff; }
  .hero h1 em{ font-style:italic; color:var(--lavender-deep); }
  .hero p.lead{ margin-top:22px; max-width:480px; color:var(--softD); font-size:17.5px; }
  .hero-actions{ display:flex; gap:16px; margin-top:36px; flex-wrap:wrap; }
  .hero-photo{ position:relative; display:flex; justify-content:center; }
  .ring{ position:absolute; inset:-14px; border-radius:50%; border:1.5px solid rgba(255,255,255,.22); animation:spin 26s linear infinite; }
  .ring::before{ content:""; position:absolute; top:-4px; left:50%; width:8px; height:8px; margin-left:-4px; background:var(--coral); border-radius:50%; }
  @keyframes spin{ to{ transform:rotate(360deg); } }
  .hero-photo img{ width:min(340px,78vw); height:min(340px,78vw); object-fit:cover; border-radius:50%; border:4px solid rgba(255,255,255,.12); }
  .hero-path{ position:absolute; inset:0; z-index:1; opacity:.55; }
  .hero-path path{ fill:none; stroke:url(#pathGrad); stroke-width:1.4; }

  @media (max-width:760px){
    .hero .wrap{ grid-template-columns:1fr; text-align:center; }
    .hero p.lead{ margin-left:auto; margin-right:auto; }
    .hero-actions{ justify-content:center; }
    .hero-photo{ order:-1; }
  }

  .statstrip{ background:var(--ink); border-top:1px solid var(--lineD); }
  .statstrip .wrap{ display:grid; grid-template-columns:repeat(4,1fr); padding:30px 32px; }
  .stat{ text-align:center; color:#fff; }
  .stat .num{ font-family:'Space Mono',monospace; font-size:clamp(22px,2.6vw,30px); color:var(--lavender-deep); }
  .stat .label{ margin-top:6px; font-size:12.5px; color:var(--softD); text-transform:uppercase; letter-spacing:.06em; }
  @media (max-width:760px){ .statstrip .wrap{ grid-template-columns:repeat(2,1fr); gap:26px 0; } }

  .sec{ padding:100px 0; }
  .sec-head{ max-width:640px; margin-bottom:56px; }
  .sec-head h2{ font-size:clamp(28px,3.4vw,42px); margin-top:16px; }
  .sec-head p{ margin-top:16px; color:var(--soft); font-size:16.5px; }
  .dark{ background:var(--ink2); color:#fff; }
  .dark .sec-head p{ color:var(--softD); }
  .tint{ background:var(--lavender); }
  .center{ text-align:center; margin-left:auto; margin-right:auto; }

  .grid3{ display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
  .grid2{ display:grid; grid-template-columns:repeat(2,1fr); gap:26px; }
  @media (max-width:900px){ .grid3{ grid-template-columns:1fr; } .grid2{ grid-template-columns:1fr; } }

  .card{ background:#fff; border:1px solid var(--line); border-radius:20px; padding:32px; transition:transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease; }
  .card:hover{ transform:translateY(-7px); box-shadow:0 26px 50px -22px rgba(21,11,51,.2); }
  .card .icon{ width:46px; height:46px; border-radius:12px; background:var(--lavender); display:flex; align-items:center; justify-content:center; margin-bottom:20px; color:var(--violet); }
  .card h3{ font-size:19px; margin-bottom:9px; }
  .card p{ color:var(--soft); font-size:15px; margin:0; }
  .dark .card{ background:rgba(255,255,255,.04); border-color:var(--lineD); }
  .dark .card p{ color:var(--softD); }
  .dark .card .icon{ background:rgba(255,255,255,.08); color:var(--lavender-deep); }

  .tag{ display:inline-block; font-family:'Space Mono',monospace; font-size:12px; padding:7px 14px; border-radius:100px; background:var(--lavender); color:var(--violet); margin:4px 6px 4px 0; }

  blockquote{ font-family:'Fraunces',serif; font-size:clamp(22px,2.6vw,30px); font-style:italic; line-height:1.4; margin:0; color:var(--ink); }
  .dark blockquote{ color:#fff; }

  .pathway{ position:relative; padding-left:56px; }
  .pathway-line{ position:absolute; left:14px; top:0; bottom:0; width:2px; background:linear-gradient(to bottom, var(--violet), var(--coral) 96%); transform-origin:top; transform:scaleY(0); transition:transform 1.6s cubic-bezier(.22,1,.36,1); }
  .pathway-line.in{ transform:scaleY(1); }
  .waypoint{ position:relative; margin-bottom:60px; }
  .waypoint:last-child{ margin-bottom:0; }
  .waypoint::before{ content:""; position:absolute; left:-56px; top:6px; width:14px; height:14px; border-radius:50%; background:var(--paper); border:3px solid var(--violet); z-index:2; }
  .waypoint.current::before{ background:var(--coral); border-color:var(--coral); box-shadow:0 0 0 6px rgba(255,107,74,.16); }
  .wp-meta{ display:flex; align-items:baseline; gap:12px; flex-wrap:wrap; font-family:'Space Mono',monospace; font-size:12.5px; color:var(--coral); text-transform:uppercase; letter-spacing:.08em; margin-bottom:10px; }
  .waypoint h3{ font-size:22px; }
  .waypoint .org{ color:var(--violet); font-weight:600; font-family:'Inter',sans-serif; font-size:15.5px; margin-top:4px; }
  .waypoint ul{ margin:16px 0 0; padding-left:20px; color:var(--soft); font-size:15px; }
  .waypoint li{ margin-bottom:8px; }

  .mockup{ background:var(--ink2); border-radius:18px; border:1px solid var(--lineD); padding:22px; height:100%; }
  .mockup .bar{ display:flex; gap:6px; margin-bottom:16px; }
  .mockup .dot{ width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,.2); }
  .mockup .row{ height:10px; border-radius:6px; background:rgba(255,255,255,.1); margin-bottom:10px; }
  .mockup .chip{ display:inline-block; padding:6px 12px; border-radius:100px; background:rgba(124,92,240,.25); color:var(--lavender-deep); font-family:'Space Mono',monospace; font-size:11px; margin:8px 4px 0 0; }
  .flowline{ display:flex; align-items:center; justify-content:center; gap:10px; flex-wrap:wrap; font-family:'Space Mono',monospace; font-size:13px; }
  .fnode{ background:#fff; border:1px solid var(--line); border-radius:100px; padding:10px 18px; font-weight:600; color:var(--ink); }
  .farrow{ color:var(--coral); font-size:18px; }
  .weightbar{ height:10px; border-radius:6px; background:var(--lavender); overflow:hidden; }
  .weightseg{ height:100%; width:0; transition:width 1.2s cubic-bezier(.22,1,.36,1); }

  footer{ background:var(--ink); color:var(--softD); padding:60px 0 34px; }
  .footrow{ display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:30px; }
  footer h3{ color:#fff; font-size:24px; margin-bottom:12px; }
  .footlinks{ display:flex; gap:10px; flex-wrap: wrap;}
  .footlinks button{ background:none; border:none; color:var(--softD); cursor:pointer; font-size:14.5px; font-family:'Inter',sans-serif; padding:4px 8px; }
  .footlinks button:hover{ color:#fff; }
  .footbottom{ border-top:1px solid var(--lineD); margin-top:40px; padding-top:24px; font-size:13px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px; }

  @media (prefers-reduced-motion: reduce){
    .reveal, .page-enter, .pathway-line, .ring, .weightseg{ transition:none !important; animation:none !important; }
  }
`;

/* =========================================================
   HELPERS
   ========================================================= */
function Reveal({ children, className = "", delay = 0, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${vis ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

function StatCounter({ target, suffix = "", label }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        const dur = 1400;
        const start = performance.now();
        function tick(now) {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(target * eased);
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return (
    <div ref={ref} className="stat">
      <div className="num">{Math.round(val)}{suffix}</div>
      <div className="label">{label}</div>
    </div>
  );
}

function MagBtn({ children, onClick, variant = "primary", href }) {
  const ref = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.18;
    const y = (e.clientY - r.top - r.height / 2) * 0.35;
    setT({ x, y });
  };
  const leave = () => setT({ x: 0, y: 0 });
  const cls = variant === "primary" ? "btn btn-primary" : variant === "ghost" ? "btn btn-ghost" : "btn btn-ghost-light";
  const style = { transform: `translate(${t.x}px, ${t.y}px)` };
  if (href) {
    return <a ref={ref} href={href} className={cls} style={style} onMouseMove={move} onMouseLeave={leave}>{children}</a>;
  }
  return <button ref={ref} className={cls} style={style} onMouseMove={move} onMouseLeave={leave} onClick={onClick}>{children}</button>;
}

function Logo() {
  return (
    <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
      <path d="M4 26 L13 10 L19 20 L28 6" stroke="#5B2EE0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="6" r="2.4" fill="#FF6B4A" />
    </svg>
  );
}

function HeroPath({ variant = 1 }) {
  const ref = useRef(null);
  useEffect(() => {
    const paths = ref.current.querySelectorAll("path");
    paths.forEach((p, i) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      p.animate(
        [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
        { duration: 2600 + i * 400, easing: "ease-out", fill: "forwards", delay: i * 200 }
      );
    });
  }, []);
  return (
    <svg ref={ref} className="hero-path" viewBox="0 0 1200 700" preserveAspectRatio="none">
      <defs>
        <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7C5CF0" />
          <stop offset="1" stopColor="#FF6B4A" />
        </linearGradient>
      </defs>
      {variant === 1 && <>
        <path d="M-50 560 C 200 620, 300 420, 520 460 S 820 300, 950 340 S 1150 120, 1300 160" />
        <path d="M-80 200 C 150 160, 320 260, 480 180 S 780 60, 1250 120" opacity="0.6" />
      </>}
      {variant === 2 && <path d="M-50 560 C 200 620, 300 420, 520 460 S 820 300, 950 340 S 1150 120, 1300 160" />}
      {variant === 3 && <path d="M-50 200 C 200 260, 300 60, 520 100 S 820 260, 1300 180" />}
    </svg>
  );
}

function Hero({ children, variant = 1, glow = true, centered = false, style = {} }) {
  const [pos, setPos] = useState({ x: 50, y: 20 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };
  return (
    <header className={`hero ${centered ? "center-hero" : ""}`} style={style} onMouseMove={glow ? onMove : undefined}>
      <HeroPath variant={variant} />
      {glow && <div className="glow" style={{ background: `radial-gradient(560px circle at ${pos.x}% ${pos.y}%, rgba(124,92,240,0.28), transparent 45%)` }} />}
      <div className="wrap">{children}</div>
    </header>
  );
}

function NavBar({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const linkRefs = useRef({});
  const containerRef = useRef(null);
  const [ind, setInd] = useState({ left: 0, width: 0, opacity: 0 });

  useLayoutEffect(() => {
    const el = linkRefs.current[page];
    const cont = containerRef.current;
    if (el && cont && window.innerWidth > 860) {
      const r = el.getBoundingClientRect();
      const cr = cont.getBoundingClientRect();
      setInd({ left: r.left - cr.left, width: r.width, opacity: 1 });
    } else {
      setInd((i) => ({ ...i, opacity: 0 }));
    }
  }, [page]);

  const go = (id) => { setPage(id); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <nav className="nav">
      <div className="wrap navrow">
        <button className="brand" onClick={() => go("home")}>
          <Logo /> Oneir Raza
        </button>
        <div className={`navlinks ${open ? "open" : ""}`} ref={containerRef}>
          <div className="navindicator" style={{ left: ind.left, width: ind.width, opacity: ind.opacity }} />
          {NAV_ITEMS.slice(0, 4).map((item) => (
            <button
              key={item.id}
              ref={(el) => (linkRefs.current[item.id] = el)}
              className={`navlink ${page === item.id ? "active" : ""}`}
              onClick={() => go(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button className="navcta" onClick={() => go("contact")}>Get in touch <ArrowRight size={14} /></button>
        </div>
        <button className="navtoggle" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
}

function Footer({ setPage }) {
  const go = (id) => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <footer>
      <div className="wrap footrow">
        <div>
          <h3>Oneir Raza</h3>
          <p style={{ maxWidth: 320 }}>Global partnerships &amp; EdTech strategy. Co-Founder, Manzil.</p>
        </div>
        <div className="footlinks">
          {NAV_ITEMS.filter((n) => n.id !== "home").map((n) => (
            <button key={n.id} onClick={() => go(n.id)}>{n.label}</button>
          ))}
        </div>
      </div>
      <div className="wrap footbottom">
        <span>© 2026 Oneir Raza</span>
        <span>oneirraza@gmail.com</span>
      </div>
    </footer>
  );
}

/* =========================================================
   PAGES
   ========================================================= */
function HomePage({ setPage }) {
  return (
    <div className="page-enter">
      <Hero variant={1}>
        <div>
          <Reveal><div className="eyebrow">Global Partnerships &amp; EdTech Strategy</div></Reveal>
          <Reveal delay={80}><h1>Turning <em>guesswork</em><br />into a guided path.</h1></Reveal>
          <Reveal delay={160}><p className="lead">Cambridge-trained development professional working across policy, data, and EdTech — currently building Manzil, an AI-guided academic &amp; career pathway platform for Pakistan's 22 million high school students.</p></Reveal>
          <Reveal delay={240}>
            <div className="hero-actions">
              <MagBtn variant="primary" onClick={() => setPage("manzil")}>See what I'm building <ArrowRight size={16} /></MagBtn>
              <MagBtn variant="ghost" onClick={() => setPage("about")}>Read my story</MagBtn>
            </div>
          </Reveal>
        </div>
        <div className="hero-photo">
          <div className="ring" />
          <img src={PHOTO} alt="Oneir Raza" />
        </div>
      </Hero>

      <div className="statstrip">
        <div className="wrap">
          <StatCounter target={4} suffix="+ yrs" label="Int'l Development" />
          <StatCounter target={341} suffix="" label="Public Schools, M&E" />
          <StatCounter target={10000} suffix="+" label="Participants Tracked" />
          <StatCounter target={1} suffix=" MPhil" label="Cambridge, Chevening" />
        </div>
      </div>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">What I do</div>
            <h2>Three threads, one thread of work.</h2>
            <p>Whether it's a federal ministry, a global foundation, or a first-time founder's product roadmap, the job is the same: read the system, find where it's stuck, and build the bridge.</p>
          </Reveal>
          <div className="grid3">
            <Reveal className="card" delay={0}>
              <div className="icon"><Users size={22} /></div>
              <h3>Partnerships &amp; Strategy</h3>
              <p>Managing high-stakes relationships with federal ministries, the World Bank, and the Bill &amp; Melinda Gates Foundation.</p>
            </Reveal>
            <Reveal className="card" delay={100}>
              <div className="icon"><Database size={22} /></div>
              <h3>Data &amp; M&amp;E</h3>
              <p>Designing monitoring &amp; evaluation systems for large-scale EdTech interventions across 341 schools and 10,000+ participants.</p>
            </Reveal>
            <Reveal className="card" delay={200}>
              <div className="icon"><Sparkles size={22} /></div>
              <h3>EdTech &amp; AI</h3>
              <p>Mapping the regional EdTech landscape and translating what's technically possible into what's operationally useful.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="dark sec">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <Reveal>
            <div className="eyebrow">Co-Founder</div>
            <h2 style={{ marginTop: 16, fontSize: "clamp(28px,3.2vw,40px)" }}>Manzil — a destination, built for 22M students who don't have a map yet.</h2>
            <p style={{ color: "var(--softD)", marginTop: 18, fontSize: 16.5 }}>Pakistan has almost no structured career guidance infrastructure. Manzil replaces guesswork with a psychometric engine — interests, values, personality — matched against real, affordable university and scholarship pathways.</p>
            <div style={{ marginTop: 28 }}>
              <MagBtn variant="primary" onClick={() => setPage("manzil")}>Explore the Manzil story <ArrowRight size={16} /></MagBtn>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Reveal className="card" delay={0}><h3 style={{ fontSize: 17 }}>The Problem</h3><p>22M+ students, near-zero counselling, PKR 200K+ private consultants.</p></Reveal>
            <Reveal className="card" delay={100}><h3 style={{ fontSize: 17 }}>The Engine</h3><p>RIASEC + Schwartz Values + Big Five → a weighted match score for every major and career.</p></Reveal>
            <Reveal className="card" delay={200}><h3 style={{ fontSize: 17 }}>The Traction</h3><p>Live MVP, a Karachi school pilot, and a Federal Ministry of Education partnership.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="tint sec">
        <div className="wrap center" style={{ maxWidth: 720 }}>
          <Reveal><blockquote>"The gap isn't a lack of care — it's a lack of infrastructure. That's what I build."</blockquote></Reveal>
          <Reveal delay={120} style={{ marginTop: 28 }}><MagBtn variant="ghostlight" onClick={() => setPage("contact")}>Let's talk <ArrowRight size={16} /></MagBtn></Reveal>
        </div>
      </section>
    </div>
  );
}

function AboutPage({ setPage }) {
  return (
    <div className="page-enter">
      <Hero variant={2} style={{ paddingBottom: 70 }}>
        <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 40, alignItems: "center" }}>
          <div>
            <Reveal><div className="eyebrow">About</div></Reveal>
            <Reveal delay={80}><h1 style={{ fontSize: "clamp(34px,4.6vw,54px)" }}>Reading systems, then building what's missing.</h1></Reveal>
            <Reveal delay={160}><p className="lead" style={{ maxWidth: 560 }}>Oneir Raza is a global partnerships and strategy professional with a Cambridge MPhil and 4+ years navigating the intersection of educational technology, public policy, and international development — with a track record of managing high-stakes institutional relationships across federal ministries, academic institutions, and organizations including the World Bank and the Bill &amp; Melinda Gates Foundation.</p></Reveal>
          </div>
          <div className="hero-photo"><div className="ring" /><img src={PHOTO} alt="Oneir Raza" /></div>
        </div>
      </Hero>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head"><div className="eyebrow">Education</div><h2>Two campuses, one throughline.</h2></Reveal>
          <div className="grid2">
            <Reveal className="card">
              <div className="wp-meta">Oct 2023 – Jul 2024</div>
              <h3>MPhil in Education, Globalisation &amp; International Development</h3>
              <p className="org" style={{ color: "var(--violet)", fontWeight: 600, margin: "6px 0 14px" }}>University of Cambridge, United Kingdom</p>
              <p>Awarded the merit-based, fully-funded Chevening Scholarship. Published research on gender differences in EdTech use amongst students in developing economies.</p>
            </Reveal>
            <Reveal className="card" delay={100}>
              <div className="wp-meta">Sept 2016 – Aug 2020</div>
              <h3>Bachelor's in International Relations</h3>
              <p className="org" style={{ color: "var(--violet)", fontWeight: 600, margin: "6px 0 14px" }}>National Defence University, Islamabad</p>
              <p>Awarded the Merit Award and Chancellor's Gold Medal for the highest GPA in the graduating class.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="tint sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Approach</div>
            <h2>Translator between two worlds.</h2>
            <p>The recurring role across every job: standing between technical teams and institutional stakeholders, and making sure neither side loses the plot.</p>
          </Reveal>
          <div className="grid3">
            <Reveal className="card"><div className="icon"><CheckCircle2 size={20} /></div><h3>Rigor first</h3><p>Frameworks aligned to international donor requirements, not guesswork.</p></Reveal>
            <Reveal className="card" delay={100}><div className="icon"><Layers size={20} /></div><h3>Plain-language translation</h3><p>Dense technical data becomes summaries and dashboards decision-makers actually use.</p></Reveal>
            <Reveal className="card" delay={200}><div className="icon"><Users size={20} /></div><h3>Stakeholder-first</h3><p>Government counterparts and community members are collaborators, not audiences.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head"><div className="eyebrow">Skills &amp; Tools</div><h2>What's in the toolkit.</h2></Reveal>
          <div className="grid2">
            <Reveal className="card">
              <h3 style={{ marginBottom: 16 }}>Partnership &amp; Pipeline Management</h3>
              <div><span className="tag">Relationship Management</span><span className="tag">Stakeholder Coordination</span><span className="tag">Pipeline Development</span><span className="tag">CRM Management</span></div>
            </Reveal>
            <Reveal className="card" delay={80}>
              <h3 style={{ marginBottom: 16 }}>Data &amp; Tech</h3>
              <div><span className="tag">Python</span><span className="tag">SQL</span><span className="tag">Stata</span><span className="tag">NVivo</span><span className="tag">Advanced Excel</span><span className="tag">Figma</span><span className="tag">Salesforce</span></div>
            </Reveal>
            <Reveal className="card" delay={160}>
              <h3 style={{ marginBottom: 16 }}>AI &amp; EdTech Literacy</h3>
              <div><span className="tag">EdTech Readiness Assessment</span><span className="tag">Digital Transformation Frameworks</span><span className="tag">Advanced Prompting (ChatGPT, Gemini, Claude)</span></div>
            </Reveal>
            <Reveal className="card" delay={240}>
              <h3 style={{ marginBottom: 16 }}>Languages</h3>
              <div><span className="tag">English</span><span className="tag">Urdu</span><span className="tag">Hindi</span><span className="tag">Italian</span><span className="tag">Arabic</span></div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="dark sec">
        <div className="wrap center" style={{ maxWidth: 680 }}>
          <Reveal><div className="eyebrow" style={{ justifyContent: "center" }}>Next</div></Reveal>
          <Reveal delay={80}><h2 style={{ marginTop: 16, fontSize: "clamp(26px,3vw,36px)" }}>See the path that led here — job by job.</h2></Reveal>
          <Reveal delay={160} style={{ marginTop: 28 }}><MagBtn variant="primary" onClick={() => setPage("experience")}>View the full journey <ArrowRight size={16} /></MagBtn></Reveal>
        </div>
      </section>
    </div>
  );
}

function PathwayTimeline() {
  const wrapRef = useRef(null);
  const [lineIn, setLineIn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setLineIn(true); obs.disconnect(); } }, { threshold: 0.05 });
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div className="pathway" ref={wrapRef}>
      <div className={`pathway-line ${lineIn ? "in" : ""}`} />
      {EXPERIENCE.map((e, i) => (
        <Reveal key={i} delay={i * 60} className={`waypoint ${e.current ? "current" : ""}`}>
          <div className="wp-meta"><span>{e.when}</span><span>·</span><span>{e.tag}</span></div>
          <h3>{e.title}</h3>
          <div className="org">{e.org}</div>
          <ul>{e.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
        </Reveal>
      ))}
    </div>
  );
}

function ExperiencePage({ setPage }) {
  return (
    <div className="page-enter">
      <Hero variant={2} centered style={{ paddingBottom: 70 }}>
        <div className="center" style={{ maxWidth: 640 }}>
          <Reveal><div className="eyebrow" style={{ justifyContent: "center" }}>Experience</div></Reveal>
          <Reveal delay={80}><h1 style={{ fontSize: "clamp(34px,4.6vw,54px)" }}>Manzil means <em>destination</em>. Here's the road so far.</h1></Reveal>
          <Reveal delay={160}><p className="lead center">Six years, five stops, one direction — from a classroom in Islamabad to a co-founder's desk building the guidance system Pakistan never had.</p></Reveal>
        </div>
      </Hero>

      <section className="sec"><div className="wrap"><PathwayTimeline /></div></section>

      <section className="dark sec">
        <div className="wrap center" style={{ maxWidth: 680 }}>
          <Reveal><div className="eyebrow" style={{ justifyContent: "center" }}>What's next</div></Reveal>
          <Reveal delay={80}><h2 style={{ marginTop: 16, fontSize: "clamp(26px,3vw,36px)" }}>The current chapter is Manzil.</h2></Reveal>
          <Reveal delay={140}><p style={{ color: "var(--softD)", marginTop: 14 }}>Everything above — the M&amp;E rigor, the donor relationships, the policy translation — feeds directly into building it.</p></Reveal>
          <Reveal delay={220} style={{ marginTop: 28 }}><MagBtn variant="primary" onClick={() => setPage("manzil")}>Read the Manzil story <ArrowRight size={16} /></MagBtn></Reveal>
        </div>
      </section>
    </div>
  );
}

function WeightBar({ pct, color }) {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setW(pct); obs.disconnect(); } }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);
  return <div className="weightbar" ref={ref}><div className="weightseg" style={{ width: `${w}%`, background: color }} /></div>;
}

function ManzilPage({ setPage }) {
  return (
    <div className="page-enter">
      <Hero variant={3} centered>
        <div className="center" style={{ maxWidth: 700 }}>
          <Reveal><div className="eyebrow" style={{ justifyContent: "center" }}>Pakistan's First AI-Guided Academic &amp; Career Pathway Platform</div></Reveal>
          <Reveal delay={80}><h1 style={{ fontSize: "clamp(48px,8vw,88px)" }}>MANZIL</h1></Reveal>
          <Reveal delay={160}><p className="lead center" style={{ fontStyle: "italic", fontFamily: "'Fraunces',serif", fontSize: 19 }}>Choose your path. Pick your university. Start your journey.</p></Reveal>
          <Reveal delay={240}>
            <div className="hero-actions" style={{ justifyContent: "center" }}>
              <MagBtn variant="primary" onClick={() => setPage("contact")}>Partner with us <ArrowRight size={16} /></MagBtn>
              <MagBtn variant="ghost" href="#product">See the product</MagBtn>
            </div>
          </Reveal>
        </div>
      </Hero>

      <div className="statstrip">
        <div className="wrap">
          <StatCounter target={22} suffix="M+" label="High School Students" />
          <StatCounter target={5} suffix="M+" label="Preparing for University" />
          <StatCounter target={200} suffix="K+" label="PKR Cost of Consultants" />
          <StatCounter target={500} suffix="K" label="Urban Students, Year 1" />
        </div>
      </div>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">The Problem</div>
            <h2>Life-defining decisions, made with almost no guidance.</h2>
            <p>Most schools in Pakistan have no dedicated counselling staff. Elite private consultants charge upwards of PKR 200,000 — out of reach for nearly everyone.</p>
          </Reveal>
          <div className="grid2">
            <Reveal className="card"><h3>No Access to Guidance</h3><p>The majority of schools lack dedicated career counselling staff or structured advisory programs.</p></Reveal>
            <Reveal className="card" delay={80}><h3>Expensive Alternatives</h3><p>Elite consultants charge upwards of PKR 200,000 ($700+) per student — out of reach for most families.</p></Reveal>
            <Reveal className="card" delay={160}><h3>Information Asymmetry</h3><p>Students and parents have little credible information on university options, scholarships, or career paths.</p></Reveal>
            <Reveal className="card" delay={240}><h3>Cultural Narrowness</h3><p>Career aspirations are typically limited to "doctor, engineer, lawyer" — ignoring fields like data science and design.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="dark sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">The Assessment Engine</div>
            <h2>Not guesswork — three validated psychological frameworks, layered into one score.</h2>
            <p>Every major and career gets a single weighted match score, built from interests, values, and personality — in that order.</p>
          </Reveal>
          <Reveal className="flowline" style={{ marginBottom: 44 }}>
            <span className="fnode">Interests (RIASEC)</span><span className="farrow">→</span>
            <span className="fnode">Values (Schwartz)</span><span className="farrow">→</span>
            <span className="fnode">Personality (Big Five)</span><span className="farrow">→</span>
            <span className="fnode" style={{ background: "var(--coral)", color: "#fff", borderColor: "var(--coral)" }}>Ranked Majors &amp; Careers</span>
          </Reveal>
          <div className="grid3">
            <Reveal className="card"><h3 style={{ fontSize: 17 }}>50% Interests</h3><div style={{ margin: "14px 0" }}><WeightBar pct={100} color="var(--violet)" /></div><p>Holland RIASEC fit — the first and widest filter.</p></Reveal>
            <Reveal className="card" delay={100}><h3 style={{ fontSize: 17 }}>30% Values</h3><div style={{ margin: "14px 0" }}><WeightBar pct={60} color="var(--coral)" /></div><p>Schwartz dimensions rank by what genuinely motivates the student.</p></Reveal>
            <Reveal className="card" delay={200}><h3 style={{ fontSize: 17 }}>20% Personality</h3><div style={{ margin: "14px 0" }}><WeightBar pct={40} color="var(--lavender-deep)" /></div><p>Big Five traits fine-tune the final list by work style.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="sec" id="product">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Product Walkthrough</div>
            <h2>A live product, not a concept deck.</h2>
            <p>Every screen below ships today — the full loop from student discovery to school-level reporting.</p>
          </Reveal>
          <div className="grid2">
            <Reveal>
              <div className="mockup">
                <div className="bar"><div className="dot" /><div className="dot" /><div className="dot" /></div>
                <div className="row" style={{ height: 22, width: "40%" }} />
                <div className="row" style={{ marginTop: 14 }} />
                <div className="row" style={{ width: "55%" }} />
                <span className="chip">Interests</span><span className="chip">Values</span><span className="chip">Personality</span>
              </div>
              <h3 style={{ marginTop: 18, fontSize: 18 }}>Curriculum-first onboarding</h3>
              <p style={{ color: "var(--soft)", fontSize: 15 }}>National, Cambridge, or IB — eligibility is filtered from the first question, in English or Urdu.</p>
            </Reveal>
            <Reveal delay={100}>
              <div className="mockup">
                <div className="bar"><div className="dot" /><div className="dot" /><div className="dot" /></div>
                <div className="row" style={{ width: "80%" }} />
                <div className="row" style={{ width: "65%" }} />
                <div className="row" style={{ width: "70%" }} />
                <span className="chip">172 results</span><span className="chip">Filterable</span><span className="chip">Deadline-aware</span>
              </div>
              <h3 style={{ marginTop: 18, fontSize: 18 }}>Ranked university finder</h3>
              <p style={{ color: "var(--soft)", fontSize: 15 }}>Filter by country, city, budget, and major — ranked with admissions deadlines on every card.</p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mockup">
                <div className="bar"><div className="dot" /><div className="dot" /><div className="dot" /></div>
                <div className="row" style={{ width: "50%" }} />
                <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                  <div className="row" style={{ flex: 1, height: 36 }} />
                  <div className="row" style={{ flex: 1, height: 36 }} />
                </div>
                <span className="chip">5 scholarships</span><span className="chip">Direct apply</span>
              </div>
              <h3 style={{ marginTop: 18, fontSize: 18 }}>Deep university profiles</h3>
              <p style={{ color: "var(--soft)", fontSize: 15 }}>Deadlines, acceptance context, scholarships, and a direct application link.</p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mockup">
                <div className="bar"><div className="dot" /><div className="dot" /><div className="dot" /></div>
                <div style={{ display: "flex", gap: 10 }}>
                  <div className="row" style={{ flex: 1, height: 44 }} />
                  <div className="row" style={{ flex: 1, height: 44 }} />
                  <div className="row" style={{ flex: 1, height: 44 }} />
                </div>
                <div className="row" style={{ marginTop: 14, width: "90%" }} />
                <span className="chip">Invite code</span><span className="chip">CSV export</span>
              </div>
              <h3 style={{ marginTop: 18, fontSize: 18 }}>School dashboards</h3>
              <p style={{ color: "var(--soft)", fontSize: 15 }}>Live completion rates and a roster view of every student's match status.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="tint sec">
        <div className="wrap">
          <Reveal className="sec-head"><div className="eyebrow">Business Model</div><h2>Starts free. Monetizes the moment help is needed most.</h2></Reveal>
          <div className="grid3">
            <Reveal className="card"><h3 style={{ fontSize: 18 }}>01 · Free Entry</h3><p>Every student gets their top 3 recommended fields at no cost — the trust the model is built on.</p></Reveal>
            <Reveal className="card" delay={80}><h3 style={{ fontSize: 18 }}>02 · Premium</h3><p>Unlocks hidden careers, tailored university &amp; scholarship lists, and admissions requirements.</p></Reveal>
            <Reveal className="card" delay={160}><h3 style={{ fontSize: 18 }}>03 · Tutoring Marketplace</h3><p>Commission on booked sessions with verified tutors across SAT, MDCAT, ECAT, IELTS.</p></Reveal>
          </div>
          <div className="grid3" style={{ marginTop: 26 }}>
            <Reveal className="card"><h3 style={{ fontSize: 18 }}>04 · School Partnerships</h3><p>Bulk licensing of premium dashboards for cohort-level analytics.</p></Reveal>
            <Reveal className="card" delay={80} style={{ background: "var(--ink2)", borderColor: "transparent" }}><h3 style={{ fontSize: 18, color: "#fff" }}>Traction</h3><p style={{ color: "var(--softD)" }}>Live MVP · Karachi school pilot · Federal Ministry of Education partnership.</p></Reveal>
            <Reveal className="card" delay={160} style={{ background: "var(--coral)", borderColor: "transparent" }}><h3 style={{ fontSize: 18, color: "#fff" }}>The Moat</h3><p style={{ color: "rgba(255,255,255,0.85)" }}>A triangulated student + teacher + parent dataset no competitor in Pakistan holds.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="dark sec">
        <div className="wrap center" style={{ maxWidth: 700 }}>
          <Reveal><Quote size={26} color="var(--coral)" style={{ marginBottom: 16 }} /></Reveal>
          <Reveal delay={80}><blockquote>"A future where every student — regardless of city, income, or school — chooses their path with clarity, not guesswork."</blockquote></Reveal>
          <Reveal delay={160}><p style={{ color: "var(--softD)", marginTop: 20 }}>— Our Vision</p></Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head"><div className="eyebrow">Founding Team</div><h2>Built by people who care where it lands.</h2></Reveal>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Reveal className="card" style={{ maxWidth: '400px', textAlign: 'center' }}>
                <img src={femaleCofounderPic} alt="Oneir Raza" style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 20px', display: 'block' }} />
                <h3 style={{ fontSize: 22 }}>Oneir Raza</h3>
                <p style={{ color: "var(--violet)", fontWeight: 600, fontSize: 15, marginBottom: 14 }}>Co-Founder</p>
                <p>Cambridge MPhil, Chevening Scholar. Policy, EdTech, and partnerships across CERP, Tabadlab, and Remoto.</p>
              </Reveal>
            </div>
        </div>
      </section>

      <section className="tint sec">
        <div className="wrap center" style={{ maxWidth: 640 }}>
          <Reveal><h2 style={{ fontSize: "clamp(26px,3vw,36px)" }}>Interested in piloting Manzil, or partnering strategically?</h2></Reveal>
          <Reveal delay={100} style={{ marginTop: 28 }}><MagBtn variant="ghostlight" onClick={() => setPage("contact")}>Get in touch <ArrowRight size={16} /></MagBtn></Reveal>
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="page-enter">
      <Hero variant={3} centered style={{ paddingBottom: 90 }}>
        <div className="center" style={{ maxWidth: 640 }}>
          <Reveal><div className="eyebrow" style={{ justifyContent: "center" }}>Get in touch</div></Reveal>
          <Reveal delay={80}><h1 style={{ fontSize: "clamp(36px,5vw,56px)" }}>Let's build the next stretch of the path.</h1></Reveal>
          <Reveal delay={160}><p className="lead center">Open to conversations on EdTech partnerships, policy collaborations, and Manzil pilot programs with schools and institutions.</p></Reveal>
        </div>
      </Hero>

      <section className="sec" style={{ paddingTop: 0, marginTop: -60, position: "relative", zIndex: 3 }}>
        <div className="wrap">
          <div className="grid2">
            <Reveal className="card"><div className="icon"><Mail size={20} /></div><h3>Email</h3><p><a href="mailto:oneirraza@gmail.com" style={{ color: "var(--violet)", fontWeight: 600 }}>oneirraza@gmail.com</a></p></Reveal>
            <Reveal className="card" delay={80}><div className="icon"><Phone size={20} /></div><h3>Phone</h3><p><a href="tel:+923351599612" style={{ color: "var(--violet)", fontWeight: 600 }}>+92 335 1599612</a></p></Reveal>
            <Reveal className="card" delay={160}><div className="icon"><User size={20} /></div><h3>LinkedIn</h3><p><a href="#" style={{ color: "var(--violet)", fontWeight: 600 }}>Oneir Raza</a></p></Reveal>
            <Reveal className="card" delay={240}><div className="icon"><Target size={20} /></div><h3>Manzil Pilot Program</h3><p>Free for the first cohort of partner schools — no obligation after the pilot.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="dark sec">
        <div className="wrap center" style={{ maxWidth: 600 }}>
          <Reveal><div className="eyebrow" style={{ justifyContent: "center" }}>Currently</div></Reveal>
          <Reveal delay={80}><h2 style={{ marginTop: 16, fontSize: "clamp(24px,3vw,34px)" }}>Engaging with schools, education networks, and strategic partners across Pakistan.</h2></Reveal>
          <Reveal delay={160}><p style={{ color: "var(--softD)", marginTop: 18 }}>If you'd like to bring structured, evidence-based guidance to your students — or explore a partnership — I'd love to talk.</p></Reveal>
          <Reveal delay={240} style={{ marginTop: 30 }}><MagBtn variant="primary" href="mailto:oneirraza@gmail.com">Send an email <ArrowRight size={16} /></MagBtn></Reveal>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   APP
   ========================================================= */
export default function Portfolio() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (NAV_ITEMS.some((n) => n.id === hash)) setPage(hash);
  }, []);
  useEffect(() => {
    window.location.hash = page;
  }, [page]);

  const Page = { home: HomePage, about: AboutPage, experience: ExperiencePage, manzil: ManzilPage, contact: ContactPage }[page];

  return (
    <div className="prx">
      <style>{CSS}</style>
      <NavBar page={page} setPage={setPage} />
      <Page setPage={setPage} />
      <Footer setPage={setPage} />
    </div>
  );
}
