'use client';

import { useState, FormEvent } from 'react';
import { siteConfig } from '@/lib/site';

const WHATSAPP_NUMBER = siteConfig.contact.phone.replace(/\D/g, '');

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Informe seu nome completo.';
    if (!email.trim()) e.email = 'Informe seu e-mail.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'E-mail inválido.';
    if (!phone.trim()) e.phone = 'Informe seu WhatsApp.';
    if (!message.trim()) e.message = 'Escreva uma mensagem antes de enviar.';
    return e;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});

    const lines = [
      `Olá! Vim do site landingpageparaadvogados.com e gostaria de um orçamento.`,
      ``,
      `*Nome:* ${name}`,
      `*E-mail:* ${email}`,
      `*WhatsApp:* ${phone}`,
      ``,
      `*Mensagem:*`,
      message
    ];

    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener');
  }

  const inputClass = (field: string) =>
    `w-full rounded-2xl border px-4 py-3 text-sm font-light text-ink-700 placeholder:text-ink-400 transition-colors focus:outline-none focus:ring-2 bg-white ${
      errors[field]
        ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
        : 'border-ink-100 focus:border-primary focus:ring-primary/15'
    }`;
  const labelClass = 'mb-2 block text-xs font-semibold uppercase tracking-widest text-ink-500';
  const errorClass = 'mt-1.5 text-xs text-red-500';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="cf-name" className={labelClass}>Nome</label>
        <input
          id="cf-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })); }}
          placeholder="Seu nome completo"
          className={inputClass('name')}
        />
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className={labelClass}>E-mail</label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
            placeholder="seu@email.com"
            className={inputClass('email')}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelClass}>WhatsApp</label>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => { setPhone(maskPhone(e.target.value)); setErrors((p) => ({ ...p, phone: '' })); }}
            placeholder="(00) 00000-0000"
            className={inputClass('phone')}
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>Mensagem</label>
        <textarea
          id="cf-message"
          rows={4}
          value={message}
          onChange={(e) => { setMessage(e.target.value); setErrors((p) => ({ ...p, message: '' })); }}
          placeholder="Conte um pouco sobre seu escritório ou o projeto que tem em mente."
          className={`${inputClass('message')} resize-none`}
        />
        {errors.message && <p className={errorClass}>{errors.message}</p>}
      </div>

      <button type="submit" className="btn-primary w-full justify-center">
        Enviar pelo WhatsApp
        <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 01-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 01-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.788 2.722.788.817 0 2.15-.515 2.486-1.318.187-.444.243-.917.143-1.318-.143-.114-.27-.143-.487-.243z" />
          <path d="M16.084 0C7.305 0 .15 7.144.15 15.91c0 2.81.74 5.557 2.137 7.987L0 32l8.402-2.21c2.336 1.27 4.973 1.94 7.668 1.94 8.78 0 15.93-7.144 15.93-15.91 0-4.247-1.65-8.236-4.65-11.234C24.337 1.654 20.345.005 16.084 0zm0 29.082c-2.408 0-4.766-.643-6.83-1.872l-.487-.286-5.077 1.33 1.36-4.96-.314-.516a13.06 13.06 0 01-2.014-6.97c0-7.243 5.91-13.142 13.16-13.142 3.524 0 6.812 1.376 9.292 3.847a13.05 13.05 0 013.847 9.296c0 7.244-5.92 13.273-13.165 13.273z" />
        </svg>
      </button>
      <p className="text-center text-xs font-light text-ink-400">
        Ao enviar, o WhatsApp abrirá com a mensagem já preenchida , basta confirmar.
      </p>
    </form>
  );
}
