'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import ClientPageLayout from '../../../../components/ClientPageLayout';
import NotFoundContent from '../../../../components/NotFoundContent';
import Pagination from '../../../../components/Pagination';
import { siteConfig } from '../../../../site.config';
import { BlogPost, PaginatedPosts } from '../../../../lib/types';

// 动画组件
function AnimatedSection({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 博客文章项动画组件
function AnimatedBlogPost({ children, index = 0 }: { 
  children: React.ReactNode; 
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          duration: 0.6,
          delay: index * 0.1,
          ease: "easeOut"
        }
      } : { opacity: 0, y: 50, scale: 0.95 }}
      whileHover={{ 
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
    >
      {children}
    </motion.div>
  );
}

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

export default function BlogPageWithPagination() {
  const params = useParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // 设置页面标题
  useEffect(() => {
    if (!loading && !notFound && currentPage) {
      document.title = `博客 | ${siteConfig.title}`;
    }
  }, [loading, notFound, currentPage]);

  useEffect(() => {
    const pageParam = Array.isArray(params.page) ? params.page[0] : params.page;
    const page = parseInt(pageParam || '1', 10);
    
    // 验证页面号是否有效
    if (isNaN(page) || page < 1) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    
    setCurrentPage(page);
    
    // 从API获取博客数据
    const fetchBlogData = async () => {
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          fetch('/api/posts'),
          fetch('/api/categories')
        ]);

        const [postsData, categoriesData] = await Promise.all([
          postsRes.json(),
          categoriesRes.json()
        ]);

        const allPosts = postsData.posts || [];
        const postsPerPage = siteConfig.blog.pagination.postsPerPage;
        const totalPagesCount = Math.ceil(allPosts.length / postsPerPage);
        
        // 验证页面号是否超出范围
        if (page > totalPagesCount && totalPagesCount > 0) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedPosts = allPosts.slice(startIndex, endIndex);

        setPosts(paginatedPosts);
        setCategories(categoriesData.categories || []);
        setTotalPosts(allPosts.length);
        setTotalPages(totalPagesCount);
        setHasNextPage(page < totalPagesCount);
        setHasPrevPage(page > 1);
        setNotFound(false);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [params]);

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

  if (notFound) {
    return (
      <ClientPageLayout>
        <NotFoundContent message="页面未找到" />
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
        {/* Hero Section */}
        <motion.section 
          className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16"
          variants={heroVariants}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-thin tracking-widest font-serif mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              博客
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-thin tracking-widest font-serif italic"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              分享技术心得与生活感悟
            </motion.p>
            <motion.p 
              className="text-sm text-gray-500 dark:text-gray-500 mt-2 font-thin tracking-wide font-serif"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              共 {totalPosts} 篇文章，第 {currentPage} 页，共 {totalPages} 页
            </motion.p>
          </div>
        </motion.section>

        {/* Blog Categories */}
        <AnimatedSection className="bg-white dark:bg-gray-800 py-8 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: 0,
                  transition: { 
                    delay: 0.1,
                    duration: 0.5,
                    ease: "easeOut"
                  }
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center px-4 py-2 text-sm rounded-full transition-colors font-thin tracking-wide font-serif bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                >
                  全部
                </Link>
              </motion.div>
              {categories.map((category: string, index: number) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: 0,
                    transition: { 
                      delay: 0.2 + (index * 0.05),
                      duration: 0.4,
                      ease: "easeOut"
                    }
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`/blog/category/${category}/page/1`}
                    className="inline-flex items-center px-4 py-2 text-sm rounded-full transition-colors font-thin tracking-wide font-serif text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {category}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Blog Posts */}
        <section className="bg-white dark:bg-gray-800 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length > 0 ? (
              <div className="space-y-8">
                {posts.map((post: BlogPost, index: number) => (
                  <AnimatedBlogPost key={post.slug} index={index}>
                    <article className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                      <div className="flex items-start gap-4">
                        {/* Date */}
                        <div className="flex-shrink-0 w-16 text-center">
                          <div className="text-sm text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">
                            {new Date(post.date).toLocaleDateString('zh-CN', { 
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500 font-thin tracking-wide font-serif">
                            {new Date(post.date).getFullYear()}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Link
                                href={`/blog/category/${post.category}/page/1`}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-200 font-thin tracking-wide font-serif"
                              >
                                {post.category}
                              </Link>
                            </motion.div>
                            {siteConfig.blog.display.showReadTime && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">
                                {post.readTime}阅读
                              </span>
                            )}
                          </div>

                          <h2 className="text-xl font-thin tracking-wide font-serif mb-2 text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                            <Link href={`/blog/${post.slug}`} className="no-underline">
                              {post.title}
                            </Link>
                          </h2>

                          {siteConfig.blog.display.showExcerpt && (
                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 font-thin tracking-wide font-serif">
                              {post.excerpt}
                            </p>
                          )}

                          <div className="flex items-center justify-between">
                            {siteConfig.blog.display.showTags && (
                              <div className="flex flex-wrap gap-2">
                                {post.tags.slice(0, siteConfig.blog.display.maxTagsToShow).map((tag: string, tagIndex: number) => (
                                  <motion.div
                                    key={tag}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ 
                                      opacity: 1, 
                                      scale: 1,
                                      transition: { 
                                        delay: 0.3 + (tagIndex * 0.1),
                                        duration: 0.4,
                                        ease: "easeOut"
                                      }
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Link
                                      href={`/blog/tag/${tag}/page/1`}
                                      className="inline-flex items-center px-2.5 py-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-100/60 dark:bg-gray-700/60 rounded-full hover:bg-gray-200/60 dark:hover:bg-gray-600/60 transition-all duration-200 font-thin tracking-wide font-serif"
                                    >
                                      #{tag}
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </AnimatedBlogPost>
                ))}
              </div>
            ) : (
              <AnimatedSection className="text-center py-16" delay={0.2}>
                <motion.div 
                  className="text-gray-400 dark:text-gray-500 mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <svg className="mx-auto h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </motion.div>
                <motion.h3 
                  className="text-xl font-thin tracking-wide font-serif text-gray-900 dark:text-white mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  暂无文章
                </motion.h3>
                <motion.p 
                  className="text-gray-500 dark:text-gray-400 max-w-md mx-auto font-thin tracking-wide font-serif"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  即将发布精彩内容，敬请期待！
                </motion.p>
              </AnimatedSection>
            )}

                         {/* Pagination */}
             {totalPages > 1 && (
               <AnimatedSection className="mt-12" delay={0.3}>
                 <Pagination
                   currentPage={currentPage}
                   totalPages={totalPages}
                   basePath="/blog/page"
                   hasNextPage={hasNextPage}
                   hasPrevPage={hasPrevPage}
                 />
               </AnimatedSection>
             )}
          </div>
        </section>
      </ClientPageLayout>
    </motion.div>
  );
}