'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageWithLoadingProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const ImageWithLoading: React.FC<ImageWithLoadingProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
  objectFit = 'cover',
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const baseClassName = `transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`;
  const combinedClassName = `${baseClassName} ${className}`;

  return (
    <div className="relative">
      {/* 简约Loading状态 - 只有转圈 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="w-6 h-6 border-2 border-gray-200/30 border-t-gray-900 rounded-full animate-spin dark:border-gray-700/30 dark:border-t-gray-100"></div>
        </div>
      )}

      {/* 图片 */}
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          sizes={sizes}
          className={combinedClassName}
          style={fill ? undefined : { objectFit }}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* 简化错误处理 - 图片加载失败时直接隐藏 */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900"></div>
      )}
    </div>
  );
};

export default ImageWithLoading; 