import photo from './assets/WhatsApp_Image_2026-03-10_at_11.42.43_PM-removebg-preview.png';
import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Mail, Phone, User, ArrowRight, Menu, X, Target, TrendingUp,
  Users, Database, Sparkles, GraduationCap, BookOpen, Compass,
  Layers, CheckCircle2, MapPin, Quote, ChevronRight, ExternalLink,
  Globe, Brain, Cpu, BarChart3, Code2, Building2, Rocket, Shield,
  Lightbulb, Star, Award, GitBranch, Server, PieChart, Zap, Landmark
} from "lucide-react";

/* =========================================================
   DATA
   ========================================================= */
const PHOTO = "/oneir-portrait.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "research", label: "Research" },
  { id: "manzil", label: "Manzil" },
  { id: "contact", label: "Contact" },
];

const EXPERIENCE = [
  {
    when: "Oct 2024 – Present", tag: "CERP", current: true,
    title: "Project Manager",
    org: "Centre for Economic Research and Policy (CERP)",
    place: "Lahore, Pakistan",
    logo: "/CERP-logo.png",
    bullets: [
      "Lead the design, scoping, and implementation of monitoring and evaluation (M&E) systems for a large-scale, quasi-experimental evaluation of a two-year government EdTech intervention across 341 public schools.",
      "Map the regional EdTech landscape, evaluate AI-readiness, and flag operational gaps where external tech implementations could add direct value.",
      "Act as the primary cross-organisational connector between field research operations, qualitative analysts, data engineering teams, and product content developers — ensuring all partner engagements reflect institutional priorities.",
      "Manage and clean multi-source quantitative (Stata, SQL, Excel) and qualitative (NVivo) datasets for 10,000+ participants, conducting comprehensive evaluations at baseline, midline, and end-line stages.",
      "Translate dense technical data into short, high-level insight summaries, policy briefs, and visual dashboards to inform strategic decision-making and project pilots for government partners.",
      "Engage senior government counterparts, development sector research organisations, and community stakeholders to strengthen institutional education policy implementation and optimise digital service delivery.",
      "Facilitate regular team stand-ups to operationalise project tracking, define milestones, manage cross-team dependencies, and proactively address bottlenecks to ensure on-time delivery of research outcomes.",
    ],
  },
  {
    when: "Jan 2023 – Aug 2023", tag: "Tabadlab",
    title: "Associate, Policy and Communications",
    org: "Tabadlab",
    place: "Islamabad, Pakistan",
    logo: "/tabadlab-logo.svg",
    bullets: [
      "Managed and nurtured high-level collaborative relationships with federal ministries, private sector actors, and international donors (World Bank, BMGF), increasing stakeholder engagement by 40%.",
      "Spearheaded a comprehensive policy dialogue roadmap involving 20+ institutional stakeholders, resulting in 10 actionable education sector reform recommendations for senior government partners.",
      "Formed and operationalised a continuous knowledge-sharing Community of Practice, leading end-to-end strategic planning, budgeting, and execution of over 15 high-impact policy roundtables.",
      "Led research and writing of a policy brief titled 'Islahati Jaiza: Punjab Education Sector Reforms' — published on Tabadlab's website.",
      "Designed and executed targeted digital advocacy campaigns, leveraging advanced analytics and communication strategies to increase organisation reach and engagement by 80% within six months.",
    ],
  },
  {
    when: "July 2022 – Dec 2022", tag: "Remoto",
    title: "Communications and Partnerships Lead",
    org: "Remoto",
    place: "Madrid, Spain (remote-first)",
    logo: "/remoto-logo.svg",
    bullets: [
      "Identified and promoted innovation and research partnerships across the US, UK, and Europe — initiating conversations and managing the pipeline progression from initial exploration to defined alignment.",
      "Strengthened internal processes for tracking active collaborations and sharing market analysis across remote, cross-functional teams to ensure clear alignment on strategy priorities.",
      "Structured and streamlined multi-channel communications and internal documentation across a global, remote-first team context.",
    ],
  },
  {
    when: "Sept 2020 – June 2022", tag: "Teach for Pakistan",
    title: "Teaching and Leadership Fellow",
    org: "Teach For Pakistan",
    place: "Islamabad, Pakistan",
    logo: "/tfp-logo.svg",
    bullets: [
      "Selected into an internationally recognised fellowship with a 3% acceptance rate; taught in partnership with government schools.",
      "Partnered directly with government, collaborating with school principals, teachers, and parents to implement targeted learning strategies — raising average formative student math and English assessment scores from 40% to 75%.",
      "Planned and implemented a community literacy project resulting in transformational impact on 4,500+ children — PKR 600,000 raised, evaluated at baseline, midline, and endline.",
      "Liaised with 20+ key stakeholders and led a community partnership project aimed at building a library in the community.",
      "Drafted complex end-to-end program proposals, built resource models and managed budgets, monitored progress, and conducted comprehensive evaluations.",
    ],
  },
];

const EDUCATION_DATA = [
  {
    dates: "Oct 2023 – Jul 2024",
    title: "MPhil in Education, Globalisation & International Development",
    org: "University of Cambridge",
    place: "Cambridge, United Kingdom",
    logo: "/cambridge-uni-logo.png",
    badge: "Chevening Scholar",
    badgeLogo: "/chevening-logo.png",
    photo: "/cambridge-graduate-pic.jfif",
    photoCaption: "Oneir Raza graduating from University of Cambridge (Faculty of Education)",
    summary: "Awarded the prestigious, fully-funded Chevening Scholarship from the UK Foreign, Commonwealth & Development Office (FCDO). Thesis on gender differences in EdTech use among students in Pakistan, co-authored with Sara Hennessy and published by EdTech Hub.",
    bullets: [
      "Prestigious UK Government Chevening Scholarship recipient (acceptance rate < 2%).",
      "Published research: 'Exploring the Gender Differences in Technology Use for Educational Purposes at Home Among Students in Pakistan' with Sara Hennessy (EdTech Hub).",
      "Specialised in global educational globalisation, empirical impact evaluations, and quantitative/qualitative research methods in developing economies.",
    ],
  },
  {
    dates: "Sept 2016 – Aug 2020",
    title: "Bachelor's in International Relations",
    org: "National Defence University",
    place: "Islamabad, Pakistan",
    logo: "/NDU-logo.jfif",
    badge: "Chancellor's Gold Medalist",
    photo: "/chevening-pic.jfif",
    photoCaption: "Oneir Raza — Merit Award & Chancellor's Gold Medalist",
    summary: "Awarded the Chancellor's Gold Medal and Merit Award for achieving the highest GPA in the graduating class. Rigorous foundation in institutional policy, international political economy, and state structures.",
    bullets: [
      "Chancellor's Gold Medal for the highest overall GPA across the graduating class.",
      "Merit Award for exceptional academic and extracurricular performance.",
      "Formed foundational knowledge in policy dialogue, governance, and institutional design later applied across education sector reforms.",
    ],
  },
];

/* =========================================================
   STYLES
   ========================================================= */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

  :root {
    --ink: #1a0a38;
    --ink2: #230d50;
    --violet: hsl(265,85%,50%);
    --violet-soft: hsl(265,85%,65%);
    --violet-glow: hsl(265 85% 50% / 0.35);
    --violet-mid: hsl(278,80%,55%);
    --coral: hsl(15,85%,60%);
    --coral-glow: hsl(15 85% 60% / 0.35);
    --lavender: hsl(265,50%,95%);
    --lavender-deep: hsl(265,50%,75%);
    --paper: hsl(265,40%,99%);
    --line: hsl(265 15% 88% / 1);
    --lineD: rgba(255,255,255,0.14);
    --soft: hsl(265 30% 35% / 0.65);
    --softD: rgba(255,255,255,0.65);
    --glass: rgba(255,255,255,0.05);
    --glass-border: rgba(255,255,255,0.14);
    --teal: hsl(175,55%,42%);
    --amber: hsl(45,90%,55%);
    --gradient-hero: linear-gradient(135deg, hsl(265,85%,55%) 0%, hsl(290,80%,60%) 50%, hsl(320,75%,65%) 100%);
    --gradient-title: linear-gradient(135deg, hsl(265,85%,50%) 0%, hsl(290,85%,55%) 50%, hsl(265,90%,60%) 100%);
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
    background: linear-gradient(135deg, hsl(265,85%,22%) 0%, hsl(278,80%,18%) 50%, hsl(265,85%,14%) 100%);
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
  .statstrip { background: hsl(265,85%,10%); border-top: 1px solid var(--lineD); padding: 0; }
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
  .dark { background: hsl(265,85%,12%); color: #fff; }
  .dark .sec-head p { color: var(--softD); }
  .tint { background: var(--lavender); }
  .center { text-align: center; margin-left: auto; margin-right: auto; }

  /* ─── Grids ─── */
  .grid4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
  .grid3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
  .grid2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 24px; }
  @media (max-width: 1000px) { .grid4 { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 900px) { .grid3 { grid-template-columns: 1fr; } }
  @media (max-width: 680px) {
    .grid4 { grid-template-columns: 1fr; }
    .grid2 { grid-template-columns: 1fr; }
  }

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
  .tag-coral {
    display: inline-block; font-family: 'Space Mono', monospace; font-size: 11.5px;
    padding: 6px 13px; border-radius: 100px; background: rgba(255,107,74,0.12);
    color: var(--coral); margin: 3px 5px 3px 0; font-weight: 600;
  }
  .tag-teal {
    display: inline-block; font-family: 'Space Mono', monospace; font-size: 11.5px;
    padding: 6px 13px; border-radius: 100px; background: rgba(45,212,191,0.12);
    color: #0d9488; margin: 3px 5px 3px 0; font-weight: 600;
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

  /* ─── Step card (Manzil journey) ─── */
  .step-card {
    background: rgba(255,255,255,0.04); border: 1px solid var(--lineD); border-radius: 20px;
    padding: 28px; position: relative; overflow: hidden;
    transition: transform .3s ease, background .3s ease;
  }
  .step-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.07); }
  .step-num {
    font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: .1em;
    color: var(--coral); text-transform: uppercase; margin-bottom: 12px; display: block;
  }
  .step-card h4 { font-size: 17px; color: #fff; margin-bottom: 8px; }
  .step-card p { color: var(--softD); font-size: 14px; line-height: 1.6; }

  /* ─── Country pill ─── */
  .country-pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.06); border: 1px solid var(--lineD);
    border-radius: 100px; padding: 10px 18px; color: #fff;
    font-size: 14px; font-weight: 500; margin: 6px 8px 6px 0;
    transition: background .2s;
  }
  .country-pill:hover { background: rgba(255,255,255,0.1); }
  .country-flag { font-size: 20px; }

  /* ─── Pillar card ─── */
  .pillar {
    border-radius: 20px; padding: 28px; text-align: center;
    transition: transform .3s ease;
  }
  .pillar:hover { transform: translateY(-4px); }
  .pillar .pillar-icon {
    width: 52px; height: 52px; border-radius: 14px;
    background: linear-gradient(135deg, var(--violet), var(--violet-soft));
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px; color: #fff;
  }
  .pillar h4 { font-size: 17px; margin-bottom: 10px; }
  .pillar p { font-size: 14px; line-height: 1.6; }

  /* ─── Phase row (GTM) ─── */
  .phase-row {
    display: flex; gap: 16px; padding: 20px;
    background: rgba(255,255,255,0.04); border: 1px solid var(--lineD); border-radius: 16px;
    margin-bottom: 12px; align-items: flex-start;
    transition: background .2s;
  }
  .phase-row:hover { background: rgba(255,255,255,0.07); }
  .phase-badge {
    flex-shrink: 0; width: 36px; height: 36px; border-radius: 50%;
    background: var(--violet); color: #fff; display: flex; align-items: center; justify-content: center;
    font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700;
  }
  .phase-row h4 { color: #fff; font-size: 15px; margin-bottom: 4px; font-family: 'Inter', sans-serif; }
  .phase-row p { color: var(--softD); font-size: 13.5px; line-height: 1.55; }

  /* ─── AI chip strip ─── */
  .ai-chip {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(108,60,225,0.15); border: 1px solid rgba(108,60,225,0.3);
    border-radius: 100px; padding: 8px 16px; color: var(--lavender-deep);
    font-family: 'Space Mono', monospace; font-size: 12px; margin: 5px 8px 5px 0;
  }

  /* ─── Dashboard tabs ─── */
  .dash-tabs { display: flex; gap: 8px; margin-bottom: 28px; flex-wrap: wrap; }
  .dash-tab {
    padding: 9px 18px; border-radius: 100px; border: 1.5px solid var(--lineD);
    background: transparent; color: var(--softD); cursor: pointer;
    font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 600;
    transition: all .2s ease;
  }
  .dash-tab.active { background: var(--violet); color: #fff; border-color: var(--violet); }
  .dash-tab:hover:not(.active) { background: rgba(255,255,255,0.07); color: #fff; }

  /* ─── Mockup chip coral ─── */
  .mockup .chip-coral {
    display: inline-block; padding: 5px 11px; border-radius: 100px;
    background: rgba(255,107,74,0.2); color: #ffb5a2;
    font-family: 'Space Mono', monospace; font-size: 10.5px; margin: 7px 4px 0 0;
  }

  /* ─── Btn coral ─── */
  .btn-coral { background: var(--coral); color: #fff; box-shadow: 0 8px 24px -6px var(--coral-glow); }
  .btn-coral:hover { transform: translateY(-2px); box-shadow: 0 14px 32px -6px var(--coral-glow); }

  /* ─── Violet text ─── */
  .violet-text { color: var(--lavender-deep); }

  /* ─── Moat strip ─── */
  .moat-strip { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
  .moat-item {
    background: rgba(255,255,255,0.04); border: 1px solid var(--lineD);
    border-radius: 16px; padding: 24px; text-align: center;
  }
  .moat-item .moat-num { font-family:'Space Mono',monospace; font-size: 28px; color: var(--lavender-deep); display: block; margin-bottom: 6px; }
  .moat-item p { color: var(--softD); font-size: 13px; }
  @media (max-width: 640px) { .moat-strip { grid-template-columns: 1fr; } }

  /* ─── Research & Publication Cards ─── */
  .pub-card {
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 24px;
    padding: 36px;
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 40px;
    align-items: center;
    box-shadow: 0 10px 30px -10px rgba(21,11,51,0.06);
    transition: transform .3s ease, box-shadow .3s ease;
  }
  .pub-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -12px rgba(21,11,51,0.12);
  }
  .pub-cover-wrap {
    display: block;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid var(--line);
    box-shadow: 0 8px 24px rgba(21,11,51,0.08);
    transition: transform .3s ease;
  }
  .pub-cover-wrap:hover {
    transform: scale(1.02);
  }
  .pub-cover {
    width: 100%;
    height: auto;
    display: block;
    aspect-ratio: 4/5;
    object-fit: cover;
  }
  .pub-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }
  .logo-box {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: #fff;
    border: 1.5px solid var(--line);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px;
    flex-shrink: 0;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(21,11,51,0.04);
  }
  .logo-box img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  .partner-pill {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    background: #fff;
    border: 1.5px solid var(--line);
    border-radius: 100px;
    padding: 10px 22px 10px 12px;
    box-shadow: 0 4px 14px rgba(21,11,51,0.04);
    transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
  }
  .partner-pill:hover {
    transform: translateY(-3px);
    border-color: var(--violet);
    box-shadow: 0 8px 24px rgba(108,60,225,0.12);
  }
  .partner-pill .logo-box {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    padding: 6px;
    box-shadow: none;
  }
  .edu-card {
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 24px;
    padding: 36px;
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 40px;
    align-items: center;
    box-shadow: 0 10px 32px -10px rgba(21,11,51,0.07);
    transition: transform .3s ease, box-shadow .3s ease;
    margin-bottom: 32px;
  }
  .edu-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 48px -12px rgba(21,11,51,0.14);
  }
  .edu-photo-wrap {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 12px 28px rgba(21,11,51,0.12);
    border: 1px solid var(--line);
    aspect-ratio: 4/5;
  }
  .edu-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .4s ease;
  }
  .edu-photo-wrap:hover .edu-photo {
    transform: scale(1.03);
  }
  .edu-badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--lavender);
    color: var(--violet);
    border: 1px solid var(--violet-glow);
    padding: 6px 14px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 700;
    font-family: 'Space Mono', monospace;
    letter-spacing: .05em;
  }
  @media (max-width: 900px) {
    .edu-card {
      grid-template-columns: 1fr;
      padding: 24px;
      gap: 24px;
    }
    .edu-photo-wrap {
      max-width: 320px;
      margin: 0 auto;
    }
  }
  .partner-pill span {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--ink);
  }
  @media (max-width: 860px) {
    .pub-card {
      grid-template-columns: 1fr;
      padding: 24px;
      gap: 24px;
    }
    .pub-cover {
      max-width: 240px;
      margin: 0 auto;
    }
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

function MagBtn({ children, onClick, variant = "primary", href, target }) {
  const ref = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    setT({ x: (e.clientX - r.left - r.width / 2) * 0.15, y: (e.clientY - r.top - r.height / 2) * 0.3 });
  };
  const leave = () => setT({ x: 0, y: 0 });
  const cls = `btn btn-${variant}`;
  const style = { transform: `translate(${t.x}px, ${t.y}px)`, transition: "transform .25s ease" };
  if (href) return <a ref={ref} href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined} className={cls} style={style} onMouseMove={move} onMouseLeave={leave}>{children}</a>;
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
            {NAV_ITEMS.filter(item => item.id !== "contact").map(item => (
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
          <p style={{ maxWidth: 300, fontSize: 14.5 }}>Product Development · EdTech Strategy · Co-Founder, Manzil.</p>
          <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="https://www.linkedin.com/in/oneirraza" target="_blank" rel="noreferrer"
              style={{ color: "var(--softD)", fontSize: 13.5, display: "flex", alignItems: "center", gap: 6, transition: "color .2s" }}
              onMouseOver={e => e.currentTarget.style.color = "#fff"}
              onMouseOut={e => e.currentTarget.style.color = "var(--softD)"}>
              <ExternalLink size={14} /> LinkedIn
            </a>
            <a href="https://www.linkedin.com/company/manzilai/" target="_blank" rel="noreferrer"
              style={{ color: "var(--softD)", fontSize: 13.5, display: "flex", alignItems: "center", gap: 6, transition: "color .2s" }}
              onMouseOver={e => e.currentTarget.style.color = "#fff"}
              onMouseOut={e => e.currentTarget.style.color = "var(--softD)"}>
              <ExternalLink size={14} /> Manzil
            </a>
          </div>
        </div>
        <div className="footlinks">
          {NAV_ITEMS.filter(n => n.id !== "home").map(n => (
            <button key={n.id} onClick={() => go(n.id)}>{n.label}</button>
          ))}
        </div>
      </div>
      <div className="wrap footbottom">
        <span>© 2026 Oneir Raza · Co-Founder, Manzil</span>
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
              <div className="eyebrow" style={{ marginBottom: 20 }}>EdTech · AI in Education · Global Development</div>
            </Reveal>
            <Reveal delay={80}>
              <h1>Evidence is the <em>strongest</em><br />education technology.</h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="lead">Cambridge-trained EdTech and M&E leader with 5+ years designing government-scale education evaluations, authoring global research on gender & digital learning, and co-founding Manzil — Pakistan's first psychometric pathway platform.</p>
            </Reveal>
            <Reveal delay={240}>
              <div className="hero-actions">
                <MagBtn variant="primary" onClick={() => setPage("research")}>See my research <ArrowRight size={16} /></MagBtn>
                <MagBtn variant="ghost" onClick={() => setPage("experience")}>My journey</MagBtn>
              </div>
            </Reveal>
          </div>
          <HeroPhoto />
        </div>
      </HeroSection>

      <div className="statstrip">
        <div className="wrap">
          <StatCounter target={5} suffix="+ yrs" label="EdTech & Global Development" />
          <StatCounter target={341} suffix="" label="Schools, M&E Systems" />
          <StatCounter target={10000} suffix="+" label="Research Participants" />
          <StatCounter target={4500} suffix="+" label="Children Reached Directly" />
        </div>
      </div>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">What I bring</div>
            <h2>Four capabilities. One direction.</h2>
            <p>From federal ministry stakeholder rooms to data pipelines and product roadmaps — the thread is always the same: read what's broken, then build the bridge.</p>
          </Reveal>
          <div className="grid4">
            <Reveal className="card">
              <div className="icon"><Users size={20} /></div>
              <h3>Partnerships & Strategy</h3>
              <p>High-stakes relationships with federal ministries, the World Bank, BMGF, and global EdTech networks.</p>
            </Reveal>
            <Reveal className="card" delay={80}>
              <div className="icon"><Database size={20} /></div>
              <h3>Data & M&E</h3>
              <p>Designing M&E systems at scale — Stata, SQL, Python, NVivo — for 10,000+ participant cohorts across 341 schools.</p>
            </Reveal>
            <Reveal className="card" delay={160}>
              <div className="icon"><Cpu size={20} /></div>
              <h3>AI & EdTech</h3>
              <p>Mapping AI-readiness, building psychometric engines, and integrating LLMs (ChatGPT, Gemini) into education products.</p>
            </Reveal>
            <Reveal className="card" delay={240}>
              <div className="icon"><Rocket size={20} /></div>
              <h3>Product Development</h3>
              <p>Taking Manzil from concept to live MVP — assessment architecture, university data pipelines, school dashboards, and go-to-market.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="dark sec">
        <div className="wrap co-founder-grid">
          <Reveal>
            <div className="eyebrow">Co-Founder · Manzil</div>
            <h2 style={{ marginTop: 14, fontSize: "clamp(26px,3vw,38px)" }}>A destination — built for 22M students who don't have a map yet.</h2>
            <p style={{ color: "var(--softD)", marginTop: 16, fontSize: 16 }}>Pakistan has almost no structured career guidance infrastructure. Manzil replaces guesswork with a three-layer psychometric engine — interests, values, personality — matched against a verified, multi-country university and scholarship database.</p>
            <div style={{ marginTop: 26 }}>
              <MagBtn variant="coral" onClick={() => setPage("manzil")}>Explore the Manzil story <ArrowRight size={16} /></MagBtn>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Reveal className="glass-card">
              <h3 style={{ fontSize: 16, color: "#fff", marginBottom: 8 }}>The Problem</h3>
              <p style={{ color: "var(--softD)", fontSize: 14.5 }}>22M+ students, near-zero counselling, PKR 200K+ private consultants — and career horizons narrowed to three options.</p>
            </Reveal>
            <Reveal className="glass-card" delay={100}>
              <h3 style={{ fontSize: 16, color: "#fff", marginBottom: 8 }}>The Engine</h3>
              <p style={{ color: "var(--softD)", fontSize: 14.5 }}>RIASEC + Schwartz Values + Big Five → a weighted match algorithm for every major and career. Built and tested with real Pakistani students.</p>
            </Reveal>
            <Reveal className="glass-card" delay={200}>
              <h3 style={{ fontSize: 16, color: "#fff", marginBottom: 8 }}>The Data Advantage</h3>
              <p style={{ color: "var(--softD)", fontSize: 14.5 }}>Scraped, cleaned, and integrated university data from Pakistan, USA, UK, Canada, and Australia — a database no competitor in Pakistan holds.</p>
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
                Global partnerships and strategy professional with a Cambridge MPhil and 4+ years navigating the intersection of educational technology, public policy, and international development. Proven track record of managing high-stakes institutional relationships with federal ministries, academic institutions, and global foundations including the World Bank and the Bill & Melinda Gates Foundation. Expert at translating complex data capabilities into strategic opportunities — and serving as the cross-functional liaison between technical teams and external stakeholders. Deeply knowledgeable in global EdTech ecosystems and emerging AI applications in education.
              </p>
            </Reveal>
          </div>
          <HeroPhoto size="min(280px,60vw)" />
        </div>
      </HeroSection>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Academic Foundation</div>
            <h2>Rigorous scholarship. Proven distinction.</h2>
            <p>From graduating with the Chancellor's Gold Medal at NDU to conducting master's research at the University of Cambridge as a Chevening Scholar.</p>
          </Reveal>
          <div className="grid2">
            <Reveal className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div className="logo-box" style={{ width: 48, height: 48 }}>
                    <img src="/cambridge-uni-logo.png" alt="University of Cambridge" />
                  </div>
                  <div>
                    <div className="wp-meta" style={{ margin: 0 }}>Oct 2023 – Jul 2024</div>
                    <div style={{ fontWeight: 700, color: 'var(--violet)', fontSize: 13.5 }}>University of Cambridge</div>
                  </div>
                </div>
                <h3 style={{ fontSize: 18, marginBottom: 10 }}>MPhil in Education, Globalisation & International Development</h3>
                <p style={{ color: 'var(--soft)', fontSize: 14.5 }}>Fully-funded Chevening Scholar. Published research on gender differences in home EdTech use in Pakistan with Sara Hennessy (EdTech Hub).</p>
              </div>
              <div style={{ marginTop: 20 }}>
                <span className="tag-coral">Chevening Scholar</span>
              </div>
            </Reveal>
            <Reveal className="card" delay={100} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div className="logo-box" style={{ width: 48, height: 48 }}>
                    <img src="/NDU-logo.jfif" alt="National Defence University" />
                  </div>
                  <div>
                    <div className="wp-meta" style={{ margin: 0 }}>Sept 2016 – Aug 2020</div>
                    <div style={{ fontWeight: 700, color: 'var(--violet)', fontSize: 13.5 }}>National Defence University</div>
                  </div>
                </div>
                <h3 style={{ fontSize: 18, marginBottom: 10 }}>Bachelor's in International Relations</h3>
                <p style={{ color: 'var(--soft)', fontSize: 14.5 }}>Awarded Chancellor's Gold Medal and Merit Award for achieving highest GPA in the graduating class. Foundation in governance and state institutions.</p>
              </div>
              <div style={{ marginTop: 20 }}>
                <span className="tag">Chancellor's Gold Medalist</span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={150} style={{ marginTop: 32 }}>
            <MagBtn variant="ghost-light" onClick={() => setPage("education")}>
              Explore degrees & photos <ArrowRight size={15} />
            </MagBtn>
          </Reveal>
        </div>
      </section>

      <section className="tint sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Approach</div>
            <h2>The cross-functional translator.</h2>
            <p>The recurring role across every job: standing between technical teams and institutional stakeholders, and making sure neither side loses the plot.</p>
          </Reveal>
          <div className="grid3">
            <Reveal className="card"><div className="icon"><CheckCircle2 size={20} /></div><h3>M&E Rigor</h3><p>Frameworks aligned to international donor requirements — Stata, SQL, NVivo at scale, baseline to endline.</p></Reveal>
            <Reveal className="card" delay={100}><div className="icon"><Layers size={20} /></div><h3>Plain-language translation</h3><p>Dense technical data becomes policy briefs and dashboards that decision-makers at federal ministries actually use.</p></Reveal>
            <Reveal className="card" delay={200}><div className="icon"><Brain size={20} /></div><h3>AI-enabled strategy</h3><p>EdTech readiness assessments, AI-prompting workflows, and LLM integration for education products at product and policy level.</p></Reveal>
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
              <div><span className="tag">Relationship Management</span><span className="tag">Stakeholder Coordination</span><span className="tag">Pipeline Development</span><span className="tag">CRM Management</span><span className="tag">Donor Engagement</span><span className="tag">Salesforce</span></div>
            </Reveal>
            <Reveal className="card" delay={80}>
              <h3 style={{ marginBottom: 14 }}>Data & Research</h3>
              <div><span className="tag">Python</span><span className="tag">SQL</span><span className="tag">Stata</span><span className="tag">NVivo</span><span className="tag">Advanced Excel</span><span className="tag">Google Sheets</span><span className="tag">M&E Frameworks</span><span className="tag">Quasi-Experimental Evaluation</span></div>
            </Reveal>
            <Reveal className="card" delay={160}>
              <h3 style={{ marginBottom: 14 }}>AI & Product Development</h3>
              <div><span className="tag">EdTech Readiness Assessment</span><span className="tag">AI-Readiness Mapping</span><span className="tag">Digital Transformation Frameworks</span><span className="tag">Advanced AI Prompting (ChatGPT, Gemini)</span><span className="tag">LLM Integration</span><span className="tag">Figma</span></div>
            </Reveal>
            <Reveal className="card" delay={240}>
              <h3 style={{ marginBottom: 14 }}>Languages</h3>
              <div><span className="tag">English</span><span className="tag">Urdu</span><span className="tag">Hindi</span><span className="tag">Italian</span><span className="tag">Arabic</span></div>
            </Reveal>
          </div>

          <div style={{ marginTop: 60 }}>
            <Reveal className="sec-head" style={{ marginBottom: 28 }}>
              <div className="eyebrow">Institutions & Networks</div>
              <h3 style={{ fontSize: 24, marginTop: 8 }}>Organisations, donors, and academic bodies worked with.</h3>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {[
                  { name: "University of Cambridge", logo: "/cambridge-uni-logo.png" },
                  { name: "Chevening Scholarships", logo: "/chevening-logo.png" },
                  { name: "United Nations (UN)", logo: "/UN-logo.png" },
                  { name: "CERP", logo: "/CERP-logo.png" },
                  { name: "Tabadlab", logo: "/tabadlab-logo.svg" },
                  { name: "Teach For Pakistan", logo: "/tfp-logo.svg" },
                  { name: "World Bank", logo: "/world-bank-logo.png" },
                  { name: "Gates Foundation", logo: "/gates-foundation-logo.jfif" },
                  { name: "National Defence University", logo: "/NDU-logo.jfif" },
                ].map(org => (
                  <div key={org.name} className="partner-pill">
                    <div className="logo-box">
                      <img src={org.logo} alt={org.name} />
                    </div>
                    <span>{org.name}</span>
                  </div>
                ))}
              </div>
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
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 8 }}>
            {e.logo && (
              <div className="logo-box" style={{ marginTop: 2 }}>
                <img src={e.logo} alt={e.org} />
              </div>
            )}
            <div>
              <h3>{e.title}</h3>
              <div className="org">{e.org}</div>
            </div>
          </div>
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
            <Reveal delay={160}><p className="lead" style={{ margin: "16px auto 0" }}>From a classroom in Islamabad to leading the evaluation of a national EdTech intervention across 341 schools — with policy, research, and global partnerships along the way.</p></Reveal>
          </div>
        </div>
      </HeroSection>

      {/* CERP Spotlight Section */}
      <section className="tint sec">
        <div className="wrap">
          <Reveal className="sec-head" style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div className="logo-box" style={{ width: 44, height: 44 }}>
                <img src="/CERP-logo.png" alt="CERP logo" />
              </div>
              <span className="eyebrow" style={{ margin: 0 }}>Current Work · CERP Spotlight</span>
            </div>
            <h2>Evaluating a national EdTech intervention, school by school.</h2>
            <p>At the Centre for Economic Research and Policy (CERP), I lead the M&E systems for a large-scale, quasi-experimental evaluation of a two-year government EdTech intervention across 341 public schools — measuring what actually changes for teachers and students when technology enters the classroom.</p>
          </Reveal>

          <div className="grid4">
            <Reveal className="card">
              <div className="icon"><BarChart3 size={20} /></div>
              <h3>Quasi-experimental design</h3>
              <p>Rigorous monitoring and evaluation framework across 341 public schools, collecting data at baseline, midline, and endline.</p>
            </Reveal>
            <Reveal className="card" delay={80}>
              <div className="icon"><Database size={20} /></div>
              <h3>Data at scale</h3>
              <p>Cleaning and synthesizing quantitative (Stata, SQL, Excel) and qualitative (NVivo) datasets for 10,000+ participants.</p>
            </Reveal>
            <Reveal className="card" delay={160}>
              <div className="icon"><Cpu size={20} /></div>
              <h3>AI-readiness mapping</h3>
              <p>Assessing AI-readiness across the education ecosystem, flagging operational gaps where tech adds direct value.</p>
            </Reveal>
            <Reveal className="card" delay={240}>
              <div className="icon"><Landmark size={20} /></div>
              <h3>Government & Donors</h3>
              <p>Partnering with provincial ministry leadership, World Bank, and BMGF to translate findings into institutional ownership.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Career Pathway</div>
            <h2>Full timeline & roles</h2>
          </Reveal>
          <PathwayTimeline />
        </div>
      </section>

      <section className="dark sec">
        <div className="wrap center" style={{ maxWidth: 640 }}>
          <Reveal><div className="eyebrow" style={{ justifyContent: "center" }}>What's next</div></Reveal>
          <Reveal delay={80}><h2 style={{ marginTop: 14, fontSize: "clamp(24px,3vw,36px)" }}>The current chapter is Manzil.</h2></Reveal>
          <Reveal delay={140}><p style={{ color: "var(--softD)", marginTop: 12 }}>Everything above — the M&E rigor, the donor relationships, the policy translation, the AI capability — feeds directly into building it.</p></Reveal>
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

function DashboardShowcase() {
  const [active, setActive] = useState("student");
  const tabs = [
    { id: "student", label: "Student Dashboard" },
    { id: "school", label: "School Dashboard" },
    { id: "parent", label: "Parent Dashboard" },
  ];
  const content = {
    student: {
      chips: ["Career cluster", "Top 3 majors", "Match scores", "University list", "Recommended tutors"],
      rows: [70, 50, 85, 60],
      desc: "Every student sees their Holland type, personality snapshot, top ranked majors and careers, a curated university list, and recommended tutors — all in one place.",
    },
    school: {
      chips: ["Cohort analytics", "Strength heatmap", "Completion rates", "CSV export", "Invite code"],
      rows: [80, 45, 65, 90],
      desc: "School administrators see cohort-level data — which fields their students cluster into, completion rates, and a roster view with every student's match status.",
    },
    parent: {
      chips: ["Alignment report", "Values comparison", "Guidance tips", "Parent quiz"],
      rows: [55, 70, 60, 40],
      desc: "Parents receive a simplified summary — their child's strengths, where expectations align or clash, and how to support their academic direction without pressure.",
    },
  };
  const c = content[active];
  return (
    <div>
      <div className="dash-tabs">
        {tabs.map(t => (
          <button key={t.id} className={`dash-tab${active === t.id ? " active" : ""}`} onClick={() => setActive(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="mockup">
        <div className="bar"><div className="dot" /><div className="dot" /><div className="dot" /></div>
        {c.rows.map((w, i) => <div key={i} className="row" style={{ width: `${w}%` }} />)}
        <div style={{ marginTop: 14 }}>
          {c.chips.map(ch => <span key={ch} className="chip">{ch}</span>)}
        </div>
      </div>
      <p style={{ color: "var(--soft)", fontSize: 14.5, marginTop: 16, lineHeight: 1.65 }}>{c.desc}</p>
    </div>
  );
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
          <StatCounter target={22} suffix="M+" label="High School Students in Pakistan" />
          <StatCounter target={5} suffix="M+" label="University-Ready Students" />
          <StatCounter target={5} suffix=" Countries" label="University Database Coverage" />
          <StatCounter target={500} suffix="K" label="Target Users, Year 1" />
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
            <Reveal className="card"><h3>No Access to Guidance</h3><p>The majority of schools lack dedicated career counselling staff or structured advisory programs. Guidance happens under pressure, at the last minute, and is almost entirely subjective.</p></Reveal>
            <Reveal className="card" delay={80}><h3>Prohibitive Alternatives</h3><p>Elite consultants charge upwards of PKR 200,000 ($700+) per student — out of reach for most families. The guidance gap is a socioeconomic gap.</p></Reveal>
            <Reveal className="card" delay={160}><h3>Information Asymmetry</h3><p>Students and parents have little credible information on university options, admission requirements, scholarships, or realistic career trajectories beyond the most visible paths.</p></Reveal>
            <Reveal className="card" delay={240}><h3>Cultural Narrowness</h3><p>Career horizons are typically limited to "doctor, engineer, lawyer" — ignoring fast-growing fields like data science, climate tech, design, and policy that Pakistan's economy urgently needs.</p></Reveal>
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
            <span className="fnode">Interests (RIASEC) 50%</span><span className="farrow">→</span>
            <span className="fnode">Values (Schwartz) 30%</span><span className="farrow">→</span>
            <span className="fnode">Personality (Big Five) 20%</span><span className="farrow">→</span>
            <span className="fnode" style={{ background: "var(--coral)", color: "#fff", border: "1px solid var(--coral)" }}>Ranked Majors & Careers</span>
          </Reveal>
          <div className="grid3" style={{ marginBottom: 40 }}>
            <Reveal className="card">
              <h3 style={{ fontSize: 16 }}>50% — Holland RIASEC</h3>
              <div style={{ margin: "12px 0" }}><WeightBar pct={100} color="var(--violet-soft)" /></div>
              <p>The first and widest filter: Realistic, Investigative, Artistic, Social, Enterprising, Conventional. Identifies natural interest type from 48 gamified questions.</p>
            </Reveal>
            <Reveal className="card" delay={100}>
              <h3 style={{ fontSize: 16 }}>30% — Schwartz Values</h3>
              <div style={{ margin: "12px 0" }}><WeightBar pct={60} color="var(--coral)" /></div>
              <p>10-value framework (Stimulation, Benevolence, Achievement, Power, Security, etc.) maps what genuinely drives the student — creativity, stability, impact, or growth.</p>
            </Reveal>
            <Reveal className="card" delay={200}>
              <h3 style={{ fontSize: 16 }}>20% — Big Five Personality</h3>
              <div style={{ margin: "12px 0" }}><WeightBar pct={40} color="var(--lavender-deep)" /></div>
              <p>Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism — fine-tunes the ranked list by matching each career's "personality fingerprint."</p>
            </Reveal>
          </div>
          <Reveal>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--lineD)", borderRadius: 16, padding: "24px 28px" }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Scoring Formula</div>
              <div style={{ fontFamily: "'Space Mono', monospace", color: "var(--lavender-deep)", fontSize: "clamp(12px,1.8vw,15px)", lineHeight: 2, overflowX: "auto" }}>
                Final Score = (RIASEC_match × 0.50) + (Values_match × 0.30) + (Big5_match × 0.20)<br />
                → Sort all careers by Final Score → Output Top 10 with ranked justification
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6-Step Student Journey ── */}
      <section className="dark sec" id="product">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Student Journey</div>
            <h2>Six steps. 35 minutes. A lifetime of better decisions.</h2>
            <p>The assessment flow takes a student from blank profile to ranked majors, universities, and career paths — structured, engaging, and available in English and Urdu.</p>
          </Reveal>
          <div className="grid2" style={{ gap: 16 }}>
            {[
              { step: "Step 01", title: "Onboarding (5 min)", desc: "Quick profile: age, grade, curriculum (National/Cambridge/IB). Baseline question: 'What do you hope to do after school?' Establishes current awareness before any guidance begins." },
              { step: "Step 02", title: "Interest Mapping — RIASEC (10 min)", desc: "48 gamified questions across 6 RIASEC dimensions. Output: Top 2 interest types and a summary like 'Investigative + Social → medicine, data science, teaching, research.'" },
              { step: "Step 03", title: "Personality Snapshot — Big Five (10–12 min)", desc: "Mini Big Five test reveals learning style and work preferences. Output: 'You thrive in structured environments, prefer independent work, and have strong verbal reasoning.'" },
              { step: "Step 04", title: "Skills Snapshot (5–7 min)", desc: "Cognitive mini-test (logic, language, pattern recognition) maps relative academic strengths. Output: 'Your logical reasoning is strong → CS, Engineering, Finance may be a great fit.'" },
              { step: "Step 05", title: "Motivation & Values — Schwartz (5 min)", desc: "Reflection quiz surfaces student priorities across 10 Schwartz values. Output: matches priorities to fields and lifestyles — security vs innovation, money vs passion." },
              { step: "Step 06", title: "Career Awareness Boost (Optional)", desc: "Pakistan-specific quiz introduces 'hidden careers' — AI, fintech, climate science, design, policy. Broadens horizons beyond the cultural default of doctor/engineer." },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="step-card">
                  <span className="step-num">{s.step}</span>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── University Data Pipeline ── */}
      <section className="dark sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">University Data Pipeline</div>
            <h2>Real data. Five countries. Cleaned, structured, and live.</h2>
            <p style={{ color: "var(--softD)" }}>This is the technical foundation that makes Manzil's university recommendations credible — not a directory, but a structured, queryable database built from primary sources and continuously updated.</p>
          </Reveal>
          <Reveal style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 0" }}>
              {[
                { flag: "🇵🇰", country: "Pakistan", note: "All major universities — public, private, and degree-awarding institutes" },
                { flag: "🇺🇸", country: "USA", note: "Top universities + accessible programs for Pakistani students" },
                { flag: "🇬🇧", country: "UK", note: "Russell Group + target universities for Pakistani applicants" },
                { flag: "🇨🇦", country: "Canada", note: "Post-secondary institutions with scholarship and PR pathways" },
                { flag: "🇦🇺", country: "Australia", note: "Group of Eight + cost-effective programs for South Asian students" },
              ].map((c, i) => (
                <div key={i} className="country-pill">
                  <span className="country-flag">{c.flag}</span>
                  <span style={{ fontWeight: 600 }}>{c.country}</span>
                  <span style={{ color: "var(--softD)", fontSize: 12 }}>— {c.note}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="grid3">
            <Reveal className="card">
              <div className="icon"><Server size={20} /></div>
              <h3>Data Collection</h3>
              <p>Scraped and aggregated from official university websites, admission portals, and verified third-party sources. Structured into a clean, queryable schema.</p>
            </Reveal>
            <Reveal className="card" delay={80}>
              <div className="icon"><Code2 size={20} /></div>
              <h3>Cleaning & Integration</h3>
              <p>Python-based pipelines handle deduplication, field standardisation, and normalisation — admission deadlines, tuition bands, acceptance contexts, and scholarship tags.</p>
            </Reveal>
            <Reveal className="card" delay={160}>
              <div className="icon"><BarChart3 size={20} /></div>
              <h3>Live in Product</h3>
              <p>Students filter by country, city, budget range, and major. Each result card shows deadlines, scholarships, acceptance context, and a direct application link.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Product Features: Dashboards ── */}
      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Platform Architecture</div>
            <h2>Three dashboards. One ecosystem.</h2>
            <p>Manzil is designed as a tri-stakeholder platform — student, school, and parent — with each layer feeding data quality and institutional stickiness.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
            <Reveal>
              <DashboardShowcase />
            </Reveal>
            <Reveal delay={120}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="card">
                  <div className="icon"><Users size={20} /></div>
                  <h3>Teacher Forms</h3>
                  <p>Short teacher rating forms on student curiosity, collaboration, discipline, and observed strengths — compared against student self-assessment for triangulated accuracy.</p>
                </div>
                <div className="card">
                  <div className="icon"><Zap size={20} /></div>
                  <h3>Annual Model Updates</h3>
                  <p>Manzil's scoring weights are reviewed annually against aggregate data — adjusting for Pakistan's shifting job market and adding emerging fields (AI, fintech, climate science).</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── AI Work ── */}
      <section className="dark sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">AI & Technical Work</div>
            <h2>Where the AI layer lives in Manzil.</h2>
            <p style={{ color: "var(--softD)" }}>Advanced prompting and LLM integration are embedded throughout the platform — from content generation to field classification to insight narrative.</p>
          </Reveal>
          <div className="grid2">
            <Reveal>
              <div className="step-card">
                <span className="step-num" style={{ color: "var(--lavender-deep)" }}>AI Layer 01</span>
                <h4>Assessment Content Generation</h4>
                <p>ChatGPT and Gemini used via advanced prompting to generate age-appropriate, culturally-contextualised question sets in English and Urdu. Prompts engineered for consistency, neutrality, and developmental appropriateness.</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="step-card">
                <span className="step-num" style={{ color: "var(--lavender-deep)" }}>AI Layer 02</span>
                <h4>Career & Major Field Classification</h4>
                <p>LLM-assisted taxonomy mapping: each of the 25+ career fields has a coded RIASEC signature, Schwartz value profile, and Big Five fingerprint — maintained and extended using structured AI prompting workflows.</p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="step-card">
                <span className="step-num" style={{ color: "var(--lavender-deep)" }}>AI Layer 03</span>
                <h4>Personalised Result Narratives</h4>
                <p>Each student receives a plain-language interpretation of their results — not just scores, but "why this fits you," "what this gives you," and "why you won't find it boring." Generated via templated AI prompting at output stage.</p>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="step-card">
                <span className="step-num" style={{ color: "var(--lavender-deep)" }}>AI Layer 04</span>
                <h4>EdTech Readiness Assessment (CERP)</h4>
                <p>At CERP, applied AI-readiness frameworks to assess 341-school EdTech intervention — identifying where AI tools add operational value vs. where infrastructure or capacity gaps block adoption. Translated findings into government-facing policy briefs.</p>
              </div>
            </Reveal>
          </div>
          <Reveal style={{ marginTop: 36 }}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {["ChatGPT", "Gemini", "Advanced Prompting", "LLM Integration", "Field Classification", "Data Pipelines (Python)", "EdTech Readiness Frameworks", "M&E + AI Hybrid Workflows"].map(chip => (
                <span key={chip} className="ai-chip"><Cpu size={12} />{chip}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Business Model ── */}
      <section className="tint sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Business Model</div>
            <h2>Starts free. Monetises the moment guidance is needed most.</h2>
          </Reveal>
          <div className="grid3">
            <Reveal className="card"><h3 style={{ fontSize: 17 }}>01 · Free Entry</h3><p>Every student gets their top 3 recommended fields at no cost — the trust layer the model is built on. Mass adoption before monetisation.</p></Reveal>
            <Reveal className="card" delay={80}><h3 style={{ fontSize: 17 }}>02 · Premium Subscriptions</h3><p>Unlocks hidden careers, tailored university & scholarship lists (local + international), full admissions requirements, and deadlines.</p></Reveal>
            <Reveal className="card" delay={160}><h3 style={{ fontSize: 17 }}>03 · Tutoring Marketplace</h3><p>Commission on booked sessions with verified tutors across SAT, MDCAT, ECAT, IELTS, and essay preparation.</p></Reveal>
          </div>
          <div className="grid3" style={{ marginTop: 22 }}>
            <Reveal className="card"><h3 style={{ fontSize: 17 }}>04 · School Partnerships</h3><p>Bulk licensing of premium school dashboards for cohort-level analytics, heatmaps, and counsellor-support tools.</p></Reveal>
            <Reveal className="card" delay={80} style={{ background: "var(--ink2)", borderColor: "transparent" }}><h3 style={{ fontSize: 17, color: "#fff" }}>Traction</h3><p style={{ color: "var(--softD)" }}>Live MVP · Karachi school pilot · Federal Ministry of Education partnership · Active school outreach across major cities.</p></Reveal>
            <Reveal className="card" delay={160} style={{ background: "var(--coral)", borderColor: "transparent" }}><h3 style={{ fontSize: 17, color: "#fff" }}>The Moat</h3><p style={{ color: "rgba(255,255,255,0.85)" }}>Pakistan's only tri-layer dataset: student + teacher + parent. A psychometric norm tuned to the Pakistani and Global South context — impossible to replicate overnight.</p></Reveal>
          </div>
        </div>
      </section>

      {/* ── Go-to-Market ── */}
      <section className="dark sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Go-to-Market</div>
            <h2>Phased expansion — schools first, then scale.</h2>
            <p style={{ color: "var(--softD)" }}>Pakistan is the launchpad before scaling to the Global South and beyond.</p>
          </Reveal>
          <div style={{ maxWidth: 680 }}>
            {[
              { phase: "1", title: "School Pilot — Major Cities", desc: "20–30 pilot schools in Karachi, Lahore, and Islamabad. Free assessment access, individual reports, school-level anonymised insights, and counsellor training." },
              { phase: "2", title: "Direct-to-Student Campaigns", desc: "TikTok, Instagram, and YouTube campaigns targeting 14–19 year olds. Peer-driven referral mechanics. Viral-first content strategy around test results." },
              { phase: "3", title: "Tutor & Academy Onboarding", desc: "Onboard verified tutors and test-prep academies onto the marketplace. SAT, MDCAT, ECAT, IELTS, and essay prep as the first category." },
              { phase: "4", title: "Tier 2 Cities + International Expansion", desc: "Expand to Tier 2 Pakistani cities. Add more international universities. Explore Global South markets (Bangladesh, Nigeria, Egypt) with the same playbook." },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="phase-row">
                  <div className="phase-badge">{p.phase}</div>
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact ── */}
      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Impact</div>
            <h2>Equalising access to guidance — across income, city, and school type.</h2>
            <p>Manzil positions Pakistan as a launchpad for globally scalable EdTech innovation, while directly strengthening the country's talent pipeline.</p>
          </Reveal>
          <div className="grid3">
            <Reveal className="pillar" style={{ background: "var(--lavender)" }}>
              <div className="pillar-icon"><Globe size={22} /></div>
              <h4 style={{ color: "var(--ink)" }}>Equity</h4>
              <p style={{ color: "var(--soft)" }}>Democratising access to guidance that was previously available only to the wealthy — for free, in English and Urdu.</p>
            </Reveal>
            <Reveal className="pillar" delay={80} style={{ background: "var(--lavender)" }}>
              <div className="pillar-icon" style={{ background: "linear-gradient(135deg, var(--coral), #ff9f7f)" }}><Target size={22} /></div>
              <h4 style={{ color: "var(--ink)" }}>Alignment</h4>
              <p style={{ color: "var(--soft)" }}>Students pursue degrees that genuinely fit their interests, values, and personality — reducing wasted years and misaligned careers.</p>
            </Reveal>
            <Reveal className="pillar" delay={160} style={{ background: "var(--lavender)" }}>
              <div className="pillar-icon" style={{ background: "linear-gradient(135deg, #0d9488, #2dd4bf)" }}><TrendingUp size={22} /></div>
              <h4 style={{ color: "var(--ink)" }}>Talent Pipeline</h4>
              <p style={{ color: "var(--soft)" }}>A generation guided toward emerging fields — AI, fintech, climate science, design — strengthening Pakistan's economic future.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="dark sec">
        <div className="wrap center" style={{ maxWidth: 680 }}>
          <Reveal><Quote size={26} color="var(--coral)" style={{ marginBottom: 14 }} /></Reveal>
          <Reveal delay={80}><blockquote>"A future where every student — regardless of city, income, or school — chooses their path with clarity, not guesswork."</blockquote></Reveal>
          <Reveal delay={160}><p style={{ color: "var(--softD)", marginTop: 18 }}>— Manzil Vision</p></Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Founding Team</div>
            <h2>Built by people who care where it lands.</h2>
          </Reveal>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Reveal className="card" style={{ maxWidth: 440, width: "100%", textAlign: "center" }}>
              <img
                src={PHOTO}
                alt="Oneir Raza"
                style={{ width: 200, height: 200, borderRadius: "50%", objectFit: "cover", objectPosition: "top", margin: "0 auto 20px", display: "block", border: "3px solid var(--lavender)" }}
              />
              <h3 style={{ fontSize: 22 }}>Oneir Raza</h3>
              <p style={{ color: "var(--violet)", fontWeight: 600, fontSize: 14, marginBottom: 12, marginTop: 6 }}>Co-Founder</p>
              <p style={{ marginBottom: 18 }}>Cambridge MPhil · Chevening Scholar · Policy, EdTech, and partnerships across CERP, Tabadlab, and Remoto. Driving product development, psychometric architecture, university data pipeline, and strategic partnerships.</p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="https://www.linkedin.com/in/oneirraza" target="_blank" rel="noreferrer" className="btn btn-violet" style={{ padding: "9px 18px", fontSize: 13 }}>
                  LinkedIn <ExternalLink size={13} />
                </a>
                <a href="https://www.linkedin.com/company/manzilai/" target="_blank" rel="noreferrer" className="btn btn-ghost-light" style={{ padding: "9px 18px", fontSize: 13 }}>
                  Manzil <ExternalLink size={13} />
                </a>
              </div>
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

function EducationPage({ setPage }) {
  return (
    <div className="page-enter">
      <HeroSection centered minHeight="55vh">
        <div className="hero-grid" style={{ gridTemplateColumns: "1fr" }}>
          <div className="center" style={{ maxWidth: 680, margin: "0 auto" }}>
            <Reveal><div className="eyebrow" style={{ justifyContent: "center" }}>Academic Background</div></Reveal>
            <Reveal delay={80}>
              <h1 style={{ fontSize: "clamp(32px,4.4vw,54px)", marginTop: 14 }}>
                Two campuses. <em>Uncompromising rigor.</em>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="lead" style={{ margin: "16px auto 0" }}>
                From graduating top of class with the Chancellor's Gold Medal in Islamabad to completing an MPhil at the University of Cambridge as a Chevening Scholar.
              </p>
            </Reveal>
          </div>
        </div>
      </HeroSection>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Degrees & Distinctions</div>
            <h2>Academic Credentials</h2>
            <p>Formal qualifications and high-level honors that underpin my research, policy analysis, and EdTech work.</p>
          </Reveal>

          {EDUCATION_DATA.map((edu, idx) => (
            <Reveal key={edu.org} delay={idx * 80}>
              <article className="edu-card">
                <div>
                  <div className="edu-photo-wrap">
                    <img src={edu.photo} alt={edu.photoCaption} className="edu-photo" />
                  </div>
                  <p style={{ fontSize: 12, color: "var(--soft)", textAlign: "center", marginTop: 10, fontStyle: "italic" }}>
                    {edu.photoCaption}
                  </p>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
                    <div className="logo-box">
                      <img src={edu.logo} alt={edu.org} />
                    </div>
                    {edu.badgeLogo && (
                      <div className="logo-box">
                        <img src={edu.badgeLogo} alt="Chevening logo" />
                      </div>
                    )}
                    <div>
                      <div className="mono" style={{ fontSize: 12, color: "var(--coral)", letterSpacing: ".1em", textTransform: "uppercase" }}>
                        {edu.dates} · {edu.place}
                      </div>
                      <h4 style={{ fontSize: 16, color: "var(--violet)", fontWeight: 700 }}>{edu.org}</h4>
                    </div>
                  </div>

                  <h3 style={{ fontSize: "clamp(22px,2.6vw,30px)", lineHeight: 1.25, marginBottom: 12 }}>
                    {edu.title}
                  </h3>

                  <div style={{ marginBottom: 16 }}>
                    <span className="edu-badge-pill">★ {edu.badge}</span>
                  </div>

                  <p style={{ color: "var(--soft)", fontSize: 15.5, lineHeight: 1.65, marginBottom: 20 }}>
                    {edu.summary}
                  </p>

                  <ul style={{ paddingLeft: 20, color: "var(--soft)", fontSize: 14.5, lineHeight: 1.7 }}>
                    {edu.bullets.map((b, bIdx) => (
                      <li key={bIdx} style={{ marginBottom: 6 }}>{b}</li>
                    ))}
                  </ul>

                  {edu.title.includes("Cambridge") && (
                    <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <MagBtn variant="primary" onClick={() => setPage("research")}>
                        View published research <ArrowRight size={15} />
                      </MagBtn>
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Institutional honors strip */}
      <section className="tint sec">
        <div className="wrap">
          <Reveal className="sec-head center" style={{ margin: "0 auto 40px" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Honors & Fellowships</div>
            <h2>Recognized for Academic Excellence</h2>
          </Reveal>

          <div className="grid3">
            <Reveal className="card">
              <div className="logo-box" style={{ width: 56, height: 56, marginBottom: 16 }}>
                <img src="/chevening-logo.png" alt="Chevening" />
              </div>
              <h3 style={{ fontSize: 18 }}>Chevening Scholarship</h3>
              <p style={{ color: "var(--soft)", fontSize: 14 }}>Awarded by the UK Foreign, Commonwealth & Development Office to outstanding emerging leaders with leadership potential.</p>
            </Reveal>
            <Reveal className="card" delay={80}>
              <div className="logo-box" style={{ width: 56, height: 56, marginBottom: 16 }}>
                <img src="/NDU-logo.jfif" alt="NDU" />
              </div>
              <h3 style={{ fontSize: 18 }}>Chancellor's Gold Medal</h3>
              <p style={{ color: "var(--soft)", fontSize: 14 }}>Awarded by the National Defence University for graduating with the highest GPA across the entire graduating cohort.</p>
            </Reveal>
            <Reveal className="card" delay={160}>
              <div className="logo-box" style={{ width: 56, height: 56, marginBottom: 16 }}>
                <img src="/cambridge-uni-logo.png" alt="Cambridge" />
              </div>
              <h3 style={{ fontSize: 18 }}>Cambridge University MPhil</h3>
              <p style={{ color: "var(--soft)", fontSize: 14 }}>Completed at the Faculty of Education, specializing in globalization, empirical data analysis, and gender equity in EdTech.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="dark sec">
        <div className="wrap center" style={{ maxWidth: 600 }}>
          <Reveal><div className="eyebrow" style={{ justifyContent: "center" }}>Next Chapter</div></Reveal>
          <Reveal delay={80}><h2 style={{ marginTop: 14, fontSize: "clamp(24px,3vw,36px)" }}>See how this academic rigor translates into real-world impact.</h2></Reveal>
          <Reveal delay={160} style={{ marginTop: 24, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <MagBtn variant="primary" onClick={() => setPage("experience")}>View Experience <ArrowRight size={16} /></MagBtn>
            <MagBtn variant="ghost" onClick={() => setPage("research")}>Explore Research</MagBtn>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function ResearchPage({ setPage }) {
  const interests = [
    "EdTech adoption & equity",
    "Gender in digital learning",
    "Education in developing economies",
    "AI readiness in public education",
    "Large-scale program evaluation",
    "Evidence-to-policy translation",
  ];

  return (
    <div className="page-enter">
      <HeroSection centered minHeight="55vh">
        <div className="hero-grid" style={{ gridTemplateColumns: "1fr" }}>
          <div className="center" style={{ maxWidth: 680, margin: "0 auto" }}>
            <Reveal><div className="eyebrow" style={{ justifyContent: "center" }}>Research & Publications</div></Reveal>
            <Reveal delay={80}>
              <h1 style={{ fontSize: "clamp(32px,4.4vw,54px)", marginTop: 14 }}>
                Evidence on who EdTech <em>actually reaches.</em>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="lead" style={{ margin: "16px auto 0" }}>
                My research asks a simple question with complicated answers: when technology enters a classroom, who benefits — and what actually changes learning?
              </p>
            </Reveal>
          </div>
        </div>
      </HeroSection>

      {/* Featured Paper */}
      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Publication</div>
            <h2>Featured Paper</h2>
          </Reveal>
          <Reveal>
            <article className="pub-card">
              <a
                href="https://edtechhub.org/report/exploring-the-gender-differences-in-technology-use-for-educational-purposes-at-home-among-students-in-pakistan/"
                target="_blank"
                rel="noreferrer"
                className="pub-cover-wrap"
              >
                <img
                  src="/edtechhub-cover.png"
                  alt="Cover of the EdTech Hub report"
                  className="pub-cover"
                />
              </a>
              <div>
                <div className="pub-meta">
                  <div className="logo-box">
                    <img src="/edtechhub-logo.svg" alt="EdTech Hub logo" />
                  </div>
                  <p className="mono" style={{ fontSize: 11.5, color: "var(--violet)", letterSpacing: ".12em", textTransform: "uppercase" }}>
                    EdTech Hub report · July 2025 · with Sara Hennessy
                  </p>
                </div>
                <h3 style={{ fontSize: "clamp(20px,2.4vw,28px)", lineHeight: 1.25, marginBottom: 14 }}>
                  “Exploring the Gender Differences in Technology Use for Educational Purposes at Home Among Students in Pakistan”
                </h3>
                <p style={{ color: "var(--soft)", fontSize: 15.5, lineHeight: 1.65, marginBottom: 24 }}>
                  Based on my MPhil research at the University of Cambridge (Chevening Scholarship). Drawing on a survey of 2,000+ teachers and interviews with EdTech stakeholders, it examines how social norms and parental attitudes shape girls' and boys' use of EdTech at home in Pakistan.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                  <a
                    href="https://docs.edtechhub.org/lib/KM9JWBE7/download/EEQPNN9R"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ fontSize: 13.5, padding: "11px 22px" }}
                  >
                    Read full report (PDF) <ExternalLink size={14} />
                  </a>
                  <a
                    href="https://edtechhub.org/report/exploring-the-gender-differences-in-technology-use-for-educational-purposes-at-home-among-students-in-pakistan/"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost-light"
                    style={{ fontSize: 13.5, padding: "11px 22px" }}
                  >
                    EdTech Hub page <ExternalLink size={14} />
                  </a>
                  <a
                    href="https://doi.org/10.53832/edtechhub.1099"
                    target="_blank"
                    rel="noreferrer"
                    className="mono"
                    style={{ fontSize: 12, color: "var(--violet)", display: "inline-flex", alignItems: "center", gap: 4, marginLeft: 6 }}
                  >
                    DOI: 10.53832/edtechhub.1099 <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Policy Brief */}
      <section className="tint sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Policy Brief</div>
            <h2>From research to reform.</h2>
          </Reveal>
          <Reveal>
            <article className="pub-card">
              <a
                href="https://tabadlab.com/leadership/islahati-jaiza/"
                target="_blank"
                rel="noreferrer"
                className="pub-cover-wrap"
              >
                <img
                  src="/tabadlab-cover.png"
                  alt="Cover of the Tabadlab policy brief on Punjab education sector reforms"
                  className="pub-cover"
                />
              </a>
              <div>
                <div className="pub-meta">
                  <div className="logo-box">
                    <img src="/tabadlab-logo.svg" alt="Tabadlab logo" />
                  </div>
                  <p className="mono" style={{ fontSize: 11.5, color: "var(--violet)", letterSpacing: ".12em", textTransform: "uppercase" }}>
                    Tabadlab · July 2023
                  </p>
                </div>
                <h3 style={{ fontSize: "clamp(20px,2.4vw,28px)", lineHeight: 1.25, marginBottom: 14 }}>
                  “Islahi Jaiza: Punjab Education Sector Reforms” — what the future holds
                </h3>
                <p style={{ color: "var(--soft)", fontSize: 15.5, lineHeight: 1.65, marginBottom: 24 }}>
                  A policy brief I researched and wrote at Tabadlab, reviewing two decades of education reform in Punjab. It draws on a policy dialogue roadmap with 20+ institutional stakeholders and sets out actionable recommendations for the sector.
                </p>
                <div>
                  <a
                    href="https://tabadlab.com/leadership/islahati-jaiza/"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ fontSize: 13.5, padding: "11px 22px" }}
                  >
                    View on Tabadlab <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Research Interests */}
      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Interests</div>
            <h2>What I keep coming back to.</h2>
          </Reveal>
          <Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {interests.map(item => (
                <span
                  key={item}
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    borderRadius: 100,
                    background: "var(--lavender)",
                    color: "var(--violet)",
                    fontWeight: 600,
                    fontSize: 14,
                    border: "1px solid var(--line)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} style={{ marginTop: 44 }}>
            <MagBtn variant="primary" onClick={() => setPage("contact")}>
              Collaborate on research <ArrowRight size={16} />
            </MagBtn>
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
          <Reveal delay={160}><p className="lead" style={{ margin: "16px auto 0" }}>Open to conversations on EdTech partnerships, policy collaborations, product development roles, and Manzil pilot programs with schools and institutions.</p></Reveal>
        </div>
      </HeroSection>

      <section className="sec" style={{ paddingTop: 0, marginTop: -56, position: "relative", zIndex: 3 }}>
        <div className="wrap">
          <div className="grid2">
            <Reveal className="card">
              <div className="icon"><Mail size={20} /></div>
              <h3>Email</h3>
              <p><a href="https://mail.google.com/mail/?view=cm&fs=1&to=oneirraza@gmail.com" target="_blank" rel="noreferrer" style={{ color: "var(--violet)", fontWeight: 600 }}>oneirraza@gmail.com</a></p>
              <p style={{ marginTop: 8, fontSize: 13.5 }}>Preferred for EdTech partnerships, school pilots, and strategic conversations.</p>
            </Reveal>
            <Reveal className="card" delay={80}>
              <div className="icon"><Phone size={20} /></div>
              <h3>Phone</h3>
              <p><a href="tel:+923351599612" style={{ color: "var(--violet)", fontWeight: 600 }}>+92 335 1599612</a></p>
              <p style={{ marginTop: 8, fontSize: 13.5 }}>Pakistan timezone. Available for calls on EdTech, policy, and product conversations.</p>
            </Reveal>
            <Reveal className="card" delay={160}>
              <div className="icon"><ExternalLink size={20} /></div>
              <h3>Personal LinkedIn</h3>
              <p style={{ marginTop: 8, fontSize: 13.5, marginBottom: 16 }}>4+ years of international development, EdTech strategy, and policy work.</p>
              <a href="https://www.linkedin.com/in/oneirraza" target="_blank" rel="noreferrer" className="btn btn-violet" style={{ padding: "9px 18px", fontSize: 13, display: "inline-flex", gap: "6px" }}>
                Connect on LinkedIn <ExternalLink size={14} />
              </a>
            </Reveal>
            <Reveal className="card" delay={240}>
              <div className="icon"><Globe size={20} /></div>
              <h3>Manzil LinkedIn</h3>
              <p style={{ marginTop: 8, fontSize: 13.5, marginBottom: 16 }}>Follow Manzil for product updates, school pilot news, and EdTech insights.</p>
              <a href="https://www.linkedin.com/company/manzilai/" target="_blank" rel="noreferrer" className="btn btn-ghost-light" style={{ padding: "9px 18px", fontSize: 13, display: "inline-flex", gap: "6px" }}>
                Follow Manzil <ExternalLink size={14} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="tint sec">
        <div className="wrap">
          <Reveal className="sec-head center" style={{ margin: "0 auto 48px" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Open to</div>
            <h2>What I'm currently exploring.</h2>
          </Reveal>
          <div className="grid3">
            <Reveal className="card">
              <div className="icon"><Building2 size={20} /></div>
              <h3>School Pilots</h3>
              <p>Free pilot program for the first cohort of partner schools — full assessment access, individual reports, and school-level insights. No obligation after.</p>
            </Reveal>
            <Reveal className="card" delay={80}>
              <div className="icon"><Rocket size={20} /></div>
              <h3>Strategic Partnerships</h3>
              <p>EdTech organisations, global foundations, and government bodies working on education guidance, digital transformation, or youth employment in Pakistan.</p>
            </Reveal>
            <Reveal className="card" delay={160}>
              <div className="icon"><Target size={20} /></div>
              <h3>Product & Policy Roles</h3>
              <p>Applying for roles at the intersection of product development, EdTech, and social impact — where technical depth meets institutional strategy.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="dark sec">
        <div className="wrap center" style={{ maxWidth: 580 }}>
          <Reveal><div className="eyebrow" style={{ justifyContent: "center" }}>Currently</div></Reveal>
          <Reveal delay={80}><h2 style={{ marginTop: 14, fontSize: "clamp(22px,2.8vw,34px)" }}>Engaging with schools, education networks, and strategic partners across Pakistan.</h2></Reveal>
          <Reveal delay={160}><p style={{ color: "var(--softD)", marginTop: 16 }}>If you'd like to bring structured, evidence-based guidance to your students — or explore a partnership on EdTech, policy, or product development — I'd love to talk.</p></Reveal>
          <Reveal delay={240} style={{ marginTop: 28 }}>
            <MagBtn variant="primary" href="https://mail.google.com/mail/?view=cm&fs=1&to=oneirraza@gmail.com" target="_blank">Send an email <ArrowRight size={16} /></MagBtn>
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

  const PageMap = {
    home: HomePage,
    about: AboutPage,
    experience: ExperiencePage,
    education: EducationPage,
    research: ResearchPage,
    manzil: ManzilPage,
    contact: ContactPage
  };
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
