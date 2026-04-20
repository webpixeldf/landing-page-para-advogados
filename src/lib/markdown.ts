function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderInline(text: string): string {
  let html = escapeHtml(text);

  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label: string, href: string) => {
    const isExternal = /^https?:\/\//i.test(href);
    const rel = isExternal ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${href}"${rel}>${label}</a>`;
  });

  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/(^|\W)\*([^*\n]+)\*(?=\W|$)/g, '$1<em>$2</em>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  return html;
}

export function renderMarkdown(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];

  let inUl = false;
  let inOl = false;
  let inTable = false;
  let inBlockquote = false;
  let paragraph: string[] = [];
  let tableRows: string[][] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      out.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  };
  const closeUl = () => {
    if (inUl) {
      out.push('</ul>');
      inUl = false;
    }
  };
  const closeOl = () => {
    if (inOl) {
      out.push('</ol>');
      inOl = false;
    }
  };
  const closeBq = () => {
    if (inBlockquote) {
      out.push('</blockquote>');
      inBlockquote = false;
    }
  };
  const closeTable = () => {
    if (inTable && tableRows.length) {
      const [head, ...body] = tableRows;
      const headHtml = `<thead><tr>${head.map((c) => `<th>${renderInline(c.trim())}</th>`).join('')}</tr></thead>`;
      const bodyHtml = body.length
        ? `<tbody>${body
            .filter((r) => !/^[-:|\s]+$/.test(r.join('')))
            .map((row) => `<tr>${row.map((c) => `<td>${renderInline(c.trim())}</td>`).join('')}</tr>`)
            .join('')}</tbody>`
        : '';
      out.push(`<div class="overflow-x-auto"><table class="w-full text-sm">${headHtml}${bodyHtml}</table></div>`);
      tableRows = [];
      inTable = false;
    }
  };
  const closeAll = () => {
    flushParagraph();
    closeUl();
    closeOl();
    closeBq();
    closeTable();
  };

  for (const raw of lines) {
    const line = raw;

    if (/^\s*$/.test(line)) {
      closeAll();
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      closeAll();
      const level = heading[1].length;
      out.push(`<h${level}>${renderInline(heading[2].trim())}</h${level}>`);
      continue;
    }

    if (/^\s*\|.*\|\s*$/.test(line)) {
      flushParagraph();
      closeUl();
      closeOl();
      closeBq();
      inTable = true;
      const cells = line.trim().slice(1, -1).split('|');
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      closeTable();
    }

    const ul = /^\s*[-*]\s+(.*)$/.exec(line);
    if (ul) {
      flushParagraph();
      closeOl();
      closeBq();
      if (!inUl) {
        out.push('<ul>');
        inUl = true;
      }
      out.push(`<li>${renderInline(ul[1])}</li>`);
      continue;
    } else {
      closeUl();
    }

    const ol = /^\s*\d+\.\s+(.*)$/.exec(line);
    if (ol) {
      flushParagraph();
      closeBq();
      if (!inOl) {
        out.push('<ol>');
        inOl = true;
      }
      out.push(`<li>${renderInline(ol[1])}</li>`);
      continue;
    } else {
      closeOl();
    }

    const bq = /^>\s?(.*)$/.exec(line);
    if (bq) {
      flushParagraph();
      if (!inBlockquote) {
        out.push('<blockquote>');
        inBlockquote = true;
      }
      out.push(`<p>${renderInline(bq[1])}</p>`);
      continue;
    } else {
      closeBq();
    }

    paragraph.push(line.trim());
  }

  closeAll();
  return out.join('\n');
}
