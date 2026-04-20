'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/site';

const NAV = [
  { href: '/', label: 'Início' },
  { href: '/quem-somos/', label: 'Quem somos' },
  { href: '/portfolio/', label: 'Portfólio' },
  { href: '/blog/', label: 'Blog' }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-primary-dark/85 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="container-pp flex items-center justify-between py-4">
        <Link href="/" className="group flex items-center" aria-label="Landing Page para Advogados — Página inicial">
          <img
            src="/images/landing-page-para-advogados-logo.webp"
            alt="Landing Page para Advogados"
            className="h-10 w-auto transition-transform group-hover:scale-105 md:h-11"
            width="200"
            height="44"
          />
        </Link>

        <nav className="hidden md:block" aria-label="Menu principal">
          <ul className="flex items-center gap-8 text-sm font-medium tracking-tight text-white/80">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative inline-flex py-1 transition-colors hover:text-white"
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <a href={siteConfig.contact.whatsappBase} target="_blank" rel="noopener" className="btn-primary">
            Solicitar orçamento
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <button
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md md:hidden"
        >
          <span className={`block h-0.5 w-5 bg-white transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-white transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-primary-dark/95 backdrop-blur-xl md:hidden" aria-label="Menu mobile">
          <ul className="container-pp flex flex-col gap-1 py-5 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-white/85 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.contact.whatsappBase}
                target="_blank"
                rel="noopener"
                className="btn-primary mt-2 w-full"
              >
                Solicitar orçamento
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
