import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '../../../../../../site.config';
import { getAllPosts, getPaginatedPostsByTag, getAllTags, BlogPost } from '../../../../../../lib/blog';
import PageLayout from '../../../../../../components/PageLayout';
import Pagination from '../../../../../../components/Pagination';

// 强制静态生成
export const dynamic = 'force-static';

interface TagPageProps {
  params: {
    slug: string;
    page: string;
  };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  const postsPerPage = siteConfig.blog.pagination.postsPerPage;
  
  const params = [];
  
  for (const tag of tags) {
    const allTagPosts = getAllPosts().filter(post => post.tags.includes(tag));
    const totalPages = Math.ceil(allTagPosts.length / postsPerPage);
    
    for (let page = 1; page <= totalPages; page++) {
      // 添加原始字符串参数（用于生产构建）
      params.push({
        slug: tag,
        page: page.toString(),
      });
      
      // 如果标签包含非ASCII字符，也添加编码版本（用于开发模式）
      const encoded = encodeURIComponent(tag);
      if (encoded !== tag) {
        params.push({
          slug: encoded,
          page: page.toString(),
        });
      }
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: TagPageProps) {
  // 更智能的参数解码处理
  let tag: string = params.slug;
  
  // 检查是否是编码的URL
  if (params.slug.includes('%')) {
    try {
      tag = decodeURIComponent(params.slug);
    } catch {
      // 如果解码失败，尝试查找匹配的标签
      const allTags = getAllTags();
      const found = allTags.find(t => encodeURIComponent(t) === params.slug);
      if (found) {
        tag = found;
      }
    }
  }
  
  const currentPage = parseInt(params.page, 10);
  const allTagPosts = getAllPosts().filter(post => post.tags.includes(tag));
  
  if (allTagPosts.length === 0) {
    return {
      title: '标签未找到',
    };
  }

  return {
    title: `${tag} - 第 ${currentPage} 页 | ${siteConfig.title}`,
    description: `浏览标签为 ${tag} 的所有文章`,
  };
}

export default function TagPageWithPagination({ params }: TagPageProps) {
  // 更智能的参数解码处理
  let tag: string = params.slug;
  
  // 检查是否是编码的URL
  if (params.slug.includes('%')) {
    try {
      tag = decodeURIComponent(params.slug);
    } catch {
      // 如果解码失败，尝试查找匹配的标签
      const allTags = getAllTags();
      const found = allTags.find(t => encodeURIComponent(t) === params.slug);
      if (found) {
        tag = found;
      }
    }
  }
  
  const currentPage = parseInt(params.page, 10);
  const postsPerPage = siteConfig.blog.pagination.postsPerPage;
  
  const paginatedData = getPaginatedPostsByTag(tag, currentPage, postsPerPage);
  const { posts, totalPages, totalPosts, hasNextPage, hasPrevPage } = paginatedData;
  const allTags = getAllTags();

  if (posts.length === 0 && currentPage === 1) {
    notFound();
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-thin tracking-widest font-serif mb-4">{tag}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-thin tracking-widest font-serif italic">
            标签下的文章
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 font-thin tracking-wide font-serif">
            共 {totalPosts} 篇文章，第 {currentPage} 页，共 {totalPages} 页
          </p>
        </div>
      </section>

      {/* Tag Filter */}
      <section className="bg-white dark:bg-gray-800 py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center px-4 py-2 text-sm rounded-full transition-colors font-thin tracking-wide font-serif text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              全部
            </Link>
            {allTags.slice(0, 10).map((t) => {
              const allPosts = getAllPosts();
              const count = allPosts.filter((post: BlogPost) => post.tags.includes(t)).length;
              return (
                <Link
                  key={t}
                  href={`/blog/tag/${t}/page/1`}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors font-thin tracking-wide font-serif ${
                    t === tag
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  #{t} ({count})
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Posts List */}
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

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Link
                          href={`/blog/category/${post.category}/page/1`}
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
                            {post.tags.slice(0, siteConfig.blog.display.maxTagsToShow).map((postTag: string) => (
                              <Link
                                key={postTag}
                                href={`/blog/tag/${postTag}/page/1`}
                                className={`inline-flex items-center px-2.5 py-1 text-xs font-medium transition-colors font-thin tracking-wide font-serif ${
                                  postTag === tag
                                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
                                    : 'bg-gray-100/60 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 hover:bg-gray-200/60 dark:hover:bg-gray-600/60'
                                } rounded-full transition-all duration-200`}
                              >
                                #{postTag}
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
              <p className="text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">该标签下暂无文章</p>
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
                basePath={`/blog/tag/${tag}/page`}
              />
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
} 