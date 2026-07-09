const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// Replace PHOTO
content = content.replace(/const PHOTO = "data:image\/jpeg;base64,[^"]+";/, "const PHOTO = photo;");

// Add imports at top
content = `import photo from './assets/WhatsApp_Image_2026-03-10_at_11.42.43_PM-removebg-preview.png';
import { motion } from 'framer-motion';
import './index.css';
` + content;

// Replace CSS block
const newCSS = `
  :root{
    --ink: hsl(var(--foreground));
    --ink2: hsl(var(--card-foreground));
    --violet: hsl(var(--manzil-purple));
    --violet-soft: hsl(var(--manzil-purple-light));
    --coral: hsl(var(--coral));
    --lavender: hsl(var(--lavender-light));
    --lavender-deep: hsl(var(--lavender));
    --paper: hsl(var(--background));
    --line: hsl(var(--border));
    --lineD: hsl(var(--border));
    --soft: hsl(var(--muted-foreground));
    --softD: hsl(var(--muted-foreground));
  }
  .prx *{ box-sizing:border-box; }
  .prx{
    font-family: 'Space Grotesk', sans-serif;
    background:var(--paper);
    color:var(--ink);
    line-height:1.6;
    overflow-x:hidden;
    -webkit-font-smoothing:antialiased;
  }
  .prx h1,.prx h2,.prx h3,.prx h4{ font-family: 'Quicksand', sans-serif; font-weight:700; letter-spacing:-0.01em; margin:0; }
  .prx a{ color:inherit; }
  .wrap{ max-width:1180px; margin:0 auto; padding:0 32px; }
  .mono{ font-family:'Roboto Mono',monospace; }

  .eyebrow{ font-family:'Roboto Mono',monospace; font-size:12.5px; letter-spacing:.14em; text-transform:uppercase; color:var(--coral); display:inline-flex; align-items:center; gap:10px; }
  .eyebrow::before{ content:""; width:22px; height:1px; background:var(--coral); }
`;

content = content.replace(/@import url\('https:\/\/fonts.googleapis.com[^;]+;\n\n  :root{[\s\S]*?\.eyebrow::before{[^}]+}/, newCSS);

// Make sure it exports default App
if (!content.includes('export default function App')) {
    content = content.replace(/function App\(\) {/, 'export default function App() {');
}

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx patched!');
