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

    // 添加滚动监听，使用 requestAnimationFrame 优化性能
    let ticking = false;
    const handleScroll = () => {
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
    };
  }, [threshold, showOnHomepage, isHomepage]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50
        w-12 h-12
        bg-gray-800 dark:bg-gray-200
        text-white dark:text-gray-800
        rounded-full
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-in-out
        hover:bg-gray-700 dark:hover:bg-gray-300
        hover:scale-110
        flex items-center justify-center
        group
      `}
      title="回到顶部"
      aria-label="回到顶部"
    >
      <svg
        className="w-6 h-6 transition-transform duration-200 group-hover:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
} 