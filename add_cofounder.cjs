const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

if (!content.includes('femaleCofounderPic')) {
    content = content.replace(
        `import './index.css';`,
        `import './index.css';\nimport femaleCofounderPic from './assets/ChatGPT Image Jun 25, 2026, 12_04_01 PM.png';`
    );
}

const targetStr = `<Reveal className="card"><h3 style={{ fontSize: 18 }}>Oneir Raza</h3>`;
const replaceStr = `<Reveal className="card">
<img src={femaleCofounderPic} alt="Oneir Raza" style={{ width: '100%', borderRadius: '12px', marginBottom: '16px', objectFit: 'cover', height: '240px' }} />
<h3 style={{ fontSize: 18 }}>Oneir Raza</h3>`;

if(content.includes(targetStr)) {
    content = content.replace(targetStr, replaceStr);
} else {
    console.log("Could not find the target string for Oneir Raza card.");
}

fs.writeFileSync('src/App.jsx', content);
console.log("Patched App.jsx successfully");
