/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出
  output: 'export',
  
  // 禁用图片优化（GitHub Pages 不支持）
  images: {
    unoptimized: true,
  },
  
  // 配置基础路径（如果需要的话）
  // basePath: '/homepage',
  
  // 禁用服务端功能
  trailingSlash: true,
  
  // 确保静态文件正确处理
  assetPrefix: '',
  
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