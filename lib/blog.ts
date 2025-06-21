// 导入类型定义
import type { BlogPost, Thought, PaginatedPosts } from './types';

// 重新导出类型，以保持向后兼容
export type { BlogPost, Thought, PaginatedPosts } from './types';





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
  // 只在服务端环境下执行
  if (typeof window !== 'undefined') {
    console.warn('getAllPosts called in client environment');
    return [];
  }
  
  try {
    // 动态导入 Node.js 模块
    const fs = require('fs');
    const path = require('path');
    const matter = require('gray-matter');
    
    const blogDir = path.join(process.cwd(), 'content/blog');
    
    // 检查目录是否存在
    if (!fs.existsSync(blogDir)) {
      console.warn('Blog directory not found:', blogDir);
      return [];
    }
    
    // 使用递归扫描函数获取所有.md文件
    const mdFiles = scanDirectoryRecursively(blogDir, blogDir, fs, path);
    
    if (mdFiles.length === 0) {
      console.warn('No markdown files found in blog directory');
      return [];
    }
    
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
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

// 获取最新的博客文章
export function getRecentPosts(limit: number = 3): BlogPost[] {
  return getAllPosts().slice(0, limit);
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
  // 只在服务端环境下执行
  if (typeof window !== 'undefined') {
    console.warn('getAllThoughts called in client environment');
    return [];
  }
  
  try {
    // 动态导入 Node.js 模块
    const fs = require('fs');
    const path = require('path');
    const matter = require('gray-matter');
    
    const thoughtsDirectory = path.join(process.cwd(), 'content/thoughts');
    
    // 如果目录不存在，返回空数组
    if (!fs.existsSync(thoughtsDirectory)) {
      console.warn('Thoughts directory not found:', thoughtsDirectory);
      return [];
    }

    // 使用递归扫描函数获取所有.md文件
    const mdFiles = scanDirectoryRecursively(thoughtsDirectory, thoughtsDirectory, fs, path);
    
    if (mdFiles.length === 0) {
      console.warn('No markdown files found in thoughts directory');
      return [];
    }
    
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
    return [];
  }
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