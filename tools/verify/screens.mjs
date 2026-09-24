/**
 * Screenshots y chequeo de desborde horizontal con el Edge instalado (puppeteer-core).
 *
 *   npm run preview   (en otra terminal)
 *   node tools/verify/screens.mjs --out <dir> [--pages a,b] [--widths 360,1400] [--overflow]
 *
 * --pages   rutas del sitio nuevo («/components/accordion/»); por defecto, todas las de dist/.
 * --base    URL del preview (por defecto http://localhost:4321).
 * --overflow no saca capturas; solo reporta las páginas con scroll horizontal a 360 px.
 *
 * Los iframes de Figma salen en blanco en headless: es normal.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

const args = process.argv.slice(2);
const opt = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const OUT = path.resolve(opt('--out') ?? path.join(ROOT, '.screens'));
const WIDTHS = (opt('--widths') ?? '390,1400').split(',').map(Number);
const OVERFLOW = args.includes('--overflow');
const DIST = path.resolve(opt('--dist') ?? path.join(ROOT, 'dist'));
const BASE = opt('--base') ?? 'http://localhost:4321';

function allPages() {
  const pages = [];
  const walk = (dir) => {
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, f.name);
      if (f.isDirectory() && !f.name.startsWith('_')) walk(abs);
      else if (f.name === 'index.html') pages.push('/' + path.relative(DIST, path.dirname(abs)).replace(/\\/g, '/') + '/');
    }
  };
  walk(DIST);
  return pages.map((p) => p.replace(/^\/\/$/, '/').replace(/\/\/$/, '/'));
}

const pages = opt('--pages')?.split(',') ?? allPages();

const name = (route) => route.replace(/^\/|\/$/g, '').replace(/\//g, '__') || 'home';

const browser = await puppeteer.launch({ executablePath: EDGE, headless: true });
const page = await browser.newPage();
// Los embeds de Figma no aportan al layout (salen en blanco en headless) y demoran cada carga.
await page.setRequestInterception(true);
page.on('request', (req) => (req.url().includes('figma.com') ? req.abort() : req.continue()));
fs.mkdirSync(OUT, { recursive: true });
const overflowing = [];

for (const route of pages) {
  for (const width of OVERFLOW ? [360] : WIDTHS) {
    const mobile = width < 1024;
    await page.setViewport({ width, height: mobile ? 800 : 1000, isMobile: mobile, hasTouch: mobile });
    await page.goto(BASE + route, { waitUntil: 'load', timeout: 30000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, OVERFLOW ? 150 : 600));
    await page.evaluate(() => document.fonts.ready).catch(() => {});
    if (OVERFLOW) {
      const { sw, vw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, vw: window.innerWidth }));
      if (sw > vw) overflowing.push(`${route} (${sw}px > ${vw}px)`);
      continue;
    }
    await page.screenshot({ path: path.join(OUT, `${name(route)}.${width}.png`), fullPage: true });
  }
}

await browser.close();
if (OVERFLOW) {
  console.log(overflowing.length ? `Con scroll horizontal a 360 px:\n  ${overflowing.join('\n  ')}` : '✓ Ninguna página desborda a 360 px');
  process.exit(overflowing.length ? 1 : 0);
}
console.log(`Capturas en ${OUT}`);
