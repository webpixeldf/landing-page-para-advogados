// One-shot: migra os posts hardcoded em src/lib/posts.ts para content/blog/*.json
// Uso: npx tsx scripts/migrate-posts.ts
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { posts } from '../src/lib/posts.js';

async function main() {
  const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const OUT_DIR = path.join(ROOT, 'content', 'blog');

  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });

  let count = 0;
  for (const p of posts) {
    const file = path.join(OUT_DIR, `${p.slug}.json`);
    if (existsSync(file)) {
      console.log(`SKIP (existe): ${p.slug}`);
      continue;
    }
    await writeFile(file, JSON.stringify(p, null, 2) + '\n', 'utf8');
    console.log(`OK: ${p.slug}`);
    count++;
  }
  console.log(`\n${count} posts migrados para content/blog/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
