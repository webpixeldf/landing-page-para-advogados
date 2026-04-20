#!/usr/bin/env node
import { readFile } from 'node:fs/promises';

const pages = [
  { name: 'Home', file: './out/index.html' },
  { name: 'Quem somos', file: './out/quem-somos/index.html' },
  { name: 'Portfolio', file: './out/portfolio/index.html' },
  { name: 'Blog index', file: './out/blog/index.html' }
];

console.log('═══════════════════════════════════════════════════════════');
console.log('  AUDITORIA GEO — 9 métodos Princeton aplicados');
console.log('═══════════════════════════════════════════════════════════\n');

for (const { name, file } of pages) {
  let html;
  try {
    html = await readFile(file, 'utf8');
  } catch {
    continue;
  }
  const noScripts = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const bodyMatch = noScripts.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : noScripts;
  const text = body.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(/\s+/).filter(Boolean).length;

  const m = {
    'Statistics (números e %)': (text.match(/\b\d+(?:[.,]\d+)?\s?(?:%|\+|anos|dias|meses|minutos|segundos|projetos|clientes|reviews)\b/gi) || []).length,
    'Citations (Lei/Art/OAB/Provimento)': (text.match(/\b(?:Lei|Art\.?|Provimento|Código|Decreto|Resolução|OAB)\b/g) || []).length,
    'Quotations (aspas com texto longo)': (text.match(/[\u201c\u201d\u0022][^\u201c\u201d\u0022]{20,}[\u201c\u201d\u0022]/g) || []).length,
    'Technical terms (SEO/LCP/LGPD/etc)': (text.match(/\b(?:LCP|INP|CLS|schema|SEO|WCAG|LGPD|WebP|AVIF|CDN|SSL|HTTPS|responsivo|Core Web Vitals|PageSpeed|Search Console|JSON-LD|sitemap|canonical|breadcrumb)\b/gi) || []).length,
    'Bullet list items': (body.match(/<li/g) || []).length,
    'Tables': (body.match(/<table/g) || []).length,
    'Headings (H1+H2+H3)': (body.match(/<h[1-3]/g) || []).length,
    'Paragraphs (<p>)': (body.match(/<p[^>]*>/g) || []).length,
    'Figures/blockquotes': (body.match(/<(?:figure|blockquote)/g) || []).length
  };

  console.log(`▌ ${name}  —  ${words} palavras visíveis`);
  console.log('─'.repeat(60));
  for (const [k, v] of Object.entries(m)) {
    const strong = v >= 3;
    console.log(`  ${strong ? '[OK] ' : '[..] '}${k.padEnd(40)} ${v}`);
  }
  // Clichês e padrões AI/plágio
  const cliches = [
    'somos uma empresa',
    'empresa especializada',
    'o melhor do mercado',
    'atendimento personalizado',
    'nossa missão é',
    'nossos valores são',
    'entregamos soluções',
    'transformar realidades',
    'revolucionar o mercado',
    'lorem ipsum',
    'no mundo atual',
    'nos dias de hoje',
    'em um mundo cada vez mais',
    'em um cenário cada vez mais'
  ];
  const found = [];
  for (const c of cliches) {
    const n = (text.toLowerCase().match(new RegExp(c, 'g')) || []).length;
    if (n) found.push(`${c} (${n})`);
  }
  if (found.length) console.log(`  [WARN] Clichês detectados: ${found.join(', ')}`);
  else console.log(`  [OK] Zero clichês genéricos`);

  // Readability básica — sentenças médias
  const sentences = text.split(/[.!?]+\s+/).filter((s) => s.length > 10);
  const avgWordsPerSentence = words / Math.max(1, sentences.length);
  console.log(`  [INFO] Tamanho médio das sentenças: ${avgWordsPerSentence.toFixed(1)} palavras`);
  console.log();
}
