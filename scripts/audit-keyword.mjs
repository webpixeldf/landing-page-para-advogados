import { readFileSync } from 'node:fs';

const html = readFileSync('out/index.html', 'utf8');

// 1. Strip everything inside <script>...</script>
let visible = html.replace(/<script[\s\S]*?<\/script>/gi, '');
// 2. Strip <style>
visible = visible.replace(/<style[\s\S]*?<\/style>/gi, '');
// 3. Extract only body
const bodyMatch = visible.match(/<body[^>]*>([\s\S]*)<\/body>/i);
visible = bodyMatch ? bodyMatch[1] : visible;
// 4. Strip all HTML tags but keep text
visible = visible.replace(/<[^>]+>/g, ' ');
// 5. Decode HTML entities (basic)
visible = visible
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&ldquo;/g, '"')
  .replace(/&rdquo;/g, '"')
  .replace(/&nbsp;/g, ' ');
// 6. Collapse whitespace
visible = visible.replace(/\s+/g, ' ').trim();

const totalWords = visible.split(/\s+/).filter(Boolean).length;

const exactMatches = (visible.match(/landing page para advogados/gi) || []);
const partialLP = (visible.match(/\blanding page\b(?! para advogados)/gi) || []);
const pluralLPS = (visible.match(/\blanding pages?(?! para advogados)/gi) || []);
const advogados = (visible.match(/\badvogad[oa]s?\b/gi) || []);

console.log('═══════════════════════════════════════════════════');
console.log('  AUDITORIA DE TEXTO 100% VISÍVEL (sem schema/JSON)');
console.log('═══════════════════════════════════════════════════');
console.log('Total de palavras visíveis:', totalWords);
console.log();
console.log('"landing page para advogados" (exata):', exactMatches.length);
console.log('"landing page" (sem "para advogados"):', partialLP.length);
console.log('"landing pages" (sem "para advogados"):', pluralLPS.length);
console.log('"advogado(s)/advogada(s)":', advogados.length);
console.log();
console.log('Densidade da frase exata:', (exactMatches.length / totalWords * 100).toFixed(2) + '%');
console.log();
console.log('═══════════════════════════════════════════════════');
console.log('  CADA OCORRÊNCIA EM CONTEXTO');
console.log('═══════════════════════════════════════════════════');

const re = /landing page para advogados/gi;
let m;
let i = 0;
while ((m = re.exec(visible)) !== null) {
  i++;
  const start = Math.max(0, m.index - 60);
  const end = Math.min(visible.length, m.index + m[0].length + 60);
  const before = visible.slice(start, m.index);
  const match = visible.slice(m.index, m.index + m[0].length);
  const after = visible.slice(m.index + m[0].length, end);
  console.log(`\n[${String(i).padStart(2, '0')}] …${before}【${match}】${after}…`);
}
