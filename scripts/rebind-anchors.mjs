#!/usr/bin/env node
/**
 * Regrava os homeAnchors e os links inline dos artigos existentes:
 *  - Substitui âncora genérica → âncora keyword-rich do anchors-pool
 *  - Atualiza link no corpo (markdown) para usar o novo anchor
 *  - Move âncora antiga do pool (se estava em 'used') para nada — é descartada
 *  - Move nova âncora de 'available' para 'used'
 *
 * Mantém:
 *  - Uma âncora única por artigo (regra antiga preservada)
 *  - Uma única ocorrência de [anchor](/) no conteúdo
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const BLOG = './content/blog';
const POOL = './content/anchors-pool.json';

// Mapeamento manual: para cada slug, qual âncora keyword-rich usar
// (escolhida pelo tema do artigo)
const MAP = {
  'pagina-de-captura-para-advogados-guia-completo': 'landing page de captura para advogados',
  'site-para-advogados-como-escolher-a-melhor-estrutura': 'landing page profissional para advogados',
  'marketing-juridico-digital-2026': 'landing page estratégica para advogados',
  'seo-para-advogados-como-aparecer-no-google': 'landing page com SEO para advogados',
  'wordpress-ou-codigo-puro-para-advogados': 'criação de landing page para advogados',
  'lgpd-para-advogados-no-site': 'landing page em conformidade com a OAB',
  'copy-para-advogados-como-escrever-textos-que-convertem': 'copy de landing page para advogados',
  'velocidade-de-carregamento-pagina-juridica': 'landing page rápida para advogados',
  'oab-publicidade-online-o-que-pode-e-o-que-nao-pode': 'landing page ética para advogados',
  'tre-erros-fatais-no-site-de-advocacia': 'landing page de vendas para advogados',
  'landing-page-para-advogado-tributarista-guia-para-conversoes-acima-de-10':
    'landing page para advogado tributarista',
  '7-elementos-essenciais-de-uma-landing-page-juridica-de-alta-performance':
    'landing page de alta performance para advogados',
  'landing-page-para-advogado-trabalhista-copy-ideal-para-captar-leads':
    'landing page para advogado trabalhista'
};

// Se aparecer algum slug novo que não está no mapa, escolhe a próxima âncora disponível
async function main() {
  const pool = JSON.parse(await readFile(POOL, 'utf8'));
  const files = (await readdir(BLOG)).filter((f) => f.endsWith('.json'));

  for (const f of files) {
    const file = path.join(BLOG, f);
    const slug = f.replace(/\.json$/, '');
    const post = JSON.parse(await readFile(file, 'utf8'));

    const oldAnchor = post.homeAnchor;
    let newAnchor = MAP[slug];
    if (!newAnchor) {
      // fallback: pega primeiro disponível do pool
      newAnchor = pool.available.find((a) => !pool.used.some((u) => u.anchor === a));
      if (!newAnchor) {
        console.warn(`⚠ Pool esgotado ao processar ${slug}`);
        continue;
      }
    }

    if (oldAnchor === newAnchor) {
      console.log(`↷ SKIP ${slug} (já tem o anchor correto)`);
      continue;
    }

    // Atualiza o homeAnchor
    post.homeAnchor = newAnchor;

    // Substitui no conteúdo o antigo [texto](/) pelo novo [newAnchor](/)
    // Busca QUALQUER [...](/) e substitui pela nova âncora (garantindo unicidade)
    const re = /\[([^\]]+)\]\(\/\)/g;
    const matches = [...post.content.matchAll(re)];
    if (matches.length === 0) {
      console.warn(`⚠ ${slug}: nenhum link inline encontrado`);
    } else {
      // Substitui apenas a PRIMEIRA ocorrência pela nova âncora;
      // remove links extras (preserva só 1)
      let replaced = false;
      post.content = post.content.replace(/\[([^\]]+)\]\(\/\)/g, (full, label) => {
        if (!replaced) {
          replaced = true;
          return `[${newAnchor}](/)`;
        }
        return label; // strip extras, keep plain text
      });
    }

    await writeFile(file, JSON.stringify(post, null, 2) + '\n', 'utf8');
    console.log(`✓ ${slug}`);
    console.log(`    "${oldAnchor}" → "${newAnchor}"`);

    // Atualiza pool:
    //  - se a antiga estava em 'used', remover (libera espaço)
    //  - adicionar nova em 'used'
    pool.used = pool.used.filter((u) => u.anchor !== oldAnchor);
    pool.available = pool.available.filter((a) => a !== newAnchor);
    if (!pool.used.some((u) => u.anchor === newAnchor)) {
      pool.used.push({ anchor: newAnchor, slug, date: post.date });
    }
  }

  await writeFile(POOL, JSON.stringify(pool, null, 2) + '\n', 'utf8');
  console.log(`\n✅ Pool atualizado: ${pool.available.length} disponíveis, ${pool.used.length} usadas`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
