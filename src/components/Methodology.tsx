const steps = [
  {
    n: '01',
    title: 'Diagnóstico estratégico',
    text:
      'Mergulhamos no seu negócio, mapeamos concorrentes e desenhamos o perfil do cliente ideal.',
    keyword: 'Pesquisa'
  },
  {
    n: '02',
    title: 'Arquitetura de conversão',
    text:
      'Estruturamos a página com base em psicologia do consumidor, definindo hierarquia e prova social.',
    keyword: 'Estrutura'
  },
  {
    n: '03',
    title: 'Conteúdo profissional e ético',
    text:
      'Criamos textos claros, em conformidade com o Código de Ética da OAB, com linguagem sóbria.',
    keyword: 'Copywriting'
  },
  {
    n: '04',
    title: 'Design e desenvolvimento',
    text:
      'Aplicamos design profissional sob código semântico, leve e otimizado para Core Web Vitals.',
    keyword: 'Build'
  },
  {
    n: '05',
    title: 'SEO e analytics',
    text:
      'Implementamos schema markup, sitemap, breadcrumbs e configuramos o Search Console.',
    keyword: 'Otimização'
  }
];

export default function Methodology() {
  return (
    <section id="metodologia" className="relative bg-primary-dark py-28 text-white">
      <div className="absolute inset-0 -z-10 bg-mesh-emerald opacity-60" />
      <div className="absolute inset-0 -z-10 bg-noise opacity-[0.05] mix-blend-overlay" />

      <div className="container-pp">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="eyebrow-light">Metodologia exclusiva</span>
          <h2 className="display-md mt-5 text-balance text-white">
            Cinco etapas para criar a sua
            <span className="italic font-light text-accent"> landing page para advogados</span>
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-pretty text-lg font-light leading-relaxed text-white/65">
            Não trabalhamos com templates. Cada projeto passa por um processo desenhado em 20 anos
            e refinado em mais de 500 entregas — pensado para escritórios de advocacia que querem
            previsibilidade na captação.
          </p>
        </div>

        <ol className="relative mx-auto max-w-4xl">
          {/* vertical line */}
          <div className="absolute left-[27px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent via-accent/30 to-transparent md:left-1/2 md:-translate-x-1/2" />

          {steps.map((s, i) => (
            <li
              key={s.n}
              className={`relative grid gap-6 pb-14 md:grid-cols-2 md:gap-12 ${
                i % 2 === 0 ? 'md:[&>div:first-child]:text-right' : 'md:[&>div:first-child]:order-2'
              }`}
            >
              <div className={`pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <span className="font-mono text-xs uppercase tracking-widest text-accent">
                  {s.keyword}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white md:text-[1.6rem]">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-md font-light leading-relaxed text-white/65 md:ml-auto">
                  {s.text}
                </p>
              </div>

              {/* number badge */}
              <div className="absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-primary-dark font-display text-lg font-extrabold text-accent shadow-card md:left-1/2 md:-translate-x-1/2">
                {s.n}
                <span className="absolute inset-0 -z-10 rounded-2xl bg-accent/20 blur-xl" />
              </div>

              {/* spacer column */}
              <div className="hidden md:block" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
