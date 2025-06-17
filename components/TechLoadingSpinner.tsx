import React from 'react';

interface TechLoadingSpinnerProps {
  className?: string;
  showText?: boolean;
  text?: string;
}

const TechLoadingSpinner: React.FC<TechLoadingSpinnerProps> = ({
  className = '',
  showText = true,
  text = '正在加载'
}) => {
  return (
    <div className={`flex flex-col items-center space-y-6 ${className}`}>
      {/* 只保留核心转圈 */}
      <div className="w-8 h-8 border-2 border-gray-200/30 border-t-gray-900 rounded-full animate-spin dark:border-gray-700/30 dark:border-t-gray-100"></div>
      
      {/* 可选文本 */}
      {showText && (
        <p className="text-sm font-thin tracking-[0.1em] font-serif text-gray-600 dark:text-gray-400">
          {text}
        </p>
      )}
    </div>
  );
};

export default TechLoadingSpinner; 