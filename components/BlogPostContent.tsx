'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import TableOfContents from './TableOfContents';
import Comments from './Comments';
import { BlogPost } from '@/lib/blog';
import { trackEvent } from './GoogleAnalytics';

interface BlogPostContentProps {
  post: BlogPost;
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}

export default function BlogPostContent({ post, prevPost, nextPost }: BlogPostContentProps) {
  const [mounted, setMounted] = useState(false);
  const [tocCollapsed, setTocCollapsed] = useState(false);

  // 预先解析所有标题，生成ID映射
  const [headingIds, setHeadingIds] = useState<Map<string, string>>(new Map());
  
  useEffect(() => {
    // 解析markdown内容，预生成所有标题ID
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const seenIds = new Set<string>();
    const idMap = new Map<string, string>();
    let match;

    // 重置正则表达式状态
    headingRegex.lastIndex = 0;

    while ((match = headingRegex.exec(post.content || post.excerpt || '')) !== null) {
      const text = match[2].trim();
      let id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      
      // 处理重复ID
      let finalId = id;
      let counter = 1;
      while (seenIds.has(finalId)) {
        finalId = `${id}-${counter}`;
        counter++;
      }
      seenIds.add(finalId);
      
      // 使用原始文本作为键，生成的ID作为值
      idMap.set(text, finalId);
      console.log('BlogPost预生成ID:', text, '->', finalId); // 调试信息
    }
    
    setHeadingIds(idMap);
  }, [post.content, post.excerpt]);

  // 生成标题ID的函数，从预生成的映射中获取
  const generateId = (text: string) => {
    const cleanText = text.trim();
    const id = headingIds.get(cleanText);
    console.log('BlogPost查找ID:', cleanText, '->', id, '映射表大小:', headingIds.size); // 调试信息
    if (!id) {
      console.warn('未找到ID映射，回退到默认生成:', cleanText);
      return cleanText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim();
    }
    return id;
  };

  useEffect(() => {
    setMounted(true);
    
    // 追踪博客文章阅读事件
    trackEvent('view_article', 'blog', post.title);
    
    // 追踪阅读时间
    const startTime = Date.now();
    
    return () => {
      const readingTime = Math.round((Date.now() - startTime) / 1000);
      if (readingTime > 10) { // 只有阅读超过10秒才追踪
        trackEvent('read_article', 'blog', post.title, readingTime);
      }
    };
  }, [post.title]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 relative">
          {/* Main Content */}
          <main className={`min-w-0 transition-all duration-300 ease-in-out ${
            tocCollapsed ? 'flex-1 pr-0' : 'flex-1 pr-8 lg:pr-0'
          }`}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* Article Content */}
              <ReactMarkdown
                components={{
                  // 自定义标题组件，确保可以被TOC识别
                  h1: ({ children }) => {
                    const id = generateId(children?.toString() || '');
                    return (
                      <h1 id={id} className="font-thin tracking-widest font-serif text-gray-900 dark:text-white">
                        {children}
                      </h1>
                    );
                  },
                  h2: ({ children }) => {
                    const id = generateId(children?.toString() || '');
                    return (
                      <h2 id={id} className="font-thin tracking-wide font-serif text-gray-900 dark:text-white">
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children }) => {
                    const id = generateId(children?.toString() || '');
                    return (
                      <h3 id={id} className="font-thin tracking-wide font-serif text-gray-900 dark:text-white">
                        {children}
                      </h3>
                    );
                  },
                  h4: ({ children }) => {
                    const id = generateId(children?.toString() || '');
                    return (
                      <h4 id={id} className="font-thin tracking-wide font-serif text-gray-900 dark:text-white">
                        {children}
                      </h4>
                    );
                  },
                  h5: ({ children }) => {
                    const id = generateId(children?.toString() || '');
                    return (
                      <h5 id={id} className="font-thin tracking-wide font-serif text-gray-900 dark:text-white">
                        {children}
                      </h5>
                    );
                  },
                  h6: ({ children }) => {
                    const id = generateId(children?.toString() || '');
                    return (
                      <h6 id={id} className="font-thin tracking-wide font-serif text-gray-900 dark:text-white">
                        {children}
                      </h6>
                    );
                  },
                  p: ({ children }) => (
                    <p className="font-thin tracking-wide font-serif text-gray-700 dark:text-gray-300 leading-relaxed">
                      {children}
                    </p>
                  ),
                  li: ({ children }) => (
                    <li className="font-thin tracking-wide font-serif text-gray-700 dark:text-gray-300">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 font-thin tracking-wide font-serif text-gray-600 dark:text-gray-400">
                      {children}
                    </blockquote>
                  ),
                  // 代码块
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <CodeBlock
                        className={className}
                        inline={inline}
                      >
                        {String(children).replace(/\n$/, '')}
                      </CodeBlock>
                    ) : (
                      <code 
                        className={`${className} bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded text-sm font-mono`} 
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  // 表格
                  table: ({ children }) => (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      {children}
                    </thead>
                  ),
                  th: ({ children }) => (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider font-thin font-serif">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-thin tracking-wide font-serif">
                      {children}
                    </td>
                  ),
                  // 图片
                  img: ({ src, alt }) => (
                    <img 
                      src={src} 
                      alt={alt} 
                      className="rounded-lg shadow-lg max-w-full h-auto mx-auto"
                    />
                  ),
                  // 链接
                  a: ({ href, children }) => (
                    <a 
                      href={href} 
                      className="text-blue-600 dark:text-blue-400 hover:underline font-thin tracking-wide font-serif no-underline"
                      target={href?.startsWith('http') ? '_blank' : undefined}
                      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {post.content || post.excerpt}
              </ReactMarkdown>

              {/* Navigation */}
              {(prevPost || nextPost) && (
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex-1">
                    {prevPost && (
                      <Link 
                        href={`/blog/${prevPost.slug}`}
                        className="group flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors no-underline"
                      >
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">上一篇</p>
                          <p className="text-gray-900 dark:text-white font-medium truncate font-thin tracking-wide font-serif">
                            {prevPost.title}
                          </p>
                        </div>
                      </Link>
                    )}
                  </div>
                  
                  <div className="flex-1 ml-4">
                    {nextPost && (
                      <Link 
                        href={`/blog/${nextPost.slug}`}
                        className="group flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors no-underline"
                      >
                        <div className="flex-1 min-w-0 text-right">
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">下一篇</p>
                          <p className="text-gray-900 dark:text-white font-medium truncate font-thin tracking-wide font-serif">
                            {nextPost.title}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Back to Blog List */}
              <div className="mt-12 text-center">
                <Link 
                  href="/blog"
                  className="inline-flex items-center gap-2 font-medium py-3 px-6 rounded-md transition-colors duration-200 shadow-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 font-thin tracking-wide font-serif no-underline"
                >
                  返回博客列表
                </Link>
              </div>

              {/* Comments */}
              <div className="mt-12">
                <Comments 
                  pageId={`blog-${post.slug}`}
                  pageTitle={post.title}
                  pageUrl={`/blog/${post.slug}`}
                />
              </div>
            </div>
          </main>

          {/* Sidebar - Table of Contents */}
          <aside className={`hidden lg:block transition-all duration-300 ease-in-out ${
            tocCollapsed ? 'w-16' : 'w-80'
          }`}>
            {post.content && (
              <TableOfContents 
                content={post.content} 
                onCollapseChange={setTocCollapsed}
              />
            )}
          </aside>
        </div>
      </div>
    </div>
  );
} 