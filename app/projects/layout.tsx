import { Metadata } from 'next';
import { siteConfig } from '../../site.config';

export const metadata: Metadata = {
  title: '项目',
  description: '探索技术作品与创新项目 - 展示我的开发经验和技术能力',
  keywords: [
    '项目',
    '技术项目',
    '开源项目',
    '个人作品',
    'GitHub',
    '前端开发',
    '后端开发',
    'Next.js',
    'React',
    'TypeScript',
    ...siteConfig.seo.keywords,
  ],
  openGraph: {
    title: `项目 | ${siteConfig.title}`,
    description: '探索技术作品与创新项目 - 展示我的开发经验和技术能力',
    type: 'website',
    url: `${siteConfig.url}/projects`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `项目 | ${siteConfig.title}`,
    description: '探索技术作品与创新项目 - 展示我的开发经验和技术能力',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 