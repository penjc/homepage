import { redirect } from 'next/navigation';
import { getAllCategories } from '../../../../lib/blog';

// 强制静态生成
export const dynamic = 'force-static';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: encodeURIComponent(category),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.slug);
  
  return {
    title: `${category} | 博客分类`,
    description: `浏览 ${category} 分类下的文章`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.slug);
  
  // 重定向到第一页
  redirect(`/blog/category/${encodeURIComponent(category)}/page/1`);
} 