import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CtaBanner from '@/components/CtaBanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Quem Somos — Páginas Jurídicas',
  description:
    'Conheça nossa equipe: especialistas na criação de site jurídico com mais de 20 anos de experiência e 500+ projetos entregues para advogados em todo o Brasil.',
  alternates: { canonical: '/quem-somos/' },
  openGraph: {
    title: 'Quem Somos — Páginas Jurídicas',
    description:
      'Mais de 20 anos criando soluções digitais para advogados, com foco em conversão, SEO e ética.',
    url: '/quem-somos/',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Landing Page para Advogados',
    images: [
      {
        url: '/images/quem-somos.jpg',
        width: 1200,
        height: 630,
        alt: 'Equipe especializada em Landing Page para Advogados',
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
    name: 'Quem Somos — Landing Page para Advogados',
    description:
      'Especialistas em criação de páginas jurídicas com foco em performance, SEO e ética profissional.',
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
            Especialistas em
            <span className="italic font-light text-accent"> landing page para advogados </span>
            com resultados comprovados.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/70">
            Há mais de duas décadas combinamos design, performance e estratégia para transformar
            escritórios de advocacia em referências digitais — e nos especializamos em criar a
            landing page para advogados ideal para cada perfil de banca.
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
                Nascemos da união entre tecnologia, design e um profundo conhecimento do mercado
                jurídico. Compreendemos os desafios e as oportunidades que advogados enfrentam no
                ambiente digital — e traduzimos a complexidade do direito em uma comunicação clara,
                ética e persuasiva.
              </p>
              <p>
                Entregamos soluções digitais que, além de destacar a marca da banca, geram
                resultados mensuráveis em captação. Para isso, criamos cada{' '}
                <Link href="/" className="border-b border-accent/40 font-medium text-primary transition-colors hover:text-accent">
                  página de aquisição para escritório jurídico
                </Link>{' '}
                respeitando o Código de Ética da OAB e usando boas práticas de performance,
                acessibilidade e SEO.
              </p>
              <p>
                Construímos páginas que são verdadeiras máquinas de aquisição de clientes,
                priorizando a conversão qualificada — não o volume vazio.
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
    </>
  );
}
