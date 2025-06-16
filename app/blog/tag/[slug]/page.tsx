import { redirect } from 'next/navigation';
import { getAllTags } from '../../../../lib/blog';

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

export default function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.slug);
  
  // 重定向到第一页
  redirect(`/blog/tag/${encodeURIComponent(tag)}/page/1`);
} 