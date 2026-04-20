#!/usr/bin/env node
/**
 * Notifica IndexNow (Bing, Yandex, Seznam, Naver) sobre URLs novas/atualizadas.
 *
 * Uso:
 *   node scripts/ping-indexnow.mjs https://landingpageparaadvogados.com/blog/novo-post/
 *   node scripts/ping-indexnow.mjs --all                  (envia tudo do sitemap)
 *   node scripts/ping-indexnow.mjs --since YYYY-MM-DD     (URLs com date >= data)
 *
 * Em CI: usado pelo workflow daily-article para pingar o post recém-criado.
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const HOST = 'landingpageparaadvogados.com';
const KEY = 'c2e2107a5718803b8f142c315b50da81';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Endpoints IndexNow oficiais (todos compartilham a mesma rede)
const ENDPOINTS = [
  'https://api.indexnow.org/IndexNow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow'
];

async function pingBatch(urls) {
  if (!urls.length) {
    console.log('Nenhuma URL para enviar.');
    return;
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  for (const endpoint of ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload)
      });
      const status = res.status;
      const text = await res.text().catch(() => '');
      console.log(`  ${status} ${endpoint}  ${text.slice(0, 80)}`);
    } catch (err) {
      console.warn(`  ! ${endpoint} falhou:`, err.message);
    }
  }
  console.log(`\n✅ ${urls.length} URL(s) notificada(s) ao IndexNow.`);
}

async function getAllUrls() {
  const urls = [
    `https://${HOST}/`,
    `https://${HOST}/quem-somos/`,
    `https://${HOST}/portfolio/`,
    `https://${HOST}/blog/`,
    `https://${HOST}/politica-privacidade/`,
    `https://${HOST}/termos-de-uso/`
  ];
  const blogDir = path.join(ROOT, 'content', 'blog');
  const files = (await readdir(blogDir).catch(() => [])).filter((f) => f.endsWith('.json'));
  for (const f of files) {
    const slug = f.replace(/\.json$/, '');
    urls.push(`https://${HOST}/blog/${slug}/`);
  }
  return urls;
}

async function getUrlsSince(date) {
  const blogDir = path.join(ROOT, 'content', 'blog');
  const files = (await readdir(blogDir).catch(() => [])).filter((f) => f.endsWith('.json'));
  const urls = [];
  for (const f of files) {
    try {
      const post = JSON.parse(await readFile(path.join(blogDir, f), 'utf8'));
      if (post.date >= date) {
        const slug = f.replace(/\.json$/, '');
        urls.push(`https://${HOST}/blog/${slug}/`);
      }
    } catch {}
  }
  return urls;
}

async function main() {
  const args = process.argv.slice(2);
  let urls = [];

  if (args[0] === '--all') {
    urls = await getAllUrls();
  } else if (args[0] === '--since' && args[1]) {
    urls = await getUrlsSince(args[1]);
  } else if (args.length) {
    urls = args.filter((a) => /^https?:\/\//.test(a));
  } else {
    console.error('Uso:');
    console.error('  node scripts/ping-indexnow.mjs <url1> <url2> ...');
    console.error('  node scripts/ping-indexnow.mjs --all');
    console.error('  node scripts/ping-indexnow.mjs --since YYYY-MM-DD');
    process.exit(1);
  }

  console.log(`Enviando ${urls.length} URL(s) para IndexNow…`);
  for (const u of urls) console.log('  →', u);
  console.log();

  await pingBatch(urls);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
