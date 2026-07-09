import { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  Mail, Phone, Linkedin, ArrowRight, Menu, X, Target, TrendingUp,
  Users, Database, Sparkles, GraduationCap, BookOpen, Compass,
  Layers, CheckCircle2, MapPin, Quote, ChevronRight
} from "lucide-react";

/* =========================================================
   DATA
   ========================================================= */
const PHOTO = "data:image/jpeg;base64,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feBBqCZsuR26UmMiErhcjHp0pwkc84WmbcIfrSg4pAOMpHYUtqMlqibvU1twppATE8VH1antTVxmmA/tSfyozRmgBwNKDTBTxnNADwMUjVIkEr9EP1PFTJYk/fbHsKAuVAOcYrU8PSrZarFcXETPbgMrgDqCpH9aSO3jj+6vPqakpTgpRcX1HCo4SUluimumQCd5TlssSFPQVc60UVaViG29wooooEFFFAoAKKKKACiiigAooooAKKKKACikpRQAUUUUAGaKKSgBaKKKACiiigAoooxTAKKKKQBRRiigAxRS0lACUUuKMUAFFBpKAFooNFABRRRQAUUUtACUYoooAKKUCkoAKKMUYoAKKKKAEZQ3UA/WoJLG3kOTGAfUHFWMUUAUX0qJh8ruP1qE6OwPyzD8RWpRiiw7mM2jz54eM/iakh02eNSDs69jWrijFKwXMxrCY9l/OgadNnJKfnWniiiwXM8ac/d1H0p66av8Uh/AVcop2C5AllCv8Jb6mpljRPuqo+gpaUUAFFFFAgooooAKKKKADNFFFABS0lLQAUlLRQAlFFFAC0lLRQAlFFLQA2loooAKKWigBKKWkoASloxRQAUUUUAf/9k=";

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
          <Reveal className="sec-head"><div className="eyebrow">Founding Team</div><h2>Built by three people who care where it lands.</h2></Reveal>
          <div className="grid3">
            <Reveal className="card"><h3 style={{ fontSize: 18 }}>Oneir Raza</h3><p style={{ color: "var(--violet)", fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Co-Founder</p><p>Cambridge MPhil, Chevening Scholar. Policy, EdTech, and partnerships across CERP, Tabadlab, and Remoto.</p></Reveal>
            <Reveal className="card" delay={80}><h3 style={{ fontSize: 18 }}>Adeel Nisar</h3><p style={{ color: "var(--violet)", fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Head of Technology</p><p>Leads product engineering and the assessment &amp; matching engine that powers Manzil.</p></Reveal>
            <Reveal className="card" delay={160}><h3 style={{ fontSize: 18 }}>Alishba Rizwan</h3><p style={{ color: "var(--violet)", fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Research Associate</p><p>Drives the psychometric research and university/scholarship data behind every recommendation.</p></Reveal>
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
            <Reveal className="card" delay={160}><div className="icon"><Linkedin size={20} /></div><h3>LinkedIn</h3><p><a href="#" style={{ color: "var(--violet)", fontWeight: 600 }}>Oneir Raza</a></p></Reveal>
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
