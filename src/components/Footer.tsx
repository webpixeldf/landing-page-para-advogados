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
          <span className="eyebrow-light">Landing Page para Advogados</span>
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
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-pp py-6 text-center text-xs text-white/45">
          <p>
            Todos os Direitos Reservados © {year} Landing Page Para Advogados — CNPJ: 34.644.883/0001-94
          </p>
        </div>
      </div>
    </footer>
  );
}
