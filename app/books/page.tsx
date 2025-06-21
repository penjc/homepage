'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, BookOpen, Star, Calendar, Tag } from 'lucide-react';
import { siteConfig } from '../../site.config';
import Footer from '../../components/Footer';
import NavigationWrapper from '../../components/NavigationWrapper';
import Comments from '../../components/Comments';
import ClientImage from '../../components/ClientImage';
import BackToTop from '../../components/BackToTop';

// 动画组件
function AnimatedSection({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 简化的动画变量
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

export default function BooksPage() {
  // 如果书籍功能未启用，返回 404
  if (!siteConfig.books?.enabled) {
    return null;
  }

  const { books } = siteConfig;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <NavigationWrapper />
      
      <main className="min-h-screen bg-white dark:bg-gray-900 pt-16">
        {/* Hero Section */}
        <motion.section 
          className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16 relative overflow-hidden"
          variants={heroVariants}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-thin tracking-widest font-serif mb-4">{books.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-thin tracking-widest font-serif italic">
              {books.description}
            </p>
          </div>
        </motion.section>

        {/* Books Grid */}
        <AnimatedSection className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.items.map((book, index) => (
                <motion.div
                  key={book.id}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-all duration-300"
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  {/* 悬浮背景效果 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-orange-50/30 dark:from-amber-900/10 dark:to-orange-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  
                  {/* 书籍封面 */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                    {book.cover ? (
                      <ClientImage
                        src={book.cover}
                        alt={book.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                        <BookOpen size={48} className="text-amber-600 dark:text-gray-400" />
                      </div>
                    )}
                    
                    {/* 阅读状态标签 */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        book.status === 'reading' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                          : book.status === 'completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                      }`}>
                        {book.status === 'reading' && <BookOpen size={10} />}
                        {book.status === 'completed' && <Star size={10} />}
                        {book.status === 'wishlist' && <Calendar size={10} />}
                        {book.status === 'reading' ? '阅读中' : book.status === 'completed' ? '已完成' : '想读'}
                      </span>
                    </div>
                  </div>

                  {/* 书籍信息 */}
                  <div className="relative z-10 p-6">
                    <h3 className="text-lg font-thin tracking-wide font-serif mb-2 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      {book.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-2 font-thin tracking-wide font-serif text-sm">
                      作者：{book.author}
                    </p>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 font-thin tracking-wide font-serif leading-relaxed text-sm">
                      {book.description}
                    </p>

                    {/* 评分 */}
                    {book.rating && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < book.rating! 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-thin tracking-wide font-serif">
                          {book.rating}/5
                        </span>
                      </div>
                    )}

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {book.tags.map((tag, tagIndex) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 rounded-full font-thin tracking-wide font-serif"
                        >
                          <Tag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 购买链接 */}
                    {book.purchaseLinks && Object.keys(book.purchaseLinks).length > 0 && (
                      <div className="flex items-center gap-2">
                        {Object.entries(book.purchaseLinks).map(([platform, url], linkIndex) => (
                          <motion.div
                            key={platform}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 rounded-md hover:bg-gray-200/80 dark:hover:bg-gray-600/80 transition-all duration-200 font-thin tracking-wide font-serif"
                            >
                              <ExternalLink size={12} />
                              <span>{platform}</span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 悬浮光效 */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/60 dark:via-amber-500/60 to-transparent animate-scan-horizontal"></div>
                    <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-orange-400/60 dark:via-orange-500/60 to-transparent animate-scan-vertical"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Comments Section */}
        <AnimatedSection className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Comments 
              pageId="books"
              pageTitle="书籍"
            />
          </div>
        </AnimatedSection>
      </main>
      
      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </motion.div>
  );
} 