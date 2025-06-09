import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '../site.config';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { footer } = siteConfig;
  
  // 生成版权年份显示
  const getCopyrightYear = () => {
    if (!footer.copyright.showCurrentYear || footer.copyright.startYear === currentYear.toString()) {
      return footer.copyright.startYear;
    }
    return `${footer.copyright.startYear} - ${currentYear}`;
  };

  // 生成公安备案链接
  const getPoliceBeianUrl = (policeCode: string) => {
    // 提取公安备案号中的数字部分
    const codeMatch = policeCode.match(/(\d+)/);
    const code = codeMatch ? codeMatch[1] : '';
    return `https://beian.mps.gov.cn/#/query/webSearch?code=${code}`;
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* 左侧版权信息 */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span>©{getCopyrightYear()} Designed By <a href="https://github.com/penjc" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400">penjc</a></span>
          </div>
          
          {/* 右侧备案信息 */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs text-gray-500 dark:text-gray-500">
            {footer.beian.police && (
              <div className="flex items-center space-x-1">
                <Image
                  src="/images/gawb.webp"
                  alt="公安备案"
                  width={16}
                  height={16}
                  className="inline-block"
                />
                <a 
                  href={getPoliceBeianUrl(footer.beian.police)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  {footer.beian.police}
                </a>
              </div>
            )}
            {footer.beian.icp && (
              <div className="flex items-center space-x-1">
                <a 
                  href="https://beian.miit.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  {footer.beian.icp}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
} 