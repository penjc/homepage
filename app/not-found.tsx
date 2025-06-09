import Link from 'next/link';
import { siteConfig } from '../site.config';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        {/* 404动画图标 */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-gray-300 dark:text-gray-600 mb-4">
            404
          </div>
          <div className="text-6xl mb-4">🔍</div>
        </div>

        {/* 错误信息 */}
        <h1 className="text-3xl font-thin tracking-widest font-serif text-gray-900 dark:text-white mb-4">
          页面未找到
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-thin tracking-wide font-serif">
          抱歉，您访问的页面不存在。
        </p>

        {/* 操作按钮 */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            返回首页
          </Link>
          
          <div className="flex gap-4">
            <Link
              href="/blog"
              className="flex-1 text-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              博客
            </Link>
            <Link
              href="/thoughts"
              className="flex-1 text-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              随笔
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
} 