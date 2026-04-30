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
                É uma página única criada para conduzir o visitante a uma ação específica.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Pode ser iniciar uma conversa pelo WhatsApp, preencher um formulário, agendar um
                contato ou acessar um material informativo.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Diferente de um site institucional, que apresenta várias páginas e informações
                gerais, a landing page jurídica concentra a mensagem em um objetivo.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Ela fala com um público específico, aborda uma dor clara e apresenta o escritório
                de forma objetiva, ética e profissional.
              </p>
            </article>

            <article>
              <h3 className="font-display text-xl font-bold tracking-tight text-ink-900 md:text-2xl">
                Por que escritórios de advocacia estão usando esse formato?
              </h3>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                A decisão de contratar um advogado começa pela confiança.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Quando uma pessoa chega até a sua página após uma busca no Google ou um anúncio,
                ela precisa entender rapidamente:
              </p>
              <ul className="mt-4 space-y-2 text-base font-light leading-relaxed text-ink-500">
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  Se o escritório atua naquele tipo de caso;
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  Como pode receber orientação;
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  Quais canais de contato estão disponíveis;
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  Se a comunicação transmite seriedade;
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  Se a página parece confiável no celular.
                </li>
              </ul>
              <p className="mt-4 text-base font-light leading-relaxed text-ink-500">
                Uma landing page bem construída reduz ruído.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Ela organiza a informação, melhora a experiência do visitante e aumenta a chance
                de contato qualificado.
              </p>
            </article>

            <article>
              <h3 className="font-display text-xl font-bold tracking-tight text-ink-900 md:text-2xl">
                O que diferencia uma boa landing page jurídica de uma página comum?
              </h3>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Uma página genérica apenas apresenta o serviço.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Uma landing page jurídica bem planejada trabalha com estratégia, clareza e
                cuidado ético.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Entre os principais pontos, destacamos:
              </p>
              <ul className="mt-4 space-y-3 text-base font-light leading-relaxed text-ink-500">
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <strong className="font-semibold text-ink-900">Headline direcionada:</strong>{' '}
                  conversa com a situação do cliente ideal.
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <strong className="font-semibold text-ink-900">Mensagem objetiva:</strong>{' '}
                  explica a atuação sem juridiquês excessivo.
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <strong className="font-semibold text-ink-900">Prova social com cautela:</strong>{' '}
                  reforça confiança sem promessa de ganho.
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <strong className="font-semibold text-ink-900">CTA único:</strong>{' '}
                  conduz o visitante para uma ação principal.
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <strong className="font-semibold text-ink-900">Linguagem sóbria:</strong>{' '}
                  evita sensacionalismo e abordagem comercial agressiva.
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <strong className="font-semibold text-ink-900">SEO técnico:</strong>{' '}
                  ajuda a página a ser encontrada e compreendida pelo Google.
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <strong className="font-semibold text-ink-900">Carregamento rápido:</strong>{' '}
                  melhora a experiência e reduz abandono.
                </li>
              </ul>
            </article>

            <article>
              <h3 className="font-display text-xl font-bold tracking-tight text-ink-900 md:text-2xl">
                Meu escritório precisa de uma landing page?
              </h3>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Uma landing page para advogados faz sentido quando o escritório quer melhorar a
                captação digital com mais controle.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Ela costuma ser indicada para bancas que:
              </p>
              <ul className="mt-4 space-y-2 text-base font-light leading-relaxed text-ink-500">
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  Dependem quase só de indicação;
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  Investem em tráfego pago e recebem contatos ruins;
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  Têm site bonito, mas sem conversão;
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  Perderam visibilidade no Google;
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  Atuam em áreas concorridas;
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  Querem páginas específicas por área de atuação.
                </li>
              </ul>
              <p className="mt-4 text-base font-light leading-relaxed text-ink-500">
                Áreas como previdenciário, trabalhista, família, tributário, imobiliário,
                empresarial e criminal podem se beneficiar bastante de páginas direcionadas.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Cada área permite uma comunicação mais precisa, voltada ao tipo de cliente que o
                escritório deseja atrair.
              </p>
            </article>

            <article>
              <h3 className="font-display text-xl font-bold tracking-tight text-ink-900 md:text-2xl">
                Quanto custa uma landing page para advogados?
              </h3>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                O investimento começa em <strong className="font-semibold text-ink-900">R$ 699,00, em pagamento único</strong> (ou{' '}
                <strong className="font-semibold text-ink-900">3x de R$ 233 sem juros</strong>).
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Sem mensalidade obrigatória.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                O valor inclui estrutura, design, copywriting, desenvolvimento e otimizações
                técnicas essenciais.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                Para muitos escritórios, a página se paga quando gera o primeiro contrato
                qualificado.
              </p>
              <p className="mt-3 text-base font-light leading-relaxed text-ink-500">
                O prazo de retorno depende da área de atuação, do tráfego, da oferta, da região
                e da maturidade comercial da banca.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
