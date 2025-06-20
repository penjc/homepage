'use client';

import { useEffect, useState, useCallback } from 'react';

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
  const [isManualScroll, setIsManualScroll] = useState<boolean>(false);

  // 直接从DOM中扫描标题元素来构建大纲
  const scanHeadingsFromDOM = useCallback(() => {
    const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
    const tocItems: TocItem[] = [];

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.substring(1)); // h1 -> 1, h2 -> 2, etc.
      const text = heading.textContent?.trim() || '';
      const id = heading.id;

      if (id && text) {
        tocItems.push({
          id,
          text,
          level,
        });
      }
    });

    setToc(tocItems);
  }, []);

  // 监听内容变化，重新扫描标题
  useEffect(() => {
    if (!content) return;

    // 等待ReactMarkdown渲染完成后再扫描
    const timer = setTimeout(() => {
      scanHeadingsFromDOM();
    }, 200); // 增加延迟，确保DOM完全渲染

    return () => clearTimeout(timer);
  }, [content, scanHeadingsFromDOM]);

  // 监听DOM变化，当内容更新时重新扫描
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      let shouldRescan = false;
      
      mutations.forEach((mutation) => {
        // 检查是否有新的标题元素被添加
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.matches('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]') ||
                  element.querySelector('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')) {
                shouldRescan = true;
              }
            }
          });
        }
      });
      
      if (shouldRescan) {
        // 延迟重新扫描，避免频繁操作
        setTimeout(() => {
          scanHeadingsFromDOM();
        }, 300);
      }
    });

    // 监听文档变化
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, [scanHeadingsFromDOM]);

  // 滚动大纲到指定标题位置
  const scrollTocToActiveItem = useCallback((activeId: string) => {
    if (isCollapsed || !activeId) return;

    const tocContainer = document.querySelector('.toc-scroll-container');
    const activeButton = document.querySelector(`[data-toc-id="${activeId}"]`);
    
    if (tocContainer && activeButton) {
      const containerRect = tocContainer.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      
      // 计算按钮是否在可视区域内，留出一些边距
      const margin = 40; // 距离边缘的最小距离
      const isVisible = 
        buttonRect.top >= containerRect.top + margin && 
        buttonRect.bottom <= containerRect.bottom - margin;
      
      // 只有当按钮不在可视区域时才滚动
      if (!isVisible) {
        // 计算按钮相对于容器的位置
        const buttonTopRelativeToContainer = buttonRect.top - containerRect.top + tocContainer.scrollTop;
        
        // 计算目标滚动位置（将按钮居中显示）
        const containerHeight = containerRect.height;
        const targetScrollTop = buttonTopRelativeToContainer - (containerHeight / 2) + (buttonRect.height / 2);
        
        // 使用更快的滚动动画
        tocContainer.scrollTo({
          top: Math.max(0, targetScrollTop),
          behavior: 'smooth'
        });
      }
    }
  }, [isCollapsed]);

  // 使用防抖处理滚动事件
  const handleScroll = useCallback(() => {
    // 如果是手动滚动跳转，暂时忽略滚动监听
    if (isManualScroll) {
      return;
    }

    const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
    let currentActiveId = '';

    // 找到当前视窗中最靠近顶部的标题
    for (let i = headings.length - 1; i >= 0; i--) {
      const heading = headings[i];
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 150) {
        currentActiveId = heading.id;
        break;
      }
    }

    // 如果没有找到活跃标题，默认选中第一个
    if (!currentActiveId && toc.length > 0) {
      currentActiveId = toc[0].id;
    }

    // 更新活跃状态
    const previousActiveId = activeId;
    setActiveId(currentActiveId);

    // 如果活跃标题发生变化，立即滚动大纲到新的位置（但不在手动滚动期间）
    if (currentActiveId && currentActiveId !== previousActiveId && !isManualScroll) {
      // 使用requestAnimationFrame确保DOM更新后再滚动
      requestAnimationFrame(() => {
        scrollTocToActiveItem(currentActiveId);
      });
    }
  }, [isManualScroll, toc, activeId, scrollTocToActiveItem]);

  useEffect(() => {
    // 使用requestAnimationFrame来优化滚动性能，实现实时响应
    let ticking = false;
    
    const smoothHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', smoothHandleScroll, { passive: true });
    smoothHandleScroll(); // 初始调用

    return () => {
      window.removeEventListener('scroll', smoothHandleScroll);
    };
  }, [handleScroll]);

  // 初始化时设置第一个标题为活跃状态
  useEffect(() => {
    if (toc.length > 0 && !activeId) {
      const firstId = toc[0].id;
      setActiveId(firstId);
      
      // 初始化时也滚动大纲到正确位置
      requestAnimationFrame(() => {
        scrollTocToActiveItem(firstId);
      });
    }
  }, [toc, activeId, scrollTocToActiveItem]);

  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    
    if (element) {
      // 设置手动滚动标志，防止滚动监听器干扰
      setIsManualScroll(true);
      
      // 立即设置活跃状态
      setActiveId(id);
      
      const yOffset = -100; // 考虑固定头部的偏移
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ 
        top: y, 
        behavior: 'smooth' 
      });
      
      // 滚动完成后重新启用滚动监听
      setTimeout(() => {
        setIsManualScroll(false);
      }, 1000);
    } else {
      // 如果找不到元素，重新扫描DOM
      console.warn('Element not found, rescanning DOM...', id);
      scanHeadingsFromDOM();
      
      // 重新扫描后再次尝试
      setTimeout(() => {
        const retryElement = document.getElementById(id);
        if (retryElement) {
          setIsManualScroll(true);
          setActiveId(id);
          
          const yOffset = -100;
          const y = retryElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({ 
            top: y, 
            behavior: 'smooth' 
          });
          
          setTimeout(() => {
            setIsManualScroll(false);
          }, 1000);
        } else {
          console.error('Element still not found after rescan:', id);
        }
      }, 100);
    }
  }, [scanHeadingsFromDOM]);

  const handleToggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onCollapseChange) {
      onCollapseChange(newCollapsedState);
    }
    
    // 如果展开大纲，延迟滚动到当前活跃项
    if (!newCollapsedState && activeId) {
      setTimeout(() => {
        scrollTocToActiveItem(activeId);
      }, 300); // 稍微减少等待时间，更快响应
    }
  };

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-24 transition-all duration-300 ease-in-out z-10">
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
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    scrollToHeading(item.id);
                  }}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors font-thin tracking-wide font-serif cursor-pointer ${
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