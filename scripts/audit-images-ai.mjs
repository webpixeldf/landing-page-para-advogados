#!/usr/bin/env node
/**
 * Heurísticas para detectar imagens possivelmente geradas por IA.
 *
 * Nenhum método é 100% — o Google usa SynthID e outros classifiers pra isso.
 * Mas podemos flagrar sinais fortes:
 *  1. EXIF ausente / Software = IA (Midjourney, Stable Diffusion, DALL-E, Firefly)
 *  2. XMP/IPTC com tags "AI", "GenAI", "Generative"
 *  3. Dimensões típicas de modelos (1024×1024, 1024×1536, 1920×1080 sem crop)
 *  4. Razão filesize/pixel anormal (IA costuma comprimir de forma "limpa demais")
 *  5. Nome de arquivo com "ai", "generated", "midjourney", etc.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const DIR = './public/images';
const AI_SOFTWARE = /midjourney|stable.diffusion|dall.?e|firefly|leonardo|ideogram|flux|imagen|gemini|bing.?image|copilot.?image|synthid/i;
const AI_KEYWORDS = /\b(ai|generated|synthetic|midjourney|stable.?diffusion|dalle|sdxl)\b/i;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (/\.(jpe?g|png|webp|avif)$/i.test(e.name)) out.push(full);
  }
  return out;
}

function bytesToMB(b) { return (b / 1024 / 1024).toFixed(2); }

async function analyze(file) {
  const st = await stat(file);
  const img = sharp(file);
  let meta, exif;
  try {
    meta = await img.metadata();
    exif = meta.exif ? JSON.stringify(meta.exif) : '';
  } catch (e) {
    return { file, error: e.message };
  }

  const flags = [];

  // 1. filename
  if (AI_KEYWORDS.test(path.basename(file))) {
    flags.push('filename contém palavra "AI"');
  }

  // 2. EXIF ausente em JPEG/PNG (WebP normalmente não tem)
  const isWebp = /\.webp$/i.test(file);
  const hasExif = !!meta.exif;
  if (!isWebp && !hasExif) {
    flags.push('SEM EXIF (fotos reais quase sempre têm)');
  }

  // 3. Software em EXIF que indica IA
  if (hasExif && AI_SOFTWARE.test(exif)) {
    flags.push('EXIF contém software de IA');
  }

  // 4. Dimensões típicas de IA
  if (meta.width && meta.height) {
    const dims = `${meta.width}x${meta.height}`;
    const aiCommon = ['1024x1024','1024x1536','1536x1024','768x768','1088x1088','1344x768','1328x1328','1280x1280','1920x1080'];
    if (aiCommon.includes(dims)) {
      flags.push(`dimensões típicas de IA (${dims})`);
    }
  }

  // 5. Bytes por pixel — IA costuma gerar 0.1-0.4 bpp pós-compressão; fotos reais 0.3-0.9
  const bpp = st.size / (meta.width * meta.height || 1);

  // Heurística: se MUITO baixa E dimensões quadradas de IA → suspeito
  const isSquare = meta.width === meta.height;
  if (isSquare && meta.width >= 1024 && bpp < 0.25) {
    flags.push(`bpp baixo (${bpp.toFixed(3)}) em imagem quadrada 1024+`);
  }

  // 6. Make/Model ausentes (câmeras salvam isso)
  if (hasExif && !/\bMake\b/.test(exif) && !/\bModel\b/.test(exif)) {
    flags.push('EXIF sem Make/Model (pode ser sintético ou processado)');
  }

  return {
    file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
    size: bytesToMB(st.size) + ' MB',
    dimensions: meta.width && meta.height ? `${meta.width}x${meta.height}` : '?',
    format: meta.format,
    hasExif,
    bpp: bpp.toFixed(3),
    flags
  };
}

const files = await walk(DIR);
console.log(`\n═══ Analisando ${files.length} imagens em ${DIR} ═══\n`);

const suspects = [];
for (const f of files) {
  const r = await analyze(f);
  if (r.flags?.length >= 2) suspects.push(r);
  const mark = r.flags?.length >= 2 ? '⚠ ' : r.flags?.length === 1 ? '○ ' : '✓ ';
  const flagsText = r.flags?.length ? ` — ${r.flags.join('; ')}` : '';
  console.log(`${mark}${r.file.padEnd(70)} ${r.dimensions.padEnd(10)} ${r.size.padStart(8)}${flagsText}`);
}

console.log(`\n═══ RESUMO ═══`);
console.log(`Total: ${files.length}`);
console.log(`Suspeitas de IA (≥2 flags): ${suspects.length}`);
if (suspects.length) {
  console.log('\nSuspeitos:');
  suspects.forEach((s) => console.log('  - ' + s.file));
}
