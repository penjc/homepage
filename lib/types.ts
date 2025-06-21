// 博客文章类型定义
export interface BlogPost {
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  category: string;
  tags: string[];
  readTime: string;
  slug: string;
  filename?: string;
  relativePath?: string;
}

// 随笔类型定义
export interface Thought {
  content: string;
  date: string;
  mood: string;
  tags: string[];
  filename?: string;
  id?: string;
  relativePath?: string;
}

// 分页结果接口
export interface PaginatedPosts {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} 