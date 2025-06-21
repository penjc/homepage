import React, { Suspense } from 'react';
import SkeletonLoader from './SkeletonLoader';

interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  loadingText?: string;
  skeleton?: 'card' | 'list' | 'text' | 'avatar' | 'post';
  skeletonCount?: number;
}

const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({
  children,
  fallback,
  className = '',
  loadingText = '加载中...',
  skeleton,
  skeletonCount = 3
}) => {
  const defaultFallback = skeleton ? (
    <div className={`py-8 ${className}`}>
      <SkeletonLoader variant={skeleton} count={skeletonCount} />
    </div>
  ) : (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">{loadingText}</p>
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper; 