type Step = { n: string; title: string; text: string[]; keyword: string };

const steps: Step[] = [
  {
    n: '01',
    title: 'Pesquisa e diagnóstico',
    text: [
      'Analisamos o escritório, a área jurídica, os concorrentes, o público-alvo e os canais de aquisição.',
      'O objetivo é entender qual mensagem precisa aparecer na página para atrair contatos mais qualificados.'
    ],
    keyword: 'Pesquisa'
  },
  {
    n: '02',
    title: 'Estrutura de conversão',
    text: [
      'Montamos a arquitetura da página com hierarquia clara.',
      'Cada bloco tem uma função: gerar atenção, construir confiança, explicar o serviço, reduzir dúvidas e facilitar o contato.'
    ],
    keyword: 'Estrutura'
  },
  {
    n: '03',
    title: 'Copywriting jurídico',
    text: [
      'Criamos textos com linguagem profissional, direta e ética.',
      'Nada de promessas de resultado, gatilhos apelativos ou abordagem incompatível com a advocacia.'
    ],
    keyword: 'Copywriting'
  },
  {
    n: '04',
    title: 'Design e desenvolvimento',
    text: [
      'Desenvolvemos uma página visualmente forte, rápida e leve.',
      'O layout valoriza credibilidade, leitura fácil, prova social permitida e chamadas para ação bem posicionadas.'
    ],
    keyword: 'Build'
  },
  {
    n: '05',
    title: 'SEO técnico e mensuração',
    text: [
      'Aplicamos otimizações importantes para indexação e análise de desempenho: meta title e description, heading tags organizadas, schema markup, URLs amigáveis, sitemap, breadcrumbs, Search Console e ferramentas de análise.'
    ],
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
            Nossa metodologia para criar
            <span className="italic font-light text-accent"> páginas jurídicas de alta conversão</span>
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-pretty text-lg font-light leading-relaxed text-white/65">
            Cada projeto segue um processo validado em mais de 500 entregas.
          </p>
          <p className="mx-auto mt-3 max-w-prose text-pretty text-lg font-light leading-relaxed text-white/65">
            A página é construída com base no posicionamento do escritório, na área de atuação,
            no perfil do cliente ideal e nas regras de comunicação da advocacia.
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
                <div className={`mt-3 space-y-2 max-w-md font-light leading-relaxed text-white/65 ${
                  i % 2 === 0 ? 'md:ml-auto' : ''
                }`}>
                  {s.text.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
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
