import { siteConfig } from '@/site.config';

export const dynamic = 'force-static';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${siteConfig.url}/sitemap.xml

# Disallow specific paths if needed
Disallow: /api/
Disallow: /_next/
Disallow: /.git/
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
} 