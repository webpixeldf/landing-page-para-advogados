#!/usr/bin/env node
/**
 * Geração diária de artigos.
 *
 * Pipeline:
 *  1. Pega o próximo tópico não-usado de content/topics-pool.json
 *  2. Pega a próxima âncora não-usada de content/anchors-pool.json
 *  3. Chama DeepSeek (chat completions) para gerar JSON do artigo
 *  4. Busca imagem na Unsplash (query do tópico)
 *  5. Sharp: download → resize 1200×630 cover → webp q82
 *  6. Grava: public/images/blog/{slug}.webp
 *  7. Grava: content/blog/{slug}.json
 *  8. Atualiza pools (move usados, adiciona timestamp)
 *
 * Variáveis de ambiente esperadas:
 *  - DEEPSEEK_API_KEY
 *  - UNSPLASH_ACCESS_KEY
 *
 * Uso:
 *  npm run generate:article          (gera 1 artigo)
 *  npm run generate:article -- 3     (gera 3 de uma vez)
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { splitLongParagraphs } from './lib/split-paragraphs.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Carrega .env.local se existir (não usa dotenv, parser bem básico)
const envFile = path.join(ROOT, '.env.local');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+)\s*$/i);
    if (!m) continue;
    if (process.env[m[1]]) continue; // não sobrescreve env já setada
    process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
}
const CONTENT_BLOG = path.join(ROOT, 'content', 'blog');
const PUBLIC_IMG_BLOG = path.join(ROOT, 'public', 'images', 'blog');
const TOPICS_FILE = path.join(ROOT, 'content', 'topics-pool.json');
const ANCHORS_FILE = path.join(ROOT, 'content', 'anchors-pool.json');

const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!DEEPSEEK_KEY) {
  console.error('✖ DEEPSEEK_API_KEY ausente.');
  process.exit(1);
}
if (!UNSPLASH_KEY) {
  console.error('✖ UNSPLASH_ACCESS_KEY ausente.');
  process.exit(1);
}

// ─── Utilidades ───────────────────────────────────────────────

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);

const todayISO = () => new Date().toISOString().slice(0, 10);

const readJSON = async (p) => JSON.parse(await readFile(p, 'utf8'));
const writeJSON = async (p, data) =>
  writeFile(p, JSON.stringify(data, null, 2) + '\n', 'utf8');

const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;

// Fallback keyword-rich: usado só se o pool de âncoras únicas falhar.
// Todas contêm "landing page" para manter o sinal SEO.
const FALLBACK_INLINE_ANCHORS = [
  'landing page para advogados',
  'landing page jurídica',
  'landing page para advocacia',
  'landing page jurídica de alta conversão',
  'landing page profissional para advogados',
  'landing page focada em conversão jurídica',
  'landing page estratégica para advogados',
  'landing page otimizada para advogados',
  'landing page que converte para advogados'
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

/**
 * Garante EXATAMENTE 1 link interno para "/" no conteúdo, usando a âncora reservada.
 * - Se já tem >= 1 link e a âncora reservada está presente → mantém
 * - Se já tem links mas a reservada NÃO → remove os outros e injeta a reservada
 * - Se não tem nenhum link → injeta a reservada em um parágrafo do meio
 */
function ensureInternalLinks(content, reservedAnchor) {
  const reservedLower = reservedAnchor.toLowerCase();
  const inlineAnchors = getInlineAnchorsUsed(content);
  const hasReserved = inlineAnchors.some((a) => a === reservedLower);
  const totalLinks = inlineAnchors.length;

  // Caso 1: tem a reservada E tem só 1 link → mantém
  if (hasReserved && totalLinks === 1) return content;

  // Caso 2: tem a reservada mas tem links extras → remove os extras (mantém só a reservada)
  if (hasReserved && totalLinks > 1) {
    return removeExtraHomeLinks(content, reservedAnchor);
  }

  // Caso 3: tem links mas NÃO tem a reservada → remove TODOS e injeta a reservada
  let working = content;
  if (totalLinks > 0) {
    working = stripAllHomeLinks(working);
  }

  // Injeta a reservada em parágrafo do meio
  const paragraphs = working.split(/\n\s*\n/);
  const candidates = [];
  for (let i = 0; i < paragraphs.length; i++) {
    const p = paragraphs[i].trim();
    if (!p) continue;
    if (p.startsWith('#')) continue;
    if (p.startsWith('-') || p.startsWith('*') || /^\d+\./.test(p)) continue;
    if (p.startsWith('>')) continue;
    if (p.length < 80) continue;
    candidates.push(i);
  }
  if (candidates.length > 3) candidates.splice(0, 1);
  if (candidates.length > 3) candidates.pop();

  const idx = candidates[Math.floor(candidates.length / 2)] ?? candidates[0];
  if (idx == null) return working; // nada a fazer

  const SENTENCES = [
    (a) => `Para quem busca um caminho já estruturado, vale conhecer nossa [${a}](/), que reúne todos esses pontos em um só lugar.`,
    (a) => `Se você quer economizar tempo nessa etapa, conheça a nossa [${a}](/) — já entrega a base pronta.`,
    (a) => `Esse ponto é exatamente o que resolvemos na nossa [${a}](/), pensada para escritórios que querem previsibilidade.`,
    (a) => `Para aplicar tudo isso sem começar do zero, confira a nossa [${a}](/).`,
    (a) => `Quem prefere ir direto ao ponto encontra na nossa [${a}](/) uma estrutura pronta para implementar hoje.`
  ];
  const sentence = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
  paragraphs[idx] = paragraphs[idx].trim() + ' ' + sentence(reservedAnchor);
  return paragraphs.join('\n\n');
}

function stripAllHomeLinks(content) {
  // Substitui [texto](/) por apenas "texto"
  return content.replace(/\[([^\]]+)\]\(\/\)/g, '$1');
}

function removeExtraHomeLinks(content, keepAnchor) {
  // Remove TODOS exceto a primeira ocorrência da âncora reservada
  const keepLower = keepAnchor.toLowerCase();
  let kept = false;
  return content.replace(/\[([^\]]+)\]\(\/\)/g, (full, label) => {
    if (label.toLowerCase() === keepLower && !kept) {
      kept = true;
      return full;
    }
    return label;
  });
}

// ─── DeepSeek ─────────────────────────────────────────────────

async function generateArticle({ topic, category, tags, anchor }) {
  const sys = `Você é um redator SEO sênior, especialista em marketing jurídico brasileiro. Escreve em português do Brasil, tom profissional e direto, sem bullshit, respeitando o Código de Ética da OAB e o Provimento 205/2021. Nunca promete resultados.

REGRAS OBRIGATÓRIAS:
1. Devolva APENAS um objeto JSON válido (sem markdown, sem cercas \`\`\`).
2. O conteúdo (campo "content") deve ser markdown puro, com pelo menos 900 palavras, dividido em 5+ seções com H2 (##) e H3 (###) onde fizer sentido.
3. CRÍTICO: Inclua EXATAMENTE 1 (UM) link em formato markdown apontando para "/" — sintaxe: [TEXTO ÂNCORA](/) — em UM parágrafo do MEIO do conteúdo (NÃO em headings, NÃO no primeiro parágrafo, NÃO no último). NÃO inclua mais de um link para "/".
4. O texto-âncora desse único link DEVE ser EXATAMENTE: "${anchor}" — escreva exatamente assim: [${anchor}](/) — encaixado naturalmente no fluxo da frase, dentro do contexto.
5. Exemplo de uso natural: "Para escritórios que querem começar com base sólida, vale conhecer nossa [${anchor}](/), que entrega tudo isso pronto."
6. NÃO use a frase exata "landing page para advogados" mais de 2 vezes no artigo (anti-stuffing). Variações curtas como "landing page" ou "página jurídica" podem aparecer mais.
7. NÃO inclua imagens no markdown (só texto).
8. NÃO inclua título H1 no início do conteúdo (o sistema renderiza separadamente).
9. Comece o conteúdo direto com um parágrafo introdutório (sem H2 logo de cara).
10. PARÁGRAFOS CURTOS — REGRA CRÍTICA PARA MOBILE (VIOLAR ESSA REGRA INVALIDA O ARTIGO):
    - **Máximo ABSOLUTO de 2 frases por parágrafo**. Se tiver 3, quebre em dois.
    - Cada parágrafo separado por LINHA EM BRANCO (dupla quebra de linha no markdown)
    - Máximo 35 palavras por parágrafo (NUNCA ultrapasse 50)
    - Textos com ideias longas DEVEM ser quebrados em 3-5 parágrafos pequenos
    - Use listas com bullets ou numeração com frequência para escanabilidade
    - EXEMPLO DO QUE NÃO FAZER: "No mercado jurídico brasileiro, a concorrência por clientes nunca foi tão acirrada. Segundo pesquisa do IBGE, mais de 1,3 milhão de profissionais atuam no Direito no país. Desse total, cerca de 85% são advogados autônomos ou em pequenos escritórios." ← 3 frases em 1 parágrafo = RUIM
    - EXEMPLO DO QUE FAZER:
      "No mercado jurídico brasileiro, a concorrência por clientes nunca foi tão acirrada.

      Segundo pesquisa do IBGE, mais de 1,3 milhão de profissionais atuam no Direito no país.

      Desse total, cerca de 85% são advogados autônomos ou em pequenos escritórios." ← 3 parágrafos de 1 frase = BOM
11. Use markdown padrão: **negrito**, *itálico*, listas com - ou 1., links [texto](url).`;

  const userPrompt = `Escreva um artigo completo sobre: "${topic}"

Categoria: ${category}
Tags sugeridas: ${tags.join(', ')}
Âncora reservada (será usada na sidebar, não no conteúdo): "${anchor}"

Devolva o JSON com este shape exato:
{
  "title": "string (50-65 caracteres, otimizado para SERP)",
  "description": "string (140-160 caracteres, meta description)",
  "coverAlt": "string (alt text descritivo de 8-15 palavras para a imagem de capa)",
  "imageQuery": "string em INGLÊS (1-3 palavras) para buscar imagem no Unsplash",
  "readingTime": número inteiro (estimativa em minutos),
  "content": "string em markdown puro (mínimo 900 palavras)"
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
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 4000
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DeepSeek ${res.status}: ${text.slice(0, 500)}`);
  }

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content?.trim();
  if (!raw) throw new Error('DeepSeek devolveu resposta vazia');

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    // Tenta extrair JSON dentro de cercas, caso o modelo desobedeça
    const m = raw.match(/\{[\s\S]*\}/);
    if (!m) throw new Error('Resposta da DeepSeek não é JSON válido:\n' + raw.slice(0, 400));
    parsed = JSON.parse(m[0]);
  }

  // Validação mínima
  for (const field of ['title', 'description', 'coverAlt', 'imageQuery', 'readingTime', 'content']) {
    if (!parsed[field]) throw new Error(`DeepSeek omitiu campo "${field}"`);
  }
  if (wordCount(parsed.content) < 600) {
    throw new Error(`Conteúdo curto demais: ${wordCount(parsed.content)} palavras`);
  }

  return parsed;
}

// ─── Unsplash ─────────────────────────────────────────────────

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

async function unsplashSearch(query) {
  const url = new URL('https://api.unsplash.com/search/photos');
  url.searchParams.set('query', query);
  url.searchParams.set('per_page', '8');
  url.searchParams.set('orientation', 'landscape');
  url.searchParams.set('content_filter', 'high');

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
  });
  if (!res.ok) {
    throw new Error(`Unsplash ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  return (await res.json()).results || [];
}

async function fetchUnsplashImage(primaryQuery, category) {
  // Tenta na ordem: query original, primeira palavra, fallbacks por categoria, fallback genérico
  const tries = [
    primaryQuery,
    primaryQuery.split(/\s+/).slice(0, 2).join(' '),
    primaryQuery.split(/\s+/)[0],
    ...(FALLBACK_QUERIES[category] || []),
    'office desk',
    'business'
  ];

  let results = [];
  let usedQuery = '';
  for (const q of tries) {
    if (!q) continue;
    console.log(`   ↳ tentando: "${q}"`);
    results = await unsplashSearch(q);
    if (results.length) {
      usedQuery = q;
      break;
    }
  }
  if (!results.length) {
    throw new Error(`Unsplash: nenhuma imagem encontrada após ${tries.length} tentativas`);
  }

  const top = results.slice(0, 5);
  const pick = top[Math.floor(Math.random() * top.length)];

  return {
    downloadUrl: pick.urls.raw + '&w=1600&fm=jpg&q=85',
    trackUrl: pick.links.download_location,
    photographer: pick.user.name,
    photographerUrl: pick.user.links.html,
    queryUsed: usedQuery
  };
}

async function trackUnsplashDownload(trackUrl) {
  // Obrigatório pela TOS da Unsplash
  try {
    await fetch(trackUrl, {
      headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
    });
  } catch (e) {
    console.warn('  ! Falha em registrar download Unsplash:', e.message);
  }
}

async function downloadAndProcess(downloadUrl, outPath) {
  const res = await fetch(downloadUrl);
  if (!res.ok) throw new Error(`Download falhou: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());

  await sharp(buf)
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .webp({ quality: 82, effort: 5 })
    .toFile(outPath);
}

// ─── Pools ────────────────────────────────────────────────────

async function takeNextTopic() {
  const data = await readJSON(TOPICS_FILE);
  const next = data.topics.find((t) => !t.used);
  if (!next) throw new Error('Pool de tópicos esgotado!');
  return { data, topic: next };
}

async function takeNextAnchor() {
  const data = await readJSON(ANCHORS_FILE);
  if (!data.available?.length) throw new Error('Pool de âncoras esgotado!');
  const anchor = data.available[0];
  return { data, anchor };
}

async function commitTopic(pool, topic, slug) {
  topic.used = todayISO();
  topic.slug = slug;
  await writeJSON(TOPICS_FILE, pool);
}

async function commitAnchor(pool, anchor, slug) {
  pool.available = pool.available.filter((a) => a !== anchor);
  pool.used = pool.used || [];
  pool.used.push({ anchor, slug, date: todayISO() });
  await writeJSON(ANCHORS_FILE, pool);
}

// ─── Pipeline ─────────────────────────────────────────────────

async function generateOne() {
  if (!existsSync(CONTENT_BLOG)) await mkdir(CONTENT_BLOG, { recursive: true });
  if (!existsSync(PUBLIC_IMG_BLOG)) await mkdir(PUBLIC_IMG_BLOG, { recursive: true });

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // 1. Tópico e âncora
  const { data: topicsPool, topic } = await takeNextTopic();
  const { data: anchorsPool, anchor } = await takeNextAnchor();
  console.log(`📝 Tópico: ${topic.topic}`);
  console.log(`🔗 Âncora: ${anchor}`);

  // 2. DeepSeek
  console.log('🤖 Chamando DeepSeek…');
  const article = await generateArticle({
    topic: topic.topic,
    category: topic.category,
    tags: topic.tags,
    anchor
  });

  // 3. Slug + duplicidade
  const slug = slugify(article.title);
  const jsonPath = path.join(CONTENT_BLOG, `${slug}.json`);
  if (existsSync(jsonPath)) {
    throw new Error(`Slug "${slug}" já existe. Pule esse tópico ou ajuste o título.`);
  }

  // 4. Unsplash
  console.log(`🖼️  Unsplash: "${article.imageQuery}" (categoria: ${topic.category})`);
  const img = await fetchUnsplashImage(article.imageQuery, topic.category);
  await trackUnsplashDownload(img.trackUrl);

  // 5. Sharp
  const imgPath = path.join(PUBLIC_IMG_BLOG, `${slug}.webp`);
  console.log(`🪄 Sharp: 1200×630 webp…`);
  await downloadAndProcess(img.downloadUrl, imgPath);

  // 5b. Garante 1 link interno com a âncora reservada
  const linksBefore = countInlineLinksToHome(article.content);
  let finalContent = ensureInternalLinks(article.content, anchor);
  const linksAfter = countInlineLinksToHome(finalContent);
  if (linksBefore !== linksAfter) {
    console.log(`🔗 Ajuste de links: ${linksBefore} → ${linksAfter}`);
  }

  // 5c. Defesa em camadas: força parágrafos curtos mesmo se a IA ignorou a regra
  const beforeParas = finalContent.split(/\n\s*\n/).filter((p) => p.trim()).length;
  finalContent = splitLongParagraphs(finalContent);
  const afterParas = finalContent.split(/\n\s*\n/).filter((p) => p.trim()).length;
  if (afterParas > beforeParas) {
    console.log(`📄 Parágrafos quebrados: ${beforeParas} → ${afterParas} (mobile-ready)`);
  }

  // 6. Monta o JSON do post no formato esperado por src/lib/posts.ts
  const post = {
    slug,
    title: article.title,
    description: article.description,
    date: todayISO(),
    cover: `/images/blog/${slug}.webp`,
    coverAlt: article.coverAlt,
    category: topic.category,
    readingTime: article.readingTime,
    tags: topic.tags,
    homeAnchor: anchor,
    content: finalContent,
    credits: {
      image: {
        source: 'Unsplash',
        photographer: img.photographer,
        photographerUrl: img.photographerUrl
      },
      generatedBy: 'DeepSeek',
      generatedAt: new Date().toISOString()
    }
  };
  await writeJSON(jsonPath, post);

  // 7. Atualiza pools
  await commitTopic(topicsPool, topic, slug);
  await commitAnchor(anchorsPool, anchor, slug);

  console.log(`✅ Artigo criado: content/blog/${slug}.json`);
  console.log(`✅ Imagem: public/images/blog/${slug}.webp`);
  console.log(`📊 Palavras: ${wordCount(post.content)}`);
  console.log(`📷 Crédito: ${img.photographer} (Unsplash)`);
}

// ─── Main ─────────────────────────────────────────────────────

async function main() {
  const count = Math.max(1, parseInt(process.argv[2] || '1', 10));
  console.log(`Gerando ${count} artigo(s)…`);

  for (let i = 0; i < count; i++) {
    try {
      await generateOne();
    } catch (e) {
      console.error(`❌ Erro no artigo ${i + 1}:`, e.message);
      // Para o batch se a primeira falhar (provável env var faltando)
      if (i === 0) process.exit(1);
    }
    if (i < count - 1) await new Promise((r) => setTimeout(r, 2000));
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✨ Concluído.');
}

main();
