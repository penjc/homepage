import Link from 'next/link';
import { siteConfig } from '../site.config';
import NavigationWrapper from '../components/NavigationWrapper';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <>
      <NavigationWrapper />
      
      <main className="min-h-screen bg-white dark:bg-gray-900 pt-16 flex items-center justify-center relative overflow-hidden">
        <div className="max-w-lg mx-auto text-center px-4 relative z-10">
          {/* 404动画图标 */}
          <div className="mb-12">
            <div className="text-8xl md:text-9xl font-thin tracking-widest font-serif text-gray-300 dark:text-gray-600 mb-6 animate-pulse">
              404
            </div>
          </div>

          {/* 错误信息 */}
          <h1 className="text-3xl md:text-4xl font-thin tracking-widest font-serif text-gray-900 dark:text-white mb-6">
            页面未找到
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed font-thin tracking-wide font-serif italic">
            {/*抱歉，您访问的页面可能已被移动或删除*/}
          </p>

          {/* 操作按钮 */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg transition-all duration-200 font-thin tracking-wide font-serif"
            >
              返回首页
            </Link>
            
            <div className="flex gap-4">
              <Link
                href="/blog"
                className="flex-1 text-center bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg transition-all duration-200 font-thin tracking-wide font-serif"
              >
                博客
              </Link>
              <Link
                href="/thoughts"
                className="flex-1 text-center bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg transition-all duration-200 font-thin tracking-wide font-serif"
              >
                随笔
              </Link>
              {siteConfig.projects?.enabled && (
                <Link
                  href="/projects"
                  className="flex-1 text-center bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg transition-all duration-200 font-thin tracking-wide font-serif"
                >
                  项目
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* 背景动画点 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/6 left-1/5 w-1 h-1 bg-gray-400/15 dark:bg-gray-500/15 rounded-full animate-pulse"></div>
          <div className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-gray-400/20 dark:bg-gray-500/20 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-gray-400/10 dark:bg-gray-500/10 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/3 right-1/6 w-0.5 h-0.5 bg-gray-400/25 dark:bg-gray-500/25 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-1/6 right-1/3 w-1 h-1 bg-gray-400/15 dark:bg-gray-500/15 rounded-full animate-pulse delay-500"></div>
        </div>
      </main>
      
      <Footer />
    </>
  );
} 