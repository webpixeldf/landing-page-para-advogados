'use client';

import { useState } from 'react';

export type FaqItem = { q: string; a: string | string[] };

export default function FAQ({
  items,
  title = 'Perguntas frequentes'
}: {
  items: FaqItem[];
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream-50 py-28">
      <div className="container-pp">
        <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr]">
          <div className="md:sticky md:top-28 md:self-start">
            <span className="eyebrow">FAQ</span>
            <h2 className="display-md mt-5 text-balance">{title}</h2>
            <p className="mt-5 max-w-md text-base font-light leading-relaxed text-ink-500">
              Respostas para as dúvidas mais comuns de quem está pensando em modernizar a presença
              digital do escritório.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-3 pr-5 shadow-soft">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <path d="M12 8v4M12 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="text-sm">
                <strong className="block text-ink-900">Não encontrou sua dúvida?</strong>
                <span className="text-ink-500">Fale com a gente no WhatsApp.</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <details
                  key={item.q}
                  open={isOpen}
                  onToggle={(e) => {
                    if ((e.target as HTMLDetailsElement).open) setOpen(i);
                    else if (isOpen) setOpen(null);
                  }}
                  className={`group overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? 'border-primary/20 shadow-card'
                      : 'border-ink-100 hover:border-ink-200'
                  }`}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-6 text-base font-medium tracking-tight text-ink-900">
                    <span className="flex items-start gap-4">
                      <span className="mt-0.5 font-mono text-xs text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{item.q}</span>
                    </span>
                    <span
                      className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen ? 'rotate-45 bg-primary text-white' : 'bg-ink-50 text-ink-700'
                      }`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pl-[3.4rem] text-[0.98rem] font-light leading-relaxed text-ink-500">
                    {Array.isArray(item.a)
                      ? item.a.map((p, k) => (
                          <p key={k} className="mt-2 first:mt-0">
                            {p}
                          </p>
                        ))
                      : <p>{item.a}</p>}
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
