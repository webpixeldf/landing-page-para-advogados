'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { Post } from '@/lib/posts';

type Props = { posts: Post[] };

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function BlogSearch({ posts }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) setQuery(q);
    const c = params.get('cat');
    if (c) setCategory(c);
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(['Todos']);
    posts.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const okCat = category === 'Todos' || p.category === category;
      if (!okCat) return false;
      if (!q) return true;
      const haystack = (p.title + ' ' + p.description + ' ' + p.tags.join(' ') + ' ' + p.category).toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query, category]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <div className="rounded-3xl border border-ink-100 bg-white p-3 shadow-soft md:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.3-4.3M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <label htmlFor="blog-search" className="sr-only">
              Buscar artigos
            </label>
            <input
              id="blog-search"
              type="search"
              placeholder="Buscar por palavra-chave, tag ou categoria…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-2xl border-0 bg-cream-50 py-4 pl-12 pr-4 text-sm font-light tracking-tight text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 md:px-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-full px-3.5 py-2 text-xs font-medium transition-all duration-300 ${
                  category === cat
                    ? 'bg-primary text-white shadow-card'
                    : 'bg-cream-50 text-ink-700 hover:bg-ink-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 px-2 text-xs font-mono uppercase tracking-widest text-ink-400" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'artigo' : 'artigos'}
          {query ? ` · busca: "${query}"` : ''}
        </p>
      </div>

      {featured && (
        <Link
          href={`/blog/${featured.slug}/`}
          className="group mt-10 grid gap-8 overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-all duration-500 hover:shadow-card md:grid-cols-2"
        >
          <div
            className="relative aspect-video bg-cover bg-center transition-transform duration-700 group-hover:scale-105 md:aspect-auto"
            style={{ backgroundImage: `url('${featured.cover}')` }}
            role="img"
            aria-label={featured.coverAlt}
          >
            <span className="absolute left-5 top-5 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary-dark">
              Em destaque
            </span>
          </div>
          <div className="flex flex-col justify-center p-7 md:p-10">
            <div className="flex items-center gap-3 text-xs">
              <span className="font-mono uppercase tracking-widest text-accent">
                {featured.category}
              </span>
              <span className="h-px w-7 bg-ink-200" />
              <span className="font-light text-ink-400">{formatDate(featured.date)}</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tighter text-ink-900 group-hover:text-primary md:text-[2.25rem]">
              {featured.title}
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-ink-500">
              {featured.description}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Ler artigo completo
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </Link>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}/`}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${p.cover}')` }}
                role="img"
                aria-label={p.coverAlt}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950/60 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary backdrop-blur-md">
                {p.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink-900 transition-colors group-hover:text-primary md:text-xl">
                {p.title}
              </h3>
              <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-ink-500">
                {p.description}
              </p>
              <div className="mt-6 flex items-center justify-between text-xs">
                <span className="font-light text-ink-400">{formatDate(p.date)}</span>
                <span className="font-mono text-ink-400">{p.readingTime} min</span>
              </div>
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3">
            <div className="rounded-3xl border border-dashed border-ink-200 bg-white p-16 text-center">
              <p className="font-display text-2xl text-ink-900">Nenhum artigo encontrado</p>
              <p className="mt-3 text-sm font-light text-ink-500">
                Tente outra palavra-chave ou troque a categoria.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
