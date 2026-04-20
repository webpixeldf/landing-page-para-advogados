#!/usr/bin/env node
/**
 * Regenera artigos existentes do zero usando DeepSeek + Unsplash.
 *
 * Mantém:
 *  - slug
 *  - data original (date)
 *  - homeAnchor (âncora reservada já atribuída)
 *  - category, tags
 *
 * Sobrescreve:
 *  - title, description, coverAlt, content, readingTime
 *  - cover (nova imagem Unsplash) → public/images/blog/{slug}.webp
 *  - updated (ISO date atual)
 *  - credits
 *
 * Uso:
 *   node scripts/regenerate-article.mjs <slug1> <slug2> ...
 *   node scripts/regenerate-article.mjs --all-original   (regenera os 10 originais)
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { splitLongParagraphs } from './lib/split-paragraphs.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT_BLOG = path.join(ROOT, 'content', 'blog');
const PUBLIC_IMG_BLOG = path.join(ROOT, 'public', 'images', 'blog');

// Lê .env.local
const envFile = path.join(ROOT, '.env.local');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+)\s*$/i);
    if (!m) continue;
    if (process.env[m[1]]) continue;
    process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
}

const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!DEEPSEEK_KEY || !UNSPLASH_KEY) {
  console.error('✖ DEEPSEEK_API_KEY ou UNSPLASH_ACCESS_KEY ausente em .env.local');
  process.exit(1);
}

const ORIGINAL_SLUGS = [
  'pagina-de-captura-para-advogados-guia-completo',
  'site-para-advogados-como-escolher-a-melhor-estrutura',
  'marketing-juridico-digital-2026',
  'seo-para-advogados-como-aparecer-no-google',
  'wordpress-ou-codigo-puro-para-advogados',
  'lgpd-para-advogados-no-site',
  'copy-para-advogados-como-escrever-textos-que-convertem',
  'velocidade-de-carregamento-pagina-juridica',
  'oab-publicidade-online-o-que-pode-e-o-que-nao-pode',
  'tre-erros-fatais-no-site-de-advocacia'
];

const FALLBACK_QUERIES = {
  'Landing Page': ['lawyer office', 'law firm', 'business meeting'],
  Marketing: ['marketing strategy', 'business analytics', 'office laptop'],
  'Redes Sociais': ['smartphone social', 'instagram phone', 'social media'],
  Buscadores: ['search analytics', 'laptop seo', 'data dashboard'],
  Captação: ['handshake business', 'phone call office', 'consultation meeting'],
  Conteúdo: ['writing notebook', 'content creation', 'editorial desk'],
  Tecnologia: ['code screen', 'developer laptop', 'modern tech'],
  Compliance: ['legal documents', 'contract signing', 'office paperwork'],
  Performance: ['speed dashboard', 'analytics laptop', 'data charts'],
  Estratégia: ['business strategy', 'planning meeting', 'office whiteboard']
};

const wordCount = (t) => t.trim().split(/\s+/).filter(Boolean).length;

const FALLBACK_INLINE_ANCHORS = [
  'landing page para advogados',
  'landing page jurídica',
  'landing page jurídica de alta conversão',
  'landing page profissional para advogados',
  'landing page focada em conversão jurídica'
];

function countInlineLinksToHome(content) {
  return (content.match(/\]\(\/\)/g) || []).length;
}

function getInlineAnchorsUsed(content) {
  const re = /\[([^\]]+)\]\(\/\)/g;
  const out = [];
  let m;
  while ((m = re.exec(content)) !== null) out.push(m[1].toLowerCase());
  return out;
}

function ensureSingleLink(content, reserved) {
  const reservedL = reserved.toLowerCase();
  const anchors = getInlineAnchorsUsed(content);
  const hasReserved = anchors.some((a) => a === reservedL);

  if (hasReserved && anchors.length === 1) return content;

  if (hasReserved && anchors.length > 1) {
    let kept = false;
    return content.replace(/\[([^\]]+)\]\(\/\)/g, (full, label) => {
      if (label.toLowerCase() === reservedL && !kept) {
        kept = true;
        return full;
      }
      return label;
    });
  }

  // Sem reservada — strip tudo e injetar
  let working = anchors.length > 0 ? content.replace(/\[([^\]]+)\]\(\/\)/g, '$1') : content;
  const paras = working.split(/\n\s*\n/);
  const cands = [];
  for (let i = 0; i < paras.length; i++) {
    const p = paras[i].trim();
    if (!p || p.startsWith('#') || p.startsWith('-') || /^\d+\./.test(p) || p.startsWith('>') || p.length < 80)
      continue;
    cands.push(i);
  }
  if (cands.length > 3) cands.splice(0, 1);
  if (cands.length > 3) cands.pop();
  const idx = cands[Math.floor(cands.length / 2)] ?? cands[0];
  if (idx == null) return working;
  const S = [
    (a) => `Para quem busca um caminho já estruturado, vale conhecer nossa [${a}](/), que reúne todos esses pontos em um só lugar.`,
    (a) => `Esse ponto é exatamente o que resolvemos na nossa [${a}](/), pensada para escritórios que querem previsibilidade.`,
    (a) => `Para aplicar tudo isso sem começar do zero, confira a nossa [${a}](/).`
  ];
  paras[idx] = paras[idx].trim() + ' ' + S[Math.floor(Math.random() * S.length)](reserved);
  return paras.join('\n\n');
}

async function generate({ topic, category, tags, anchor }) {
  const sys = `Você é um redator SEO sênior, especialista em marketing jurídico brasileiro. Escreve em português do Brasil, tom profissional e direto, sem bullshit, respeitando o Código de Ética da OAB e o Provimento 205/2021. Nunca promete resultados.

REGRAS OBRIGATÓRIAS:
1. Devolva APENAS um objeto JSON válido (sem markdown, sem cercas \`\`\`).
2. O conteúdo (campo "content") deve ser markdown puro, com pelo menos 1100 palavras, dividido em 6+ seções com H2 (##) e H3 (###) onde fizer sentido.
3. CRÍTICO: Inclua EXATAMENTE 1 (UM) link em formato markdown apontando para "/" — sintaxe: [TEXTO ÂNCORA](/) — em UM parágrafo do MEIO do conteúdo (NÃO em headings, NÃO no primeiro parágrafo, NÃO no último). NÃO inclua mais de um link para "/".
4. O texto-âncora desse único link DEVE ser EXATAMENTE: "${anchor}" — escreva exatamente assim: [${anchor}](/) — encaixado naturalmente no fluxo da frase, dentro do contexto.
5. Exemplo de uso natural: "Para escritórios que querem começar com base sólida, vale conhecer nossa [${anchor}](/), que entrega tudo isso pronto."
6. NÃO use a frase exata "landing page para advogados" mais de 2 vezes no artigo (anti-stuffing). Variações curtas como "landing page" ou "página jurídica" podem aparecer mais.
7. NÃO inclua imagens no markdown (só texto).
8. NÃO inclua título H1 no início do conteúdo (o sistema renderiza separadamente).
9. Comece o conteúdo direto com um parágrafo introdutório (sem H2 logo de cara).
10. PARÁGRAFOS CURTOS — REGRA CRÍTICA PARA MOBILE (violar invalida o artigo):
    - Máximo ABSOLUTO de 2 frases por parágrafo. Se tiver 3, quebre em dois.
    - Cada parágrafo separado por LINHA EM BRANCO no markdown
    - Máximo 35 palavras por parágrafo (nunca ultrapasse 50)
    - Textos com ideias longas DEVEM ser quebrados em múltiplos parágrafos pequenos
    - Use listas com bullets ou numeração com frequência para escanabilidade
11. DADOS E AUTORIDADE (SEO/GEO):
    - Inclua pelo menos 3 estatísticas com números específicos
    - Cite OAB/Provimento 205/Código de Ética/LGPD quando aplicável
    - Use termos técnicos (Core Web Vitals, LCP, CLS, schema markup, SEO, etc.) quando pertinente
    - Tom autoritativo, afirmativo — sem "talvez", "acho", "pode ser"
12. Use markdown padrão: **negrito**, *itálico*, listas com - ou 1., links [texto](url).`;

  const user = `Escreva um artigo SEO-otimizado sobre: "${topic}"

Categoria: ${category}
Tags sugeridas: ${tags.join(', ')}
Âncora reservada (deve aparecer UMA vez no meio do conteúdo): "${anchor}"

Shape JSON exato:
{
  "title": "string (50-65 caracteres, otimizado para SERP)",
  "description": "string (140-160 caracteres, meta description)",
  "coverAlt": "string (alt text descritivo de 8-15 palavras)",
  "imageQuery": "string em INGLÊS (1-3 palavras) para buscar imagem no Unsplash",
  "readingTime": número inteiro (minutos),
  "content": "string em markdown puro (mínimo 1100 palavras)"
}`;

  const res = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEPSEEK_KEY}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: sys },
        { role: 'user', content: user }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 4500
    })
  });

  if (!res.ok) throw new Error(`DeepSeek ${res.status}: ${(await res.text()).slice(0, 400)}`);
  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content?.trim();
  if (!raw) throw new Error('DeepSeek resposta vazia');
  const parsed = JSON.parse(raw);
  for (const f of ['title', 'description', 'coverAlt', 'imageQuery', 'readingTime', 'content']) {
    if (!parsed[f]) throw new Error(`DeepSeek omitiu "${f}"`);
  }
  if (wordCount(parsed.content) < 700) throw new Error(`Conteúdo curto: ${wordCount(parsed.content)} palavras`);
  return parsed;
}

async function unsplashSearch(q) {
  const url = new URL('https://api.unsplash.com/search/photos');
  url.searchParams.set('query', q);
  url.searchParams.set('per_page', '8');
  url.searchParams.set('orientation', 'landscape');
  url.searchParams.set('content_filter', 'high');
  const res = await fetch(url.toString(), { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } });
  if (!res.ok) throw new Error(`Unsplash ${res.status}`);
  return (await res.json()).results || [];
}

async function pickImage(primary, category) {
  const tries = [
    primary,
    primary.split(/\s+/).slice(0, 2).join(' '),
    primary.split(/\s+/)[0],
    ...(FALLBACK_QUERIES[category] || []),
    'office desk',
    'business'
  ];
  for (const q of tries) {
    if (!q) continue;
    const results = await unsplashSearch(q);
    if (results.length) {
      const top = results.slice(0, 5);
      const pick = top[Math.floor(Math.random() * top.length)];
      return {
        downloadUrl: pick.urls.raw + '&w=1600&fm=jpg&q=85',
        trackUrl: pick.links.download_location,
        photographer: pick.user.name,
        photographerUrl: pick.user.links.html,
        queryUsed: q
      };
    }
  }
  throw new Error('Nenhuma imagem encontrada após fallbacks');
}

async function processPost(post, fresh) {
  const slug = post.slug;
  const imgPath = path.join(PUBLIC_IMG_BLOG, `${slug}.webp`);

  // Nova imagem
  console.log(`  🖼️  Unsplash: "${fresh.imageQuery}"`);
  const img = await pickImage(fresh.imageQuery, post.category);
  await fetch(img.trackUrl, { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }).catch(() => {});
  const res = await fetch(img.downloadUrl);
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf)
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .webp({ quality: 82, effort: 5 })
    .toFile(imgPath);
  console.log(`  🪄 Imagem regravada: ${imgPath}`);

  // Monta post atualizado
  let content = ensureSingleLink(fresh.content, post.homeAnchor);

  // Defesa em camadas: força parágrafos curtos independente do que a IA devolveu
  const pBefore = content.split(/\n\s*\n/).filter((p) => p.trim()).length;
  content = splitLongParagraphs(content);
  const pAfter = content.split(/\n\s*\n/).filter((p) => p.trim()).length;
  if (pAfter > pBefore) console.log(`  📄 Parágrafos quebrados: ${pBefore} → ${pAfter}`);
  const updated = {
    ...post,
    title: fresh.title,
    description: fresh.description,
    coverAlt: fresh.coverAlt,
    readingTime: fresh.readingTime,
    cover: `/images/blog/${slug}.webp`,
    content,
    updated: new Date().toISOString().slice(0, 10),
    credits: {
      image: {
        source: 'Unsplash',
        photographer: img.photographer,
        photographerUrl: img.photographerUrl
      },
      generatedBy: 'DeepSeek',
      regeneratedAt: new Date().toISOString()
    }
  };

  const jsonPath = path.join(CONTENT_BLOG, `${slug}.json`);
  await writeFile(jsonPath, JSON.stringify(updated, null, 2) + '\n', 'utf8');
  console.log(`  ✅ JSON atualizado: ${slug}.json`);
  console.log(`  📊 Palavras: ${wordCount(content)} | ReadingTime: ${fresh.readingTime}min`);
}

async function main() {
  if (!existsSync(PUBLIC_IMG_BLOG)) await mkdir(PUBLIC_IMG_BLOG, { recursive: true });

  const args = process.argv.slice(2);
  let slugs;
  if (args[0] === '--all-original') slugs = ORIGINAL_SLUGS;
  else slugs = args;

  if (!slugs.length) {
    console.error('Uso: node scripts/regenerate-article.mjs <slug1> [slug2 ...]  OU  --all-original');
    process.exit(1);
  }

  console.log(`Regenerando ${slugs.length} artigo(s)…\n`);

  let success = 0;
  for (const slug of slugs) {
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    const jsonPath = path.join(CONTENT_BLOG, `${slug}.json`);
    if (!existsSync(jsonPath)) {
      console.error(`✖ ${slug}: JSON não encontrado`);
      continue;
    }
    try {
      const post = JSON.parse(await readFile(jsonPath, 'utf8'));
      console.log(`📝 ${slug}`);
      console.log(`🔗 Âncora reservada: ${post.homeAnchor}`);
      console.log(`🤖 Chamando DeepSeek…`);
      // Usa o title atual como "topic" para regeneração
      const fresh = await generate({
        topic: post.title,
        category: post.category,
        tags: post.tags,
        anchor: post.homeAnchor
      });
      await processPost(post, fresh);
      success++;
    } catch (e) {
      console.error(`✖ ${slug}:`, e.message);
    }
    if (slugs.indexOf(slug) < slugs.length - 1) await new Promise((r) => setTimeout(r, 2500));
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✨ Concluído: ${success}/${slugs.length} artigo(s) regenerado(s).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
