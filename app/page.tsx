import { siteConfig } from '../site.config';
import { getRecentPosts } from '../lib/blog';
import HomePageClient from '../components/HomePageClient';

export default function HomePage() {
  const recentPosts = getRecentPosts(siteConfig.blog.homepage.recentPostsCount);

  return <HomePageClient recentPosts={recentPosts} />;
} 