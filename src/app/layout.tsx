import type { Metadata, Viewport } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CookieBanner from '@/components/CookieBanner';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-lexend',
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Páginas de Alta Conversão para Escritórios de Advocacia | Conforme OAB',
    template: '%s | Páginas Jurídicas de Alta Conversão'
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  publisher: 'Landing Page para Advogados',
  applicationName: siteConfig.name,
  category: 'Marketing Digital Jurídico',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Páginas Jurídicas de Alta Conversão | 20 Anos de Experiência',
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Criação de Landing Page para Advogados'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Páginas Jurídicas de Alta Conversão | 20 Anos de Experiência',
    description: siteConfig.description,
    images: [siteConfig.ogImage]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  icons: {
    icon: [{ url: '/images/favicon.jpg', type: 'image/jpeg' }],
    shortcut: [{ url: '/images/favicon.jpg' }],
    apple: [{ url: '/images/favicon.jpg' }]
  },
  manifest: '/manifest.webmanifest'
};

export const viewport: Viewport = {
  themeColor: '#314e52',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': siteConfig.url + '/#organization',
    name: 'Landing Page para Advogados',
    alternateName: 'Criação de Landing Page para Advogados',
    description:
      'Criação de páginas de conversão para escritórios de advocacia com mais de 20 anos de experiência. Design responsivo, SEO técnico e conformidade total com o Código de Ética da OAB.',
    slogan: 'Páginas jurídicas de alta conversão, em conformidade com a OAB.',
    keywords:
      'página de captação para advogados, site para advogados, criação de site jurídico, marketing digital jurídico, captação de clientes advocacia',
    image: siteConfig.ogImage,
    url: siteConfig.url + '/',
    telephone: siteConfig.contact.phone,
    taxID: '34.644.883/0001-94',
    vatID: '34.644.883/0001-94',
    priceRange: '$$',
    knowsAbout: [
      'Landing page para advogados',
      'Marketing jurídico',
      'SEO para escritórios de advocacia',
      'Conformidade OAB',
      'Captação digital de clientes na advocacia'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'SHIS, Quadra 06, Complexo Brasil 21 - Asa Sul',
      addressLocality: 'Brasília',
      addressRegion: 'DF',
      postalCode: '70316-000',
      addressCountry: 'BR'
    },
    areaServed: { '@type': 'Country', name: 'Brazil' },
    sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin],
    makesOffer: {
      '@type': 'Offer',
      price: '699.00',
      priceCurrency: 'BRL',
      itemOffered: {
        '@type': 'Service',
        name: 'Criação de Landing Page para Advogados',
        description:
          'Desenvolvimento de landing pages de alta conversão, com otimização SEO, design profissional e foco na captação de clientes para advogados e escritórios de advocacia em todo o Brasil.',
        serviceType: 'Desenvolvimento Web Jurídico'
      }
    }
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteConfig.url + '/',
    name: siteConfig.name,
    inLanguage: 'pt-BR',
    publisher: { '@type': 'Organization', name: 'Landing Page para Advogados' },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/blog/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <html lang="pt-BR" className={lexend.variable}>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Landing Page para Advogados — Blog"
          href={`${siteConfig.url}/rss.xml`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${lexend.className} bg-cream-50 text-ink-700 antialiased`}>
        <Header />
        <main id="main" className="overflow-hidden">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <CookieBanner />
      </body>
    </html>
  );
}
