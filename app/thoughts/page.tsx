'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ClientPageLayout from '../../components/ClientPageLayout';
import ThoughtsClient from './ThoughtsClient';
import { Thought } from '../../lib/types';

// 页面动画变体
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// 头部动画变体
const heroVariants = {
  hidden: { 
    opacity: 0, 
    y: 20
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function ThoughtsPage() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [moods, setMoods] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从API获取随笔数据
    const fetchThoughtsData = async () => {
      try {
        const [thoughtsRes, tagsRes, moodsRes] = await Promise.all([
          fetch('/api/thoughts'),
          fetch('/api/thoughts?type=tags'),
          fetch('/api/thoughts?type=moods')
        ]);

        const [thoughtsData, tagsData, moodsData] = await Promise.all([
          thoughtsRes.json(),
          tagsRes.json(),
          moodsRes.json()
        ]);

        setThoughts(thoughtsData.thoughts || []);
        setTags(tagsData.tags || []);
        setMoods(moodsData.moods || []);
      } catch (error) {
        console.error('Error fetching thoughts data:', error);
        setThoughts([]);
        setTags([]);
        setMoods([]);
      } finally {
        setLoading(false);
      }
    };

    fetchThoughtsData();
  }, []);

  if (loading) {
    return (
      <ClientPageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">加载中...</p>
          </motion.div>
        </div>
      </ClientPageLayout>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <ClientPageLayout>
        {/* Header */}
        <motion.header 
          className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16"
          variants={heroVariants}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-thin tracking-widest font-serif mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                随笔
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-thin tracking-widest font-serif italic"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                记录生活中的点滴思考
              </motion.p>
            </div>
          </div>
        </motion.header>

        {/* 传递数据给客户端组件 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ThoughtsClient 
            initialThoughts={thoughts}
            initialTags={tags}
            initialMoods={moods}
          />
        </motion.div>
      </ClientPageLayout>
    </motion.div>
  );
}