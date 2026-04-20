import Image from 'next/image';

const items = [
  {
    href: 'https://angelinaroberta.adv.br/',
    img: '/images/angelina-roberta-advocacia.webp',
    alt: 'Landing page Angelina Roberta Advocacia',
    title: 'Angelina Roberta Advocacia',
    area: 'Advocacia'
  },
  {
    href: 'https://bernardesoshiro.com.br/',
    img: '/images/bernardes-oshiro.webp',
    alt: 'Site Bernardes Oshiro Advogados & Associados',
    title: 'Bernardes Oshiro Advogados',
    area: 'Direito Tributário'
  },
  {
    href: 'https://dc.adv.br/',
    img: '/images/da-costa.webp',
    alt: 'Site Da Costa Advocacia',
    title: 'Da Costa Advocacia',
    area: 'Advocacia'
  },
  {
    href: 'https://erycsonmedeirosadvocacia.com/',
    img: '/images/erycson-medeiros-advocacia.webp',
    alt: 'Site Erycson Medeiros Advocacia',
    title: 'Erycson Medeiros Advocacia',
    area: 'Advocacia'
  },
  {
    href: 'https://www.santosmiranda.adv.br/',
    img: '/images/santos-miranda-advocacia-imobiliaria.webp',
    alt: 'Site Santos Miranda Advocacia Imobiliária',
    title: 'Santos Miranda Advocacia',
    area: 'Direito Imobiliário'
  },
  {
    href: 'https://seguinsadvocacia.adv.br/',
    img: '/images/seguins-advocacia.webp',
    alt: 'Site Seguins Advocacia',
    title: 'Seguins Advocacia',
    area: 'Advocacia'
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative bg-cream-50 py-28">
      <div className="container-pp">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Portfólio selecionado</span>
            <h2 className="display-md mt-5 text-balance">
              Landing pages que viraram
              <span className="italic font-light text-primary-light"> casos reais de sucesso</span>
            </h2>
          </div>
          <p className="max-w-md text-base font-light leading-relaxed text-ink-500">
            Cada cliente recebe um projeto sob medida — design exclusivo, copywriting jurídico
            ético e arquitetura técnica preparada para Google e WhatsApp.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[320px]">
          {items.map((it) => (
            <a
              key={it.title}
              href={it.href}
              target="_blank"
              rel="noopener nofollow"
              className="group relative isolate block overflow-hidden rounded-3xl border border-ink-100 bg-ink-900"
            >
              <Image
                src={it.img}
                alt={it.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/40 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-7">
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur-md">
                    {it.area}
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    Visitar site ↗
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-white md:text-[1.5rem]">
                    {it.title}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
