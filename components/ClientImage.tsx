'use client';

import React from 'react';
import Image from 'next/image';
import { useAssetPath, getClientAssetPath } from '../lib/useAssetPath';

interface ClientImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * 客户端图片组件
 * 自动处理GitHub Pages部署时的baseUrl路径问题
 * 适用于所有客户端组件场景
 */
const ClientImage: React.FC<ClientImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
  style,
  onClick,
  onLoad,
  onError
}) => {
  // 使用Hook自动处理路径
  const processedSrc = useAssetPath(src);

  return (
    <Image
      src={processedSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      sizes={sizes}
      className={className}
      style={style}
      priority={priority}
      onClick={onClick}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

/**
 * 简化版本的客户端图片组件
 * 使用函数而非Hook来处理路径，性能更好但不会响应路径变化
 */
export const ClientImageSimple: React.FC<ClientImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
  style,
  onClick,
  onLoad,
  onError
}) => {
  // 使用函数直接处理路径
  const processedSrc = getClientAssetPath(src);

  return (
    <Image
      src={processedSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      sizes={sizes}
      className={className}
      style={style}
      priority={priority}
      onClick={onClick}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default ClientImage; 