'use client';

import { useEffect, useState } from 'react';
import ClientPageLayout from '../../components/ClientPageLayout';
import ThoughtsClient from './ThoughtsClient';
import { Thought } from '../../lib/types';

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
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">加载中...</p>
          </div>
        </div>
      </ClientPageLayout>
    );
  }

  return (
    <ClientPageLayout>
      {/* Header */}
      <header className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-thin tracking-widest font-serif mb-4">随笔</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-thin tracking-widest font-serif italic">
              记录生活中的点滴思考
            </p>
          </div>
        </div>
      </header>

      {/* 传递数据给客户端组件 */}
      <ThoughtsClient 
        initialThoughts={thoughts}
        initialTags={tags}
        initialMoods={moods}
      />
    </ClientPageLayout>
  );
}