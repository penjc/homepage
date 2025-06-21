import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getPaginatedPosts, getAllCategories, getAllPosts, BlogPost } from '../../lib/blog';
import PageLayout from '../../components/PageLayout';
import Pagination from '../../components/Pagination';
import { siteConfig } from '../../site.config';

// 强制静态生成
export const dynamic = 'force-static';

export const metadata = {
  title: `博客 | ${siteConfig.title}`,
  description: '分享技术心得与生活感悟',
};

export default function BlogPage() {
  // 重定向到第一页
  redirect('/blog/page/1');
} 