import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { siteConfig } from '../../../site.config';
import { getPostBySlug, getAllPosts } from '../../../lib/blog';
import PageLayout from '../../../components/PageLayout';
import BlogPostContent from '../../../components/BlogPostContent';

interface BlogPostPageProps {
  params: Promise<{
    path: string[];
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    path: post.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.path.join('/');
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: '文章未找到',
      description: '文章未找到'
    };
  }

  return {
    title: post.title,
    description: post.excerpt || post.title,
    keywords: [post.category, ...post.tags],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['作者姓名'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.path.join('/');
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <PageLayout>
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
              {post.tags.map((tag) => (
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
    </PageLayout>
  );
} 