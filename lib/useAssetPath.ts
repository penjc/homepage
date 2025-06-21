'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from '../site.config';

/**
 * 客户端Hook：获取静态资源路径
 * 支持GitHub Pages部署时的baseUrl处理
 */
export function useAssetPath(path: string): string {
  const [assetPath, setAssetPath] = useState(path);

  useEffect(() => {
    // 如果是外部链接，直接返回
    if (path.startsWith('http://') || path.startsWith('https://')) {
      setAssetPath(path);
      return;
    }

    // 确保路径以 / 开头
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    // 检查是否在GitHub Pages环境
    const currentPath = window.location.pathname;
    const baseUrl = siteConfig.deployment?.baseUrl || '';

    // 如果当前路径包含baseUrl，说明在GitHub Pages环境
    if (baseUrl && currentPath.startsWith(baseUrl)) {
      setAssetPath(`${baseUrl}${normalizedPath}`);
    } else {
      setAssetPath(normalizedPath);
    }
  }, [path]);

  return assetPath;
}

/**
 * 客户端函数：获取静态资源路径（非Hook版本）
 * 适用于不需要响应式更新的场景
 */
export function getClientAssetPath(path: string): string {
  // 如果是外部链接，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // 客户端环境检查
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname;
    const baseUrl = siteConfig.deployment?.baseUrl || '';

    // 如果当前路径包含baseUrl，说明在GitHub Pages环境
    if (baseUrl && currentPath.startsWith(baseUrl)) {
      return `${baseUrl}${normalizedPath}`;
    }
  }

  return normalizedPath;
}

/**
 * 批量处理多个资源路径的Hook
 */
export function useAssetPaths(paths: string[]): string[] {
  const [assetPaths, setAssetPaths] = useState(paths);

  useEffect(() => {
    const processedPaths = paths.map(path => {
      // 如果是外部链接，直接返回
      if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
      }

      // 确保路径以 / 开头
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;

      // 检查是否在GitHub Pages环境
      const currentPath = window.location.pathname;
      const baseUrl = siteConfig.deployment?.baseUrl || '';

      // 如果当前路径包含baseUrl，说明在GitHub Pages环境
      if (baseUrl && currentPath.startsWith(baseUrl)) {
        return `${baseUrl}${normalizedPath}`;
      }

      return normalizedPath;
    });

    setAssetPaths(processedPaths);
  }, [paths]);

  return assetPaths;
} 