import Link from 'next/link';
import { siteConfig } from '@/lib/site';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary-dark text-white">
      <div className="absolute inset-0 -z-10 bg-mesh-emerald opacity-40" />
      <div className="absolute inset-0 -z-10 bg-noise opacity-[0.05] mix-blend-overlay" />

      <div className="container-pp py-20">
        {/* Top: big quote */}
        <div className="mb-16 max-w-4xl">
          <span className="eyebrow-light">Landing Page para escritório de advocacia</span>
          <p className="mt-6 font-display text-3xl font-light leading-tight tracking-tighter text-white/90 md:text-[2.4rem]">
            Criamos páginas jurídicas que combinam
            <span className="font-extrabold text-accent"> design</span>,{' '}
            <span className="font-extrabold text-accent">performance</span> e{' '}
            <span className="font-extrabold text-accent">ética</span> — para bancas que querem
            crescer com previsibilidade.
          </p>
        </div>

        <div className="grid gap-12 border-t border-white/10 pt-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center" aria-label="Landing Page para Advogados — Página inicial">
              <img
                src="/images/landing-page-para-advogados-logo.webp"
                alt="Landing Page para Advogados"
                className="h-12 w-auto"
                width="220"
                height="48"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-white/65">
              Especialistas na criação de páginas de captura de alta conversão para advogados e
              escritórios jurídicos. Mais de 500 projetos entregues em todo o Brasil.
            </p>
          </div>

          <div>
            <span className="mb-4 block text-xs font-semibold uppercase tracking-widest text-accent">
              Navegação
            </span>
            <ul className="space-y-3 text-sm font-light text-white/75">
              <li><Link href="/" className="transition-colors hover:text-accent">Início</Link></li>
              <li><Link href="/quem-somos/" className="transition-colors hover:text-accent">Quem somos</Link></li>
              <li><Link href="/portfolio/" className="transition-colors hover:text-accent">Portfólio</Link></li>
              <li><Link href="/blog/" className="transition-colors hover:text-accent">Blog</Link></li>
              <li><Link href="/contato/" className="transition-colors hover:text-accent">Contato</Link></li>
              <li><Link href="/politica-privacidade/" className="transition-colors hover:text-accent">Política de privacidade</Link></li>
              <li><Link href="/termos-de-uso/" className="transition-colors hover:text-accent">Termos de uso</Link></li>
            </ul>
          </div>

          <div>
            <span className="mb-4 block text-xs font-semibold uppercase tracking-widest text-accent">
              Contato
            </span>
            <ul className="space-y-3 text-sm font-light text-white/75">
              <li>
                <a href={`tel:${siteConfig.contact.phone}`} className="transition-colors hover:text-accent">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-accent">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="text-white/55">{siteConfig.contact.address}</li>
            </ul>

            <div className="mt-6">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-accent">
                Siga-nos
              </span>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="LinkedIn de Landing Page Para Advogados — abre em nova aba"
                title="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:text-accent"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-pp py-6 text-center text-xs text-white/65">
          <p>
            Todos os Direitos Reservados © {year} Landing Page Para Advogados — CNPJ: 34.644.883/0001-94
          </p>
        </div>
      </div>
    </footer>
  );
}
