import Link from 'next/link';
import { getPaginatedPosts, getAllCategories, getAllPosts, BlogPost } from '../../lib/blog';
import PageLayout from '../../components/PageLayout';
import Pagination from '../../components/Pagination';
import { siteConfig } from '../../site.config';

export const metadata = {
  title: '博客',
  description: '分享技术心得与生活感悟',
};

interface BlogPageProps {
  searchParams: { page?: string };
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const postsPerPage = siteConfig.blog.pagination.postsPerPage;
  
  const paginatedData = getPaginatedPosts(currentPage, postsPerPage);
  const { posts, totalPages, totalPosts, hasNextPage, hasPrevPage } = paginatedData;
  const categories = getAllCategories();

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-thin tracking-widest font-serif mb-4">博客</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-thin tracking-widest font-serif italic">
            分享技术心得与生活感悟
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 font-thin tracking-wide font-serif">
            共 {totalPosts} 篇文章，第 {currentPage} 页，共 {totalPages} 页
          </p>
        </div>
      </section>

      {/* Blog Categories */}
      <section className="bg-white dark:bg-gray-800 py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center px-4 py-2 text-sm rounded-full transition-colors font-thin tracking-wide font-serif bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            >
              全部
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog/category/${encodeURIComponent(category)}`}
                className="inline-flex items-center px-4 py-2 text-sm rounded-full transition-colors font-thin tracking-wide font-serif text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="bg-white dark:bg-gray-800 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="space-y-8">
              {posts.map((post: BlogPost, index: number) => (
                <article key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                  <div className="flex items-start gap-4">
                    {/* Date */}
                    <div className="flex-shrink-0 w-16 text-center">
                      <div className="text-sm text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">
                        {new Date(post.date).toLocaleDateString('zh-CN', { 
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 font-thin tracking-wide font-serif">
                        {new Date(post.date).getFullYear()}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Link
                          href={`/blog/category/${encodeURIComponent(post.category)}`}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-thin tracking-wide font-serif"
                        >
                          {post.category}
                        </Link>
                        {siteConfig.blog.display.showReadTime && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">
                            {post.readTime}阅读
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl font-thin tracking-wide font-serif mb-2 text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                        <Link href={`/blog/${post.slug}`} className="no-underline">
                          {post.title}
                        </Link>
                      </h2>

                      {siteConfig.blog.display.showExcerpt && (
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 font-thin tracking-wide font-serif">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        {siteConfig.blog.display.showTags && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, siteConfig.blog.display.maxTagsToShow).map((tag: string) => (
                              <Link
                                key={tag}
                                href={`/blog/tag/${encodeURIComponent(tag)}`}
                                className="inline-flex items-center px-2 py-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-thin tracking-wide font-serif"
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

                        <Link 
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-md transition-colors text-sm font-thin tracking-wide font-serif"
                        >
                          阅读全文 →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">暂无博客文章</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
                basePath="/blog"
              />
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
} 