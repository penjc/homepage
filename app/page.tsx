import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '../site.config';
import { getRecentPosts } from '../lib/blog';
import Footer from '../components/Footer';
import { getAssetPath } from '../lib/utils';

export default function HomePage() {
  const recentPosts = getRecentPosts(siteConfig.blog.homepage.recentPostsCount);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 垂直居中的单列布局 */}
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-40 h-40 relative">
                <Image
                  src={getAssetPath(siteConfig.profile.avatar)}
                  alt={siteConfig.name}
                  width={160}
                  height={160}
                  className="w-40 h-40 rounded-full object-cover border-2 border-gray-200/50 dark:border-gray-700/50 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* Name and Bio */}
            <div className="space-y-6 max-w-3xl">
              <h1 className="text-6xl md:text-7xl font-thin tracking-[0.2em] font-serif italic text-gray-900 dark:text-white">
                {siteConfig.name}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-thin tracking-[0.1em] font-serif leading-relaxed">
                {siteConfig.profile.bio}
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="flex items-center justify-center gap-8 pt-4">
              {siteConfig.hero.quickLinks.map((link, index) => {
                // 为不同链接分配图标
                const getIcon = (href: string) => {
                  if (href.includes('blog')) {
                    return (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                      </svg>
                    );
                  } else if (href.includes('thoughts')) {
                    return (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    );
                  } else if (href.includes('about')) {
                    return (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    );
                  }
                  return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                  );
                };

                return (
                  <Link
                    key={index}
                    href={link.href}
                    className="group flex flex-col items-center gap-2 p-3 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-300"
                    title={link.name}
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 group-hover:border-gray-300 dark:group-hover:border-gray-600 group-hover:shadow-sm transition-all duration-300">
                      {getIcon(link.href)}
                    </div>
                    <span className="text-xs font-thin tracking-wide font-serif opacity-70 group-hover:opacity-100 transition-opacity">
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-24 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin tracking-[0.15em] font-serif mb-6 text-gray-900 dark:text-white">最新博客</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-thin tracking-[0.05em] font-serif italic">
              分享技术心得与生活感悟
            </p>
          </div>

          {/* Recent Posts List */}
          <div className="space-y-8">
            {recentPosts.map((post, index) => (
              <article key={post.slug} className="border-b border-gray-200/60 dark:border-gray-700/60 pb-8 last:border-b-0">
                <div className="flex items-start gap-6">
                  {/* Date */}
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">
                      {new Date(post.date).toLocaleDateString('zh-CN', { 
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 font-thin tracking-wide font-serif mt-1">
                      {new Date(post.date).getFullYear()}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <Link
                        href={`/blog/category/${encodeURIComponent(post.category)}`}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-200 font-thin tracking-wide font-serif"
                      >
                        {post.category}
                      </Link>
                      {siteConfig.blog.display.showReadTime && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">
                          {post.readTime}阅读
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl md:text-2xl font-thin tracking-wide font-serif mb-3 text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors leading-relaxed">
                      <Link href={`/blog/${post.slug}`} className="no-underline">
                        {post.title}
                      </Link>
                    </h2>

                    {siteConfig.blog.display.showExcerpt && (
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 font-thin tracking-wide font-serif leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      {siteConfig.blog.display.showTags && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, siteConfig.blog.display.maxTagsToShow).map((tag) => (
                            <Link
                              key={tag}
                              href={`/blog/tag/${encodeURIComponent(tag)}`}
                              className="inline-flex items-center px-2.5 py-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-100/60 dark:bg-gray-700/60 rounded-full hover:bg-gray-200/60 dark:hover:bg-gray-600/60 transition-all duration-200 font-thin tracking-wide font-serif"
                            >
                              #{tag}
                            </Link>
                          ))}
                          {post.tags.length > siteConfig.blog.display.maxTagsToShow && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">
                              +{post.tags.length - siteConfig.blog.display.maxTagsToShow}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - 只在首页的博客部分底部显示 */}
      <Footer />
    </>
  );
} 