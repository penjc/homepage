'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../site.config';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  basePath?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  basePath = '/blog/page'
}: PaginationProps) {
  const router = useRouter();
  const [jumpPage, setJumpPage] = useState('');

  const maxVisiblePages = siteConfig.blog.pagination.maxVisiblePages;

  // 构建页面URL的辅助函数
  const buildPageUrl = (page: number) => {
    return `${basePath}/${page}`;
  };

  // 处理页码跳转
  const handleJumpToPage = () => {
    const pageNumber = parseInt(jumpPage, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      router.push(buildPageUrl(pageNumber));
      setJumpPage('');
    }
  };

  // 处理回车键跳转
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleJumpToPage();
    }
  };

  // 生成页码范围
  const getPageNumbers = () => {
    const pages: number[] = [];
    
    if (totalPages <= maxVisiblePages) {
      // 如果总页数不多，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 复杂的分页逻辑
      if (currentPage <= 3) {
        // 当前页在前面
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(-1); // 省略号
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // 当前页在后面
        pages.push(1);
        pages.push(-1); // 省略号
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // 当前页在中间
        pages.push(1);
        pages.push(-1); // 省略号
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-2); // 省略号
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex justify-center items-center mt-12 space-x-4">
      {/* 归档链接 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/blog/archive"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white dark:bg-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-thin tracking-wide font-serif"
          title="查看博客归档"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          归档
        </Link>
      </motion.div>

      {/* 分页导航 */}
      <div className="flex items-center space-x-2">
        {/* 上一页 */}
        {hasPrevPage ? (
          <Link
            href={buildPageUrl(currentPage - 1)}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-l-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-thin tracking-wide font-serif"
          >
            上一页
          </Link>
        ) : (
          <span className="px-3 py-2 text-sm font-medium text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l-md cursor-not-allowed font-thin tracking-wide font-serif">
            上一页
          </span>
        )}

        {/* 页码 */}
        {getPageNumbers().map((pageNumber, index) => {
          if (pageNumber === -1 || pageNumber === -2) {
            // 省略号
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif"
              >
                ...
              </span>
            );
          }

          const isCurrentPage = pageNumber === currentPage;
          
          return (
            <Link
              key={pageNumber}
              href={buildPageUrl(pageNumber)}
              className={`px-3 py-2 text-sm font-medium border transition-colors font-thin tracking-wide font-serif ${
                isCurrentPage
                  ? 'z-10 bg-gray-300 dark:bg-gray-600 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {pageNumber}
            </Link>
          );
        })}

        {/* 下一页 */}
        {hasNextPage ? (
          <Link
            href={buildPageUrl(currentPage + 1)}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-r-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-thin tracking-wide font-serif"
          >
            下一页
          </Link>
        ) : (
          <span className="px-3 py-2 text-sm font-medium text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-r-md cursor-not-allowed font-thin tracking-wide font-serif">
            下一页
          </span>
        )}
      </div>

      {/* 页码跳转 - 只在页数较多时显示 */}
      {totalPages > siteConfig.blog.pagination.maxVisiblePages && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-thin tracking-wide font-serif">到第</span>
            <input
                type="number"
                min={1}
                max={totalPages}
                value={jumpPage}
                onChange={(e) => setJumpPage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-12 h-8 px-2 text-center text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-thin tracking-wide font-serif
                  focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-gray-400 dark:focus:border-gray-500
                  hover:border-gray-400 dark:hover:border-gray-500
                  transition-all duration-200
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="font-thin tracking-wide font-serif">页</span>
            <button
                onClick={handleJumpToPage}
                disabled={!jumpPage || parseInt(jumpPage, 10) < 1 || parseInt(jumpPage, 10) > totalPages}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-thin tracking-wide font-serif"
            >
              确定
            </button>
          </div>
      )}
    </nav>
  );
} 