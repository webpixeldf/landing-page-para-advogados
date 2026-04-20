const items = [
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Experiência sólida',
    text: 'Mais de 20 anos desenvolvendo páginas profissionais de alta performance.'
  },
  {
    icon: 'M3 6l9-3 9 3-9 3-9-3zm9 6l9-3v6l-9 3-9-3v-6l9 3z',
    title: 'Conformidade OAB',
    text: 'Total adequação ao Código de Ética da advocacia (artigos 28 a 34).'
  },
  {
    icon: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
    title: 'Qualidade técnica',
    text: 'Código limpo, semântico e otimizado para ranqueamento orgânico.'
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Performance máxima',
    text: 'Páginas que carregam em segundos, com nota alta no PageSpeed Insights.'
  },
  {
    icon: 'M3 7h18M3 12h18M3 17h12',
    title: 'Design responsivo',
    text: 'Experiência impecável em desktop, tablet e mobile.'
  },
  {
    icon: 'M5 13l4 4L19 7',
    title: 'Resultados comprovados',
    text: 'Mais de 500 escritórios escalaram a captação com a nossa metodologia.'
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
            Por que escolher uma landing page para advogados feita
            <span className="italic font-light text-primary-light"> por especialistas</span>
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-pretty text-lg font-light leading-relaxed text-ink-500">
            Somos especialistas na criação de landing page para advogados de alta performance, e
            transformamos cada briefing em uma estrutura funcional, rápida e otimizada para
            conversão — sem templates genéricos.
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

                <span className="mt-6 inline-block text-xs font-mono text-ink-300">
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
