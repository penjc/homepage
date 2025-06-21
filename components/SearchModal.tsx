'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, Search } from 'lucide-react';
import { BlogPost, Thought } from '../lib/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPost[];
  thoughts: Thought[];
}

type SearchResult = {
  type: 'blog' | 'thought';
  item: BlogPost | Thought;
  highlights: string[];
};

export default function SearchModal({ isOpen, onClose, posts, thoughts }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 组件挂载状态
  useEffect(() => {
    setMounted(true);
  }, []);

  // 当模态框打开时聚焦输入框
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // ESC键关闭模态框
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // 搜索函数
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const searchResults: SearchResult[] = [];
    const lowercaseQuery = searchQuery.toLowerCase();

    // 搜索博客
    posts.forEach((post) => {
      const titleMatch = post.title.toLowerCase().includes(lowercaseQuery);
      const excerptMatch = post.excerpt.toLowerCase().includes(lowercaseQuery);
      const contentMatch = post.content?.toLowerCase().includes(lowercaseQuery);
      const tagsMatch = post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery));
      const categoryMatch = post.category.toLowerCase().includes(lowercaseQuery);

      if (titleMatch || excerptMatch || contentMatch || tagsMatch || categoryMatch) {
        const highlights: string[] = [];
        if (titleMatch) highlights.push('标题');
        if (excerptMatch) highlights.push('摘要');
        if (contentMatch) highlights.push('内容');
        if (tagsMatch) highlights.push('标签');
        if (categoryMatch) highlights.push('分类');

        searchResults.push({
          type: 'blog',
          item: post,
          highlights
        });
      }
    });

    // 搜索随笔
    thoughts.forEach((thought) => {
      const contentMatch = thought.content.toLowerCase().includes(lowercaseQuery);
      const tagsMatch = thought.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery));

      if (contentMatch || tagsMatch) {
        const highlights: string[] = [];
        if (contentMatch) highlights.push('内容');
        if (tagsMatch) highlights.push('标签');

        searchResults.push({
          type: 'thought',
          item: thought,
          highlights
        });
      }
    });

    // 按类型和日期排序
    searchResults.sort((a, b) => {
      // 博客在前，随笔在后
      if (a.type !== b.type) {
        return a.type === 'blog' ? -1 : 1;
      }
      // 相同类型按日期排序
      const dateA = new Date(a.item.date).getTime();
      const dateB = new Date(b.item.date).getTime();
      return dateB - dateA;
    });

    setResults(searchResults);
    setIsSearching(false);
  };

  // 防抖搜索
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, posts, thoughts]);

  // 高亮搜索词
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark 
          key={index} 
          className="bg-yellow-100 dark:bg-yellow-900/40 text-gray-900 dark:text-gray-100 font-medium px-1 py-0.5 rounded"
        >
          {part}
        </mark>
      ) : part
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* 背景遮罩 - 简约设计 */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />
      
      {/* 搜索框 - 简约设计 */}
      <div className="relative w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* 搜索输入区域 */}
          <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
            {/* 搜索图标 */}
            <Search className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
            
            {/* 输入框 */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索博客和随笔..."
              className="flex-1 bg-transparent outline-none text-base text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-thin tracking-wide"
            />
            
            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              className="ml-3 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 搜索结果区域 */}
          <div className="max-h-96 overflow-y-auto">
            {isSearching ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-thin tracking-wide">搜索中...</span>
                </div>
              </div>
            ) : query.trim() === '' ? (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400 font-thin tracking-wide">输入关键词开始搜索</p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400 font-thin tracking-wide">未找到相关内容</p>
              </div>
            ) : (
              <div className="p-2">
                {results.map((result, index) => (
                  <div key={index} className="mb-1 last:mb-0">
                    {result.type === 'blog' ? (
                      <Link
                        href={`/blog/${(result.item as BlogPost).slug}`}
                        onClick={onClose}
                        className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded font-thin tracking-wide">
                            博客
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-thin tracking-wide">
                            匹配: {result.highlights.join(', ')}
                          </span>
                        </div>
                        <h3 className="font-medium mb-2 text-gray-900 dark:text-gray-100 leading-snug font-thin tracking-wide">
                          {highlightText((result.item as BlogPost).title, query)}
                        </h3>
                        <p className="text-sm line-clamp-2 leading-relaxed text-gray-600 dark:text-gray-400 mb-2 font-thin tracking-wide">
                          {highlightText((result.item as BlogPost).excerpt, query)}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                          <span className="font-thin tracking-wide">{(result.item as BlogPost).category}</span>
                          <span>•</span>
                          <span className="font-thin tracking-wide">{new Date(result.item.date).toLocaleDateString('zh-CN')}</span>
                        </div>
                      </Link>
                    ) : (
                      <Link
                        href={`/thoughts?from=search#${(result.item as Thought).id || `thought-${result.item.date}-0`}`}
                        onClick={(e) => {
                          onClose();
                          
                          // 检查是否在同一页面
                          if (window.location.pathname === '/thoughts') {
                            e.preventDefault();
                            const thoughtId = (result.item as Thought).id || `thought-${result.item.date}-0`;
                            
                            // 更新URL hash并添加搜索标识
                            window.history.pushState(null, '', `/thoughts?from=search#${thoughtId}`);
                            
                            // 手动触发 hashchange 事件
                            window.dispatchEvent(new HashChangeEvent('hashchange'));
                          }
                        }}
                        className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded font-thin tracking-wide">
                            随笔
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-thin tracking-wide">
                            匹配: {result.highlights.join(', ')}
                          </span>
                          <span className="text-base">{(result.item as Thought).mood}</span>
                        </div>
                        <p className="text-sm line-clamp-2 leading-relaxed text-gray-600 dark:text-gray-400 mb-2 font-thin tracking-wide">
                          {highlightText((result.item as Thought).content, query)}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                          <span className="font-thin tracking-wide">{new Date(result.item.date).toLocaleDateString('zh-CN')}</span>
                          {(result.item as Thought).tags.length > 0 && (
                            <>
                              <span>•</span>
                              <span className="font-thin tracking-wide">{(result.item as Thought).tags.join(', ')}</span>
                            </>
                          )}
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 底部状态栏 */}
          {results.length > 0 && (
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center text-sm text-gray-600 dark:text-gray-400 font-thin tracking-wide">
                找到 {results.length} 个结果
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 