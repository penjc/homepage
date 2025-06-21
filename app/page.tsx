'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
      <motion.div 
        className="flex items-center justify-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          <motion.div 
            className="rounded-full h-12 w-12 border-2 border-gray-900 dark:border-white border-t-transparent mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          <motion.p 
            className="text-gray-600 dark:text-gray-400 font-thin tracking-wide font-serif"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            加载中...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <HomePageClient recentPosts={recentPosts} />
    </motion.div>
  );
}