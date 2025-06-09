import RSS from 'rss';
import { getAllPosts } from '@/lib/blog';
import { siteConfig } from '@/site.config';

export async function GET() {
  const posts = getAllPosts();
  
  const feed = new RSS({
    title: siteConfig.title,
    description: siteConfig.description,
    site_url: siteConfig.url,
    feed_url: `${siteConfig.url}/rss.xml`,
    language: 'zh-cn',
    pubDate: new Date(),
    ttl: 60,
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      guid: `${siteConfig.url}/blog/${post.slug}`,
      categories: [post.category, ...post.tags],
      author: siteConfig.profile.email,
      date: new Date(post.date),
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
} 