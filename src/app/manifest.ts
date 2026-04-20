import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Landing Page para Advogados',
    short_name: 'LP Advogados',
    description:
      'Criação de landing page para advogados com mais de 20 anos de experiência. SEO, performance e conformidade OAB.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#314e52',
    icons: [
      { src: '/images/favicon.jpg', sizes: 'any', type: 'image/jpeg' }
    ]
  };
}
