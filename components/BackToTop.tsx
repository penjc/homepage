'use client';

import { useState, useEffect } from 'react';

interface BackToTopProps {
  showOnHomepage?: boolean; // 在首页是否显示
  threshold?: number; // 显示阈值（滚动多少像素后显示）
}

export default function BackToTop({ 
  showOnHomepage = true, 
  threshold = 300 
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHomepage, setIsHomepage] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // 检查是否是首页
    setIsHomepage(window.location.pathname === '/');
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.pageYOffset;
      
      if (isHomepage && !showOnHomepage) {
        // 在首页且设置不显示时，检查是否滚动到了最近博客部分
        // 首页封面是 min-h-screen，检查是否滚动超过了视窗高度的大部分
        const viewportHeight = window.innerHeight;
        // 当滚动超过视窗高度的70%时显示（即将进入博客部分）
        setIsVisible(scrollY > viewportHeight * 0.7);
      } else if (isHomepage && showOnHomepage) {
        // 在首页且允许显示时，滚动超过阈值就显示
        setIsVisible(scrollY > threshold);
      } else {
        // 非首页，滚动超过阈值就显示
        setIsVisible(scrollY > threshold);
      }
    };

    let scrollTimer: NodeJS.Timeout;
    
    // 添加滚动监听，使用 requestAnimationFrame 优化性能
    let ticking = false;
    const handleScroll = () => {
      // 设置正在滚动状态
      setIsScrolling(true);
      
      // 清除之前的定时器
      clearTimeout(scrollTimer);
      
      // 设置新的定时器，1秒后隐藏按钮（如果没有悬浮）
      scrollTimer = setTimeout(() => {
        if (!isHovered) {
          setIsScrolling(false);
        }
      }, 1000);
      
      if (!ticking) {
        requestAnimationFrame(() => {
          toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 初始检查
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, [threshold, showOnHomepage, isHomepage, isHovered]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const shouldShow = isVisible && (isScrolling || isHovered);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // 鼠标离开后，1秒后隐藏按钮
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        fixed bottom-6 right-6 z-50
        w-12 h-12
        bg-gray-100/80 dark:bg-gray-800/80
        text-gray-600 dark:text-gray-400
        rounded-full
        backdrop-blur-sm
        border border-gray-200/50 dark:border-gray-700/50
        shadow-sm hover:shadow-md
        transition-all duration-500 ease-in-out
        hover:bg-gray-200/90 dark:hover:bg-gray-700/90
        hover:text-gray-800 dark:hover:text-gray-200
        hover:border-gray-300/60 dark:hover:border-gray-600/60
        hover:scale-105
        flex items-center justify-center
        group
        ${shouldShow 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-2 pointer-events-none'
        }
      `}
      title="回到顶部"
      aria-label="回到顶部"
    >
      <svg
        className="w-5 h-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
} 