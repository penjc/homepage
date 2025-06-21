'use client';

import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { BlogPost, Thought } from '../lib/types';

interface NavigationWrapperProps {
  posts?: BlogPost[];
  thoughts?: Thought[];
}

export default function NavigationWrapper({ posts: initialPosts, thoughts: initialThoughts }: NavigationWrapperProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts || []);
  const [thoughts, setThoughts] = useState<Thought[]>(initialThoughts || []);
  const [isLoading, setIsLoading] = useState(!initialPosts || !initialThoughts);

  useEffect(() => {
    // 如果没有初始数据，则从API获取
    if (!initialPosts || !initialThoughts) {
      fetchData();
    }
  }, [initialPosts, initialThoughts]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // 并行获取博客和随笔数据
      const [postsResponse, thoughtsResponse] = await Promise.all([
        fetch('/api/posts'),
        fetch('/api/thoughts')
      ]);

      if (postsResponse.ok) {
        const postsData = await postsResponse.json();
        setPosts(postsData.posts || []);
      }

      if (thoughtsResponse.ok) {
        const thoughtsData = await thoughtsResponse.json();
        setThoughts(thoughtsData.thoughts || []);
      }
    } catch (error) {
      console.error('获取导航数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return <Navigation posts={posts} thoughts={thoughts} />;
}