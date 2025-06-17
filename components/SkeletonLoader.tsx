import React from 'react';

interface SkeletonLoaderProps {
  variant?: 'card' | 'list' | 'text' | 'avatar' | 'post';
  count?: number;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'text',
  count = 1,
  className = ''
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className={`card p-6 space-y-4 ${className}`}>
            <div className="skeleton h-6 w-3/4"></div>
            <div className="skeleton-text w-full"></div>
            <div className="skeleton-text w-5/6"></div>
            <div className="skeleton-text w-4/6"></div>
            <div className="flex space-x-2 mt-4">
              <div className="skeleton h-6 w-16"></div>
              <div className="skeleton h-6 w-20"></div>
            </div>
          </div>
        );

      case 'list':
        return (
          <div className={`space-y-4 ${className}`}>
            <div className="flex items-center space-x-4">
              <div className="skeleton h-12 w-12 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="skeleton-text w-3/4"></div>
                <div className="skeleton-text-sm w-1/2"></div>
              </div>
            </div>
          </div>
        );

      case 'avatar':
        return (
          <div className={`skeleton rounded-full ${className}`} 
               style={{ width: '160px', height: '160px' }}>
          </div>
        );

      case 'post':
        return (
          <article className={`border-b border-gray-200/60 dark:border-gray-700/60 pb-8 ${className}`}>
            <div className="flex items-start gap-6">
              {/* Date skeleton */}
              <div className="flex-shrink-0 w-20 text-center space-y-2">
                <div className="skeleton-text-sm w-12 mx-auto"></div>
                <div className="skeleton-text-sm w-8 mx-auto"></div>
              </div>

              {/* Content skeleton */}
              <div className="flex-1 min-w-0 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="skeleton h-6 w-20"></div>
                  <div className="skeleton-text-sm w-16"></div>
                </div>
                <div className="skeleton h-8 w-4/5"></div>
                <div className="space-y-2">
                  <div className="skeleton-text w-full"></div>
                  <div className="skeleton-text w-3/4"></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="skeleton h-6 w-12"></div>
                  <div className="skeleton h-6 w-16"></div>
                  <div className="skeleton h-6 w-14"></div>
                </div>
              </div>
            </div>
          </article>
        );

      case 'text':
      default:
        return (
          <div className={`space-y-2 ${className}`}>
            <div className="skeleton-text w-full"></div>
            <div className="skeleton-text w-5/6"></div>
            <div className="skeleton-text w-4/6"></div>
          </div>
        );
    }
  };

  return (
    <div className="fade-in">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={count > 1 ? 'mb-6' : ''}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader; 