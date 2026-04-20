// Carrega posts dos arquivos JSON em content/blog/*.json em build-time.
// Novos artigos aparecem só com adicionar um arquivo JSON nessa pasta — sem tocar em código.
import fs from 'node:fs';
import path from 'node:path';

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  cover: string;
  coverAlt: string;
  category: string;
  readingTime: number;
  tags: string[];
  homeAnchor: string;
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

function loadPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json'));
  const list: Post[] = [];
  for (const f of files) {
    try {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, f), 'utf8');
      const p = JSON.parse(raw) as Post;
      // Sanity check mínimo
      if (!p.slug || !p.title || !p.content) continue;
      list.push(p);
    } catch (err) {
      console.warn(`[posts] Erro lendo ${f}:`, err);
    }
  }
  return list;
}

export const posts: Post[] = loadPosts();

export function getAllPosts(): Post[] {
  return posts.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  return posts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aShared = a.tags.filter((t) => current.tags.includes(t)).length;
      const bShared = b.tags.filter((t) => current.tags.includes(t)).length;
      return bShared - aShared;
    })
    .slice(0, limit);
}
