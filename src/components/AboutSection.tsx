import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="sobre" className="bg-cream-50 py-24">
      <div className="container-pp grid items-center gap-14 lg:grid-cols-2">
        <div className="grid grid-cols-6 grid-rows-6 gap-3 max-w-md">
          <div className="col-span-3 row-span-4 overflow-hidden rounded-3xl shadow-soft">
            <Image src="/images/landing-page-para-escritorios-juridicos.webp" alt="Landing page para escritórios jurídicos" width={400} height={500} className="h-full w-full object-cover" />
          </div>
          <div className="col-span-3 row-span-3 overflow-hidden rounded-3xl shadow-soft">
            <Image src="/images/landing-pages-para-oab.webp" alt="Landing pages em conformidade com a OAB" width={400} height={300} className="h-full w-full object-cover" />
          </div>
          <div className="col-span-3 row-span-3 overflow-hidden rounded-3xl shadow-soft">
            <Image src="/images/landing-page-advogado-criminal.webp" alt="Landing page para advogado criminal" width={400} height={300} className="h-full w-full object-cover" />
          </div>
          <div className="col-span-3 row-span-2 overflow-hidden rounded-3xl shadow-soft">
            <Image src="/images/advogada-civel.webp" alt="Advogada cível" width={400} height={300} className="h-full w-full object-cover" />
          </div>
        </div>

        <div>
          <span className="eyebrow">Quem somos</span>
          <h2 className="display-md mt-5 text-balance">
            20 anos construindo presença digital
            <span className="italic font-light text-primary-light"> para o direito.</span>
          </h2>
          <div className="mt-6 space-y-5 text-base font-light leading-relaxed text-ink-500">
            <p>
              Nascemos da visão de unir experiência em tecnologia e SEO com profundo conhecimento
              do mercado jurídico. Compreendemos os desafios que advogados enfrentam no ambiente
              digital e traduzimos a complexidade do direito em comunicação clara, ética e profissional.
            </p>
            <p>
              Entregamos projetos digitais que fortalecem a marca da banca e geram resultados
              mensuráveis. Cada entrega respeita o Código de Ética da OAB e aplica boas práticas
              de performance, acessibilidade e otimização técnica.
            </p>
            <p>
              Priorizamos a captação qualificada — cada projeto é construído com base no
              posicionamento do escritório e no perfil do cliente que a banca quer atrair.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { n: '20+', l: 'anos de experiência' },
              { n: '500+', l: 'projetos entregues' },
              { n: '0', l: 'mensalidade obrigatória' }
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-ink-100 bg-white p-4">
                <div className="font-display text-2xl font-extrabold text-primary">{s.n}</div>
                <div className="mt-1 text-[11px] font-light leading-tight text-ink-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
