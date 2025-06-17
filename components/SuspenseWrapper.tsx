import React, { Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';
import SkeletonLoader from './SkeletonLoader';

interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  loadingText?: string;
  variant?: 'spinner' | 'pulse' | 'dots' | 'wave';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  skeleton?: 'card' | 'list' | 'text' | 'avatar' | 'post';
  skeletonCount?: number;
}

const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({
  children,
  fallback,
  className = '',
  loadingText = '加载中...',
  variant = 'spinner',
  size = 'lg',
  skeleton,
  skeletonCount = 3
}) => {
  const defaultFallback = skeleton ? (
    <div className={`py-8 ${className}`}>
      <SkeletonLoader variant={skeleton} count={skeletonCount} />
    </div>
  ) : (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <LoadingSpinner 
        size={size}
        variant={variant}
        text={loadingText}
      />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper; 