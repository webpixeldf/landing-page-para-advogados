'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'lpa-cookie-consent';

type Consent = 'accepted' | 'essential' | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Consent;
      setConsent(stored);
    } catch {
      setConsent(null);
    }
  }, []);

  function persist(value: Exclude<Consent, null>) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      localStorage.setItem(STORAGE_KEY + '-at', new Date().toISOString());
    } catch {}
    setConsent(value);
  }

  if (!mounted || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-3xl rounded-2xl border border-white/10 bg-primary-dark/95 p-5 text-white shadow-card backdrop-blur-xl md:inset-x-auto md:left-4 md:right-auto md:p-6"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/20 text-accent">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M21.54 11.5A10 10 0 1112.5 2.46" strokeLinecap="round" />
            <circle cx="8.5" cy="10" r="1" fill="currentColor" />
            <circle cx="16" cy="14.5" r="1" fill="currentColor" />
            <circle cx="12" cy="17" r="1" fill="currentColor" />
            <circle cx="17" cy="8" r="1" fill="currentColor" />
            <circle cx="6" cy="15" r="1" fill="currentColor" />
          </svg>
        </span>
        <div className="flex-1">
          <h2 id="cookie-title" className="font-display text-sm font-semibold">
            Cookies e privacidade
          </h2>
          <p id="cookie-desc" className="mt-1 text-xs font-light leading-relaxed text-white/75">
            Usamos cookies essenciais para o funcionamento do site e, com seu consentimento, cookies
            de análise para entender como você navega e melhorar a experiência. Leia nossa{' '}
            <Link href="/politica-privacidade/" className="underline decoration-accent/50 hover:text-accent">
              Política de Privacidade
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => persist('accepted')}
              className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-primary-dark transition-colors hover:bg-gold-400"
            >
              Aceitar todos
            </button>
            <button
              type="button"
              onClick={() => persist('essential')}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10"
            >
              Apenas essenciais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
