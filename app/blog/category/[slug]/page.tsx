import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '../../../../site.config';
import { getAllPosts, getPaginatedPostsByCategory, getAllCategories, BlogPost } from '../../../../lib/blog';
import PageLayout from '../../../../components/PageLayout';
import Pagination from '../../../../components/Pagination';

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams: { page?: string }
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: encodeURIComponent(category),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.slug);
  const allCategoryPosts = getAllPosts().filter(post => post.category === category);
  
  if (allCategoryPosts.length === 0) {
    return {
      title: '分类未找到',
    };
  }

  return {
    title: `${category} - 分类 | ${siteConfig.title}`,
    description: `浏览 ${category} 分类下的所有文章`,
  };
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = decodeURIComponent(params.slug);
  const currentPage = parseInt(searchParams.page || '1', 10);
  const postsPerPage = siteConfig.blog.pagination.postsPerPage;
  
  const paginatedData = getPaginatedPostsByCategory(category, currentPage, postsPerPage);
  const { posts, totalPages, totalPosts, hasNextPage, hasPrevPage } = paginatedData;
  
  if (totalPosts === 0) {
    notFound();
  }
  
  const allCategories = getAllCategories();

  return (
    <PageLayout>
      {/* Header */}
      <header className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-thin tracking-widest font-serif mb-4">分类：{category}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-thin tracking-widest font-serif italic">
              浏览 {category} 分类下的所有文章
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 font-thin tracking-wide font-serif">
              共 {totalPosts} 篇文章，第 {currentPage} 页，共 {totalPages} 页
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            href="/blog"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-thin tracking-wide font-serif"
          >
            全部
          </Link>
          {allCategories.map((cat) => {
            const allPosts = getAllPosts();
            const count = allPosts.filter((post: BlogPost) => post.category === cat).length;
            return (
              <Link
                key={cat}
                href={`/blog/category/${encodeURIComponent(cat)}`}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors font-thin tracking-wide font-serif ${
                  cat === category
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {cat} ({count})
              </Link>
            );
          })}
        </div>

        {/* Posts List */}
        {posts.length > 0 ? (
          <div className="space-y-6">
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

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-thin tracking-wide font-serif">
                        {post.category}
                      </span>
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
          <p className="text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">没有找到相关文章。</p>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          basePath={`/blog/category/${encodeURIComponent(category)}`}
        />
      </div>
    </PageLayout>
  );
} 