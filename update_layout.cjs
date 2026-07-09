const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// Use the female cofounder pic for the hero photo as well
content = content.replace('const PHOTO = photo;', 'const PHOTO = femaleCofounderPic;');

// Replace the founding team section
const searchPattern = /<Reveal className="sec-head"><div className="eyebrow">Founding Team<\/div><h2>Built by three people who \s*care where it lands\.<\/h2><\/Reveal>\s*<div className="grid3">\s*<Reveal className="card">\s*<img src=\{femaleCofounderPic\} alt="Oneir Raza" style=\{\{ width: '100%', borderRadius: '12px', marginBottom: '16px', objectFit: 'cover', height: '240px' \}\} \/>\s*<h3 style=\{\{ fontSize: 18 \}\}>Oneir Raza<\/h3><p style=\{\{ color: "var\(--violet\)", fontWeight: 600, fontSize: 14, marginBottom: 10 \}\}>Co-Founder<\/p><p>Cambridge MPhil, Chevening Scholar. Policy, EdTech, and partnerships across CERP, Tabadlab, and Remoto\.<\/p><\/Reveal>\s*<Reveal className="card" delay=\{80\}><h3 style=\{\{ fontSize: 18 \}\}>Adeel Nisar<\/h3><p style=\{\{ color: "var\(--violet\)", fontWeight: 600, fontSize: 14, marginBottom: 10 \}\}>Head of Technology<\/p><p>Leads product engineering and the assessment &amp; matching engine that powers Manzil\.<\/p><\/Reveal>\s*<Reveal className="card" delay=\{160\}><h3 style=\{\{ fontSize: 18 \}\}>Alishba Rizwan<\/h3><p style=\{\{ color: "var\(--violet\)", fontWeight: 600, fontSize: 14, marginBottom: 10 \}\}>Research Associate<\/p><p>Drives the psychometric research and university\/scholarship data behind every recommendation\.<\/p><\/Reveal>\s*<\/div>/g;

const replacement = `<Reveal className="sec-head"><div className="eyebrow">Founding Team</div><h2>Built by people who care where it lands.</h2></Reveal>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Reveal className="card" style={{ maxWidth: '400px', textAlign: 'center' }}>
                <img src={femaleCofounderPic} alt="Oneir Raza" style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 20px', display: 'block' }} />
                <h3 style={{ fontSize: 22 }}>Oneir Raza</h3>
                <p style={{ color: "var(--violet)", fontWeight: 600, fontSize: 15, marginBottom: 14 }}>Co-Founder</p>
                <p>Cambridge MPhil, Chevening Scholar. Policy, EdTech, and partnerships across CERP, Tabadlab, and Remoto.</p>
              </Reveal>
            </div>`;

if(content.match(searchPattern)) {
    content = content.replace(searchPattern, replacement);
    console.log("Successfully replaced the Founding Team section.");
} else {
    console.log("Could not find the exact pattern for the Founding Team section.");
}

fs.writeFileSync('src/App.jsx', content);
