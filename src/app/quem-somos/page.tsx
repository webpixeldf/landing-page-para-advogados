import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CtaBanner from '@/components/CtaBanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Quem Somos — Marcelo França e a equipe por trás dos seus projetos',
  description:
    'Conheça Marcelo França e a equipe: mais de 20 anos de experiência, 500+ projetos entregues e um processo validado de criação de presença digital para escritórios jurídicos.',
  alternates: { canonical: '/quem-somos/' },
  openGraph: {
    title: 'Quem Somos — Marcelo França e a equipe por trás dos seus projetos',
    description:
      'Mais de 20 anos construindo soluções digitais para advogados, com foco em ética, performance e resultados mensuráveis.',
    url: '/quem-somos/',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Landing Page para Advogados',
    images: [
      {
        url: '/images/quem-somos.jpg',
        width: 1200,
        height: 630,
        alt: 'Marcelo França , Especialista em páginas de conversão para escritórios de advocacia',
        type: 'image/jpeg'
      }
    ]
  }
};

export default function QuemSomosPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: siteConfig.url + '/' },
      { '@type': 'ListItem', position: 2, name: 'Quem Somos', item: siteConfig.url + '/quem-somos/' }
    ]
  };

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Quem Somos — Marcelo França e equipe',
    description:
      'Marcelo França lidera uma equipe com mais de 20 anos de experiência em desenvolvimento web e presença digital para o mercado jurídico brasileiro.',
    url: siteConfig.url + '/quem-somos/'
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />

      <section className="relative overflow-hidden bg-primary-dark pb-28 pt-44 text-white">
        <div className="absolute inset-0 -z-10 bg-mesh-emerald opacity-70 animate-mesh-shift" />
        <div className="absolute inset-0 -z-10 bg-noise opacity-[0.05] mix-blend-overlay" />

        <div className="container-pp">
          <span className="eyebrow-light">Sobre nós</span>
          <h1 className="display-lg mt-6 max-w-4xl text-balance text-white">
            Marcelo França e a equipe por trás de
            <span className="italic font-light text-accent"> cada projeto.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/70">
            Há mais de 20 anos combinamos design, performance e estratégia para fortalecer a
            presença digital de escritórios jurídicos em todo o Brasil. Sob a liderança de Marcelo
            França, entregamos projetos que respeitam o Código de Ética da OAB e geram resultados
            mensuráveis de forma consistente.
          </p>
        </div>
      </section>

      <section className="bg-cream-50 py-24">
        <div className="container-pp grid items-center gap-14 lg:grid-cols-2">
          <div className="grid grid-cols-6 grid-rows-6 gap-3 max-w-md">
            <div className="col-span-3 row-span-4 overflow-hidden rounded-3xl shadow-soft">
              <Image src="/images/balanca-juiz.webp" alt="Símbolo da advocacia" width={400} height={500} className="h-full w-full object-cover" />
            </div>
            <div className="col-span-3 row-span-3 overflow-hidden rounded-3xl shadow-soft">
              <Image src="/images/servico-de-landing-page-para-advogados.webp" alt="Equipe de desenvolvimento web" width={400} height={300} className="h-full w-full object-cover" />
            </div>
            <div className="col-span-3 row-span-3 overflow-hidden rounded-3xl shadow-soft">
              <Image src="/images/advogada.webp" alt="Advogada profissional" width={400} height={300} className="h-full w-full object-cover" />
            </div>
            <div className="col-span-3 row-span-2 overflow-hidden rounded-3xl shadow-soft">
              <Image src="/images/advogados-clientes-satisfeitos.webp" alt="Clientes advogados satisfeitos" width={400} height={300} className="h-full w-full object-cover" />
            </div>
          </div>
          <div>
            <span className="eyebrow">Nossa história</span>
            <h2 className="display-md mt-5 text-balance">
              Tecnologia, design e visão jurídica em
              <span className="italic font-light text-primary-light"> uma única entrega.</span>
            </h2>
            <div className="mt-6 space-y-5 text-base font-light leading-relaxed text-ink-500">
              <p>
                Nascemos da visão de Marcelo França, que uniu sua experiência em tecnologia e SEO
                com um profundo conhecimento do mercado jurídico. Compreendemos os desafios que
                advogados enfrentam no ambiente digital e traduzimos a complexidade do direito
                em comunicação clara, ética e profissional.
              </p>
              <p>
                Entregamos projetos digitais que, além de fortalecer a marca da banca, geram
                resultados mensuráveis. Cada entrega respeita o Código de Ética da OAB e aplica
                boas práticas de{' '}
                <Link href="/" className="border-b border-accent/40 font-medium text-primary transition-colors hover:text-accent">
                  performance, acessibilidade e otimização técnica
                </Link>.
              </p>
              <p>
                Priorizamos a captação qualificada, não o volume vazio — cada projeto é construído
                com base no posicionamento do escritório e no perfil do cliente que a banca quer atrair.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-50 pb-24">
        <div className="container-pp">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="eyebrow">Valores que guiam</span>
            <h2 className="display-md mt-5 text-balance">Princípios que sustentam cada projeto</h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl bg-ink-100 md:grid-cols-3">
            {[
              {
                n: '01',
                title: 'Ética em primeiro lugar',
                text:
                  'Todo projeto respeita rigorosamente o Código de Ética da OAB e o Provimento 205/2021, sem promessas de resultado.'
              },
              {
                n: '02',
                title: 'Tecnologia que entrega',
                text:
                  'Trabalhamos com pilhas modernas (Next.js, código estático e CDN) para máxima performance e SEO técnico.'
              },
              {
                n: '03',
                title: 'Resultado mensurável',
                text:
                  'Configuramos analytics e métricas para que cada decisão seja baseada em dados, não em achismos.'
              }
            ].map((v) => (
              <article key={v.title} className="group bg-cream-50 p-8 transition-colors hover:bg-white">
                <span className="font-mono text-sm font-bold text-accent">/{v.n}</span>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-ink-900">{v.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-ink-500">{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Vamos transformar a captação digital do seu escritório?"
        subtitle="Solicite agora um diagnóstico gratuito e veja o que podemos fazer pela sua banca."
      />

      <section className="bg-cream-50 pb-12">
        <div className="container-pp max-w-3xl">
          <div className="rounded-2xl border border-ink-100 bg-white px-6 py-5 text-center text-xs font-light text-ink-500">
            Todos os Direitos Reservados © {new Date().getFullYear()} Landing Page Para Advogados , CNPJ: 34.644.883/0001-94
          </div>
        </div>
      </section>
    </>
  );
}
