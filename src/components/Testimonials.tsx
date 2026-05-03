const testimonials = [
  {
    text:
      'A minha página de captação superou todas as expectativas. O número de contatos qualificados aumentou de forma significativa.',
    author: 'Dra. Amanda Castro',
    role: 'Advogada Trabalhista',
    city: 'São Paulo, SP'
  },
  {
    text:
      'Profissionalismo do início ao fim. Entenderam minhas necessidades e entregaram uma página que transmite confiança.',
    author: 'Dr. Ricardo Oliveira',
    role: 'Advogado Criminalista',
    city: 'Belo Horizonte, MG'
  },
  {
    text:
      'Desde que lançamos o novo site, nossa agenda está sempre cheia. Investimento se pagou rápido. Recomendo demais.',
    author: 'Torres & Advogados Associados',
    role: 'Direito Empresarial',
    city: 'Curitiba, PR'
  },
  {
    text:
      'Finalmente uma equipe que entende as exigências da OAB. Conformidade impecável e resultado acima do esperado.',
    author: 'Dr. Carlos Mendonça',
    role: 'Advogado Previdenciário',
    city: 'Porto Alegre, RS'
  },
  {
    text:
      'Excelente custo-benefício. A página ficou rápida, bonita e já está trazendo novos clientes.',
    author: 'Dra. Juliana Souza',
    role: 'Advogada de Família',
    city: 'Brasília, DF'
  },
  {
    text:
      'Investimento que vale a pena. Minha presença digital melhorou em 100%, agora competimos com escritórios maiores.',
    author: 'Dr. Fernando Lopes',
    role: 'Advogado Cível',
    city: 'Rio de Janeiro, RJ'
  }
];

function initials(name: string) {
  return name
    .replace(/^(Dr\.?|Dra\.?)\s/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();
}

export default function Testimonials() {
  return (
    <section id="depoimentos" className="relative bg-cream-50 py-28">
      <div className="container-pp">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="eyebrow">Depoimentos</span>
          <h2 className="display-md mt-5 text-balance">
            Bancas que escalaram a captação com a
            <span className="italic font-light text-primary-light"> nossa metodologia</span>
          </h2>
        </div>

        <div className="columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {testimonials.map((t, i) => (
            <figure
              key={t.author}
              className={`group rounded-3xl border border-ink-100 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-card ${
                i % 4 === 0 ? 'lg:py-10' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} viewBox="0 0 24 24" fill="#cd9e57" className="h-3.5 w-3.5">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="#cd9e57" strokeWidth="1.5" className="h-7 w-7 opacity-30">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>

              <blockquote className="mt-5 text-[1.02rem] font-light leading-relaxed text-ink-700">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-100 pt-5">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-light font-display text-sm font-bold text-white">
                  {initials(t.author)}
                </div>
                <div>
                  <strong className="block text-sm font-semibold text-ink-900">{t.author}</strong>
                  <span className="text-xs text-ink-400">
                    {t.role} · {t.city}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
