import { Metadata } from 'next';
import { siteConfig } from '../../site.config';

export const metadata: Metadata = {
  title: '友链',
  description: '志同道合的朋友们 - 发现更多优质网站',
  keywords: [
    '友链',
    '友情链接',
    '技术博客',
    '个人网站',
    '前端开发',
    '后端开发',
    ...siteConfig.seo.keywords,
  ],
  openGraph: {
    title: `友链 | ${siteConfig.title}`,
    description: '志同道合的朋友们 - 发现更多优质网站',
    type: 'website',
    url: `${siteConfig.url}/friends`,
  },
  twitter: {
    card: 'summary',
    title: `友链 | ${siteConfig.title}`,
    description: '志同道合的朋友们 - 发现更多优质网站',
  },
};

export default function FriendsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 