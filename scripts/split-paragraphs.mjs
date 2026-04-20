#!/usr/bin/env node
/**
 * Script standalone: varre content/blog/*.json e quebra parágrafos longos
 * em todos os arquivos de uma vez.
 *
 * Também importado internamente por generate-article.mjs e regenerate-article.mjs
 * como defesa em camadas (prompt + pós-processamento).
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { splitLongParagraphs } from './lib/split-paragraphs.mjs';

const BLOG = './content/blog';

async function main() {
  const files = (await readdir(BLOG)).filter((f) => f.endsWith('.json'));
  let touched = 0;

  for (const f of files) {
    const file = path.join(BLOG, f);
    const post = JSON.parse(await readFile(file, 'utf8'));
    const before = post.content;
    const after = splitLongParagraphs(before);
    if (before === after) {
      console.log(`↷ SKIP ${f}`);
      continue;
    }
    post.content = after;
    await writeFile(file, JSON.stringify(post, null, 2) + '\n', 'utf8');
    const pBefore = before.split(/\n\s*\n/).filter((p) => p.trim()).length;
    const pAfter = after.split(/\n\s*\n/).filter((p) => p.trim()).length;
    console.log(`✓ ${f}  (parágrafos: ${pBefore} → ${pAfter})`);
    touched++;
  }
  console.log(`\n${touched}/${files.length} arquivos ajustados.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
