import photo from './assets/WhatsApp_Image_2026-03-10_at_11.42.43_PM-removebg-preview.png';
import femaleCofounderPic from './assets/ChatGPT Image Jun 25, 2026, 12_04_01 PM.png';
import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Mail, Phone, User, ArrowRight, Menu, X, Target, TrendingUp,
  Users, Database, Sparkles, GraduationCap, BookOpen, Compass,
  Layers, CheckCircle2, MapPin, Quote, ChevronRight, ExternalLink
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
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

  :root {
    --ink: #0d0820;
    --ink2: #130d2e;
    --violet: #6c3ce1;
    --violet-soft: #8b5cf6;
    --violet-glow: rgba(108,60,225,0.35);
    --coral: #ff6b4a;
    --coral-glow: rgba(255,107,74,0.3);
    --lavender: #ede9fb;
    --lavender-deep: #c4b5fd;
    --paper: #faf8ff;
    --line: rgba(21,11,51,0.10);
    --lineD: rgba(255,255,255,0.12);
    --soft: rgba(21,11,51,0.58);
    --softD: rgba(255,255,255,0.62);
    --glass: rgba(255,255,255,0.05);
    --glass-border: rgba(255,255,255,0.12);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  .prx {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  .prx h1, .prx h2, .prx h3, .prx h4 {
    font-family: 'Fraunces', serif;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .prx a { color: inherit; text-decoration: none; }

  /* ─── Layout ─── */
  .wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
  .mono { font-family: 'Space Mono', monospace; }

  /* ─── Eyebrow ─── */
  .eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 11.5px;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: var(--coral);
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .eyebrow::before { content: ""; width: 20px; height: 1px; background: var(--coral); flex-shrink: 0; }

  /* ─── Page enter ─── */
  @keyframes pageSlideIn { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:none; } }
  .page-enter { animation: pageSlideIn .5s cubic-bezier(.22,1,.36,1) both; }

  /* ─── Navbar ─── */
  .nav {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(250,248,255,0.9);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--line);
    transition: background .3s ease;
  }
  .nav.scrolled { background: rgba(250,248,255,0.97); box-shadow: 0 2px 24px rgba(21,11,51,0.06); }
  .navrow { display: flex; align-items: center; justify-content: space-between; height: 72px; }
  .brand {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Fraunces', serif; font-size: 18px; font-weight: 600;
    cursor: pointer; background: none; border: none; color: var(--ink);
    white-space: nowrap;
  }
  .navlinks {
    display: flex; gap: 4px; align-items: center; position: relative;
  }
  .navlink {
    position: relative; background: none; border: none; cursor: pointer;
    padding: 9px 15px; font-size: 14px; font-weight: 500; color: var(--soft);
    font-family: 'Inter', sans-serif; z-index: 2; border-radius: 100px;
    transition: color .25s ease; white-space: nowrap;
  }
  .navlink.active { color: var(--ink); font-weight: 600; }
  .navlink:hover { color: var(--ink); }
  .navindicator {
    position: absolute; top: 6px; bottom: 6px;
    background: var(--lavender); border-radius: 100px;
    transition: left .38s cubic-bezier(.22,1,.36,1), width .38s cubic-bezier(.22,1,.36,1);
    z-index: 1; pointer-events: none;
  }
  .navcta {
    background: var(--ink); color: #fff; padding: 9px 18px; border-radius: 100px;
    font-size: 13.5px; font-weight: 600; border: none; cursor: pointer;
    display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif;
    transition: transform .2s ease, background .2s ease; white-space: nowrap; margin-left: 4px;
  }
  .navcta:hover { transform: translateY(-2px); background: var(--violet); }
  .navtoggle { display: none; background: none; border: none; cursor: pointer; color: var(--ink); padding: 6px; }

  @media (max-width: 860px) {
    .navlinks {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      height: 100vh;
      background: rgba(250,248,255,0.98);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      flex-direction: column;
      align-items: stretch;
      padding: 28px 24px;
      gap: 4px;
      transform: translateX(101%);
      transition: transform .38s cubic-bezier(.22,1,.36,1);
      z-index: 999;
      border-top: 1px solid var(--line);
      overflow-y: auto;
    }
    .navlinks.open { transform: translateX(0); }
    .navindicator { display: none; }
    .navlink {
      text-align: left; font-size: 20px; font-weight: 500;
      padding: 16px 8px; border-bottom: 1px solid var(--line);
      border-radius: 0; color: var(--ink);
    }
    .navlink:last-child { border-bottom: none; }
    .navcta { display: flex !important; margin: 20px 8px 0; justify-content: center; padding: 14px; font-size: 16px; }
    .navtoggle { display: flex; }
    .nav-desktop-cta { display: none; }
  }

  /* ─── Buttons ─── */
  .btn {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 14px 26px; border-radius: 100px; font-weight: 600;
    font-size: 14.5px; border: none; cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
    position: relative; overflow: hidden;
  }
  .btn::after {
    content: ''; position: absolute; inset: 0; background: rgba(255,255,255,0.1);
    opacity: 0; transition: opacity .2s;
  }
  .btn:hover::after { opacity: 1; }
  .btn-primary { background: var(--coral); color: #fff; box-shadow: 0 8px 24px -6px var(--coral-glow); }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 32px -6px var(--coral-glow); }
  .btn-ghost { border: 1.5px solid var(--lineD); color: #fff; background: rgba(255,255,255,0.06); }
  .btn-ghost:hover { background: rgba(255,255,255,0.12); transform: translateY(-2px); }
  .btn-ghost-light { border: 1.5px solid rgba(21,11,51,0.18); color: var(--ink); background: transparent; }
  .btn-ghost-light:hover { background: rgba(21,11,51,0.04); transform: translateY(-2px); }
  .btn-violet { background: var(--violet); color: #fff; box-shadow: 0 8px 24px -6px var(--violet-glow); }
  .btn-violet:hover { transform: translateY(-2px); box-shadow: 0 14px 32px -6px var(--violet-glow); }

  /* ─── Hero ─── */
  .hero {
    position: relative;
    background: radial-gradient(130% 120% at 75% 10%, #2a1466 0%, #130d2e 50%, #0d0820 100%);
    color: #fff;
    overflow: hidden;
    padding: 72px 0 100px;
    min-height: 88vh;
    display: flex;
    align-items: center;
  }
  .hero-inner { width: 100%; position: relative; z-index: 3; }
  .hero-canvas { position: absolute; inset: 0; z-index: 0; }
  .hero-glow { position: absolute; inset: 0; z-index: 1; pointer-events: none; transition: background .12s ease; }
  .hero-grid {
    display: grid; grid-template-columns: 1.2fr 0.8fr;
    gap: 60px; align-items: center;
  }
  .hero.centered .hero-grid { grid-template-columns: 1fr; text-align: center; }
  .hero h1 { font-size: clamp(38px,5.2vw,68px); line-height: 1.06; color: #fff; }
  .hero h1 em { font-style: italic; color: var(--lavender-deep); }
  .hero .lead { margin-top: 22px; max-width: 500px; color: var(--softD); font-size: 17px; line-height: 1.65; }
  .hero-actions { display: flex; gap: 14px; margin-top: 36px; flex-wrap: wrap; }
  
  /* ─── Hero photo & orbit ─── */
  .hero-photo { position: relative; display: flex; justify-content: center; align-items: center; }
  .hero-photo-inner { position: relative; width: min(320px,72vw); height: min(320px,72vw); }
  .hero-photo img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: top;
    border-radius: 50%; border: 3px solid rgba(255,255,255,0.14);
    position: relative; z-index: 2;
  }
  .orbit {
    position: absolute; inset: 0; border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.15);
  }
  .orbit-1 { animation: spinOrbit 22s linear infinite; }
  .orbit-2 { inset: -20px; animation: spinOrbit 34s linear infinite reverse; border-color: rgba(108,60,225,0.28); }
  .orbit-3 { inset: -42px; animation: spinOrbit 50s linear infinite; border-color: rgba(255,107,74,0.16); }
  .orbit-dot {
    position: absolute; width: 9px; height: 9px; border-radius: 50%;
    top: -4.5px; left: calc(50% - 4.5px);
  }
  .orbit-dot-1 { background: var(--coral); box-shadow: 0 0 12px var(--coral); }
  .orbit-dot-2 { background: var(--violet-soft); box-shadow: 0 0 12px var(--violet-soft); top: auto; bottom: -4.5px; }
  .orbit-dot-3 { background: var(--lavender-deep); box-shadow: 0 0 8px var(--lavender-deep); top: -4.5px; left: auto; right: calc(50% - 4.5px); }
  @keyframes spinOrbit { to { transform: rotate(360deg); } }

  /* Hero path SVG */
  .hero-path { position: absolute; inset: 0; z-index: 1; opacity: 0.4; pointer-events: none; }
  .hero-path path { fill: none; stroke: url(#pathGrad); stroke-width: 1.2; }

  @media (max-width: 780px) {
    .hero { padding: 50px 0 70px; min-height: auto; }
    .hero-grid { grid-template-columns: 1fr; text-align: center; gap: 40px; }
    .hero .lead { margin-left: auto; margin-right: auto; }
    .hero-actions { justify-content: center; }
    .hero-photo { order: -1; }
    .hero-photo-inner { width: min(240px,60vw); height: min(240px,60vw); }
  }

  /* ─── Stat strip ─── */
  .statstrip { background: var(--ink2); border-top: 1px solid var(--lineD); padding: 0; }
  .statstrip .wrap { display: grid; grid-template-columns: repeat(4,1fr); padding: 32px 24px; gap: 16px; }
  .stat { text-align: center; color: #fff; padding: 8px; }
  .stat .num { font-family: 'Space Mono', monospace; font-size: clamp(22px,2.6vw,32px); color: var(--lavender-deep); line-height: 1; }
  .stat .lbl { margin-top: 8px; font-size: 11.5px; color: var(--softD); text-transform: uppercase; letter-spacing: .07em; }
  @media (max-width: 640px) {
    .statstrip .wrap { grid-template-columns: repeat(2,1fr); gap: 20px 0; }
  }

  /* ─── Sections ─── */
  .sec { padding: 96px 0; }
  .sec-head { max-width: 620px; margin-bottom: 56px; }
  .sec-head h2 { font-size: clamp(26px,3.2vw,42px); margin-top: 14px; line-height: 1.15; }
  .sec-head p { margin-top: 14px; color: var(--soft); font-size: 16px; }
  .dark { background: var(--ink2); color: #fff; }
  .dark .sec-head p { color: var(--softD); }
  .tint { background: var(--lavender); }
  .center { text-align: center; margin-left: auto; margin-right: auto; }

  /* ─── Grids ─── */
  .grid3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
  .grid2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 24px; }
  @media (max-width: 900px) { .grid3 { grid-template-columns: 1fr; } }
  @media (max-width: 680px) { .grid2 { grid-template-columns: 1fr; } }

  /* ─── Cards ─── */
  .card {
    background: #fff; border: 1px solid var(--line); border-radius: 20px; padding: 30px;
    transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease;
    position: relative; overflow: hidden;
  }
  .card::before {
    content: ''; position: absolute; inset: 0; border-radius: 20px;
    background: linear-gradient(135deg, rgba(108,60,225,0.04), transparent);
    opacity: 0; transition: opacity .3s ease;
  }
  .card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px -16px rgba(21,11,51,0.18); }
  .card:hover::before { opacity: 1; }
  .card .icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: var(--lavender); display: flex; align-items: center; justify-content: center;
    margin-bottom: 18px; color: var(--violet);
  }
  .card h3 { font-size: 18px; margin-bottom: 8px; }
  .card p { color: var(--soft); font-size: 14.5px; margin: 0; line-height: 1.65; }
  .dark .card { background: rgba(255,255,255,0.05); border-color: var(--lineD); }
  .dark .card p { color: var(--softD); }
  .dark .card .icon { background: rgba(255,255,255,0.08); color: var(--lavender-deep); }

  /* ─── Tags ─── */
  .tag {
    display: inline-block; font-family: 'Space Mono', monospace; font-size: 11.5px;
    padding: 6px 13px; border-radius: 100px; background: var(--lavender);
    color: var(--violet); margin: 3px 5px 3px 0; font-weight: 600;
  }

  /* ─── Blockquote ─── */
  blockquote {
    font-family: 'Fraunces', serif; font-size: clamp(20px,2.4vw,28px);
    font-style: italic; line-height: 1.4; color: var(--ink);
  }
  .dark blockquote { color: #fff; }

  /* ─── Timeline ─── */
  .pathway { position: relative; padding-left: 54px; }
  .pathway-line {
    position: absolute; left: 14px; top: 0; bottom: 0; width: 2px;
    background: linear-gradient(to bottom, var(--violet), var(--coral) 96%);
    transform-origin: top; transform: scaleY(0);
    transition: transform 1.8s cubic-bezier(.22,1,.36,1);
  }
  .pathway-line.in { transform: scaleY(1); }
  .waypoint { position: relative; margin-bottom: 56px; }
  .waypoint:last-child { margin-bottom: 0; }
  .waypoint::before {
    content: ""; position: absolute; left: -54px; top: 6px;
    width: 14px; height: 14px; border-radius: 50%;
    background: var(--paper); border: 3px solid var(--violet); z-index: 2;
  }
  .waypoint.current::before { background: var(--coral); border-color: var(--coral); box-shadow: 0 0 0 6px rgba(255,107,74,0.15); }
  .wp-meta {
    display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap;
    font-family: 'Space Mono', monospace; font-size: 11.5px;
    color: var(--coral); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 9px;
  }
  .waypoint h3 { font-size: 20px; }
  .waypoint .org { color: var(--violet); font-weight: 600; font-size: 14.5px; margin-top: 4px; }
  .waypoint ul { margin: 14px 0 0; padding-left: 18px; color: var(--soft); font-size: 14.5px; }
  .waypoint li { margin-bottom: 7px; line-height: 1.6; }

  /* ─── Mockup ─── */
  .mockup {
    background: var(--ink2); border-radius: 16px; border: 1px solid var(--lineD);
    padding: 20px; min-height: 180px;
  }
  .mockup .bar { display: flex; gap: 6px; margin-bottom: 14px; }
  .mockup .dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.18); }
  .mockup .row { height: 10px; border-radius: 6px; background: rgba(255,255,255,0.08); margin-bottom: 9px; }
  .mockup .chip {
    display: inline-block; padding: 5px 11px; border-radius: 100px;
    background: rgba(108,60,225,0.2); color: var(--lavender-deep);
    font-family: 'Space Mono', monospace; font-size: 10.5px; margin: 7px 4px 0 0;
  }

  /* ─── Flow line ─── */
  .flowline { display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; font-family: 'Space Mono', monospace; font-size: 12.5px; }
  .fnode { background: rgba(255,255,255,0.07); border: 1px solid var(--lineD); border-radius: 100px; padding: 9px 16px; font-weight: 600; color: #fff; }
  .farrow { color: var(--coral); font-size: 16px; }

  /* ─── Weight bar ─── */
  .weightbar { height: 8px; border-radius: 6px; background: rgba(255,255,255,0.1); overflow: hidden; }
  .weightseg { height: 100%; width: 0; border-radius: 6px; transition: width 1.4s cubic-bezier(.22,1,.36,1); }

  /* ─── Footer ─── */
  footer { background: var(--ink); color: var(--softD); padding: 60px 0 32px; }
  .footrow { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 28px; }
  footer h3 { color: #fff; font-size: 22px; margin-bottom: 10px; }
  .footlinks { display: flex; gap: 8px; flex-wrap: wrap; }
  .footlinks button { background: none; border: none; color: var(--softD); cursor: pointer; font-size: 14px; font-family: 'Inter', sans-serif; padding: 4px 8px; transition: color .2s; }
  .footlinks button:hover { color: #fff; }
  .footbottom { border-top: 1px solid var(--lineD); margin-top: 40px; padding-top: 22px; font-size: 12.5px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
  @media (max-width: 640px) { .footrow { flex-direction: column; } }

  /* ─── Glass card ─── */
  .glass-card {
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
    border-radius: 20px; padding: 30px; backdrop-filter: blur(8px);
    transition: background .3s ease, transform .3s cubic-bezier(.22,1,.36,1);
  }
  .glass-card:hover { background: rgba(255,255,255,0.09); transform: translateY(-4px); }

  /* ─── Glow text ─── */
  .glow-text { text-shadow: 0 0 40px rgba(108,60,225,0.4); }
  .coral-text { color: var(--coral); }

  /* ─── About hero two-col ─── */
  .about-hero-grid {
    display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 50px; align-items: center;
  }
  @media (max-width: 780px) {
    .about-hero-grid { grid-template-columns: 1fr; gap: 36px; }
    .about-hero-grid .hero-photo { order: -1; }
  }

  /* ─── Responsive padding ─── */
  @media (max-width: 640px) {
    .sec { padding: 64px 0; }
    .wrap { padding: 0 18px; }
    .btn { padding: 12px 22px; font-size: 14px; }
    .hero { padding: 44px 0 60px; }
    .card { padding: 22px; }
  }

  /* ─── Co-Founder Grid ─── */
  .co-founder-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  @media (max-width: 860px) {
    .co-founder-grid { grid-template-columns: 1fr; gap: 40px; }
  }

  /* ─── Reduced motion ─── */
  @media (prefers-reduced-motion: reduce) {
    .orbit-1, .orbit-2, .orbit-3, .orbit { animation: none; }
    .pathway-line { transition: none; }
  }
`;

/* =========================================================
   STAR CANVAS
   ========================================================= */
function StarCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const stars = [];
    const STAR_COUNT = 120;
    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    function init() {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.3,
          a: Math.random(),
          s: Math.random() * 0.3 + 0.05,
          d: Math.random() > 0.5 ? 1 : -1,
        });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.a += s.s * s.d * 0.008;
        if (s.a >= 1 || s.a <= 0.1) s.d *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    resize();
    init();
    draw();
    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} className="hero-canvas" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />;
}

/* =========================================================
   HELPERS
   ========================================================= */
function Reveal({ children, className = "", delay = 0, style = {} }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function StatCounter({ target, suffix = "", label }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    const dur = 1400;
    const start = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isInView, target]);
  return (
    <div ref={ref} className="stat">
      <div className="num">{val}{suffix}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}

function MagBtn({ children, onClick, variant = "primary", href }) {
  const ref = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    setT({ x: (e.clientX - r.left - r.width / 2) * 0.15, y: (e.clientY - r.top - r.height / 2) * 0.3 });
  };
  const leave = () => setT({ x: 0, y: 0 });
  const cls = `btn btn-${variant}`;
  const style = { transform: `translate(${t.x}px, ${t.y}px)`, transition: "transform .25s ease" };
  if (href) return <a ref={ref} href={href} className={cls} style={style} onMouseMove={move} onMouseLeave={leave}>{children}</a>;
  return <button ref={ref} className={cls} style={style} onMouseMove={move} onMouseLeave={leave} onClick={onClick}>{children}</button>;
}

function Logo() {
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
      <path d="M4 26 L13 10 L19 20 L28 6" stroke="#6c3ce1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="6" r="2.6" fill="#ff6b4a" />
    </svg>
  );
}

function HeroPath() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const paths = ref.current.querySelectorAll("path");
    paths.forEach((p, i) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      p.animate(
        [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
        { duration: 2800 + i * 500, easing: "ease-out", fill: "forwards", delay: i * 250 }
      );
    });
  }, []);
  return (
    <svg ref={ref} className="hero-path" viewBox="0 0 1200 700" preserveAspectRatio="none">
      <defs>
        <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#ff6b4a" />
        </linearGradient>
      </defs>
      <path d="M-50 560 C200 620, 300 420, 520 460 S820 300, 950 340 S1150 120, 1300 160" />
      <path d="M-80 200 C150 160, 320 260, 480 180 S780 60, 1250 120" opacity="0.5" />
    </svg>
  );
}

function HeroSection({ children, centered = false, glow = true, minHeight = "88vh" }) {
  const [pos, setPos] = useState({ x: 50, y: 20 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };
  return (
    <header
      className={`hero ${centered ? "centered" : ""}`}
      style={{ minHeight }}
      onMouseMove={glow ? onMove : undefined}
    >
      <StarCanvas />
      <HeroPath />
      {glow && (
        <div className="hero-glow" style={{ background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(108,60,225,0.22), transparent 50%)` }} />
      )}
      <div className="hero-inner wrap">
        {children}
      </div>
    </header>
  );
}

function HeroPhoto({ size }) {
  return (
    <div className="hero-photo">
      <div className="hero-photo-inner" style={size ? { width: size, height: size } : {}}>
        <div className="orbit orbit-1"><span className="orbit-dot orbit-dot-1" /></div>
        <div className="orbit orbit-2"><span className="orbit-dot orbit-dot-2" /></div>
        <div className="orbit orbit-3"><span className="orbit-dot orbit-dot-3" /></div>
        <img src={PHOTO} alt="Oneir Raza – Co-Founder, Manzil" />
      </div>
    </div>
  );
}

function NavBar({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const linkRefs = useRef({});
  const containerRef = useRef(null);
  const [ind, setInd] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth > 860) setOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Update indicator
  useLayoutEffect(() => {
    const el = linkRefs.current[page];
    const cont = containerRef.current;
    if (el && cont && window.innerWidth > 860) {
      const r = el.getBoundingClientRect();
      const cr = cont.getBoundingClientRect();
      setInd({ left: r.left - cr.left, width: r.width, opacity: 1 });
    } else {
      setInd(i => ({ ...i, opacity: 0 }));
    }
  }, [page]);

  const go = (id) => {
    setPage(id);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Overlay for mobile menu */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 998,
            background: "rgba(13,8,32,0.5)", backdropFilter: "blur(2px)",
            top: 72
          }}
        />
      )}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="wrap navrow">
          <button className="brand" onClick={() => go("home")}>
            <Logo /> Oneir Raza
          </button>
          <div className={`navlinks${open ? " open" : ""}`} ref={containerRef}>
            <div className="navindicator" style={{ left: ind.left, width: ind.width, opacity: ind.opacity }} />
            {NAV_ITEMS.slice(0, 4).map(item => (
              <button
                key={item.id}
                ref={el => (linkRefs.current[item.id] = el)}
                className={`navlink${page === item.id ? " active" : ""}`}
                onClick={() => go(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button className="navcta" onClick={() => go("contact")}>
              Get in touch <ArrowRight size={13} />
            </button>
          </div>
          <button
            className="navtoggle"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>
    </>
  );
}

function Footer({ setPage }) {
  const go = (id) => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <footer>
      <div className="wrap footrow">
        <div>
          <h3>Oneir Raza</h3>
          <p style={{ maxWidth: 300, fontSize: 14.5 }}>Global partnerships & EdTech strategy. Co-Founder, Manzil.</p>
        </div>
        <div className="footlinks">
          {NAV_ITEMS.filter(n => n.id !== "home").map(n => (
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
      <HeroSection>
        <div className="hero-grid">
          <div>
            <Reveal>
              <div className="eyebrow" style={{ marginBottom: 20 }}>Global Partnerships & EdTech Strategy</div>
            </Reveal>
            <Reveal delay={80}>
              <h1>Turning <em>guesswork</em><br />into a guided path.</h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="lead">Cambridge-trained development professional working across policy, data, and EdTech — currently building Manzil, an AI-guided academic & career pathway platform for Pakistan's 22 million high school students.</p>
            </Reveal>
            <Reveal delay={240}>
              <div className="hero-actions">
                <MagBtn variant="primary" onClick={() => setPage("manzil")}>See what I'm building <ArrowRight size={16} /></MagBtn>
                <MagBtn variant="ghost" onClick={() => setPage("about")}>Read my story</MagBtn>
              </div>
            </Reveal>
          </div>
          <HeroPhoto />
        </div>
      </HeroSection>

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
            <h2>Three threads, one direction.</h2>
            <p>Whether it's a federal ministry, a global foundation, or a first-time founder's product roadmap, the job is the same: read the system, find where it's stuck, and build the bridge.</p>
          </Reveal>
          <div className="grid3">
            <Reveal className="card">
              <div className="icon"><Users size={20} /></div>
              <h3>Partnerships & Strategy</h3>
              <p>Managing high-stakes relationships with federal ministries, the World Bank, and the Bill & Melinda Gates Foundation.</p>
            </Reveal>
            <Reveal className="card" delay={100}>
              <div className="icon"><Database size={20} /></div>
              <h3>Data & M&E</h3>
              <p>Designing monitoring & evaluation systems for large-scale EdTech interventions across 341 schools and 10,000+ participants.</p>
            </Reveal>
            <Reveal className="card" delay={200}>
              <div className="icon"><Sparkles size={20} /></div>
              <h3>EdTech & AI</h3>
              <p>Mapping the regional EdTech landscape and translating what's technically possible into what's operationally useful.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="dark sec">
        <div className="wrap co-founder-grid">
          <Reveal>
            <div className="eyebrow">Co-Founder</div>
            <h2 style={{ marginTop: 14, fontSize: "clamp(26px,3vw,38px)" }}>Manzil — a destination, built for 22M students who don't have a map yet.</h2>
            <p style={{ color: "var(--softD)", marginTop: 16, fontSize: 16 }}>Pakistan has almost no structured career guidance infrastructure. Manzil replaces guesswork with a psychometric engine — interests, values, personality — matched against real, affordable university and scholarship pathways.</p>
            <div style={{ marginTop: 26 }}>
              <MagBtn variant="coral" onClick={() => setPage("manzil")}>Explore the Manzil story <ArrowRight size={16} /></MagBtn>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Reveal className="glass-card">
              <h3 style={{ fontSize: 16, color: "#fff", marginBottom: 8 }}>The Problem</h3>
              <p style={{ color: "var(--softD)", fontSize: 14.5 }}>22M+ students, near-zero counselling, PKR 200K+ private consultants.</p>
            </Reveal>
            <Reveal className="glass-card" delay={100}>
              <h3 style={{ fontSize: 16, color: "#fff", marginBottom: 8 }}>The Engine</h3>
              <p style={{ color: "var(--softD)", fontSize: 14.5 }}>RIASEC + Schwartz Values + Big Five → a weighted match score for every major and career.</p>
            </Reveal>
            <Reveal className="glass-card" delay={200}>
              <h3 style={{ fontSize: 16, color: "#fff", marginBottom: 8 }}>The Traction</h3>
              <p style={{ color: "var(--softD)", fontSize: 14.5 }}>Live MVP, a Karachi school pilot, and a Federal Ministry of Education partnership.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="tint sec">
        <div className="wrap center" style={{ maxWidth: 720 }}>
          <Reveal>
            <blockquote>"The gap isn't a lack of care — it's a lack of infrastructure. That's what I build."</blockquote>
          </Reveal>
          <Reveal delay={120} style={{ marginTop: 28 }}>
            <MagBtn variant="ghost-light" onClick={() => setPage("contact")}>Let's talk <ArrowRight size={16} /></MagBtn>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function AboutPage({ setPage }) {
  return (
    <div className="page-enter">
      <HeroSection minHeight="70vh">
        <div className="about-hero-grid">
          <div>
            <Reveal><div className="eyebrow">About</div></Reveal>
            <Reveal delay={80}><h1 style={{ fontSize: "clamp(32px,4.4vw,54px)", marginTop: 14 }}>Reading systems, then building what's missing.</h1></Reveal>
            <Reveal delay={160}>
              <p className="lead" style={{ maxWidth: 520 }}>
                Oneir Raza is a global partnerships and strategy professional with a Cambridge MPhil and 4+ years navigating the intersection of educational technology, public policy, and international development — with a track record of managing high-stakes institutional relationships across federal ministries, academic institutions, and organizations including the World Bank and the Bill & Melinda Gates Foundation.
              </p>
            </Reveal>
          </div>
          <HeroPhoto size="min(280px,60vw)" />
        </div>
      </HeroSection>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Education</div>
            <h2>Two campuses, one throughline.</h2>
          </Reveal>
          <div className="grid2">
            <Reveal className="card">
              <div className="wp-meta">Oct 2023 – Jul 2024</div>
              <h3>MPhil in Education, Globalisation & International Development</h3>
              <p className="org" style={{ color: "var(--violet)", fontWeight: 600, margin: "6px 0 12px" }}>University of Cambridge, United Kingdom</p>
              <p>Awarded the merit-based, fully-funded Chevening Scholarship. Published research on gender differences in EdTech use amongst students in developing economies.</p>
            </Reveal>
            <Reveal className="card" delay={100}>
              <div className="wp-meta">Sept 2016 – Aug 2020</div>
              <h3>Bachelor's in International Relations</h3>
              <p className="org" style={{ color: "var(--violet)", fontWeight: 600, margin: "6px 0 12px" }}>National Defence University, Islamabad</p>
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
          <Reveal className="sec-head">
            <div className="eyebrow">Skills & Tools</div>
            <h2>What's in the toolkit.</h2>
          </Reveal>
          <div className="grid2">
            <Reveal className="card">
              <h3 style={{ marginBottom: 14 }}>Partnership & Pipeline Management</h3>
              <div><span className="tag">Relationship Management</span><span className="tag">Stakeholder Coordination</span><span className="tag">Pipeline Development</span><span className="tag">CRM Management</span></div>
            </Reveal>
            <Reveal className="card" delay={80}>
              <h3 style={{ marginBottom: 14 }}>Data & Tech</h3>
              <div><span className="tag">Python</span><span className="tag">SQL</span><span className="tag">Stata</span><span className="tag">NVivo</span><span className="tag">Advanced Excel</span><span className="tag">Figma</span><span className="tag">Salesforce</span></div>
            </Reveal>
            <Reveal className="card" delay={160}>
              <h3 style={{ marginBottom: 14 }}>AI & EdTech Literacy</h3>
              <div><span className="tag">EdTech Readiness Assessment</span><span className="tag">Digital Transformation</span><span className="tag">Advanced AI Prompting</span></div>
            </Reveal>
            <Reveal className="card" delay={240}>
              <h3 style={{ marginBottom: 14 }}>Languages</h3>
              <div><span className="tag">English</span><span className="tag">Urdu</span><span className="tag">Hindi</span><span className="tag">Italian</span><span className="tag">Arabic</span></div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="dark sec">
        <div className="wrap center" style={{ maxWidth: 640 }}>
          <Reveal><div className="eyebrow" style={{ justifyContent: "center" }}>Next</div></Reveal>
          <Reveal delay={80}><h2 style={{ marginTop: 14, fontSize: "clamp(24px,3vw,36px)" }}>See the path that led here — job by job.</h2></Reveal>
          <Reveal delay={160} style={{ marginTop: 26 }}>
            <MagBtn variant="primary" onClick={() => setPage("experience")}>View the full journey <ArrowRight size={16} /></MagBtn>
          </Reveal>
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
      <HeroSection centered minHeight="55vh">
        <div className="hero-grid" style={{ gridTemplateColumns: "1fr" }}>
          <div className="center" style={{ maxWidth: 640, margin: "0 auto" }}>
            <Reveal><div className="eyebrow" style={{ justifyContent: "center" }}>Experience</div></Reveal>
            <Reveal delay={80}><h1 style={{ fontSize: "clamp(32px,4.4vw,54px)", marginTop: 14 }}>Manzil means <em>destination</em>. Here's the road so far.</h1></Reveal>
            <Reveal delay={160}><p className="lead" style={{ margin: "16px auto 0" }}>Six years, five stops, one direction — from a classroom in Islamabad to a co-founder's desk building the guidance system Pakistan never had.</p></Reveal>
          </div>
        </div>
      </HeroSection>

      <section className="sec"><div className="wrap"><PathwayTimeline /></div></section>

      <section className="dark sec">
        <div className="wrap center" style={{ maxWidth: 640 }}>
          <Reveal><div className="eyebrow" style={{ justifyContent: "center" }}>What's next</div></Reveal>
          <Reveal delay={80}><h2 style={{ marginTop: 14, fontSize: "clamp(24px,3vw,36px)" }}>The current chapter is Manzil.</h2></Reveal>
          <Reveal delay={140}><p style={{ color: "var(--softD)", marginTop: 12 }}>Everything above — the M&E rigor, the donor relationships, the policy translation — feeds directly into building it.</p></Reveal>
          <Reveal delay={220} style={{ marginTop: 26 }}>
            <MagBtn variant="primary" onClick={() => setPage("manzil")}>Read the Manzil story <ArrowRight size={16} /></MagBtn>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function WeightBar({ pct, color }) {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  const isInView = useInView(ref, { once: true });
  useEffect(() => { if (isInView) setW(pct); }, [isInView, pct]);
  return <div className="weightbar" ref={ref}><div className="weightseg" style={{ width: `${w}%`, background: color }} /></div>;
}

function ManzilPage({ setPage }) {
  return (
    <div className="page-enter">
      <HeroSection centered minHeight="70vh">
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <Reveal><div className="eyebrow" style={{ justifyContent: "center" }}>Pakistan's First AI-Guided Academic & Career Pathway Platform</div></Reveal>
          <Reveal delay={80}><h1 style={{ fontSize: "clamp(52px,8vw,92px)", marginTop: 16, letterSpacing: "-0.03em" }}>MANZIL</h1></Reveal>
          <Reveal delay={160}><p className="lead" style={{ fontStyle: "italic", fontFamily: "'Fraunces',serif", fontSize: 18, margin: "14px auto 0" }}>Choose your path. Pick your university. Start your journey.</p></Reveal>
          <Reveal delay={240}>
            <div className="hero-actions" style={{ justifyContent: "center", marginTop: 32 }}>
              <MagBtn variant="primary" onClick={() => setPage("contact")}>Partner with us <ArrowRight size={16} /></MagBtn>
              <MagBtn variant="ghost" href="#product">See the product</MagBtn>
            </div>
          </Reveal>
        </div>
      </HeroSection>

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
            <p style={{ color: "var(--softD)" }}>Every major and career gets a single weighted match score, built from interests, values, and personality — in that order.</p>
          </Reveal>
          <Reveal className="flowline" style={{ marginBottom: 40 }}>
            <span className="fnode">Interests (RIASEC)</span><span className="farrow">→</span>
            <span className="fnode">Values (Schwartz)</span><span className="farrow">→</span>
            <span className="fnode">Personality (Big Five)</span><span className="farrow">→</span>
            <span className="fnode" style={{ background: "var(--coral)", color: "#fff", border: "1px solid var(--coral)" }}>Ranked Majors & Careers</span>
          </Reveal>
          <div className="grid3">
            <Reveal className="card">
              <h3 style={{ fontSize: 16 }}>50% Interests</h3>
              <div style={{ margin: "12px 0" }}><WeightBar pct={100} color="var(--violet-soft)" /></div>
              <p>Holland RIASEC fit — the first and widest filter.</p>
            </Reveal>
            <Reveal className="card" delay={100}>
              <h3 style={{ fontSize: 16 }}>30% Values</h3>
              <div style={{ margin: "12px 0" }}><WeightBar pct={60} color="var(--coral)" /></div>
              <p>Schwartz dimensions rank by what genuinely motivates the student.</p>
            </Reveal>
            <Reveal className="card" delay={200}>
              <h3 style={{ fontSize: 16 }}>20% Personality</h3>
              <div style={{ margin: "12px 0" }}><WeightBar pct={40} color="var(--lavender-deep)" /></div>
              <p>Big Five traits fine-tune the final list by work style.</p>
            </Reveal>
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
            {[
              { title: "Curriculum-first onboarding", desc: "National, Cambridge, or IB — eligibility is filtered from the first question, in English or Urdu.", chips: ["Interests", "Values", "Personality"] },
              { title: "Ranked university finder", desc: "Filter by country, city, budget, and major — ranked with admissions deadlines on every card.", chips: ["172 results", "Filterable", "Deadline-aware"] },
              { title: "Deep university profiles", desc: "Deadlines, acceptance context, scholarships, and a direct application link.", chips: ["5 scholarships", "Direct apply"] },
              { title: "School dashboards", desc: "Live completion rates and a roster view of every student's match status.", chips: ["Invite code", "CSV export"] },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="mockup">
                  <div className="bar"><div className="dot" /><div className="dot" /><div className="dot" /></div>
                  <div className="row" style={{ width: "70%" }} />
                  <div className="row" style={{ width: "50%" }} />
                  {item.chips.map(c => <span key={c} className="chip">{c}</span>)}
                </div>
                <h3 style={{ marginTop: 16, fontSize: 17 }}>{item.title}</h3>
                <p style={{ color: "var(--soft)", fontSize: 14.5, marginTop: 6 }}>{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tint sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Business Model</div>
            <h2>Starts free. Monetizes the moment help is needed most.</h2>
          </Reveal>
          <div className="grid3">
            <Reveal className="card"><h3 style={{ fontSize: 17 }}>01 · Free Entry</h3><p>Every student gets their top 3 recommended fields at no cost — the trust the model is built on.</p></Reveal>
            <Reveal className="card" delay={80}><h3 style={{ fontSize: 17 }}>02 · Premium</h3><p>Unlocks hidden careers, tailored university & scholarship lists, and admissions requirements.</p></Reveal>
            <Reveal className="card" delay={160}><h3 style={{ fontSize: 17 }}>03 · Tutoring Marketplace</h3><p>Commission on booked sessions with verified tutors across SAT, MDCAT, ECAT, IELTS.</p></Reveal>
          </div>
          <div className="grid3" style={{ marginTop: 22 }}>
            <Reveal className="card"><h3 style={{ fontSize: 17 }}>04 · School Partnerships</h3><p>Bulk licensing of premium dashboards for cohort-level analytics.</p></Reveal>
            <Reveal className="card" delay={80} style={{ background: "var(--ink2)", borderColor: "transparent" }}><h3 style={{ fontSize: 17, color: "#fff" }}>Traction</h3><p style={{ color: "var(--softD)" }}>Live MVP · Karachi school pilot · Federal Ministry of Education partnership.</p></Reveal>
            <Reveal className="card" delay={160} style={{ background: "var(--coral)", borderColor: "transparent" }}><h3 style={{ fontSize: 17, color: "#fff" }}>The Moat</h3><p style={{ color: "rgba(255,255,255,0.85)" }}>A triangulated student + teacher + parent dataset no competitor in Pakistan holds.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="dark sec">
        <div className="wrap center" style={{ maxWidth: 680 }}>
          <Reveal><Quote size={26} color="var(--coral)" style={{ marginBottom: 14 }} /></Reveal>
          <Reveal delay={80}><blockquote>"A future where every student — regardless of city, income, or school — chooses their path with clarity, not guesswork."</blockquote></Reveal>
          <Reveal delay={160}><p style={{ color: "var(--softD)", marginTop: 18 }}>— Our Vision</p></Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Founding Team</div>
            <h2>Built by people who care where it lands.</h2>
          </Reveal>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Reveal className="card" style={{ maxWidth: 380, width: "100%", textAlign: "center" }}>
              <img
                src={femaleCofounderPic}
                alt="Oneir Raza"
                style={{ width: 200, height: 200, borderRadius: "50%", objectFit: "cover", objectPosition: "top", margin: "0 auto 20px", display: "block", border: "3px solid var(--lavender)" }}
              />
              <h3 style={{ fontSize: 22 }}>Oneir Raza</h3>
              <p style={{ color: "var(--violet)", fontWeight: 600, fontSize: 14, marginBottom: 12, marginTop: 6 }}>Co-Founder</p>
              <p>Cambridge MPhil, Chevening Scholar. Policy, EdTech, and partnerships across CERP, Tabadlab, and Remoto.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="tint sec">
        <div className="wrap center" style={{ maxWidth: 600 }}>
          <Reveal><h2 style={{ fontSize: "clamp(24px,2.8vw,34px)" }}>Interested in piloting Manzil, or partnering strategically?</h2></Reveal>
          <Reveal delay={100} style={{ marginTop: 26 }}>
            <MagBtn variant="ghost-light" onClick={() => setPage("contact")}>Get in touch <ArrowRight size={16} /></MagBtn>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="page-enter">
      <HeroSection centered minHeight="60vh">
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <Reveal><div className="eyebrow" style={{ justifyContent: "center" }}>Get in touch</div></Reveal>
          <Reveal delay={80}><h1 style={{ fontSize: "clamp(34px,4.8vw,58px)", marginTop: 14 }}>Let's build the next stretch of the path.</h1></Reveal>
          <Reveal delay={160}><p className="lead" style={{ margin: "16px auto 0" }}>Open to conversations on EdTech partnerships, policy collaborations, and Manzil pilot programs with schools and institutions.</p></Reveal>
        </div>
      </HeroSection>

      <section className="sec" style={{ paddingTop: 0, marginTop: -56, position: "relative", zIndex: 3 }}>
        <div className="wrap">
          <div className="grid2">
            <Reveal className="card">
              <div className="icon"><Mail size={20} /></div>
              <h3>Email</h3>
              <p><a href="mailto:oneirraza@gmail.com" style={{ color: "var(--violet)", fontWeight: 600 }}>oneirraza@gmail.com</a></p>
            </Reveal>
            <Reveal className="card" delay={80}>
              <div className="icon"><Phone size={20} /></div>
              <h3>Phone</h3>
              <p><a href="tel:+923351599612" style={{ color: "var(--violet)", fontWeight: 600 }}>+92 335 1599612</a></p>
            </Reveal>
            <Reveal className="card" delay={160}>
              <div className="icon"><ExternalLink size={20} /></div>
              <h3>LinkedIn</h3>
              <p><a href="https://www.linkedin.com/in/oneir-raza" target="_blank" rel="noreferrer" style={{ color: "var(--violet)", fontWeight: 600 }}>Oneir Raza</a></p>
            </Reveal>
            <Reveal className="card" delay={240}>
              <div className="icon"><Target size={20} /></div>
              <h3>Manzil Pilot Program</h3>
              <p>Free for the first cohort of partner schools — no obligation after the pilot.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="dark sec">
        <div className="wrap center" style={{ maxWidth: 580 }}>
          <Reveal><div className="eyebrow" style={{ justifyContent: "center" }}>Currently</div></Reveal>
          <Reveal delay={80}><h2 style={{ marginTop: 14, fontSize: "clamp(22px,2.8vw,34px)" }}>Engaging with schools, education networks, and strategic partners across Pakistan.</h2></Reveal>
          <Reveal delay={160}><p style={{ color: "var(--softD)", marginTop: 16 }}>If you'd like to bring structured, evidence-based guidance to your students — or explore a partnership — I'd love to talk.</p></Reveal>
          <Reveal delay={240} style={{ marginTop: 28 }}>
            <MagBtn variant="primary" href="mailto:oneirraza@gmail.com">Send an email <ArrowRight size={16} /></MagBtn>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   APP ROOT
   ========================================================= */
export default function Portfolio() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (NAV_ITEMS.some(n => n.id === hash)) {
        setPage(hash);
      }
    };
    
    // Set initial
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (window.location.hash.replace("#", "") !== page) {
      window.location.hash = page;
    }
    document.title = `Oneir Raza | ${NAV_ITEMS.find(n => n.id === page)?.label || "Portfolio"}`;
  }, [page]);

  const PageMap = { home: HomePage, about: AboutPage, experience: ExperiencePage, manzil: ManzilPage, contact: ContactPage };
  const Page = PageMap[page];

  return (
    <div className="prx">
      <style>{CSS}</style>
      <NavBar page={page} setPage={setPage} />
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Page setPage={setPage} />
        </motion.div>
      </AnimatePresence>
      <Footer setPage={setPage} />
    </div>
  );
}
