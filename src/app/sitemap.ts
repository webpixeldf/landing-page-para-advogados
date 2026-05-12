import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastMod = new Date();

  return [
    { url: `${base}/`, lastModified: lastMod, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/politica-privacidade/`, lastModified: lastMod, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/termos-de-uso/`, lastModified: lastMod, changeFrequency: 'yearly', priority: 0.3 }
  ];
}
