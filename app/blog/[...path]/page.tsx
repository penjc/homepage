'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import ClientPageLayout from '../../../components/ClientPageLayout';
import NotFoundContent from '../../../components/NotFoundContent';
import BlogPostContent from '../../../components/BlogPostContent';
import { BlogPost } from '../../../lib/types';

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const slug = Array.isArray(params.path) ? params.path.join('/') : '';
        
        // 从API获取文章数据
        const [postRes, allPostsRes] = await Promise.all([
          fetch(`/api/posts/${encodeURIComponent(slug)}`),
          fetch('/api/posts')
        ]);

        const [postData, allPostsData] = await Promise.all([
          postRes.json(),
          allPostsRes.json()
        ]);

        if (postRes.ok && postData.post) {
          setPost(postData.post);
          setAllPosts(allPostsData.posts || []);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params]);

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

  if (notFound || !post) {
    return (
      <ClientPageLayout>
        <NotFoundContent message="文章未找到" />
      </ClientPageLayout>
    );
  }

  const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <ClientPageLayout>
      {/* Article Header */}
      <header className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Link 
              href="/blog"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-thin tracking-wide font-serif"
            >
              ← 返回博客列表
            </Link>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Link
              href={`/blog/category/${post.category}/page/1`}
              className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors font-thin tracking-wide font-serif bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {post.category}
            </Link>
            <span className="text-gray-600 dark:text-gray-400 text-sm font-thin tracking-wide font-serif">
              {post.readTime}阅读
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-thin tracking-widest font-serif mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <time className="font-thin tracking-wide font-serif">
              {new Date(post.date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}/page/1`}
                  className="inline-flex items-center px-2.5 py-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-100/60 dark:bg-gray-700/60 rounded-full hover:bg-gray-200/60 dark:hover:bg-gray-600/60 transition-all duration-200 font-thin tracking-wide font-serif"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Article Content - 使用客户端组件处理主题 */}
      <Suspense fallback={<div className="text-center py-8">加载中...</div>}>
      <BlogPostContent 
        post={post}
        prevPost={prevPost}
        nextPost={nextPost}
      />
      </Suspense>
    </ClientPageLayout>
  );
}