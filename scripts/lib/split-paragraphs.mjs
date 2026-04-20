/**
 * Utilitário compartilhado: quebra parágrafos longos em chunks de 1-2 frases.
 * Usado como pós-processamento obrigatório em generate-article e regenerate-article,
 * para garantir leitura mobile mesmo se a IA ignorar a regra.
 */

function protectLinks(text) {
  const links = [];
  const protectedText = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (full) => {
    const token = `\u0001LINK${links.length}\u0002`;
    links.push(full);
    return token;
  });
  return { text: protectedText, links };
}

function restoreLinks(text, links) {
  return text.replace(/\u0001LINK(\d+)\u0002/g, (_, i) => links[+i]);
}

function splitSingleParagraph(paragraph) {
  const { text, links } = protectLinks(paragraph);
  const sentences = text
    .split(/(?<=[.!?])\s+(?=["'(\[]?[A-ZÁÉÍÓÚÂÊÔÃÇÀÈÌÒÙÄËÏÖÜÑ])/g)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length <= 2) {
    return restoreLinks(paragraph, links);
  }
  const chunks = [];
  for (let i = 0; i < sentences.length; i += 2) {
    const chunk = sentences.slice(i, i + 2).join(' ');
    chunks.push(restoreLinks(chunk, links));
  }
  return chunks.join('\n\n');
}

export function splitLongParagraphs(content) {
  // Protege code blocks
  const codeBlocks = [];
  let working = content.replace(/```[\s\S]*?```/g, (match) => {
    const token = `\u0001CODE${codeBlocks.length}\u0002`;
    codeBlocks.push(match);
    return token;
  });

  const blocks = working.split(/\n\s*\n/);
  const out = [];

  for (const rawBlock of blocks) {
    const block = rawBlock.trim();
    if (!block) continue;

    if (
      /^#{1,6}\s/.test(block) ||
      /^[-*+]\s/.test(block) ||
      /^\d+\.\s/.test(block) ||
      /^>\s/.test(block) ||
      block.includes('\u0001CODE')
    ) {
      out.push(block);
      continue;
    }

    const lines = block.split('\n');
    const hasMixedList = lines.some(
      (l) => /^\s*[-*+]\s/.test(l) || /^\s*\d+\.\s/.test(l)
    );
    if (hasMixedList) {
      out.push(block);
      continue;
    }

    const flatText = lines.join(' ').replace(/\s+/g, ' ').trim();
    out.push(splitSingleParagraph(flatText));
  }

  let result = out.join('\n\n');
  result = result.replace(/\u0001CODE(\d+)\u0002/g, (_, i) => codeBlocks[+i]);
  return result;
}
