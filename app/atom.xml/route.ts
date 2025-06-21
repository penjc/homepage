import { Feed } from 'feed';
import { getAllPosts } from '@/lib/blog';
import { siteConfig } from '@/site.config';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllPosts();
  
  // 构建完整的 avatar URL
  const avatarUrl = siteConfig.profile.avatar.startsWith('http') 
    ? siteConfig.profile.avatar 
    : `${siteConfig.url}${siteConfig.profile.avatar}`;
  
  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: 'zh-cn',
    image: avatarUrl,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `版权所有 © ${new Date().getFullYear()} ${siteConfig.footer.copyright.owner}`,
    updated: new Date(posts[0]?.date || new Date()),
    generator: siteConfig.title,
    feedLinks: {
      rss2: `${siteConfig.url}/rss.xml`,
      atom: `${siteConfig.url}/atom.xml`,
    },
    author: {
      name: siteConfig.profile.bio,
      email: siteConfig.profile.email,
      link: siteConfig.url,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.url}/blog/${post.slug}`,
      link: `${siteConfig.url}/blog/${post.slug}`,
      description: post.excerpt,
      content: post.content || post.excerpt,
      author: [
        {
          name: siteConfig.profile.bio,
          email: siteConfig.profile.email,
          link: siteConfig.url,
        },
      ],
      date: new Date(post.date),
      category: [
        { name: post.category },
        ...post.tags.map(tag => ({ name: tag })),
      ],
    });
  });

  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
} 