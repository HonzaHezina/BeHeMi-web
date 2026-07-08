#!/usr/bin/env node
/**
 * prep-photos.mjs — příprava fotek pro web BoHeMi (Node + sharp)
 * Zmenší na max 2000px, ODSTRANÍ metadata (EXIF vč. GPS!), přejmenuje na ASCII.
 *
 * Použití (z rootu repa, funguje v PowerShellu i bashi):
 *   npm run photos -- <zdrojová_složka> <cílová_podsložka>
 * Příklad:
 *   npm run photos -- C:\Users\janhe\Downloads\kruhac-fotky lekce
 *   → fotky skončí v src/assets/lekce/
 *
 * Cílové podsložky: lekce · treneri · deti · studio · galerie
 * Vyžaduje: npm i -D sharp   (Astro ho nejspíš už má)
 * Pozn.: HEIC z iPhonu sharp neumí — na iPhonu nastav focení na
 * „Nejkompatibilnější" (JPG), nebo fotky nejdřív zkonvertuj.
 */

import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const [src, dest] = process.argv.slice(2);

if (!src || !dest) {
  console.error("Použití: npm run photos -- <zdrojová_složka> <cílová_podsložka>");
  console.error("Příklad: npm run photos -- ~/Downloads/kruhac-fotky lekce");
  process.exit(1);
}

if (!existsSync("src/assets")) {
  console.error("CHYBA: spusť mě z rootu repa (nevidím src/assets/).");
  process.exit(1);
}
if (!existsSync(src)) {
  console.error(`CHYBA: zdrojová složka '${src}' neexistuje.`);
  process.exit(1);
}

const destDir = path.join("src", "assets", dest);
await mkdir(destDir, { recursive: true });

const EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

// ASCII název: bez diakritiky, malými, pomlčky místo mezer/podtržítek
function asciiName(base) {
  return base
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // diakritika pryč
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const files = (await readdir(src)).filter((f) => EXT.has(path.extname(f).toLowerCase()));

if (files.length === 0) {
  console.log(`Žádné fotky nenalezeny v '${src}' (hledám jpg/jpeg/png/webp).`);
  console.log("Máš HEIC z iPhonu? Viz poznámka v hlavičce skriptu.");
  process.exit(0);
}

let count = 0;
for (const f of files) {
  let name = asciiName(path.parse(f).name) || `foto-${Date.now()}-${count}`;
  let out = path.join(destDir, `${name}.jpg`);
  for (let i = 1; existsSync(out); i++) out = path.join(destDir, `${name}-${i}.jpg`);

  // .rotate() bez argumentu = auto-orient dle EXIF; metadata se defaultně NEzapisují
  await sharp(path.join(src, f))
    .rotate()
    .resize(2000, 2000, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);

  const kb = Math.round((await stat(out)).size / 1024);
  console.log(`✓ ${f} → ${out} (${kb} kB)`);
  count++;
}

console.log(`\nHotovo: ${count} fotek v ${destDir}`);
console.log(`Zkontroluj je, pak: git add ${destDir} && git commit`);
