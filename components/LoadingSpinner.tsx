import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'pulse' | 'dots' | 'wave';
  className?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'spinner',
  className = '',
  text
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const renderSpinner = () => {
    switch (variant) {
      case 'spinner':
        return (
          <div className={`${sizeClasses[size]} border-2 border-gray-200/30 border-t-gray-900 rounded-full animate-spin dark:border-gray-700/30 dark:border-t-gray-100`} />
        );
      
      case 'pulse':
        return (
          <div className={`${sizeClasses[size]} bg-gray-900 rounded-full animate-pulse dark:bg-gray-100`} />
        );
      
      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : size === 'lg' ? 'w-3 h-3' : 'w-4 h-4'} bg-gray-900 rounded-full animate-bounce dark:bg-gray-100`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        );
      
      case 'wave':
        return (
          <div className="flex space-x-1 items-end">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`${size === 'sm' ? 'w-0.5 h-3' : size === 'md' ? 'w-0.5 h-4' : size === 'lg' ? 'w-1 h-6' : 'w-1 h-8'} bg-gray-900 rounded-full dark:bg-gray-100`}
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  animation: 'wave 1s ease-in-out infinite'
                }}
              />
            ))}
          </div>
        );
      
      default:
        return (
          <div className={`${sizeClasses[size]} border-2 border-gray-200/30 border-t-gray-900 rounded-full animate-spin dark:border-gray-700/30 dark:border-t-gray-100`} />
        );
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      {renderSpinner()}
      {text && (
        <p className={`${textSizeClasses[size]} text-gray-600 dark:text-gray-400 font-thin tracking-[0.05em] font-serif`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner; 