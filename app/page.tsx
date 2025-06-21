'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '../site.config';
import HomePageClient from '../components/HomePageClient';
import { BlogPost } from '../lib/types';

export default function HomePage() {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从API获取最新博客数据
    const fetchRecentPosts = async () => {
      try {
        const response = await fetch('/api/posts?type=recent');
        const data = await response.json();
        setRecentPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
        setRecentPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  if (loading) {
                return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
          </div>
    );
  }

  return <HomePageClient recentPosts={recentPosts} />;
}