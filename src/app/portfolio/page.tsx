import type { Metadata } from 'next';
import Link from 'next/link';
import Portfolio from '@/components/Portfolio';
import CtaBanner from '@/components/CtaBanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Portfólio — Páginas Jurídicas',
  description:
    'Conheça projetos reais de páginas jurídicas desenvolvidos para escritórios em todo o Brasil — com métricas, segmentos e resultados de captação.',
  alternates: { canonical: '/portfolio/' },
  openGraph: {
    title: 'Portfólio — Páginas Jurídicas',
    description:
      'Cases reais de bancas que escalaram captação com páginas profissionais jurídicas.',
    url: '/portfolio/',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Landing Page para Advogados',
    images: [
      {
        url: '/images/portfolio.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfólio de Landing Pages para Advogados',
        type: 'image/jpeg'
      }
    ]
  }
};

export default function PortfolioPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: siteConfig.url + '/' },
      { '@type': 'ListItem', position: 2, name: 'Portfólio', item: siteConfig.url + '/portfolio/' }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="relative overflow-hidden bg-primary-dark pb-28 pt-44 text-white">
        <div className="absolute inset-0 -z-10 bg-mesh-emerald opacity-70 animate-mesh-shift" />
        <div className="absolute inset-0 -z-10 bg-noise opacity-[0.05] mix-blend-overlay" />

        <div className="container-pp">
          <span className="eyebrow-light">Portfólio</span>
          <h1 className="display-lg mt-6 max-w-4xl text-balance text-white">
            Portfólio de
            <span className="italic font-light text-accent"> landing page para advogados </span>
            entregues pela nossa equipe.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/70">
            Veja exemplos reais de escritórios que transformaram a presença digital em volume
            previsível de novos clientes — todos construídos sobre a metodologia do nosso{' '}
            <Link href="/" className="border-b border-accent/40 text-accent transition-colors hover:border-accent">
              site para captação de clientes jurídicos
            </Link>.
          </p>
        </div>
      </section>

      <Portfolio />

      <CtaBanner
        title="Quer ver o seu escritório aqui no nosso portfólio?"
        subtitle="Solicite uma proposta e veja como podemos posicionar a sua banca no digital."
      />
    </>
  );
}
