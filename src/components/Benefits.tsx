import Link from 'next/link';

type Benefit = {
  title: string;
  text: string;
  icon: string;
  span?: string;
  highlight?: boolean;
  href?: string;
};

const benefits: Benefit[] = [
  {
    title: 'Hospedagem inclusa',
    text: 'Sua página entra no ar em servidor brasileiro, sem custo extra no período contratado.',
    icon: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 7v5l3 3',
    span: 'lg:col-span-2 lg:row-span-2',
    highlight: true
  },
  {
    title: 'Performance Core Web Vitals',
    text: 'Desenvolvimento leve, rápido e pensado para boa experiência de navegação.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    href: '/blog/velocidade-de-carregamento-pagina-juridica/'
  },
  {
    title: 'Sem mensalidade obrigatória',
    text: 'Você paga pela criação da página e não fica preso a planos recorrentes desnecessários.',
    icon: 'M3 6l9-3 9 3-9 3-9-3zm9 6l9-3v6l-9 3-9-3v-6l9 3z'
  },
  {
    title: 'SEO on-page completo',
    text: 'Estrutura otimizada com meta tags, headings, schema markup, breadcrumbs e URL amigável.',
    icon: 'M3 7h18M3 12h18M3 17h12',
    span: 'lg:col-span-2',
    href: '/blog/seo-para-advogados-como-aparecer-no-google/'
  },
  {
    title: 'Página responsiva',
    text: 'Design adaptado para celular, tablet e desktop.',
    icon: 'M4 4h12v16H4zM20 8h0M20 16h0'
  },
  {
    title: 'Pronta para tráfego pago',
    text: 'Página preparada para campanhas no Google Ads, Meta Ads e outras plataformas.',
    icon: 'M3 18l6-6 4 4 8-8M14 6h7v7'
  },
  {
    title: 'Formulários com cuidado à LGPD',
    text: 'Campos claros, consentimento explícito e tratamento transparente dos dados enviados.',
    icon: 'M12 11c1.66 0 3-1.34 3-3S13.66 5 12 5 9 6.34 9 8s1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
  },
  {
    title: 'Suporte por 90 dias',
    text: 'Acompanhamento técnico após a entrega para ajustes essenciais e estabilidade da página.',
    icon: 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'
  }
];

export default function Benefits() {
  return (
    <section id="beneficios" className="relative bg-cream-50 py-28">
      <div className="container-pp">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="eyebrow">O que está incluído</span>
          <h2 className="display-md mt-5 text-balance">
            O que está incluído na
            <span className="italic font-light text-primary-light"> sua landing page</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[240px]">
          {benefits.map((b) => (
            <article
              key={b.title}
              className={`group relative overflow-hidden rounded-3xl border border-ink-100 transition-all duration-500 hover:-translate-y-1 hover:shadow-card ${
                b.span ?? ''
              } ${
                b.highlight
                  ? 'bg-gradient-to-br from-primary via-primary-dark to-primary p-8 text-white'
                  : 'bg-white p-7'
              }`}
            >
              {b.highlight && (
                <>
                  <div className="absolute inset-0 -z-10 bg-mesh-emerald opacity-50" />
                  <div className="absolute -bottom-20 -right-20 -z-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
                </>
              )}

              <div className="flex h-full flex-col">
                <div
                  className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                    b.highlight
                      ? 'bg-white/10 text-accent'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                  </svg>
                </div>

                <h3 className={`font-display ${b.highlight ? 'text-2xl md:text-3xl' : 'text-base'} font-semibold tracking-tight ${b.highlight ? 'text-white' : 'text-ink-900'}`}>
                  {b.title}
                </h3>
                <p className={`mt-2 font-light leading-relaxed ${b.highlight ? 'max-w-md text-base text-white/75' : 'text-sm text-ink-500'}`}>
                  {b.text}
                </p>

                {b.highlight && (
                  <div className="mt-auto pt-6">
                    <span className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-accent">
                      Sem mensalidade
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                )}

                {b.href && (
                  <Link
                    href={b.href}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-accent"
                  >
                    Saiba mais
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
