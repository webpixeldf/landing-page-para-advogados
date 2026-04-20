import { getAllPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = getAllPosts();
  const buildDate = new Date().toUTCString();

  const items = posts
    .map((p) => {
      const url = `${siteConfig.url}/blog/${p.slug}/`;
      const pubDate = new Date(p.date).toUTCString();
      return `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(p.description)}</description>
      <category>${escapeXml(p.category)}</category>
      ${p.tags.map((t) => `<category>${escapeXml(t)}</category>`).join('\n      ')}
      <enclosure url="${siteConfig.url}${p.cover}" type="image/webp"/>
      <content:encoded><![CDATA[${p.content}]]></content:encoded>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(siteConfig.name)} — Blog</title>
    <link>${siteConfig.url}/blog/</link>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>pt-BR</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <generator>Next.js</generator>
    <image>
      <url>${siteConfig.ogImage}</url>
      <title>${escapeXml(siteConfig.name)}</title>
      <link>${siteConfig.url}/</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
}
