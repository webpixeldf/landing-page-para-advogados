import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Differentials from '@/components/Differentials';
import Methodology from '@/components/Methodology';
import Guide from '@/components/Guide';
import Benefits from '@/components/Benefits';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import FAQ, { type FaqItem } from '@/components/FAQ';
import CtaBanner from '@/components/CtaBanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Páginas de Alta Conversão para Escritórios de Advocacia | Conforme OAB',
  description:
    'Criação de páginas de captação para advogados com SEO técnico, copywriting jurídico ético e total conformidade com o Código de Ética da OAB. 20 anos e mais de 500 projetos entregues.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Páginas de Alta Conversão para Escritórios de Advocacia | Conforme OAB',
    description:
      'Páginas de captação para escritórios jurídicos com design que transmite credibilidade, performance, SEO e conformidade total com a OAB.',
    url: '/',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Landing Page para Advogados',
    images: [
      {
        url: '/images/landing-page-para-advogados.jpg',
        width: 1200,
        height: 630,
        alt: 'Criação de Landing Page para Advogados',
        type: 'image/jpeg'
      }
    ]
  }
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'Qual a diferença entre uma landing page e um site institucional?',
    a: [
      'Um site institucional possui várias páginas com objetivos diversos (conhecer a banca, ver áreas, ler artigos). Já uma landing page é uma única página, 100% focada em conversão.',
      'Para advogados, a landing page é especialmente poderosa porque permite criar páginas específicas por área de atuação, falando diretamente com a dor de cada público.'
    ]
  },
  {
    q: 'Quanto tempo leva para criar minha landing page?',
    a: 'O prazo padrão é de até 7 dias corridos após o recebimento de todas as informações (logo, fotos, dados de contato, áreas de atuação e textos ou diretrizes). Briefings completos aceleram a entrega.'
  },
  {
    q: 'Preciso fornecer textos e imagens ou vocês criam tudo?',
    a: [
      'Você fornece o essencial: logo, fotos do escritório, áreas de atuação e dados de contato. Se já tiver textos prontos, ótimo; caso contrário, criamos a partir das informações.',
      'Após a entrega, você tem direito a uma rodada de ajustes para deixar tudo no ponto.'
    ]
  },
  {
    q: 'Qual o investimento necessário?',
    a: [
      'O investimento começa em R$ 699,00 em pagamento único (ou 3x de R$ 233 sem juros), com hospedagem inclusa e sem mensalidade obrigatória.',
      'Estão incluídos: design responsivo, SEO on-page, integração WhatsApp, formulário LGPD, treinamento e 90 dias de suporte gratuito.'
    ]
  },
  {
    q: 'A landing page respeita as normas da OAB?',
    a:
      'Sim. Conhecemos a fundo o Código de Ética e o Provimento 205/2021 da OAB. Garantimos linguagem informativa, sóbria, sem promessa de resultado e exibição correta da inscrição na OAB.'
  },
  {
    q: 'Preciso investir em tráfego pago para a página funcionar?',
    a:
      'Não obrigatoriamente. A página é otimizada para SEO orgânico (resultados em 3 a 6 meses). Para resultados imediatos, ela está pronta para campanhas no Google Ads e Meta Ads.'
  },
  {
    q: 'A landing page funciona bem em celulares?',
    a:
      'Sim. Mais de 70% das buscas por advogados acontecem em mobile, e desenvolvemos cada projeto com abordagem mobile-first, com Core Web Vitals otimizados.'
  },
  {
    q: 'Como funciona a integração com WhatsApp?',
    a:
      'Implementamos botão flutuante visível em todas as seções, com mensagem pré-configurada personalizada. O cliente clica e abre direto a conversa, com fricção mínima.'
  },
  {
    q: 'Posso atualizar o conteúdo da página depois?',
    a:
      'Sim. Você recebe acesso a um painel de edição simples e treinamento incluso. Para alterações maiores, oferecemos suporte pontual.'
  }
];

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: Array.isArray(item.a) ? item.a.join(' ') : item.a
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: siteConfig.url + '/' }
    ]
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Landing Page para Advogados',
    serviceType: 'Criação de Páginas de Conversão para Escritórios de Advocacia',
    category: 'Marketing Digital Jurídico',
    provider: {
      '@type': 'Organization',
      name: 'Landing Page para Advogados',
      url: siteConfig.url + '/'
    },
    areaServed: { '@type': 'Country', name: 'Brazil' },
    audience: {
      '@type': 'Audience',
      audienceType: 'Advogados e escritórios de advocacia'
    },
    description:
      'Desenvolvimento de páginas de conversão para escritórios de advocacia — design responsivo, SEO técnico, copywriting jurídico ético e total conformidade com a OAB.',
    brand: { '@type': 'Brand', name: 'Landing Page para Advogados' },
    offers: {
      '@type': 'Offer',
      price: '699.00',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      itemOffered: {
        '@type': 'Service',
        name: 'Landing Page para Advogados — projeto completo'
      }
    }
  };

  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': siteConfig.url + '/#webpage',
    url: siteConfig.url + '/',
    name: 'Landing Page para Advogados',
    description:
      'Criação de páginas de conversão para escritórios de advocacia com mais de 20 anos de experiência. Design responsivo, SEO técnico e conformidade total com a OAB.',
    inLanguage: 'pt-BR',
    isPartOf: { '@id': siteConfig.url + '/' },
    primaryImageOfPage: { '@type': 'ImageObject', url: siteConfig.ogImage },
    about: { '@id': siteConfig.url + '/#organization' },
    author: { '@id': siteConfig.url + '/#author' },
    reviewedBy: { '@id': siteConfig.url + '/#author' },
    datePublished: '2024-01-15',
    dateModified: '2026-04-20',
    mainContentOfPage: {
      '@type': 'WebPageElement',
      cssSelector: '#main'
    },
    // Speakable: sinaliza a Alexa/Google Assistant/bots de voz/IA
    // quais blocos são "respondíveis" com voz sem prejuízo de contexto.
    // Nota: .prose-editorial não existe na homepage (só em posts/legais),
    // então mantemos apenas h1/h2 — universais a qualquer página.
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2']
    }
  };

  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': siteConfig.url + '/#author',
    name: siteConfig.author.name,
    alternateName: 'Marcelo França — Especialista em SEO e Desenvolvimento Web Jurídico',
    url: siteConfig.author.linkedin,
    image: siteConfig.url + siteConfig.author.image,
    jobTitle: siteConfig.author.jobTitle,
    description: siteConfig.author.bio,
    knowsAbout: [
      'SEO para escritórios de advocacia',
      'Criação de páginas de conversão jurídicas',
      'Marketing jurídico ético',
      'Provimento 205/2021 da OAB',
      'Core Web Vitals',
      'Copywriting jurídico',
      'Desenvolvimento web para advocacia'
    ],
    worksFor: { '@id': siteConfig.url + '/#organization' },
    sameAs: [siteConfig.author.linkedin]
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Como criar uma página de captação jurídica de alta performance',
    description:
      'Metodologia em 5 etapas para construir uma página profissional para escritórios de advocacia, com design otimizado, SEO técnico e total conformidade com a OAB.',
    image: siteConfig.ogImage,
    totalTime: 'P7D',
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'BRL', value: '699.00' },
    supply: [
      { '@type': 'HowToSupply', name: 'Logo em alta resolução' },
      { '@type': 'HowToSupply', name: 'Fotos do escritório e da equipe' },
      { '@type': 'HowToSupply', name: 'Áreas de atuação' },
      { '@type': 'HowToSupply', name: 'Dados de contato e número OAB' }
    ],
    tool: [
      { '@type': 'HowToTool', name: 'Next.js (código estático)' },
      { '@type': 'HowToTool', name: 'Schema.org markup' },
      { '@type': 'HowToTool', name: 'Google Search Console e Analytics' }
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Pesquisa e diagnóstico',
        text:
          'Analisamos o escritório, a área jurídica, os concorrentes, o público-alvo e os canais de aquisição para entender qual mensagem precisa aparecer na página.',
        url: siteConfig.url + '/#metodologia'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Estrutura de conversão',
        text:
          'Montamos a arquitetura da página com hierarquia clara. Cada bloco tem uma função: gerar atenção, construir confiança, explicar o serviço, reduzir dúvidas e facilitar o contato.',
        url: siteConfig.url + '/#metodologia'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Copywriting jurídico',
        text:
          'Criamos textos com linguagem profissional, direta e ética. Sem promessas de resultado, gatilhos apelativos ou abordagem incompatível com a advocacia.',
        url: siteConfig.url + '/#metodologia'
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Design e desenvolvimento',
        text:
          'Desenvolvemos uma página visualmente forte, rápida e leve. O layout valoriza credibilidade, leitura fácil, prova social permitida e chamadas para ação bem posicionadas.',
        url: siteConfig.url + '/#metodologia'
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'SEO técnico e mensuração',
        text:
          'Aplicamos otimizações de indexação e desempenho: meta tags, headings, schema markup, URLs amigáveis, sitemap, breadcrumbs, Search Console e ferramentas de análise.',
        url: siteConfig.url + '/#metodologia'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <Hero />
      <Stats />
      <Differentials />
      <Methodology />
      <Guide />
      <Benefits />
      <Portfolio />
      <CtaBanner
        title="Vamos criar uma landing page jurídica para o seu escritório?"
        subtitle={[
          'Sua banca não precisa depender apenas de indicação.',
          'Com uma página bem estruturada, o tráfego certo encontra uma mensagem clara, profissional e preparada para gerar contato.',
          'Solicite um diagnóstico gratuito e veja como uma página de captação jurídica pode fortalecer seus resultados digitais com mais previsibilidade.'
        ]}
        cta="Solicitar diagnóstico gratuito"
      />
      <Testimonials />
      <FAQ items={FAQ_ITEMS} title="Perguntas frequentes" />
    </>
  );
}
