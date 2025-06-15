/** @type {import('next').NextConfig} */
const nextConfig = {
  // 支持静态导出（用于GitHub Pages）
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // 图片配置
  images: {
    unoptimized: true, // 静态导出时需要
    domains: [
      'y.gtimg.cn',
      'images.unsplash.com',
      'avatars.githubusercontent.com',
    ],
    remotePatterns: [
      {
        protocol: 'https', 
        hostname: '**.gtimg.cn',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  
  // 环境变量配置
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // 注意：使用 output: 'export' 时不能使用 headers() 和 redirects()
  // 如果需要这些功能，请移除 output: 'export' 配置
};

module.exports = nextConfig; 