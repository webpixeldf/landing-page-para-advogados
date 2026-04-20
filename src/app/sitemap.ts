import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { posts } from '@/lib/posts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastMod = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: lastMod, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/quem-somos/`, lastModified: lastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/portfolio/`, lastModified: lastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/politica-privacidade/`, lastModified: lastMod, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/termos-de-uso/`, lastModified: lastMod, changeFrequency: 'yearly', priority: 0.3 }
  ];

  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}/`,
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: 'monthly',
    priority: 0.6
  }));

  return [...staticPages, ...blogEntries];
}
