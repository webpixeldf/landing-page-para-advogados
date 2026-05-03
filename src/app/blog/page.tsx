import type { Metadata } from 'next';
import BlogSearch from '@/components/BlogSearch';
import CtaBanner from '@/components/CtaBanner';
import { getAllPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog — Marketing Jurídico e SEO',
  description:
    'Marketing jurídico, SEO, copywriting e ética da OAB: leitura para advogados que querem captar mais e melhores clientes.',
  alternates: { canonical: '/blog/' },
  openGraph: {
    title: 'Blog — Marketing Jurídico e SEO',
    description:
      'Conteúdo prático para escritórios que querem crescer no digital com ética e estratégia.',
    url: '/blog/',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Landing Page para Advogados',
    images: [
      {
        url: '/images/blog-landing-page.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog — Marketing jurídico e SEO',
        type: 'image/jpeg'
      }
    ]
  }
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog — Landing Page para Advogados',

    url: siteConfig.url + '/blog/',
    description:
      'Conteúdo sobre marketing jurídico, SEO, conversão e ética para escritórios de advocacia.',
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${siteConfig.url}/blog/${p.slug}/`,
      datePublished: p.date,
      dateModified: p.updated ?? p.date,
      author: { '@type': 'Person', name: siteConfig.author.name, url: siteConfig.author.linkedin },
      image: `${siteConfig.url}${p.cover}`
    }))
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: siteConfig.url + '/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: siteConfig.url + '/blog/' }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="relative overflow-hidden bg-primary-dark pb-24 pt-44 text-white">
        <div className="absolute inset-0 -z-10 bg-mesh-emerald opacity-70 animate-mesh-shift" />
        <div className="absolute inset-0 -z-10 bg-noise opacity-[0.05] mix-blend-overlay" />
        <div className="absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-emerald-500/30 blur-3xl" />
        <div className="absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

        <div className="container-pp">
          <span className="eyebrow-light">Blog</span>
          <h1 className="display-lg mt-6 max-w-4xl text-balance text-white">
            Blog sobre
            <span className="italic font-light text-accent"> marketing jurídico</span>,
            SEO e páginas de conversão para escritórios.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/70">
            Conteúdo prático para escritórios que querem crescer no digital com ética, estratégia
            e performance — escrito por quem entrega projetos reais há 20 anos.
          </p>
        </div>
      </section>

      <section className="bg-cream-50 py-16">
        <div className="container-pp">
          <BlogSearch posts={posts} />
        </div>
      </section>

      <CtaBanner
        title="Aplique o que aprendeu em uma página real."
        subtitle="Quer transformar leitura em resultado? Vamos construir a página da sua banca."
      />
    </>
  );
}
