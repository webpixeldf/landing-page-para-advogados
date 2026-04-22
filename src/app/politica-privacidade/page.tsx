import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Como coletamos, tratamos e protegemos dados pessoais nos formulários, cookies e contatos deste site, em conformidade com a LGPD.',
  alternates: { canonical: '/politica-privacidade/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Política de Privacidade',
    description:
      'Como coletamos, tratamos e protegemos dados pessoais nos formulários, cookies e contatos deste site, em conformidade com a LGPD.',
    url: '/politica-privacidade/',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Landing Page para Advogados',
    images: [
      {
        url: '/images/politica-de-privacidade.jpg',
        width: 1200,
        height: 630,
        alt: 'Política de Privacidade — Landing Page para Advogados',
        type: 'image/jpeg'
      }
    ]
  }
};

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary-dark pb-24 pt-44 text-white">
        <div className="absolute inset-0 -z-10 bg-mesh-emerald opacity-70 animate-mesh-shift" />
        <div className="absolute inset-0 -z-10 bg-noise opacity-[0.05] mix-blend-overlay" />
        <div className="absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-emerald-500/30 blur-3xl" />
        <div className="absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

        <div className="container-pp">
          <span className="eyebrow-light">Documentos legais</span>
          <h1 className="display-lg mt-6 max-w-4xl text-balance text-white">
            Política de
            <span className="italic font-light text-accent"> Privacidade</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/70">
            Como coletamos, tratamos e protegemos seus dados nos formulários, cookies e contatos
            deste site — em conformidade com a LGPD.
          </p>
          <p className="mt-6 text-xs font-light uppercase tracking-widest text-white/55">
            Última atualização: 20 de abril de 2026
          </p>
        </div>
      </section>

      <article className="bg-cream-50 pb-20 pt-16">
        <div className="container-pp max-w-3xl">
          <div className="prose-editorial">
          <p>
            Esta Política descreve como o site Landing Page para Advogados (&ldquo;nós&rdquo;)
            coleta, utiliza, armazena e protege os dados pessoais dos visitantes
            e clientes deste site, em conformidade com a Lei Geral de Proteção de Dados Pessoais
            (Lei nº 13.709/2018 — LGPD).
          </p>

          <h2>1. Dados que coletamos</h2>
          <ul>
            <li>Nome, e-mail, telefone e mensagem voluntariamente informados em formulários.</li>
            <li>Dados de navegação (IP, navegador, páginas visitadas) por meio de cookies.</li>
            <li>Histórico de comunicação via WhatsApp e e-mail.</li>
          </ul>

          <h2>2. Finalidades</h2>
          <ul>
            <li>Responder solicitações e elaborar propostas comerciais.</li>
            <li>Prestar suporte técnico durante e após a entrega do projeto.</li>
            <li>Melhorar a experiência de navegação e a performance do site.</li>
            <li>Cumprir obrigações legais e regulatórias.</li>
          </ul>

          <h2>3. Bases legais</h2>
          <p>
            Tratamos dados com fundamento em <strong>consentimento</strong>, <strong>execução de
            contrato</strong>, <strong>legítimo interesse</strong> e <strong>cumprimento de
            obrigação legal</strong>, conforme o art. 7º da LGPD.
          </p>

          <h2>4. Compartilhamento</h2>
          <p>
            Não vendemos dados. Eventualmente compartilhamos com fornecedores de hospedagem,
            analytics e ferramentas de e-mail marketing — sempre vinculados a contrato e à LGPD.
          </p>

          <h2>5. Cookies</h2>
          <p>
            Utilizamos cookies essenciais e de medição. Você pode ajustar as preferências do seu
            navegador a qualquer momento.
          </p>

          <h2>6. Direitos do titular</h2>
          <p>
            Você pode, a qualquer momento, solicitar acesso, correção, anonimização, portabilidade
            ou eliminação dos seus dados. Para exercer esses direitos, escreva para{' '}
            <a href="mailto:contato@landingpageparaadvogados.com">contato@landingpageparaadvogados.com</a>.
          </p>

          <h2>7. Encarregado (DPO)</h2>
          <p>O canal oficial para tratativas de privacidade é contato@landingpageparaadvogados.com.</p>

          <h2>8. Atualizações</h2>
          <p>Esta política pode ser atualizada. Recomenda-se revisar periodicamente.</p>
          </div>
        </div>
      </article>
    </>
  );
}
