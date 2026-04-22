import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description:
    'Termos e condições de uso do site Landing Page para Advogados, prestador de serviços de criação de páginas profissionais jurídicas.',
  alternates: { canonical: '/termos-de-uso/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Termos de Uso',
    description:
      'Termos e condições de uso do site Landing Page para Advogados, prestador de serviços de criação de páginas profissionais jurídicas.',
    url: '/termos-de-uso/',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Landing Page para Advogados',
    images: [
      {
        url: '/images/termos-de-uso.jpg',
        width: 1200,
        height: 630,
        alt: 'Termos de Uso — Landing Page para Advogados',
        type: 'image/jpeg'
      }
    ]
  }
};

export default function TermosDeUsoPage() {
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
            Termos de
            <span className="italic font-light text-accent"> Uso</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/70">
            Regras claras sobre o uso deste site, propriedade intelectual, limitações e conformidade
            com o Código de Ética da OAB.
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
            Ao navegar neste site, você concorda com os termos abaixo. Caso não concorde, pedimos
            que interrompa o acesso.
          </p>

          <h2>1. Objeto</h2>
          <p>
            Este site é mantido com a finalidade de divulgar serviços
            de criação de páginas profissionais para advogados, escritórios de advocacia e
            departamentos jurídicos.
          </p>

          <h2>2. Propriedade intelectual</h2>
          <p>
            Todo o conteúdo exibido (textos, imagens, marcas, código) pertence aos respectivos titulares ou está
            licenciado para uso. Reprodução total ou parcial sem autorização é proibida.
          </p>

          <h2>3. Uso permitido</h2>
          <ul>
            <li>Consulta para fins informativos.</li>
            <li>Compartilhamento de links íntegros para o conteúdo.</li>
            <li>Solicitação de orçamento por meio dos canais oficiais.</li>
          </ul>

          <h2>4. Limitação de responsabilidade</h2>
          <p>
            As informações têm caráter informativo. Não substituem orientação jurídica
            individualizada. Não nos responsabilizamos por decisões tomadas exclusivamente com base
            no conteúdo deste site.
          </p>

          <h2>5. Links externos</h2>
          <p>
            Este site pode conter links para sites de terceiros. Não controlamos seu conteúdo nem
            assumimos responsabilidade por eles.
          </p>

          <h2>6. Conformidade com o Código de Ética da OAB</h2>
          <p>
            Os serviços de criação de páginas jurídicas seguem rigorosamente o Código de Ética e
            Disciplina da OAB, em especial os artigos 28 a 34, e o Provimento 205/2021, que
            regulamenta a publicidade da advocacia no Brasil.
          </p>
          <p>
            Orientamos e revisamos cada projeto para que a comunicação seja exclusivamente
            informativa, sem promessa de resultado ou captação ativa ostensiva.
          </p>

          <h2>7. Modificações destes Termos</h2>
          <p>
            Podemos atualizar estes Termos a qualquer tempo, sem aviso prévio. A versão vigente é
            sempre a publicada nesta página, com a data de última atualização no topo.
          </p>
          <p>
            O acesso continuado ao site após modificações representa aceitação tácita das novas
            condições.
          </p>

          <h2>8. Disponibilidade</h2>
          <p>
            Embora façamos todos os esforços para manter o site disponível 24 horas por dia, não
            garantimos ausência de interrupções decorrentes de manutenção, atualizações ou fatores
            fora do nosso controle (como falhas de infraestrutura, provedores de hospedagem ou
            conectividade).
          </p>

          <h2>9. Foro</h2>
          <p>
            Fica eleito o foro da comarca de Brasília/DF para dirimir eventuais controvérsias
            decorrentes do uso deste site, com renúncia expressa a qualquer outro, por mais
            privilegiado que seja.
          </p>
          </div>
        </div>
      </article>
    </>
  );
}
