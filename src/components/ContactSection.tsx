import ContactForm from '@/components/ContactForm';
import { siteConfig } from '@/lib/site';

export default function ContactSection() {
  return (
    <section id="contato" className="bg-cream-50 py-24">
      <div className="container-pp">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow">Contato</span>
          <h2 className="display-md mt-5 text-balance">
            Fale com nossa equipe e receba
            <span className="italic font-light text-primary-light"> uma proposta em até 1 dia útil.</span>
          </h2>
          <p className="mt-4 text-base font-light leading-relaxed text-ink-500">
            Respondemos em até 1 dia útil. Prefere conversar direto? Use o WhatsApp ou preencha
            o formulário abaixo.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Formulário */}
          <div className="rounded-3xl border border-ink-100 bg-white p-8 shadow-soft md:p-10">
            <span className="eyebrow">Formulário</span>
            <h3 className="display-sm mt-4 text-balance">
              Conte seu caso e abrimos o WhatsApp por você.
            </h3>
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
      </div>
    </section>
  );
}
