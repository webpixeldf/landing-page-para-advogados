import { siteConfig } from '@/lib/site';

export default function CtaBanner({
  title = 'Vamos transformar cliques em clientes qualificados?',
  subtitle = 'Uma página de captura de alta performance é o atalho para o cliente certo. Solicite um diagnóstico gratuito do seu projeto.',
  cta = 'Solicitar orçamento'
}: {
  title?: string;
  subtitle?: string;
  cta?: string;
}) {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="container-pp">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-primary-dark px-8 py-16 text-white md:px-16 md:py-24">
          <div className="absolute inset-0 -z-10 bg-mesh-emerald opacity-80 animate-mesh-shift" />
          <div className="absolute inset-0 -z-10 bg-noise opacity-[0.06] mix-blend-overlay" />
          <div
            className="absolute inset-0 -z-10 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)'
            }}
          />

          <div className="absolute -right-20 -top-20 -z-10 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />

          <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="eyebrow-light">Próximo passo</span>
              <h2 className="display-md mt-5 text-balance text-white">{title}</h2>
              <p className="mt-5 max-w-2xl text-pretty text-lg font-light leading-relaxed text-white/75">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-4 md:items-end">
              <a href={siteConfig.contact.whatsappBase} target="_blank" rel="noopener" className="btn-primary justify-center md:w-auto">
                {cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href={`tel:${siteConfig.contact.phone}`} className="text-center text-sm font-light text-white/65 transition-colors hover:text-accent md:text-right">
                ou ligue: <span className="font-medium text-white">{siteConfig.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
