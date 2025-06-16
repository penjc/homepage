import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '../../../../site.config';
import { getAllPosts, getPaginatedPostsByTag, getAllTags, BlogPost } from '../../../../lib/blog';
import PageLayout from '../../../../components/PageLayout';

// 强制静态生成
export const dynamic = 'force-static';

interface TagPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    slug: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.slug);
  const allTagPosts = getAllPosts().filter(post => post.tags.includes(tag));
  
  if (allTagPosts.length === 0) {
    return {
      title: '标签未找到',
    };
  }

  return {
    title: `${tag} - 标签 | ${siteConfig.title}`,
    description: `浏览标签为 ${tag} 的所有文章`,
  };
}

export default function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.slug);
  // 对于静态导出，显示第一页内容
  const currentPage = 1;
  const postsPerPage = siteConfig.blog.pagination.postsPerPage;
  
  const paginatedData = getPaginatedPostsByTag(tag, currentPage, postsPerPage);
  const { posts, totalPages, totalPosts, hasNextPage, hasPrevPage } = paginatedData;
  
  if (totalPosts === 0) {
    notFound();
  }
  
  const allTags = getAllTags();

  return (
    <PageLayout>
      {/* Header */}
      <header className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-thin tracking-widest font-serif mb-4">标签：{tag}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-thin tracking-widest font-serif italic">
              浏览标签为 {tag} 的所有文章
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 font-thin tracking-wide font-serif">
              共 {totalPosts} 篇文章
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tag Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            href="/blog"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-thin tracking-wide font-serif"
          >
            全部
          </Link>
          {allTags.slice(0, 10).map((t) => {
            const allPosts = getAllPosts();
            const count = allPosts.filter((post: BlogPost) => post.tags.includes(t)).length;
            return (
              <Link
                key={t}
                href={`/blog/tag/${encodeURIComponent(t)}`}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors font-thin tracking-wide font-serif ${
                  t === tag
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                #{t} ({count})
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
                          {post.tags.slice(0, siteConfig.blog.display.maxTagsToShow).map((postTag: string) => (
                            <Link
                              key={postTag}
                              href={`/blog/tag/${encodeURIComponent(postTag)}`}
                              className={`inline-flex items-center px-2 py-1 text-xs rounded transition-colors font-thin tracking-wide font-serif ${
                                postTag === tag
                                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                  : 'text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                              }`}
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
          <p className="text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">没有找到相关文章。</p>
        )}

        {/* 静态导出说明 */}
        {totalPages > 1 && (
          <div className="mt-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm font-thin tracking-wide font-serif">
              静态站点显示所有 #{tag} 标签文章，共 {totalPosts} 篇
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
} 