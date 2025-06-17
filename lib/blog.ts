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

// 模拟博客数据（当无法读取文件时使用）
const fallbackBlogPosts: BlogPost[] = [
  {
    title: '欢迎来到我的个人主页',
    excerpt: '这是我的第一篇博客文章，欢迎来到我的个人主页！在这里我会分享我的技术心得、项目经验以及生活感悟。',
    content: `# 欢迎来到我的个人主页

你好！欢迎来到我的个人主页。这是我的第一篇博客文章，我很高兴能与你分享我的想法和经历。

## 关于这个网站

这个个人主页是用现代化的技术栈构建的，包括：

- **Next.js 13** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 原子化CSS
- **Framer Motion** - 动画效果

## 你可以在这里找到什么

在这个网站上，你可以：

- 📖 阅读我的博客文章
- 💭 查看我的随笔和想法
- 🎨 浏览我的作品集
- 🎵 欣赏我喜欢的音乐
- 📧 与我取得联系

感谢你的访问！`,
    date: '2024-01-01',
    category: '生活随笔',
    tags: ['个人主页', '博客', '开始'],
    readTime: '3 分钟',
    slug: 'welcome-to-my-homepage',
  },
  {
    title: 'Next.js 13 App Router 完整开发指南',
    excerpt: '深入了解 Next.js 13 的新特性和最佳实践，包括 App Router、Server Components、并行路由等新功能的使用方法。',
    date: '2024-01-02',
    category: '技术分享',
    tags: ['Next.js', 'React', 'TypeScript'],
    readTime: '8 分钟',
    slug: 'nextjs-13-app-router-guide',
  },
  {
    title: 'Tailwind CSS 设计系统构建实践',
    excerpt: '如何使用 Tailwind CSS 构建一致的设计系统，包括颜色规范、组件库设计、响应式断点配置等内容。',
    date: '2024-01-03',
    category: '技术分享',
    tags: ['CSS', 'Tailwind', '设计'],
    readTime: '6 分钟',
    slug: 'tailwind-design-system',
  },
];

// 模拟随笔数据（当无法读取文件时使用）
const fallbackThoughts: Thought[] = [
  {
    content: '今天在调试一个CSS问题时突然想到，有时候最简单的解决方案往往是最有效的。不要过度工程化，保持简单就是美。',
    date: '2024-01-08',
    mood: '💡',
    tags: ['思考', 'CSS', '简单'],
  },
  {
    content: '雨后的空气总是格外清新，就像重构后的代码一样。删除了冗余的部分，留下的都是精华。',
    date: '2024-01-07',
    mood: '🌧️',
    tags: ['生活', '重构', '感悟'],
  },
  {
    content: '看到一个很有趣的动画效果，用纯CSS实现的。虽然JavaScript能做到同样的效果，但CSS的方案更优雅、性能也更好。',
    date: '2024-01-06',
    mood: '✨',
    tags: ['CSS', '动画', '性能'],
  },
];

// 递归扫描目录下的所有.md文件
function scanDirectoryRecursively(dirPath: string, baseDir: string, fs: any, path: any): { filePath: string; relativePath: string }[] {
  if (!fs || !fs.existsSync(dirPath)) {
    return [];
  }

  const files: { filePath: string; relativePath: string }[] = [];
  
  try {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);
      
      if (item.isDirectory()) {
        // 递归扫描子目录
        files.push(...scanDirectoryRecursively(fullPath, baseDir, fs, path));
      } else if (item.isFile() && item.name.endsWith('.md')) {
        // 计算相对于基础目录的路径
        const relativePath = path.relative(baseDir, fullPath);
        files.push({
          filePath: fullPath,
          relativePath: relativePath
        });
      }
    }
  } catch (error) {
    console.warn(`Error scanning directory ${dirPath}:`, error);
  }
  
  return files;
}

// 计算阅读时间（基于字数）
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200; // 平均阅读速度
  const wordCount = content.length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} 分钟`;
}



// 获取所有博客文章
export function getAllPosts(): BlogPost[] {
  // 检查是否在服务端环境
  if (typeof window === 'undefined') {
    try {
      // 动态导入 Node.js 模块
      const fs = require('fs');
      const path = require('path');
      const matter = require('gray-matter');
      
      const blogDir = path.join(process.cwd(), 'content/blog');
      
      // 检查目录是否存在
      if (fs.existsSync(blogDir)) {
        // 使用递归扫描函数获取所有.md文件
        const mdFiles = scanDirectoryRecursively(blogDir, blogDir, fs, path);
        
        const posts = mdFiles
          .map(({ filePath, relativePath }) => {
            try {
              const fileContent = fs.readFileSync(filePath, 'utf8');
              const { data: frontmatter, content } = matter(fileContent);
              
              // 从文件路径中提取文件名
              const filename = path.basename(filePath);
              
              // 使用文件的相对路径作为slug，移除.md扩展名
              const slug = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
              
              const post: BlogPost = {
                title: frontmatter.title || filename.replace('.md', ''),
                excerpt: frontmatter.excerpt || content.substring(0, 200) + '...',
                content: content,
                date: frontmatter.date || new Date().toISOString(),
                category: frontmatter.category || '未分类',
                tags: frontmatter.tags || [],
                readTime: frontmatter.readTime || calculateReadTime(content),
                slug: slug,
                filename: filename,
                relativePath: relativePath
              };
              
              return post;
            } catch (error) {
              console.warn(`Error processing file ${filePath}:`, error);
              return null;
            }
          })
          .filter((post): post is BlogPost => post !== null)
          .sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        return posts;
      }
    } catch (error) {
      console.log('从文件系统读取博客失败，使用默认数据:', error);
    }
  }
  
  // 返回fallback数据，按日期排序
  return fallbackBlogPosts.sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 获取最新的博客文章
export function getRecentPosts(limit: number = 3): BlogPost[] {
  return getAllPosts().slice(0, limit);
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

// 获取分页博客文章
export function getPaginatedPosts(page: number = 1, limit: number = 10): PaginatedPosts {
  const allPosts = getAllPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    currentPage,
    totalPages,
    totalPosts,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}

// 根据分类获取分页博客文章
export function getPaginatedPostsByCategory(category: string, page: number = 1, limit: number = 10): PaginatedPosts {
  const allPosts = getAllPosts().filter(post => post.category === category);
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    currentPage,
    totalPages,
    totalPosts,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}

// 根据标签获取分页博客文章
export function getPaginatedPostsByTag(tag: string, page: number = 1, limit: number = 10): PaginatedPosts {
  const allPosts = getAllPosts().filter(post => post.tags.includes(tag));
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    currentPage,
    totalPages,
    totalPosts,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}

// 根据slug获取博客文章
export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug);
}

// 根据分类获取博客文章
export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter(post => post.category === category);
}

// 获取所有分类
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map(post => post.category)));
  return categories;
}

// 获取所有标签
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = Array.from(new Set(posts.flatMap(post => post.tags)));
  return tags;
}

// 生成随笔ID的函数
function generateThoughtId(thought: Thought): string {
  // 使用日期和内容的前50个字符生成简单的hash
  const content = thought.content.replace(/\s+/g, '').substring(0, 50);
  const dateStr = thought.date.replace(/[-]/g, '');
  return `thought-${dateStr}-${content.length}`;
}

// 获取所有随笔
export function getAllThoughts(): Thought[] {
  // 检查是否在服务端环境
  if (typeof window === 'undefined') {
    try {
      // 动态导入 Node.js 模块
      const fs = require('fs');
      const path = require('path');
      const matter = require('gray-matter');
      
      const thoughtsDirectory = path.join(process.cwd(), 'content/thoughts');
      
      // 如果目录不存在，返回fallback数据
      if (!fs.existsSync(thoughtsDirectory)) {
        const thoughts = fallbackThoughts.sort((a: Thought, b: Thought) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return thoughts.map(thought => ({
          ...thought,
          id: generateThoughtId(thought)
        }));
      }

      // 使用递归扫描函数获取所有.md文件
      const mdFiles = scanDirectoryRecursively(thoughtsDirectory, thoughtsDirectory, fs, path);
      
      const allThoughtsData = mdFiles
        .map(({ filePath, relativePath }) => {
          try {
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const matterResult = matter(fileContents);
            
            // 从文件路径中提取文件名
            const filename = path.basename(filePath);

          const thoughtBase = {
            filename: filename,
            content: matterResult.data.content || matterResult.content,
            date: matterResult.data.date || new Date().toISOString().split('T')[0],
            mood: matterResult.data.mood || '💭',
            tags: matterResult.data.tags || [],
            relativePath: relativePath
          };

          const thought: Thought = {
            ...thoughtBase,
            id: generateThoughtId(thoughtBase)
          };

          return thought;
        } catch (error) {
          console.warn(`Error processing thought file ${filePath}:`, error);
          return null;
        }
      })
      .filter((thought): thought is Thought => thought !== null);

      // 按日期排序（最新的在前）
      return allThoughtsData.sort((a: Thought, b: Thought) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      console.error('Error reading thoughts:', error);
      const thoughts = fallbackThoughts.sort((a: Thought, b: Thought) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return thoughts.map(thought => ({
        ...thought,
        id: generateThoughtId(thought)
      }));
    }
  }
  
  // 如果不在服务端环境，返回fallback数据
  const thoughts = fallbackThoughts.sort((a: Thought, b: Thought) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return thoughts.map(thought => ({
    ...thought,
    id: generateThoughtId(thought)
  }));
}

// 获取最新的随笔
export function getRecentThoughts(limit: number = 5): Thought[] {
  return getAllThoughts().slice(0, limit);
}

// 获取所有随笔标签
export function getAllThoughtTags(): string[] {
  const thoughts = getAllThoughts();
  const tags = thoughts.flatMap(thought => thought.tags);
  return Array.from(new Set(tags));
}

// 获取所有心情
export function getAllMoods(): string[] {
  const thoughts = getAllThoughts();
  const moods = thoughts.map(thought => thought.mood);
  return Array.from(new Set(moods));
} 