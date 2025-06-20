'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Book, Star, ExternalLink, Eye, Clock, CheckCircle, Bookmark, Filter, Search } from 'lucide-react';
import { siteConfig } from '../../site.config';
import Footer from '../../components/Footer';
import NavigationWrapper from '../../components/NavigationWrapper';
import Comments from '../../components/Comments';
import { getAssetPath } from '../../lib/utils';

// 书籍状态类型定义
type BookStatus = 'reading' | 'read' | 'want_to_read';

// 书籍状态配置
const statusConfig: Record<BookStatus, { label: string; color: string; icon: React.ComponentType<any> }> = {
  reading: { 
    label: '正在阅读', 
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    icon: Eye
  },
  read: { 
    label: '已读完', 
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    icon: CheckCircle
  },
  want_to_read: { 
    label: '想要阅读', 
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    icon: Bookmark
  }
};

// 星级评分组件
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${
            star <= rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300 dark:text-gray-600'
          } transition-colors duration-200`}
        />
      ))}
    </div>
  );
}

// 书籍类型定义
interface BookItem {
  id: string;
  title: string;
  author: string;
  category: string;
  rating?: number;
  status: BookStatus;
  cover?: string;
  description: string;
  review?: string;
  tags: string[];
  readDate?: string;
  featured: boolean;
  purchaseLinks?: {
    [key: string]: string;
  };
}

// 书籍卡片组件
function BookCard({ book, index }: { book: BookItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const StatusIcon = statusConfig[book.status as BookStatus]?.icon || Book;

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden hover:shadow-xl dark:hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      style={{
        animationDelay: `${index * 100}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 悬浮光效 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* 扫描线动画 */}
      <div 
        className={`absolute inset-0 rounded-2xl pointer-events-none overflow-hidden ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/60 dark:via-cyan-500/60 to-transparent animate-scan-horizontal"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400/60 dark:via-purple-500/60 to-transparent animate-scan-vertical"></div>
      </div>

      {/* 书籍封面 */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
        {book.cover ? (
          <Image
            src={getAssetPath(book.cover)}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 flex items-center justify-center overflow-hidden">
            {/* 背景几何图案 */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
              <div className="absolute top-4 left-4 w-16 h-16 border border-gray-400 dark:border-gray-500 rounded-lg transform rotate-12 group-hover:rotate-[30deg] transition-transform duration-700"></div>
              <div className="absolute top-12 right-8 w-8 h-8 border border-gray-300 dark:border-gray-600 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute bottom-8 left-12 w-12 h-12 border border-gray-300 dark:border-gray-600 rounded transform -rotate-45 group-hover:-rotate-[60deg] transition-transform duration-600"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full group-hover:scale-125 transition-transform duration-400"></div>
              <div className="absolute top-1/2 left-1/2 w-20 h-20 border border-gray-200 dark:border-gray-700 rounded-lg transform -translate-x-1/2 -translate-y-1/2 rotate-45 group-hover:rotate-[60deg] transition-transform duration-800"></div>
            </div>
            
            {/* 主要图标 */}
            <div className="relative z-10 flex flex-col items-center group-hover:scale-105 transition-transform duration-300">
              <div className="relative">
                {/* 外圈装饰环 */}
                <div className="absolute inset-0 w-16 h-16 border border-gray-200/40 dark:border-gray-600/40 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-1 w-14 h-14 border border-gray-300/20 dark:border-gray-500/20 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ animationDelay: '0.2s' }}></div>
                
                {/* 主图标容器 */}
                <div className="relative p-4 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border border-gray-200/50 dark:border-gray-700/50 group-hover:shadow-xl group-hover:bg-white/90 dark:group-hover:bg-gray-800/90 transition-all duration-300">
                  <Book size={32} className="text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300" />
                </div>
              </div>
              
              <div className="mt-3 text-xs text-gray-400 dark:text-gray-500 font-thin tracking-wider font-serif opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                暂无封面
              </div>
            </div>

            {/* 微妙的光效 */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-blue-50/20 dark:from-gray-700/20 dark:via-transparent dark:to-gray-600/10 group-hover:from-blue-50/20 dark:group-hover:from-gray-600/30 transition-all duration-500"></div>
            
            {/* 悬停时的额外光效 */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent dark:via-gray-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
        )}
        
                 {/* 状态标签 */}
         <div className="absolute top-4 left-4 z-20">
           <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${statusConfig[book.status as BookStatus]?.color || statusConfig.read.color}`}>
             <StatusIcon size={12} />
             {statusConfig[book.status as BookStatus]?.label || '已读完'}
           </span>
         </div>

        {/* 评分 */}
        {book.rating && (
          <div className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-2 py-1">
            <StarRating rating={book.rating} />
          </div>
        )}
      </div>

      {/* 书籍信息 */}
      <div className="relative z-10 p-6">
        <h3 className="text-xl font-thin tracking-wide font-serif mb-2 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors line-clamp-2">
          {book.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-thin tracking-wide font-serif">
          作者：{book.author}
        </p>

        <p className="text-gray-700 dark:text-gray-300 mb-4 font-thin tracking-wide font-serif leading-relaxed text-sm line-clamp-3">
          {book.description}
        </p>

        {/* 个人评价 */}
        {book.review && (
          <div className="mb-4 p-3 bg-gray-50/80 dark:bg-gray-700/40 rounded-lg border-l-4 border-blue-400/60 dark:border-blue-500/60">
            <p className="text-sm text-gray-700 dark:text-gray-300 font-thin tracking-wide font-serif italic">
              &ldquo;{book.review}&rdquo;
            </p>
          </div>
        )}

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {book.tags.map((tag: string) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 rounded-full font-thin tracking-wide font-serif transition-all duration-200 hover:scale-105 hover:bg-gray-200/80 dark:hover:bg-gray-600/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 阅读日期 */}
        {book.readDate && (
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
            <Clock size={14} />
            <span className="font-thin tracking-wide font-serif">
              阅读于 {new Date(book.readDate).toLocaleDateString('zh-CN')}
            </span>
          </div>
        )}

        {/* 购买链接 */}
        {book.purchaseLinks && (
          <div className="flex items-center gap-3">
            {Object.entries(book.purchaseLinks).map(([platform, url]) => (
              <Link
                key={platform}
                href={url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 rounded-lg hover:bg-gray-200/80 dark:hover:bg-gray-600/80 transition-all duration-200 font-thin tracking-wide font-serif"
              >
                <ExternalLink size={14} />
                <span>{platform === 'douban' ? '豆瓣' : '购买'}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 数据流动画线条 */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/40 dark:via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
        <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-transparent via-blue-400 dark:via-blue-500 to-transparent animate-flow-right"></div>
        <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-transparent via-cyan-400 dark:via-cyan-500 to-transparent animate-flow-right" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-transparent via-purple-400 dark:via-purple-500 to-transparent animate-flow-right" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
}

// 内部组件处理书籍逻辑
function BooksContent() {
  const { books } = siteConfig;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);

  // 过滤书籍
  useEffect(() => {
    if (!books?.items) return;
    
    let filtered = books.items;

    // 按分类过滤
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    // 按搜索词过滤
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredBooks(filtered);
  }, [selectedCategory, searchTerm, books?.items]);

  // 初始化过滤的书籍列表
  useEffect(() => {
    if (books?.items && filteredBooks.length === 0) {
      setFilteredBooks(books.items);
    }
  }, [books?.items, filteredBooks.length]);

  const featuredBooks = filteredBooks.filter(book => book.featured);
  const otherBooks = filteredBooks.filter(book => !book.featured);

  return (
    <>
      <NavigationWrapper />
      
      <main className="min-h-screen bg-white dark:bg-gray-900 pt-16">
        {/* Hero Section */}
        <section className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-thin tracking-widest font-serif mb-4">{books.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-thin tracking-widest font-serif italic">
              {books.description}
            </p>
          </div>
          
          {/* 背景粒子动画 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-blue-400/20 dark:bg-blue-500/20 rounded-full animate-float`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              ></div>
            ))}
          </div>
        </section>

        {/* 搜索和过滤 */}
        <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200/60 dark:border-gray-700/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* 搜索框 */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="搜索书籍、作者或标签..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200/60 dark:border-gray-700/60 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-thin tracking-wide font-serif focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/60 transition-colors"
                />
              </div>

              {/* 分类过滤 */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter size={20} className="text-gray-500 dark:text-gray-400" />
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-thin tracking-wide font-serif transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  全部
                </button>
                {books.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-thin tracking-wide font-serif transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 精选书籍 */}
        {featuredBooks.length > 0 && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-thin tracking-[0.1em] font-serif mb-12 text-center text-gray-900 dark:text-white">
                精选推荐
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                 {featuredBooks.map((book, index) => (
                   <BookCard key={book.id} book={book as BookItem} index={index} />
                 ))}
              </div>
            </div>
          </section>
        )}

        {/* 其他书籍 */}
        {otherBooks.length > 0 && (
          <section className="py-16 bg-gray-50/50 dark:bg-gray-800/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-thin tracking-[0.1em] font-serif mb-12 text-center text-gray-900 dark:text-white">
                我的书单
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                 {otherBooks.map((book, index) => (
                   <BookCard key={book.id} book={book as BookItem} index={index} />
                 ))}
              </div>
            </div>
          </section>
        )}

        {/* 空状态 */}
        {filteredBooks.length === 0 && (
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Book size={64} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <h3 className="text-xl font-thin tracking-wide font-serif text-gray-600 dark:text-gray-400 mb-2">
                没有找到相关书籍
              </h3>
              <p className="text-gray-500 dark:text-gray-500 font-thin tracking-wide font-serif">
                尝试调整搜索条件或选择其他分类
              </p>
            </div>
          </section>
        )}

        {/* Comments Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Comments 
              pageId="books"
              pageTitle="书籍"
              pageUrl="/books"
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default function BooksPage() {
  // 如果书籍功能未启用，返回 null
  if (!siteConfig.books?.enabled) {
    return null;
  }

  return <BooksContent />;
} 