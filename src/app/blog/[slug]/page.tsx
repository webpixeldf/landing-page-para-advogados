import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CtaBanner from '@/components/CtaBanner';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { renderMarkdown } from '@/lib/markdown';
import { siteConfig } from '@/lib/site';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}/`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      images: [{ url: post.cover, alt: post.coverAlt }]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.cover]
    }
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = renderMarkdown(post.content);
  const related = getRelatedPosts(post.slug);
  const url = `${siteConfig.url}/blog/${post.slug}/`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}${post.cover}`,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { '@type': 'Organization', name: 'Landing Page para Advogados', url: siteConfig.url + '/' },
    publisher: {
      '@type': 'Organization',
      name: 'Landing Page para Advogados',
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/landing-page-para-advogados-logo.webp`
      }
    },
    keywords: post.tags.join(', ')
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: siteConfig.url + '/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: siteConfig.url + '/blog/' },
      { '@type': 'ListItem', position: 3, name: post.title, item: url }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-dark pb-24 pt-44 text-white">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('${post.cover}')` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-dark/70 via-primary-dark/85 to-primary-dark" />
        <div className="absolute inset-0 -z-10 bg-noise opacity-[0.05] mix-blend-overlay" />

        <div className="container-pp">
          <nav aria-label="breadcrumb" className="text-xs font-light text-white/55">
            <Link href="/" className="hover:text-accent">Início</Link>
            <span className="mx-2">/</span>
            <Link href="/blog/" className="hover:text-accent">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white/85">{post.category}</span>
          </nav>

          <div className="mt-8 max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-accent backdrop-blur-md">
              {post.category}
            </span>
            <h1 className="mt-5 font-display text-[2.4rem] font-extrabold leading-[1.05] tracking-tightest text-balance text-white md:text-5xl lg:text-[3.6rem]">
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/75">
              {post.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-light text-white/55">
              <span className="inline-flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-accent to-gold-600 font-display text-[10px] font-bold text-primary-dark">
                  WP
                </span>
                <span className="text-white/80">Landing Page para Advogados</span>
              </span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>{formatDate(post.date)}</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>{post.readingTime} min de leitura</span>
              {post.updated && (
                <>
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span>Atualizado em {formatDate(post.updated)}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <article className="bg-cream-50 py-20">
        <div className="container-pp grid max-w-6xl gap-16 lg:grid-cols-[1fr_280px]">
          <div className="prose-editorial mx-auto w-full max-w-prose" dangerouslySetInnerHTML={{ __html: html }} />

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-soft">
              <h3 className="font-mono text-[10px] font-semibold uppercase tracking-widest text-accent">
                Tópicos do artigo
              </h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <span key={t} className="rounded-full bg-ink-50 px-2.5 py-1 text-xs font-light text-ink-700">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-primary-dark p-6 text-white shadow-card">
              <div className="absolute inset-0 -z-10 bg-mesh-emerald opacity-60" />
              <div className="absolute -right-12 -top-12 -z-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />

              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-accent">
                Próximo passo
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                Quer aplicar isso na sua banca?
              </h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-white/75">
                Fale agora com nosso time e receba um orçamento gratuito com prazo de 7 dias.
              </p>
              <a
                href={siteConfig.contact.whatsappBase}
                target="_blank"
                rel="noopener"
                className="btn-primary mt-5 w-full justify-center"
              >
                Solicitar orçamento
              </a>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-cream-50 pb-20">
          <div className="container-pp">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="eyebrow">Continue lendo</span>
                <h2 className="display-sm mt-4 text-balance">Artigos relacionados</h2>
              </div>
              <Link href="/blog/" className="hidden text-sm font-medium text-primary hover:text-accent md:inline-flex">
                Ver todos →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}/`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
                >
                  <div
                    className="aspect-[16/10] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${r.cover}')` }}
                    role="img"
                    aria-label={r.coverAlt}
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                      {r.category}
                    </span>
                    <h3 className="mt-3 font-display text-base font-semibold leading-snug tracking-tight text-ink-900 group-hover:text-primary md:text-lg">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
