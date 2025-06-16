/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  // 启用静态导出
  output: 'export',
  
  // 禁用图片优化（GitHub Pages 不支持）
  images: {
    unoptimized: true,
  },
  
  // 配置基础路径（仅在 GitHub Pages 部署时使用）
  basePath: isProd && isGithubPages ? '/homepage' : '',
  
  // 配置静态资源前缀（仅在 GitHub Pages 部署时使用）
  assetPrefix: isProd && isGithubPages ? '/homepage/' : '',
  
  // 禁用服务端功能
  trailingSlash: true,
  
  // 配置构建输出
  distDir: '.next',
  
  // 配置 TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // 配置 ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig 