'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { siteConfig } from '../site.config';
import { BlogPost } from '../lib/types';
import { formatChineseDate } from '../lib/utils';
import Footer from './Footer';
import ClientImage from './ClientImage';
import SuspenseWrapper from './SuspenseWrapper';
import BackToTop from './BackToTop';

interface HomePageClientProps {
  recentPosts: BlogPost[];
}

// 动画变量
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const avatarVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -10
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const quickLinksVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const quickLinkItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const blogSectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const blogPostVariants = {
  hidden: { 
    opacity: 0, 
    x: -30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// 打字机效果组件
const TypeWriter = ({ text, delay = 0, speed = 18 }: { text: string; delay?: number; speed?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // 如果还没开始，先等待delay时间
    if (!hasStarted) {
      const startTimer = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(startTimer);
    }

    // 开始打字后，每个字符间隔speed时间
    if (hasStarted && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (hasStarted && currentIndex >= text.length && !isComplete) {
      setIsComplete(true);
    }
  }, [currentIndex, text, delay, speed, isComplete, hasStarted]);

  return (
    <span className="relative">
      {displayText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block w-0.5 h-[1.2em] bg-current ml-0.5 align-text-bottom"
        />
      )}
    </span>
  );
};

export default function HomePageClient({ recentPosts }: HomePageClientProps) {
  // 鼠标跟随效果
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 10;
    const y = (clientY - top - height / 2) / 10;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <>
      {/* Hero Section */}
      <motion.section 
        className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 垂直居中的单列布局 */}
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Avatar */}
            <motion.div 
              className="relative group"
              variants={avatarVariants}
              style={{
                x: springX,
                y: springY,
              }}
            >
              <div className="w-40 h-40 relative">
                {/* 头像光环效果 */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0.3)",
                      "0 0 0 20px rgba(59, 130, 246, 0)",
                      "0 0 0 0 rgba(59, 130, 246, 0.3)",
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* 浮动动画 */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ClientImage
                    src={siteConfig.profile.avatar}
                    alt={siteConfig.name}
                    width={160}
                    height={160}
                    className="w-40 h-40 rounded-full object-cover border-2 border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-3"
                    priority
                    style={{ objectFit: 'cover' }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Name and Bio */}
            <motion.div 
              className="space-y-6 max-w-3xl"
              variants={itemVariants}
            >
              <motion.h1 
                className="text-6xl md:text-7xl font-thin tracking-[0.2em] font-serif italic text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.8,
                  ease: [0.6, -0.05, 0.01, 0.99]
                }}
              >
                {siteConfig.name}
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-thin tracking-[0.1em] font-serif leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                <TypeWriter text={siteConfig.profile.bio} delay={1400} speed={150} />
              </motion.p>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div 
              className="flex items-center justify-center gap-8 pt-4"
              variants={quickLinksVariants}
            >
              {siteConfig.hero.quickLinks
                .filter(link => {
                  // 如果是项目链接且项目功能未启用，则不显示
                  if (link.href.includes('projects')) {
                    return siteConfig.projects?.enabled || false;
                  }
                  return true;
                })
                .map((link, index) => {
                // 为不同链接分配图标
                const getIcon = (href: string) => {
                  if (href.includes('blog')) {
                    return (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                      </svg>
                    );
                  } else if (href.includes('thoughts')) {
                    return (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    );
                  } else if (href.includes('projects')) {
                    return (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                      </svg>
                    );
                  } else if (href.includes('about')) {
                    return (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    );
                  }
                  return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                  );
                };

                return (
                  <motion.div
                    key={index}
                    variants={quickLinkItemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={link.href}
                      className="group flex flex-col items-center gap-2 p-3 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-300"
                      title={link.name}
                    >
                      <div className="w-12 h-12 flex items-center justify-center transition-all duration-300">
                        {getIcon(link.href)}
                      </div>
                      <span className="text-xs font-thin tracking-wide font-serif opacity-70 group-hover:opacity-100 transition-opacity">
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Blog Preview Section */}
      <motion.section 
        className="py-24 bg-gray-50/50 dark:bg-gray-800/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={blogSectionVariants}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-thin tracking-[0.15em] font-serif mb-6 text-gray-900 dark:text-white">最新博客</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-thin tracking-[0.05em] font-serif italic">
              分享技术心得与生活感悟
            </p>
          </motion.div>

          {/* Recent Posts List */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
          >
            {recentPosts.length > 0 ? (
              recentPosts.map((post, index) => (
                <motion.article 
                  key={post.slug} 
                  className="border-b border-gray-200/60 dark:border-gray-700/60 pb-8 last:border-b-0"
                  variants={blogPostVariants}
                  whileHover={{
                    x: 10,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-start gap-6">
                    {/* Date */}
                    <div className="flex-shrink-0 w-20 text-center">
                      {(() => {
                        const { monthDay, year } = formatChineseDate(post.date);
                        return (
                          <>
                            <div className="text-sm text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">
                              {monthDay}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 font-thin tracking-wide font-serif mt-1">
                              {year}
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <Link
                          key={index}
                          href={`/blog/category/${post.category}/page/1`}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-200 font-thin tracking-wide font-serif"
                        >
                          {post.category}
                        </Link>
                        {siteConfig.blog.display.showReadTime && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">
                            {post.readTime}阅读
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl md:text-2xl font-thin tracking-wide font-serif mb-3 text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors leading-relaxed">
                        <Link href={`/blog/${post.slug}`} className="no-underline">
                          {post.title}
                        </Link>
                      </h2>

                      {siteConfig.blog.display.showExcerpt && (
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 font-thin tracking-wide font-serif leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        {siteConfig.blog.display.showTags && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, siteConfig.blog.display.maxTagsToShow).map((tag) => (
                              <Link
                                key={tag}
                                href={`/blog/tag/${tag}/page/1`}
                                className="inline-flex items-center px-2.5 py-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-100/60 dark:bg-gray-700/60 rounded-full hover:bg-gray-200/60 dark:hover:bg-gray-600/60 transition-all duration-200 font-thin tracking-wide font-serif"
                              >
                                #{tag}
                              </Link>
                            ))}
                            {post.tags.length > siteConfig.blog.display.maxTagsToShow && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">
                                +{post.tags.length - siteConfig.blog.display.maxTagsToShow}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div 
                className="text-center py-12"
                variants={itemVariants}
              >
                <p className="text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">暂无博客文章</p>
              </motion.div>
            )}
          </motion.div>

          {/* View All Posts Link */}
          {recentPosts.length > 0 && (
              <motion.div
                  className="text-center mt-12"
                  variants={itemVariants}
              >
                <motion.div
                    whileHover={{
                      scale: 1.05,
                      y: -3
                    }}
                    whileTap={{
                      scale: 0.95,
                      y: 1
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17
                    }}
                >
                  <Link
                      href="/blog"
                      className="group inline-flex items-center gap-2 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg transition-all duration-300 font-thin tracking-wide font-serif shadow-sm hover:shadow-md"
                  >
                    <span>查看所有博客</span>
                    <motion.span
                        className="inline-block"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>
          )}
        </div>
      </motion.section>

      <Footer />
      <BackToTop />
    </>
  );
}