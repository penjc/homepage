import { siteConfig } from '../site.config';

/**
 * 获取静态资源的完整路径
 * 在 GitHub Pages 部署时自动添加 basePath 前缀
 */
export function getAssetPath(path: string): string {
  // 如果是外部链接，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 在生产环境且为 GitHub Pages 时添加 basePath
  const isProd = process.env.NODE_ENV === 'production';
  const isGithubPages = process.env.GITHUB_PAGES === 'true';
  
  if (isProd && isGithubPages) {
    const baseUrl = siteConfig.deployment?.baseUrl || '';
    return `${baseUrl}${normalizedPath}`;
  }
  
  return normalizedPath;
}

/**
 * 获取网站的基础 URL
 */
export function getBaseUrl(): string {
  const isProd = process.env.NODE_ENV === 'production';
  const isGithubPages = process.env.GITHUB_PAGES === 'true';
  
  if (isProd && isGithubPages) {
    const baseUrl = siteConfig.deployment?.baseUrl || '';
    return `https://penjc.github.io${baseUrl}`;
  }
  
  return 'http://localhost:4000';
} 