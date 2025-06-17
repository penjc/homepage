'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import TechLoadingSpinner from './TechLoadingSpinner';

interface PageLoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
}

const PageLoadingContext = createContext<PageLoadingContextType | undefined>(undefined);

export const usePageLoading = () => {
  const context = useContext(PageLoadingContext);
  if (!context) {
    throw new Error('usePageLoading must be used within PageLoadingProvider');
  }
  return context;
};

interface PageLoadingProviderProps {
  children: React.ReactNode;
}

export const PageLoadingProvider: React.FC<PageLoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();

  // 监听路由变化
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // 最小加载时间，防止闪烁

    return () => clearTimeout(timer);
  }, [pathname, isInitialLoad]);

  // 初始加载时的处理
  useEffect(() => {
    const handleLoad = () => {
      setIsInitialLoad(false);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const contextValue: PageLoadingContextType = {
    isLoading,
    setLoading,
    startLoading,
    stopLoading
  };

  return (
    <PageLoadingContext.Provider value={contextValue}>
      {/* 全屏Loading遮罩 */}
      {(isLoading || isInitialLoad) && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex items-center justify-center transition-all duration-500">
          <TechLoadingSpinner 
            showText={false}
          />
        </div>
      )}
      
      {children}
    </PageLoadingContext.Provider>
  );
};

export default PageLoadingProvider; 