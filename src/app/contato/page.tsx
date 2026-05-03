import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contato — Fale Conosco',
  description:
    'Fale com nossa equipe especialista em páginas de conversão para escritórios de advocacia. WhatsApp, e-mail ou formulário — resposta em até 1 dia útil.',
  alternates: { canonical: '/contato/' },
  openGraph: {
    title: 'Contato — Fale Conosco',
    description:
      'Fale com nossa equipe especialista em páginas jurídicas de alta performance. Resposta rápida pelos canais oficiais.',
    url: '/contato/',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Landing Page para Advogados',
    images: [
      {
        url: '/images/landing-page-para-advogados.jpg',
        width: 1200,
        height: 630,
        alt: 'Fale conosco — Landing Page para Advogados',
        type: 'image/jpeg'
      }
    ]
  }
};

export default function ContatoPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: siteConfig.url + '/' },
      { '@type': 'ListItem', position: 2, name: 'Contato', item: siteConfig.url + '/contato/' }
    ]
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contato — Landing Page para Advogados',
    url: siteConfig.url + '/contato/',
    description:
      'Canais oficiais e formulário de contato para solicitar orçamento de landing page profissional jurídica.'
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-dark pb-28 pt-44 text-white">
        <div className="absolute inset-0 -z-10 bg-mesh-emerald opacity-70 animate-mesh-shift" />
        <div className="absolute inset-0 -z-10 bg-noise opacity-[0.05] mix-blend-overlay" />
        <div className="absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-emerald-500/30 blur-3xl" />
        <div className="absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

        <div className="container-pp">
          <span className="eyebrow-light">Contato</span>
          <h1 className="display-lg mt-6 max-w-4xl text-balance text-white">
            Fale com quem cria
            <span className="italic font-light text-accent"> páginas de conversão para advocacia </span>
            há mais de 20 anos.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/70">
            Respondemos em até 1 dia útil. Prefere conversar direto? Use o WhatsApp — ou preencha
            o formulário abaixo e abrimos a conversa com seus dados já inseridos.
          </p>
        </div>
      </section>

      {/* Form + canais */}
      <section className="bg-cream-50 py-24">
        <div className="container-pp grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Formulário */}
          <div className="rounded-3xl border border-ink-100 bg-white p-8 shadow-soft md:p-10">
            <span className="eyebrow">Formulário</span>
            <h2 className="display-sm mt-4 text-balance">
              Conte seu caso e abrimos o WhatsApp por você.
            </h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-ink-500">
              Ao clicar em enviar, o WhatsApp abrirá com sua mensagem já redigida — você só confirma.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Canais diretos */}
          <div className="space-y-5">
            <div className="relative overflow-hidden rounded-3xl bg-primary-dark p-8 text-white shadow-card">
              <div className="absolute inset-0 -z-10 bg-mesh-emerald opacity-60" />
              <div className="absolute -right-12 -top-12 -z-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-accent">
                Canal preferido
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">WhatsApp</h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-white/75">
                Atendimento direto com nossa equipe. Tire dúvidas, receba estudos de caso e solicite
                orçamento em minutos.
              </p>
              <a
                href={siteConfig.contact.whatsappBase}
                target="_blank"
                rel="noopener"
                className="btn-primary mt-6 w-full justify-center"
              >
                Abrir conversa no WhatsApp
              </a>
              <p className="mt-3 text-center text-xs font-light text-white/55">
                {siteConfig.contact.phoneDisplay}
              </p>
            </div>

            <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-soft">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-accent">
                Telefone
              </span>
              <p className="mt-2 font-display text-base font-semibold text-ink-900">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="border-b border-accent/40 transition-colors hover:text-accent"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </p>
              <p className="mt-2 text-sm font-light leading-relaxed text-ink-500">
                Segunda a sexta, 9h às 18h (horário de Brasília).
              </p>
            </div>

            <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-soft">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-accent">
                Endereço
              </span>
              <p className="mt-2 text-sm font-light leading-relaxed text-ink-700">
                {siteConfig.contact.address}
              </p>
            </div>

            <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-soft">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-accent">
                Dados da empresa
              </span>
              <p className="mt-2 text-sm font-light leading-relaxed text-ink-700">
                Landing Page Para Advogados
              </p>
              <p className="mt-1 text-sm font-light leading-relaxed text-ink-500">
                CNPJ: 34.644.883/0001-94
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-50 pb-12">
        <div className="container-pp max-w-3xl">
          <p className="text-center text-xs font-light text-ink-500">
            Todos os Direitos Reservados © {new Date().getFullYear()} Landing Page Para Advogados — CNPJ: 34.644.883/0001-94
          </p>
        </div>
      </section>
    </>
  );
}
