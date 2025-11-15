// generate_countries.js
// Node.js로 국가별 폴더와 index.html 자동 생성

const fs = require('fs');
const path = require('path');
const { countries } = require('./countries-data');

const BASE_CALC_URL = 'https://ejsvk1207-source.github.io/remotenetpay/'; // 네 GitHub Pages URL
const YEAR = '2025';

// 국가별 페이지 HTML 템플릿
function buildCountryHtml(country) {
  const { code, slug, name } = country;
  const calcUrl = `${BASE_CALC_URL}?country=${encodeURIComponent(code)}`;

  const title = `${name} Net Salary Calculator ${YEAR} – Remote Worker Take-Home Pay`;
  const description = `Estimate your net salary in ${name} as a remote worker or freelancer. This ${YEAR} ${name} net salary calculator shows after-tax income and take-home pay.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="canonical" href="${BASE_CALC_URL}${slug}/" />
  <style>
    :root {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color-scheme: light dark;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 16px;
      max-width: 900px;
      margin-inline: auto;
      line-height: 1.5;
    }
    h1 { font-size: 24px; margin-bottom: 8px; }
    h2 { font-size: 18px; margin-top: 24px; }
    .card {
      border: 1px solid #444;
      border-radius: 10px;
      padding: 16px;
      margin: 16px 0;
    }
    .small {
      font-size: 12px;
      opacity: 0.8;
    }
    iframe {
      width: 100%;
      max-width: 900px;
      height: 620px;
      border: 1px solid #444;
      border-radius: 10px;
    }
    ul { padding-left: 20px; }
    @media (prefers-color-scheme: dark) {
      body { background: #111; color: #eee; }
      .card { border-color: #555; }
      iframe { border-color: #666; }
    }
  </style>
</head>
<body>
  <h1>${name} Net Salary Calculator (${YEAR})</h1>
  <p>
    Use this simple calculator to estimate your <strong>after-tax (net) salary</strong> in ${name}
    as a remote worker or freelancer. This tool is ideal for international remote jobs,
    digital nomads, and global hiring.
  </p>

  <div class="card">
    <p class="small">
      The calculator runs in an embedded tool. Just enter your gross annual salary and choose your employment type.
    </p>
    <iframe
      src="${calcUrl}"
      loading="lazy"
      title="${name} net salary calculator (${YEAR})">
    </iframe>
    <p class="small">
      This is a simplified estimator. Real tax situation depends on detailed laws in your city,
      region, and employment contract.
    </p>
  </div>

  <h2>How to Use the ${name} Net Salary Calculator</h2>
  <ul>
    <li>Enter your <strong>annual gross salary</strong> (before tax).</li>
    <li>Select whether you are an <strong>employee</strong> or <strong>freelancer/contractor</strong>.</li>
    <li>Click <strong>Calculate</strong> to see your estimated net salary.</li>
    <li>Review annual, monthly, weekly and daily take-home pay.</li>
  </ul>

  <h2>Who Is This Tool For?</h2>
  <ul>
    <li>Remote workers considering a job offer in ${name}</li>
    <li>Freelancers working with foreign clients</li>
    <li>Digital nomads comparing net income across countries</li>
    <li>Companies hiring remote talent in ${name}</li>
  </ul>

  <h2>Important Disclaimer</h2>
  <p class="small">
    This calculator uses simplified assumptions for income tax and social contributions.
    It is provided for educational and planning purposes only and is <strong>not</strong> official tax advice.
    For accurate information, always consult a professional tax advisor in ${name}.
  </p>
</body>
</html>`;
}

// 실제 파일 생성 로직
function generate() {
  const baseDir = __dirname;

  countries.forEach((c) => {
    const dir = path.join(baseDir, c.slug);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const html = buildCountryHtml(c);
    const filePath = path.join(dir, 'index.html');
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✔ Generated: ${c.slug}/index.html`);
  });

  console.log('✅ All country pages generated.');
}

generate();
