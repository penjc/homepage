'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Star, Calendar, Tag, ShoppingCart, MessageCircle } from 'lucide-react';
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
                          : book.status === 'read'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                      }`}>
                        {book.status === 'reading' && <BookOpen size={10} />}
                        {book.status === 'read' && <Star size={10} />}
                        {book.status === 'want_to_read' && <Calendar size={10} />}
                        {book.status === 'reading' ? '阅读中' : book.status === 'read' ? '已读' : '想读'}
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

                    {/* 评论 */}
                    {book.review && (
                      <div className="mb-4 p-3 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-400 dark:border-amber-500">
                        <p className="text-sm text-gray-700 dark:text-gray-300 font-thin tracking-wide font-serif italic leading-relaxed">
                          {book.review}
                        </p>
                      </div>
                    )}

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
                      <div className="flex items-center gap-2 flex-wrap">
                        {Object.entries(book.purchaseLinks).map(([platform, url], linkIndex) => {
                          // 根据平台返回对应的样式类名
                          const getButtonStyle = (platform: string) => {
                            switch(platform.toLowerCase()) {
                              case 'douban':
                                return 'text-green-700 dark:text-green-400 bg-green-100/80 dark:bg-green-900/20 hover:bg-green-200/80 dark:hover:bg-green-800/30';
                              case 'amazon':
                                return 'text-orange-700 dark:text-orange-400 bg-orange-100/80 dark:bg-orange-900/20 hover:bg-orange-200/80 dark:hover:bg-orange-800/30';
                              case 'taobao':
                                return 'text-red-700 dark:text-red-400 bg-red-100/80 dark:bg-red-900/20 hover:bg-red-200/80 dark:hover:bg-red-800/30';
                              case 'tmall':
                                return 'text-red-700 dark:text-red-400 bg-red-100/80 dark:bg-red-900/20 hover:bg-red-200/80 dark:hover:bg-red-800/30';
                              case 'jd':
                                return 'text-red-700 dark:text-red-400 bg-red-100/80 dark:bg-red-900/20 hover:bg-red-200/80 dark:hover:bg-red-800/30';
                              case 'dangdang':
                                return 'text-blue-700 dark:text-blue-400 bg-blue-100/80 dark:bg-blue-900/20 hover:bg-blue-200/80 dark:hover:bg-blue-800/30';
                              case 'pdd':
                                return 'text-purple-700 dark:text-purple-400 bg-purple-100/80 dark:bg-purple-900/20 hover:bg-purple-200/80 dark:hover:bg-purple-800/30';
                              default:
                                return 'text-gray-700 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 hover:bg-gray-200/80 dark:hover:bg-gray-600/80';
                            }
                          };
                          
                          // 获取平台图标
                          const getPlatformIcon = (platform: string) => {
                            if (platform.toLowerCase() === 'douban') {
                              return <MessageCircle size={16} />;
                            } else {
                              return <ShoppingCart size={16} />;
                            }
                          };
                          
                          // 获取平台的中文显示名称（用于title属性）
                          const getPlatformName = (platform: string) => {
                            const nameMap: { [key: string]: string } = {
                              douban: '豆瓣',
                              amazon: '亚马逊',
                              taobao: '淘宝',
                              tmall: '天猫',
                              jd: '京东',
                              dangdang: '当当',
                              pdd: '拼多多',
                            };
                            return nameMap[platform.toLowerCase()] || platform;
                          };
                          
                          return (
                            <motion.div
                              key={platform}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Link
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`在${getPlatformName(platform)}购买`}
                                className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${getButtonStyle(platform)}`}
                              >
                                {getPlatformIcon(platform)}
                              </Link>
                            </motion.div>
                          );
                        })}
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