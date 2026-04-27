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
  title: 'Landing Page para Advogados de Alta Conversão | Conforme OAB',
  description:
    'Criação de landing page para advogados com alta conversão, SEO técnico e total conformidade com a OAB. 20 anos e 500+ projetos entregues.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Landing Page para Advogados de Alta Conversão | Conforme OAB',
    description:
      'Páginas de captura para escritórios jurídicos com design moderno, performance, SEO e conformidade total com a OAB.',
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
      'O investimento inicial é a partir de R$ 499,90 em pagamento único, com hospedagem inclusa e sem mensalidade.',
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
    serviceType: 'Criação de Landing Page para Advogados',
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
      'Desenvolvimento de landing page para advogados sob medida — design responsivo, SEO técnico, copywriting jurídico ético e conformidade total com o Código de Ética da OAB.',
    brand: { '@type': 'Brand', name: 'Landing Page para Advogados' },
    offers: {
      '@type': 'Offer',
      price: '499.90',
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
      'Criação de landing page para advogados com mais de 20 anos de experiência. Design responsivo, SEO técnico e conformidade total com a OAB.',
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
    name: 'Landing Page para Advogados',
    alternateName: 'Equipe Landing Page para Advogados',
    url: siteConfig.url + '/quem-somos/',
    image: siteConfig.url + '/images/landing-page-para-advogados-logo.webp',
    jobTitle: 'Especialista em criação de landing page para advogados',
    description:
      'Time com mais de 20 anos de experiência em desenvolvimento web e marketing digital jurídico, especializado em landing page para advogados em conformidade com a OAB.',
    knowsAbout: [
      'Landing page para advogados',
      'SEO para escritórios de advocacia',
      'Marketing jurídico ético',
      'Provimento 205/2021 da OAB',
      'Core Web Vitals',
      'Copywriting jurídico'
    ],
    worksFor: { '@id': siteConfig.url + '/#organization' },
    sameAs: [siteConfig.social.linkedin, siteConfig.social.instagram]
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Como criar uma landing page para advogados de alta conversão',
    description:
      'Metodologia em 5 etapas para construir uma landing page para advogados com design profissional, SEO técnico e conformidade total com a OAB.',
    image: siteConfig.ogImage,
    totalTime: 'P7D',
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'BRL', value: '499.90' },
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
        name: 'Diagnóstico estratégico',
        text:
          'Mergulhamos no negócio do escritório, mapeamos concorrentes diretos e desenhamos o perfil do cliente ideal antes de qualquer linha de código.',
        url: siteConfig.url + '/#metodologia'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Arquitetura de conversão',
        text:
          'Estruturamos a página com base em psicologia do consumidor, definindo hierarquia de informação, fluxo de leitura e pontos de prova social.',
        url: siteConfig.url + '/#metodologia'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Conteúdo profissional e ético',
        text:
          'Criamos textos claros, em conformidade com o Código de Ética da OAB e o Provimento 205/2021, com linguagem informativa e sóbria.',
        url: siteConfig.url + '/#metodologia'
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Design e desenvolvimento',
        text:
          'Aplicamos design profissional sob código semântico, leve e otimizado para Core Web Vitals (LCP, INP, CLS).',
        url: siteConfig.url + '/#metodologia'
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'SEO técnico e analytics',
        text:
          'Implementamos schema markup, sitemap, breadcrumbs, e configuramos Google Search Console e Analytics para mensurar resultados.',
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
      <CtaBanner />
      <Testimonials />
      <FAQ items={FAQ_ITEMS} title="Perguntas frequentes" />
    </>
  );
}
