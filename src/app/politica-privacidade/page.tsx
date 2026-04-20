import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Landing Page para Advogados',
  description:
    'Política de Privacidade do site Landing Page para Advogados — como tratamos dados pessoais coletados em formulários, cookies, contatos e durante a prestação de serviços.',
  alternates: { canonical: '/politica-privacidade/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Política de Privacidade | Landing Page para Advogados',
    description:
      'Política de Privacidade do site Landing Page para Advogados — como tratamos dados pessoais coletados em formulários, cookies, contatos e durante a prestação de serviços.',
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
    <article className="bg-cream-50 pb-20 pt-36 md:pt-44">
      <div className="container-pp max-w-3xl">
        <span className="eyebrow">Documentos legais</span>
        <h1 className="display-md mt-5">Política de Privacidade</h1>
        <p className="mt-3 text-sm font-light text-ink-400">Última atualização: 20 de abril de 2026</p>

        <div className="prose-editorial mt-10">
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
  );
}
