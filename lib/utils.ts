// import { siteConfig } from '../site.config'; // GitHub Pages 支持已禁用

/**
 * 获取静态资源的完整路径（服务端版本）
 * 在 GitHub Pages 部署时自动添加 basePath 前缀
 */
export function getAssetPath(path: string): string {
  // 如果是外部链接，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // GitHub Pages 支持已禁用
  // const isProd = process.env.NODE_ENV === 'production';
  // const isGithubPages = process.env.GITHUB_PAGES === 'true';
  
  // if (isProd && isGithubPages) {
  //   const baseUrl = siteConfig.deployment?.baseUrl || '';
  //   return `${baseUrl}${normalizedPath}`;
  // }
  
  return normalizedPath;
}

/**
 * 获取静态资源的完整路径（客户端版本）
 * 通过检查当前页面URL来判断是否在GitHub Pages环境
 */
export function getClientAssetPath(path: string): string {
  // 如果是外部链接，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // GitHub Pages 支持已禁用
  // if (typeof window !== 'undefined') {
  //   const currentPath = window.location.pathname;
  //   const baseUrl = siteConfig.deployment?.baseUrl || '';
    
  //   // 如果当前路径包含baseUrl，说明在GitHub Pages环境
  //   if (baseUrl && currentPath.startsWith(baseUrl)) {
  //     return `${baseUrl}${normalizedPath}`;
  //   }
  // }
  
  return normalizedPath;
}

/**
 * 通用的资源路径获取函数
 * 自动检测环境并使用相应的方法
 */
export function getUniversalAssetPath(path: string): string {
  // 服务端环境使用原有逻辑
  if (typeof window === 'undefined') {
    return getAssetPath(path);
  }
  
  // 客户端环境使用新逻辑
  return getClientAssetPath(path);
}

/**
 * 获取网站的基础 URL
 */
export function getBaseUrl(): string {
  // GitHub Pages 支持已禁用，直接返回本地开发地址
  // const isProd = process.env.NODE_ENV === 'production';
  // const isGithubPages = process.env.GITHUB_PAGES === 'true';
  
  // if (isProd && isGithubPages) {
  //   const baseUrl = siteConfig.deployment?.baseUrl || '';
  //   return `https://penjc.github.io${baseUrl}`;
  // }
  
  return 'http://localhost:4000';
}

/**
 * 格式化日期为中文格式，确保服务端和客户端一致
 */
export function formatChineseDate(dateString: string): {
  monthDay: string;
  year: string;
} {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  
  return {
    monthDay: `${month}月${day}日`,
    year: year.toString()
  };
} 