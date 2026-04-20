#!/usr/bin/env node
/**
 * Audit geral do projeto — lê tudo em ./out e reporta:
 *  - meta tags por página
 *  - linkagem interna → home
 *  - OG images
 *  - schemas por página
 *  - links internos/externos quebrados (checa se arquivo existe localmente)
 *  - assets CSS/JS quebrados
 */
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const OUT = './out';

async function walkHtml(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walkHtml(full, files);
    else if (e.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function extractMeta(html, name, attr = 'name') {
  const re = new RegExp(`<meta\\s+${attr}="${name}"\\s+content="([^"]*)"`, 'i');
  return html.match(re)?.[1] || null;
}

function extract(html, regex) {
  return html.match(regex)?.[1] || null;
}

function extractAll(html, regex) {
  return [...html.matchAll(regex)].map((m) => m[1]);
}

function pageUrl(file) {
  const rel = path.relative(OUT, file).replace(/\\/g, '/');
  return '/' + rel.replace(/index\.html$/, '');
}

const results = [];
const files = await walkHtml(OUT);

for (const f of files) {
  const url = pageUrl(f);
  const html = await readFile(f, 'utf8');

  const r = {
    url,
    title: extract(html, /<title>([^<]+)<\/title>/),
    description: extractMeta(html, 'description'),
    canonical: extract(html, /rel="canonical"\s+href="([^"]+)"/),
    robots: extractMeta(html, 'robots'),
    ogTitle: extractMeta(html, 'og:title', 'property'),
    ogDescription: extractMeta(html, 'og:description', 'property'),
    ogImage: extractMeta(html, 'og:image', 'property'),
    ogUrl: extractMeta(html, 'og:url', 'property'),
    ogType: extractMeta(html, 'og:type', 'property'),
    twitterCard: extractMeta(html, 'twitter:card'),
    twitterImage: extractMeta(html, 'twitter:image'),
    h1Count: (html.match(/<h1/g) || []).length,
    h2Count: (html.match(/<h2/g) || []).length,
    h3Count: (html.match(/<h3/g) || []).length,
    schemas: extractAll(html, /"@type":"([^"]+)"/g),
    linksToHome: extractAll(html, /<a[^>]*href="\/"[^>]*>([^<]+)<\/a>/g),
    internalLinks: extractAll(html, /href="(\/[^"#?]*)/g),
    externalLinks: extractAll(html, /href="(https?:\/\/[^"]+)/g),
    images: extractAll(html, /<img[^>]+src="([^"]+)"/g),
    imagesNoAlt: (html.match(/<img(?![^>]+alt=)[^>]*>/g) || []).length,
    cssAssets: extractAll(html, /<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g),
    jsAssets: extractAll(html, /<script[^>]+src="([^"]+)"/g),
    jsonLdBlocks: (html.match(/<script type="application\/ld\+json"/g) || []).length
  };
  results.push(r);
}

// Conta broken assets (arquivos referenciados que não existem localmente)
function assetPath(ref) {
  if (!ref || ref.startsWith('http') || ref.startsWith('//') || ref.startsWith('data:')) return null;
  return path.join(OUT, ref.split('?')[0].split('#')[0]);
}

const brokenInternal = new Set();
const brokenCss = new Set();
const brokenJs = new Set();
const brokenImages = new Set();

for (const r of results) {
  for (const l of r.internalLinks) {
    // /blog/ → out/blog/index.html
    // /quem-somos/ → out/quem-somos/index.html
    let check = l.endsWith('/') ? path.join(OUT, l, 'index.html') : path.join(OUT, l);
    if (!l.match(/\.[a-z]+$/i) && !existsSync(check)) {
      check = path.join(OUT, l + '/index.html');
    }
    if (!existsSync(check) && !existsSync(path.join(OUT, l))) {
      brokenInternal.add(l);
    }
  }
  for (const c of r.cssAssets) {
    const p = assetPath(c);
    if (p && !existsSync(p)) brokenCss.add(c);
  }
  for (const j of r.jsAssets) {
    const p = assetPath(j);
    if (p && !existsSync(p)) brokenJs.add(j);
  }
  for (const img of r.images) {
    const p = assetPath(img);
    if (p && !existsSync(p)) brokenImages.add(img);
  }
}

// ═══ Relatório ═══════════════════════════════════════════════════
console.log('═══════════════════════════════════════════════════════════');
console.log('  AUDITORIA COMPLETA');
console.log('═══════════════════════════════════════════════════════════\n');

console.log(`Total de páginas HTML: ${results.length}`);
console.log();

// Por página — linha resumida
console.log('▌ Resumo por página (URL · H1 · H2 · Schemas · OG?)');
console.log('─'.repeat(70));
for (const r of results) {
  const og = r.ogImage ? '✓' : '✗';
  const can = r.canonical ? '✓' : '✗';
  const twi = r.twitterImage ? '✓' : '✗';
  const titleLen = (r.title || '').length;
  console.log(
    `  ${r.url.padEnd(45)} ` +
      `H1:${r.h1Count} H2:${r.h2Count} H3:${r.h3Count} ` +
      `schemas:${r.schemas.length} ` +
      `ld+json:${r.jsonLdBlocks} ` +
      `OG:${og} TW:${twi} Can:${can} ` +
      `titleLen:${titleLen}`
  );
}

console.log();
console.log('▌ Links internos para a homepage (por página)');
console.log('─'.repeat(70));
for (const r of results) {
  const anchors = r.linksToHome.filter((a) => a && a !== 'Início' && a !== 'Voltar para o início');
  console.log(`  ${r.url.padEnd(45)} → ${r.linksToHome.length} links (${anchors.length} contextuais)`);
  if (anchors.length > 0) {
    for (const a of anchors) console.log(`      ↳ "${a}"`);
  }
}

console.log();
console.log('▌ OG images por página');
console.log('─'.repeat(70));
for (const r of results) {
  console.log(`  ${r.url.padEnd(45)} → ${r.ogImage || '(AUSENTE)'}`);
}

console.log();
console.log('▌ Schemas únicos por página');
console.log('─'.repeat(70));
for (const r of results) {
  const unique = [...new Set(r.schemas)];
  console.log(`  ${r.url.padEnd(45)} → ${unique.length} tipos: ${unique.join(', ').slice(0, 90)}`);
}

console.log();
console.log('▌ Imagens sem ALT (potencial a11y/SEO issue)');
console.log('─'.repeat(70));
for (const r of results) {
  if (r.imagesNoAlt > 0) {
    console.log(`  ${r.url.padEnd(45)} → ${r.imagesNoAlt} imagem(ns) sem alt`);
  }
}

console.log();
console.log('▌ Links quebrados (internos)');
console.log('─'.repeat(70));
if (brokenInternal.size === 0) console.log('  ✓ Nenhum link interno quebrado');
else for (const l of brokenInternal) console.log(`  ✗ ${l}`);

console.log();
console.log('▌ CSS quebrado');
console.log('─'.repeat(70));
if (brokenCss.size === 0) console.log('  ✓ Nenhum CSS quebrado');
else for (const l of brokenCss) console.log(`  ✗ ${l}`);

console.log();
console.log('▌ JS quebrado');
console.log('─'.repeat(70));
if (brokenJs.size === 0) console.log('  ✓ Nenhum JS quebrado');
else for (const l of brokenJs) console.log(`  ✗ ${l}`);

console.log();
console.log('▌ Imagens quebradas');
console.log('─'.repeat(70));
if (brokenImages.size === 0) console.log('  ✓ Nenhuma imagem quebrada');
else for (const l of brokenImages) console.log(`  ✗ ${l}`);

// Inspeção específica da homepage
const home = results.find((r) => r.url === '/');
if (home) {
  console.log();
  console.log('▌ Detalhes da homepage');
  console.log('─'.repeat(70));
  console.log(`  Title (${home.title?.length || 0} chars): ${home.title}`);
  console.log(`  Description (${home.description?.length || 0} chars): ${home.description}`);
  console.log(`  Canonical: ${home.canonical}`);
  console.log(`  OG image: ${home.ogImage}`);
  console.log(`  OG type: ${home.ogType}`);
  console.log(`  Twitter card: ${home.twitterCard}`);
  console.log(`  Twitter image: ${home.twitterImage}`);
  console.log(`  Robots: ${home.robots}`);
  console.log(`  Blocos JSON-LD: ${home.jsonLdBlocks}`);
  console.log(`  Tipos de schema: ${[...new Set(home.schemas)].join(', ')}`);
  console.log(`  Links externos: ${home.externalLinks.length}`);
  console.log(`  Imagens: ${home.images.length}`);
  console.log(`  Imagens sem alt: ${home.imagesNoAlt}`);
}

console.log();
console.log('═══════════════════════════════════════════════════════════');
