import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Página não encontrada — 404',
  description: 'O endereço que você procurou não existe ou foi movido.',
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Página não encontrada — 404',
    description: 'O endereço que você procurou não existe ou foi movido.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Landing Page para Advogados',
    images: [
      {
        url: '/images/404.jpg',
        width: 1200,
        height: 630,
        alt: 'Página não encontrada — Landing Page para Advogados',
        type: 'image/jpeg'
      }
    ]
  }
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-cream-50 pb-24 pt-44">
      <div className="absolute inset-0 -z-10 bg-mesh-cream opacity-50" />
      <div className="container-pp text-center">
        <p className="font-display text-[8rem] font-extrabold leading-none tracking-tightest text-primary md:text-[12rem]">
          4<span className="text-accent">0</span>4
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink-900 md:text-3xl">
          Página não encontrada
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base font-light text-ink-500">
          O endereço que você procurou não existe ou foi movido.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Voltar para o início</Link>
          <Link href="/blog/" className="btn-ghost">Ver o blog</Link>
        </div>
      </div>
    </section>
  );
}
