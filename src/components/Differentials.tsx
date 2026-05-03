import Link from 'next/link';

const items = [
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Experiência sólida',
    text: 'Longa trajetória criando páginas profissionais para negócios que dependem de confiança, autoridade e clareza na comunicação.'
  },
  {
    icon: 'M3 6l9-3 9 3-9 3-9-3zm9 6l9-3v6l-9 3-9-3v-6l9 3z',
    title: 'Comunicação alinhada à OAB',
    text: 'Textos com tom sóbrio, informativo e compatível com o Código de Ética da OAB e o Provimento 205/2021.',
    href: '/blog/oab-publicidade-online-o-que-pode-e-o-que-nao-pode/'
  },
  {
    icon: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
    title: 'Qualidade técnica',
    text: 'Código limpo, leve, semântico e preparado para leitura dos mecanismos de busca.'
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Performance real',
    text: 'Páginas rápidas, otimizadas para Core Web Vitals e desenvolvidas para boa experiência em qualquer dispositivo.'
  },
  {
    icon: 'M3 7h18M3 12h18M3 17h12',
    title: 'Design responsivo',
    text: 'Layout adaptado para desktop, tablet e celular, com navegação simples e leitura fluida.'
  },
  {
    icon: 'M5 13l4 4L19 7',
    title: 'Foco em conversão',
    text: 'Estrutura criada para orientar o visitante até o contato, sem distrações e sem excesso de informação.'
  }
];

export default function Differentials() {
  return (
    <section id="diferenciais" className="relative overflow-hidden bg-cream-50 py-28">
      <div className="absolute inset-0 -z-10 bg-mesh-cream opacity-60" />

      <div className="container-pp">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="eyebrow">Por que escolher a gente</span>
          <h2 className="display-md mt-5 text-balance">
            Página jurídica feita por quem entende de
            <span className="italic font-light text-primary-light"> conversão e ética profissional</span>
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-pretty text-lg font-light leading-relaxed text-ink-500">
            Uma página de captação para advocacia não pode ser tratada como uma página comum.
          </p>
          <p className="mx-auto mt-3 max-w-prose text-pretty text-lg font-light leading-relaxed text-ink-500">
            Ela precisa vender confiança sem exageros, orientar sem prometer resultado e conduzir
            o visitante para uma ação objetiva, sem ferir as regras da publicidade jurídica.
          </p>
          <p className="mx-auto mt-4 max-w-prose text-pretty text-base font-light leading-relaxed text-ink-500">
            Nosso trabalho une estratégia, copywriting, design, SEO e desenvolvimento técnico em
            uma entrega sob medida.
          </p>
          <p className="mx-auto mt-3 max-w-prose text-pretty text-base font-semibold leading-relaxed text-ink-700">
            Sem template pronto. Sem estrutura genérica. Sem linguagem apelativa.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl bg-ink-100 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <article
              key={it.title}
              className="group relative overflow-hidden bg-cream-50 p-8 transition-all duration-500 hover:bg-white"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-3xl transition-all duration-700 group-hover:bg-accent/30" />

              <div className="relative">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-accent transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.7}
                    stroke="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={it.icon} />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink-900">{it.title}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-ink-500">{it.text}</p>

                {'href' in it && (
                  <Link
                    href={(it as typeof it & { href: string }).href}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-accent"
                  >
                    Saiba mais
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                )}

                <span className="mt-6 inline-block text-xs font-mono text-ink-500">
                  /{(i + 1).toString().padStart(2, '0')}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
