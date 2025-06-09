'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  onCollapseChange?: (collapsed: boolean) => void;
}

export default function TableOfContents({ content, onCollapseChange }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    // 解析 markdown 内容，提取标题
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const tocItems: TocItem[] = [];
    let match;
    const seenIds = new Set<string>();

    // 重置正则表达式的lastIndex，确保每次都从头开始匹配
    headingRegex.lastIndex = 0;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      // 与BlogPostContent保持一致的ID生成逻辑
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
      
      tocItems.push({
        id: finalId,
        text,
        level,
      });
      
      console.log('TOC生成ID:', text, '->', finalId, 'level:', level); // 调试信息
    }

    setToc(tocItems);
    console.log('TOC解析结果:', tocItems); // 调试信息
  }, [content]);

  useEffect(() => {
    // 监听滚动事件，高亮当前标题
    const handleScroll = () => {
      const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
      let currentActiveId = '';

      // 找到当前视窗中最靠近顶部的标题
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 120) { // 调整偏移量
          currentActiveId = heading.id;
          break;
        }
      }

      // 如果没有找到活跃标题，默认选中第一个
      if (!currentActiveId && toc.length > 0) {
        currentActiveId = toc[0].id;
      }

      setActiveId(currentActiveId);
      
      // 自动滚动大纲以显示当前活跃的标题
      if (currentActiveId && !isCollapsed) {
        const activeButton = document.querySelector(`[data-toc-id="${currentActiveId}"]`);
        const tocContainer = document.querySelector('.toc-scroll-container');
        if (activeButton && tocContainer) {
          const containerRect = tocContainer.getBoundingClientRect();
          const buttonRect = activeButton.getBoundingClientRect();
          
          // 检查按钮是否在可视区域内
          const isVisible = buttonRect.top >= containerRect.top && buttonRect.bottom <= containerRect.bottom;
          
          if (!isVisible) {
            activeButton.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始调用

    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc, isCollapsed]); // 依赖toc和isCollapsed确保标题加载后才监听

  // 初始化时设置第一个标题为活跃状态
  useEffect(() => {
    if (toc.length > 0 && !activeId) {
      setActiveId(toc[0].id);
    }
  }, [toc, activeId]);

  const scrollToHeading = (id: string) => {
    console.log('尝试跳转到ID:', id); // 调试信息
    const element = document.getElementById(id);
    console.log('找到的元素:', element); // 调试信息
    if (element) {
      const yOffset = -100; // 考虑固定头部的偏移
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      console.log('跳转到位置:', y); // 调试信息
      window.scrollTo({ 
        top: y, 
        behavior: 'smooth' 
      });
      
      // 手动设置active状态，提供即时反馈
      setActiveId(id);
    } else {
      console.error('未找到ID对应的元素:', id);
    }
  };

  const handleToggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onCollapseChange) {
      onCollapseChange(newCollapsedState);
    }
  };

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-24 transition-all duration-300 ease-in-out">
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-80'
      }`}>
        {/* Header with toggle button */}
        <div className={`flex items-center p-4 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'justify-center' : 'justify-between'
        }`}>
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-thin tracking-wide font-serif text-gray-900 dark:text-white opacity-100 transition-opacity duration-300">大纲</h3>
            </div>
          )}
          <button
            onClick={handleToggleCollapse}
            className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors flex-shrink-0"
            title={isCollapsed ? '展开大纲' : '收起大纲'}
          >
            {isCollapsed ? (
              // 左三角 - 收起状态，点击展开
              <svg
                className="w-5 h-5 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            ) : (
              // 右三角 - 展开状态，点击收起
              <svg
                className="w-5 h-5 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Scrollable content */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isCollapsed ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
        }`}>
          <nav className="toc-scroll-container p-2 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            <div className="space-y-1">
              {toc.map((item, index) => (
                <button
                  key={`${item.id}-${index}`}
                  data-toc-id={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors font-thin tracking-wide font-serif ${
                    activeId === item.id
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  style={{
                    paddingLeft: `${(item.level - 1) * 0.75 + 0.75}rem`,
                  }}
                  title={item.text}
                >
                  <span className="block truncate">{item.text}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Collapsed state - show only toggle */}
        {isCollapsed && (
          <div className="p-2 transition-opacity duration-300">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 