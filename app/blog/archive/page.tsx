'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import ClientPageLayout from '../../../components/ClientPageLayout';
import { siteConfig } from '../../../site.config';
import { BlogPost } from '../../../lib/types';

// 按年月分组的文章类型
interface GroupedPosts {
  [year: string]: {
    [month: string]: BlogPost[];
  };
}

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

// 文章项动画组件
function AnimatedPost({ children, index = 0 }: { 
  children: React.ReactNode; 
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.5,
          delay: index * 0.05,
          ease: "easeOut"
        }
      } : { opacity: 0, x: -30 }}
      whileHover={{ 
        x: 4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
    >
      {children}
    </motion.div>
  );
}

// 年份组动画组件
function AnimatedYearGroup({ children, index = 0 }: { 
  children: React.ReactNode; 
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.7,
          delay: index * 0.1,
          ease: "easeOut"
        }
      } : { opacity: 0, y: 50 }}
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

// 月份中文映射
const monthNames = [
  '一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月'
];

export default function ArchivePage() {
  const [groupedPosts, setGroupedPosts] = useState<GroupedPosts>({});
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);

  // 设置页面标题和描述
  useEffect(() => {
    document.title = `博客归档 | ${siteConfig.title}`;
    
    // 设置页面描述
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '时光轨迹，记录每一篇文章的诞生');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = '时光轨迹，记录每一篇文章的诞生';
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        const posts = data.posts || [];
        
        setTotalPosts(posts.length);
        
        // 按年月分组
        const grouped: GroupedPosts = {};
        posts.forEach((post: BlogPost) => {
          const date = new Date(post.date);
          const year = date.getFullYear().toString();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          
          if (!grouped[year]) {
            grouped[year] = {};
          }
          if (!grouped[year][month]) {
            grouped[year][month] = [];
          }
          grouped[year][month].push(post);
        });
        
        setGroupedPosts(grouped);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
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
            <p className="text-gray-600 dark:text-gray-400 font-thin tracking-wide font-serif">加载中...</p>
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
              博客归档
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-thin tracking-widest font-serif italic"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              时光轨迹，记录每一篇文章的诞生
            </motion.p>
            <motion.p 
              className="text-sm text-gray-500 dark:text-gray-500 mt-2 font-thin tracking-wide font-serif"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              共收录 {totalPosts} 篇文章
            </motion.p>
          </div>
        </motion.section>

        {/* Archive Content */}
        <section className="bg-white dark:bg-gray-800 py-12 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {Object.keys(groupedPosts).length > 0 ? (
              <div className="space-y-12">
                {Object.keys(groupedPosts)
                  .sort((a, b) => parseInt(b) - parseInt(a)) // 按年份倒序
                  .map((year, yearIndex) => (
                    <AnimatedYearGroup key={year} index={yearIndex}>
                      <div className="relative">
                        {/* 年份标题 */}
                        <div className="sticky top-20 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 pb-3 mb-8">
                          <h2 className="text-2xl font-thin tracking-widest font-serif text-gray-900 dark:text-white">
                            {year} 年
                          </h2>
                          <div className="text-sm text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif mt-1">
                            {Object.values(groupedPosts[year]).reduce((total, monthPosts) => total + monthPosts.length, 0)} 篇文章
                          </div>
                        </div>

                        {/* 月份和文章 */}
                        <div className="space-y-8">
                          {Object.keys(groupedPosts[year])
                            .sort((a, b) => parseInt(b) - parseInt(a)) // 按月份倒序
                            .map((month, monthIndex) => (
                              <div key={`${year}-${month}`} className="relative">
                                {/* 时间线 */}
                                <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700 ml-8"></div>
                                
                                {/* 月份标题 */}
                                <div className="flex items-center mb-6">
                                  <div className="w-4 h-4 bg-gray-400 dark:bg-gray-600 rounded-full mr-6 relative z-10"></div>
                                  <h3 className="text-lg font-thin tracking-wide font-serif text-gray-800 dark:text-gray-200">
                                    {monthNames[parseInt(month) - 1]}
                                  </h3>
                                  <div className="ml-4 text-sm text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">
                                    {groupedPosts[year][month].length} 篇
                                  </div>
                                </div>

                                {/* 文章列表 */}
                                <div className="ml-10 space-y-4">
                                  {groupedPosts[year][month].map((post, postIndex) => (
                                    <AnimatedPost key={post.slug} index={postIndex}>
                                      <article className="group relative">
                                        <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
                                          {/* 日期 */}
                                          <div className="flex-shrink-0 text-center min-w-[3rem]">
                                            <div className="text-lg font-thin text-gray-600 dark:text-gray-400 font-serif">
                                              {new Date(post.date).getDate()}
                                            </div>
                                            <div className="text-xs text-gray-400 dark:text-gray-500 font-thin tracking-wide font-serif">
                                              {new Date(post.date).toLocaleDateString('zh-CN', { weekday: 'short' })}
                                            </div>
                                          </div>

                                          <div className="flex-1 min-w-0">
                                            {/* 分类和阅读时间 */}
                                            <div className="flex items-center gap-2 mb-2">
                                              <Link
                                                href={`/blog/category/${post.category}/page/1`}
                                                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-200 font-thin tracking-wide font-serif"
                                              >
                                                {post.category}
                                              </Link>
                                              {siteConfig.blog.display.showReadTime && (
                                                <span className="text-xs text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">
                                                  {post.readTime}阅读
                                                </span>
                                              )}
                                            </div>

                                            {/* 标题 */}
                                            <h4 className="text-lg font-thin tracking-wide font-serif mb-2 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                              <Link href={`/blog/${post.slug}`} className="no-underline">
                                                {post.title}
                                              </Link>
                                            </h4>

                                            {/* 摘要 */}
                                            {siteConfig.blog.display.showExcerpt && (
                                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 font-thin tracking-wide font-serif">
                                                {post.excerpt}
                                              </p>
                                            )}

                                            {/* 标签 */}
                                            {siteConfig.blog.display.showTags && post.tags.length > 0 && (
                                              <div className="flex flex-wrap gap-1">
                                                {post.tags.slice(0, siteConfig.blog.display.maxTagsToShow).map((tag: string) => (
                                                  <Link
                                                    key={tag}
                                                    href={`/blog/tag/${tag}/page/1`}
                                                    className="inline-flex items-center px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400 bg-gray-100/60 dark:bg-gray-700/60 rounded-full hover:bg-gray-200/60 dark:hover:bg-gray-600/60 transition-all duration-200 font-thin tracking-wide font-serif"
                                                  >
                                                    #{tag}
                                                  </Link>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </article>
                                    </AnimatedPost>
                                  ))}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </AnimatedYearGroup>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <motion.h3 
                  className="text-xl font-thin tracking-wide font-serif text-gray-900 dark:text-white mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  暂无归档内容
                </motion.h3>
                <motion.p 
                  className="text-gray-500 dark:text-gray-400 max-w-md mx-auto font-thin tracking-wide font-serif"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  当有文章发布后，它们将按时间顺序在这里展示。
                </motion.p>
              </AnimatedSection>
            )}

            {/* 返回博客按钮 */}
            <AnimatedSection className="mt-12 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                    href="/blog"
                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg transition-all duration-300 font-thin tracking-wide font-serif shadow-sm hover:shadow-md"
                >
                  <motion.span
                      className="inline-block"
                      animate={{x: [0, 5, 0]}}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                  >
                    ←
                  </motion.span>
                  <span>返回博客</span>
                </Link>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>
      </ClientPageLayout>
    </motion.div>
  );
} 