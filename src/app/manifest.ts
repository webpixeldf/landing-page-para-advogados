import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Landing Page para Advogados',
    short_name: 'LP Advogados',
    description:
      'Criação de páginas de conversão para escritórios de advocacia com mais de 20 anos de experiência. SEO, performance e conformidade OAB.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#314e52',
    icons: [
      { src: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { src: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { src: '/images/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/images/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  };
}
