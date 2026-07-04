// Kontrola interních odkazů, kotev a duplicitních odstavců v dist/
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = process.argv[2] ?? 'dist';

function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = htmlFiles(DIST);
const pages = new Map(); // url path -> { file, html, ids:Set }
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  let url = '/' + relative(DIST, f).replace(/\\/g, '/');
  url = url.replace(/index\.html$/, '');
  pages.set(url, { file: f, html, ids });
}

const errors = [];
const externalSkipped = new Set();

for (const [url, page] of pages) {
  for (const m of page.html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:|#$)/.test(href)) {
      if (/^https?:/.test(href)) externalSkipped.add(href);
      continue;
    }
    let [path, anchor] = href.split('#');
    if (path === '') path = url; // čistá kotva #foo → tatáž stránka
    if (!path.startsWith('/')) { errors.push(`${url}: relativní href "${href}"`); continue; }
    if (!path.endsWith('/') && !path.includes('.')) { errors.push(`${url}: chybí trailing slash "${href}"`); continue; }
    const target = pages.get(path);
    if (!target) {
      if (!path.includes('.')) errors.push(`${url}: mrtvý odkaz "${href}" (stránka neexistuje)`);
      continue;
    }
    if (anchor && !target.ids.has(anchor)) {
      errors.push(`${url}: mrtvá kotva "${href}" (id="${anchor}" na ${path} není)`);
    }
  }
}

// Duplicitní odstavce: texty <p> delší než 90 znaků na více stránkách
const paraOwners = new Map();
for (const [url, page] of pages) {
  const seen = new Set();
  for (const m of page.html.matchAll(/<p[^>]*>(.*?)<\/p>/gs)) {
    const text = m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text.length < 90 || seen.has(text)) continue;
    seen.add(text);
    if (!paraOwners.has(text)) paraOwners.set(text, []);
    paraOwners.get(text).push(url);
  }
}
const dups = [...paraOwners.entries()].filter(([, urls]) => urls.length > 1);

console.log(`Stránek: ${pages.size}, externích odkazů (přeskočeno): ${externalSkipped.size}`);
console.log(`\n=== CHYBY ODKAZŮ (${errors.length}) ===`);
for (const e of errors) console.log('  ' + e);
console.log(`\n=== DUPLICITNÍ ODSTAVCE >90 znaků (${dups.length}) ===`);
for (const [text, urls] of dups) console.log(`  [${urls.join(' + ')}] ${text.slice(0, 90)}…`);
console.log('\nExterní cíle:');
for (const u of externalSkipped) console.log('  ' + u);
