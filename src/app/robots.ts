import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

// Permissão explícita para bots de busca tradicional + IA (GEO-friendly)
// Sinaliza claramente ao bot que ele pode indexar — alguns crawlers conservadores
// só rodam se virem seu user-agent listado explicitamente.
export default function robots(): MetadataRoute.Robots {
  const aiAndSearchBots = [
    // Buscadores tradicionais
    'Googlebot',
    'Googlebot-Image',
    'Googlebot-News',
    'Bingbot',
    'Slurp', // Yahoo
    'DuckDuckBot',
    'YandexBot',
    'Baiduspider',
    // AI crawlers (treino + busca generativa)
    'GPTBot', // OpenAI (treino)
    'ChatGPT-User', // ChatGPT com navegação
    'OAI-SearchBot', // ChatGPT Search
    'Google-Extended', // Gemini / AI Overviews
    'PerplexityBot',
    'Perplexity-User',
    'ClaudeBot', // Claude (treino + busca)
    'anthropic-ai',
    'Claude-Web',
    'Claude-SearchBot',
    'CCBot', // Common Crawl (usado por muitos LLMs)
    'Applebot',
    'Applebot-Extended', // Apple Intelligence
    'Amazonbot',
    'FacebookExternalHit',
    'facebookexternalhit',
    'Meta-ExternalAgent',
    'LinkedInBot',
    'TwitterBot',
    'WhatsApp',
    'TelegramBot',
    'DiscordBot',
    'cohere-ai',
    'AwarioRssBot',
    'AwarioSmartBot',
    'Diffbot',
    'YouBot'
  ];

  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...aiAndSearchBots.map((ua) => ({ userAgent: ua, allow: '/' }))
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url
  };
}
