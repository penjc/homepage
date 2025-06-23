/** @type {import('next').NextConfig} */
// GitHub Pages 部署相关配置已禁用
// const isProd = process.env.NODE_ENV === 'production';
// const isGithubPages = process.env.GITHUB_PAGES === 'true';

// 尝试读取站点配置
// let baseUrl = '';
// try {
//   const { siteConfig } = require('./site.config.ts');
//   baseUrl = siteConfig.deployment?.baseUrl || '';
// } catch (error) {
//   // 如果 site.config.ts 不存在，使用默认配置
//   console.warn('Warning: site.config.ts not found, using empty baseUrl');
//   baseUrl = '';
// }

const nextConfig = {
  // 暂时禁用静态导出以支持客户端组件
  // output: 'export',
  
  // 禁用图片优化（静态导出不支持）
  images: {
    unoptimized: true,
  },
  
  // GitHub Pages 配置已禁用
  // 配置基础路径（只有在 GitHub Pages 部署时才使用 baseUrl）
  // basePath: isProd && isGithubPages ? baseUrl : '',
  
  // 配置静态资源前缀（只有在 GitHub Pages 部署时才使用 baseUrl）
  // assetPrefix: isProd && isGithubPages && baseUrl ? `${baseUrl}/` : '',
  
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

  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },

}

module.exports = nextConfig 