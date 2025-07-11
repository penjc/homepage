import './globals.css';
import '../styles/prism-theme.css';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { siteConfig } from '../site.config';
import GoogleAnalytics from '../components/GoogleAnalytics';
import AnalyticsProvider from '../components/AnalyticsProvider';
import DynamicHead from '../components/DynamicHead';

// GitHub Pages 支持已禁用
// function getServerAssetPath(path: string): string {
//   const isProd = process.env.NODE_ENV === 'production';
//   const isGithubPages = process.env.GITHUB_PAGES === 'true';
  
//   if (isProd && isGithubPages) {
//     const baseUrl = siteConfig.deployment?.baseUrl || '';
//     return `${baseUrl}${path}`;
//   }
  
//   return path;
// }

// 简化的资源路径函数
function getServerAssetPath(path: string): string {
  return path;
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : siteConfig.url
  ),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  
  // Icons configuration
  icons: {
    icon: [
      { url: getServerAssetPath('/favicon.svg'), type: 'image/svg+xml' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: getServerAssetPath('/favicon.svg'),
        color: '#3b82f6',
      },
    ],
  },
  

  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteConfig.url,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: getServerAssetPath('/favicon.svg'),
        width: 512,
        height: 512,
        alt: siteConfig.title,
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: `@${siteConfig.name}`,
    images: [getServerAssetPath('/favicon.svg')],
  },
  
  // Additional meta tags
  other: {
    'msapplication-TileColor': '#3b82f6',
    'msapplication-config': getServerAssetPath('/browserconfig.xml'),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* 字体预连接和预加载优化 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 强制加载Inter字体的所有字重 */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap" 
          as="style" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
          media="all"
        />
        
        {/* 预加载JetBrains Mono字体 */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" 
          as="style"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" 
          rel="stylesheet"  
          media="all"
        />
        
        {/* 添加内联样式确保字体立即可用 */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
            
            /* 确保字体立即可用 */
            html, body {
              font-family: 'Inter', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', sans-serif !important;
            }
          `
        }} />
        
        {/* Favicon and icons */}
        <link rel="icon" href={getServerAssetPath('/favicon.svg')} type="image/svg+xml" />
        

        
        {/* Theme and viewport */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* RSS and Atom feeds */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${siteConfig.title} RSS Feed`}
          href={getServerAssetPath('/rss.xml')}
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title={`${siteConfig.title} Atom Feed`}
          href={getServerAssetPath('/atom.xml')}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <DynamicHead />
        <GoogleAnalytics />
        <Suspense fallback={null}>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
        </Suspense>
      </body>
    </html>
  );
} 