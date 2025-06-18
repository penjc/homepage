import { Metadata } from 'next';
import { siteConfig } from '../../site.config';

export const metadata: Metadata = {
  title: siteConfig.books?.title || '书籍推荐',
  description: siteConfig.books?.description || '分享值得阅读的好书，记录阅读心得',
};

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 