export default function Guide() {
  return (
    <section id="guia" className="relative bg-cream-50 py-28">
      <div className="container-pp">
        <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow">Guia rápido</span>
            <h2 className="display-md mt-5 text-balance">
              O que é, para que serve e
              <span className="italic font-light text-primary-light"> como funciona </span>
              uma landing page para advogados.
            </h2>
            <p className="mt-6 text-base font-light leading-relaxed text-ink-500">
              Antes de investir, vale entender o que diferencia uma landing page jurídica de
              um site institucional comum — e por que advogados que dominam o digital têm
              estruturas pensadas exclusivamente para conversão.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
              {[
                { v: '7', l: 'dias para entrega' },
                { v: '12+', l: 'seções otimizadas' },
                { v: '0', l: 'mensalidade' }
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-ink-100 bg-white p-4">
                  <div className="font-display text-2xl font-extrabold text-primary">{s.v}</div>
                  <div className="mt-1 text-[11px] font-light leading-tight text-ink-500">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <article>
              <h3 className="font-display text-xl font-bold tracking-tight text-ink-900 md:text-2xl">
                O que é uma landing page para advogados?
              </h3>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                É uma página web única, projetada com um objetivo específico: transformar
                visitantes em potenciais clientes do escritório de advocacia.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Diferente de um site institucional — que apresenta diversas áreas, equipe, missão
                e contatos — a landing page jurídica concentra toda a comunicação em uma única
                ação.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Pode ser agendar uma consulta, baixar um material informativo ou iniciar uma
                conversa pelo WhatsApp.
              </p>
            </article>

            <article>
              <h3 className="font-display text-xl font-bold tracking-tight text-ink-900 md:text-2xl">
                Por que escritórios brasileiros estão migrando para esse formato?
              </h3>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                A advocacia é um mercado de confiança, e a primeira impressão online é decisiva.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Uma página de captura jurídica bem desenhada combina prova social (depoimentos
                verificáveis, OAB visível, número de casos) e conteúdo informativo em
                conformidade com o Provimento 205/2021.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Soma-se a isso uma arquitetura técnica que favorece tanto Google Ads quanto SEO
                orgânico. O resultado é uma fonte previsível de novos clientes qualificados.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Algo que indicações sozinhas dificilmente entregam.
              </p>
            </article>

            <article>
              <h3 className="font-display text-xl font-bold tracking-tight text-ink-900 md:text-2xl">
                O que diferencia uma boa página jurídica de uma genérica?
              </h3>
              <ul className="mt-4 space-y-3 text-base font-light leading-relaxed text-ink-500">
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <strong className="font-semibold text-ink-900">Headline orientada à dor:</strong>{' '}
                  fala diretamente com a situação do cliente ideal (ex.: &ldquo;INSS negou seu
                  benefício?&rdquo; em vez de &ldquo;Somos especialistas em previdenciário&rdquo;).
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <strong className="font-semibold text-ink-900">Estrutura de prova social:</strong>{' '}
                  depoimentos com nome, cidade, foto, sem prometer resultado.
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <strong className="font-semibold text-ink-900">CTA claro e único:</strong>{' '}
                  toda página termina em uma ação só, repetida em pontos estratégicos.
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <strong className="font-semibold text-ink-900">Conformidade ética:</strong>{' '}
                  exibição correta da OAB, linguagem sóbria, foco informativo.
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <strong className="font-semibold text-ink-900">Performance técnica:</strong>{' '}
                  carregamento abaixo de 2,5s, responsividade impecável e schema markup.
                </li>
              </ul>
            </article>

            <article>
              <h3 className="font-display text-xl font-bold tracking-tight text-ink-900 md:text-2xl">
                Como saber se a minha banca precisa de uma landing page para advogados?
              </h3>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Se o seu escritório depende exclusivamente de indicações, perdeu posições no
                Google ou investe em tráfego pago sem retorno, provavelmente falta uma página
                otimizada para receber esse tráfego.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Bancas que atuam em áreas de alta concorrência — trabalhista, previdenciário,
                família, tributário e criminal — colhem o maior retorno desse formato.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Isso porque podem criar uma página dedicada por área de atuação, falando
                diretamente com a dor de cada público.
              </p>
            </article>

            <article>
              <h3 className="font-display text-xl font-bold tracking-tight text-ink-900 md:text-2xl">
                Quanto custa e em quanto tempo o investimento se paga?
              </h3>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                O investimento inicial é a partir de R$ 499,90 em pagamento único, sem
                mensalidade.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Considerando o ticket médio de uma causa trabalhista, previdenciária ou familiar,
                basta um único cliente captado pela página para o projeto se pagar.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Isso geralmente acontece nas primeiras semanas de tráfego. A partir daí, cada
                novo lead é margem para a banca.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
