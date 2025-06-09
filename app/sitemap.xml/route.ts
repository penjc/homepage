import { getAllPosts, getAllThoughts } from '@/lib/blog';
import { siteConfig } from '@/site.config';

export async function GET() {
  const posts = getAllPosts();
  const thoughts = getAllThoughts();
  
  const baseUrl = siteConfig.url;
  
  // 生成静态页面的URL
  const staticPages = [
    '',
    '/blog',
    '/thoughts',
    '/about',
  ];
  
  // 生成博客文章的URL
  const blogUrls = posts.map(post => `/blog/${post.slug}`);
  
  // 生成所有分类页面的URL
  const categories = Array.from(new Set(posts.map(post => post.category)));
  const categoryUrls = categories.map(category => `/blog/category/${encodeURIComponent(category)}`);
  
  // 生成所有标签页面的URL
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));
  const tagUrls = allTags.map(tag => `/blog/tag/${encodeURIComponent(tag)}`);
  
  // 构建sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
  ${blogUrls.map(url => {
    const post = posts.find(p => `/blog/${p.slug}` === url);
    return `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date(post?.date || new Date()).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }).join('')}
  ${categoryUrls.map(url => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`).join('')}
  ${tagUrls.map(url => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.4</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
} 