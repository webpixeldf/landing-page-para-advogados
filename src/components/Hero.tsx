import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-primary-dark pb-32 pt-36 text-white md:pb-40 md:pt-44"
    >
      {/* Mesh gradient (estático) */}
      <div className="absolute inset-0 -z-10 bg-mesh-emerald opacity-95" />
      <div className="absolute inset-0 -z-10 bg-noise opacity-[0.06] mix-blend-overlay" />

      {/* Decorative orbs (estáticos) */}
      <div className="absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-emerald-500/30 blur-3xl" />
      <div className="absolute -right-32 top-60 -z-10 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)'
        }}
      />

      <div className="container-pp relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="eyebrow-light">
              20 anos · 500+ projetos · 100% conforme OAB
            </span>

            <h1 className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tightest text-balance md:text-6xl lg:text-[3.5rem]">
              <span className="block">Landing Page</span>{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-accent via-cream-300 to-accent bg-clip-text text-transparent">
                  para Advogados
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9C75 3 150 3 298 7"
                    stroke="url(#g1)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="g1" x1="0" x2="300" y1="0" y2="0">
                      <stop offset="0" stopColor="#dabb7e" />
                      <stop offset="1" stopColor="#cd9e57" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>{' '}
              <br />
              que querem atrair{' '}
              <br />
              <span className="font-light italic text-white/85">clientes qualificados.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg font-light leading-relaxed text-white/75">
              Somos especialistas em{' '}
              <strong className="font-semibold text-white">landing page para advogados</strong> de
              alta conversão — unindo estratégia de posicionamento, design que transmite credibilidade,
              SEO técnico e comunicação alinhada ao Código de Ética da OAB, com estrutura enxuta,
              carregamento rápido e integração direta com WhatsApp.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={siteConfig.contact.whatsappBase} target="_blank" rel="noopener" className="btn-primary">
                Solicite um orçamento gratuito
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <Link href="#metodologia" className="btn-secondary">
                Conhecer a metodologia
              </Link>
            </div>

            {/* Mini-stats inline */}
            <dl className="mt-12 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
              {[
                { v: '500+', l: 'Projetos' },
                { v: '20+', l: 'Anos' },
                { v: '4.9★', l: '127 reviews' }
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {s.v}
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-white/55">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right column — floating mockup */}
          <div className="relative">
            <div className="relative mx-auto w-full max-w-md">
              {/* Browser frame */}
              <div className="surface-glass relative overflow-hidden p-4 shadow-card glow-ring">
                <div className="mb-3 flex items-center gap-1.5 px-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  <span className="ml-2 flex-1 truncate rounded-md bg-white/5 px-2 py-1 text-[10px] text-white/65">
                    landingpageparaadvogados.com
                  </span>
                </div>
                <Image
                  src="/images/landing-page-para-advogados.webp"
                  alt="Exemplo de Landing Page para Advogados com alta conversão"
                  width={720}
                  height={520}
                  priority
                  className="h-auto w-full rounded-2xl"
                />
              </div>

              {/* Conversion badge (estático) */}
              <div className="absolute -right-4 -bottom-6 hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-700 to-emerald-900 p-4 shadow-card backdrop-blur-xl md:block">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/20">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#dabb7e" strokeWidth="2.2" className="h-5 w-5">
                      <path d="M3 17l6-6 4 4 8-8M14 7h7v7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-display text-xs font-semibold text-white/65">Conversão</p>
                    <p className="font-display text-lg font-bold text-white">+250%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-20 border-t border-white/10 pt-8">
          <p className="text-center text-[11px] uppercase tracking-[0.2em] text-white/65">
            Bancas que confiaram na nossa metodologia
          </p>
          <div className="mt-6 grid grid-cols-2 items-center gap-y-6 text-center text-sm font-light text-white/55 sm:grid-cols-3 md:gap-x-12">
            <span className="font-display tracking-tight">Angelina Roberta</span>
            <span className="font-display tracking-tight">Bernardes Oshiro</span>
            <span className="font-display tracking-tight">Da Costa Adv.</span>
            <span className="font-display tracking-tight">Erycson Medeiros</span>
            <span className="font-display tracking-tight">Santos Miranda</span>
            <span className="font-display tracking-tight">Seguins Adv.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
