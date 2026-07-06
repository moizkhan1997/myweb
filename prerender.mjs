import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist', 'public');
const PORT = 3998;

const ROUTES = [
  '/',
  '/portfolio',
  '/contact',
  '/blog',
  '/logo-animation',
  '/social-content',
  '/case-study/trimmic-branding',
  '/service/saas-videos',
  '/service/explainer-videos',
  '/service/motion-graphics',
  '/service/branding',
  '/service/shorts',
  '/service/ugc',
  '/service/youtube-videos',
  '/service/digital-marketing',
  '/service/content-creation',
  '/service/social-media-management',
  '/blog/saas-explainer-video-cost-2025',
  '/blog/logo-animation-styles-guide',
  '/blog/why-saas-needs-motion-graphics',
];

const MIME = {
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.html': 'text/html',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  const filePath = path.join(DIST, url);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(path.join(DIST, 'index.html')).pipe(res);
  }
});

await new Promise(resolve => server.listen(PORT, resolve));
console.log(`Prerender server on :${PORT}`);

const browser = await puppeteer.launch({
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--no-first-run',
    '--no-zygote',
  ],
});

let ok = 0;
let fail = 0;

for (const route of ROUTES) {
  try {
    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: 'load',
      timeout: 30000,
    });
    // Wait for React to render and GSAP to initialize
    await new Promise(r => setTimeout(r, 1500));

    const html = await page.content();

    const segments = route === '/' ? [] : route.split('/').filter(Boolean);
    const dir = segments.length ? path.join(DIST, ...segments) : DIST;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');

    await page.close();
    console.log(`✓ ${route}`);
    ok++;
  } catch (err) {
    console.error(`✗ ${route}: ${err.message}`);
    fail++;
  }
}

await browser.close();
server.close();
console.log(`\nPrerendering complete: ${ok} succeeded, ${fail} failed`);
