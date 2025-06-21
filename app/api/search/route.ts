import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, getAllThoughts } from '../../../lib/blog';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    if (!query.trim()) {
      return NextResponse.json({ 
        results: [],
        total: 0 
      });
    }

    const posts = getAllPosts();
    const thoughts = getAllThoughts();
    
    const searchResults: Array<{
      type: 'blog' | 'thought';
      item: any;
      highlights: string[];
      score: number;
    }> = [];
    
    const lowercaseQuery = query.toLowerCase();

    // 搜索博客
    posts.forEach((post) => {
      let score = 0;
      const highlights: string[] = [];
      
      // 标题匹配得分最高
      if (post.title.toLowerCase().includes(lowercaseQuery)) {
        score += 10;
        highlights.push('标题');
      }
      
      // 分类匹配
      if (post.category.toLowerCase().includes(lowercaseQuery)) {
        score += 8;
        highlights.push('分类');
      }
      
      // 标签匹配
      if (post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))) {
        score += 6;
        highlights.push('标签');
      }
      
      // 摘要匹配
      if (post.excerpt.toLowerCase().includes(lowercaseQuery)) {
        score += 4;
        highlights.push('摘要');
      }
      
      // 内容匹配
      if (post.content && post.content.toLowerCase().includes(lowercaseQuery)) {
        score += 2;
        highlights.push('内容');
      }

      if (score > 0) {
        searchResults.push({
          type: 'blog',
          item: post,
          highlights,
          score
        });
      }
    });

    // 搜索随笔
    thoughts.forEach((thought) => {
      let score = 0;
      const highlights: string[] = [];
      
      // 标签匹配得分较高
      if (thought.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))) {
        score += 6;
        highlights.push('标签');
      }
      
      // 内容匹配
      if (thought.content.toLowerCase().includes(lowercaseQuery)) {
        score += 4;
        highlights.push('内容');
      }

      if (score > 0) {
        searchResults.push({
          type: 'thought',
          item: thought,
          highlights,
          score
        });
      }
    });

    // 按分数和类型排序
    searchResults.sort((a, b) => {
      // 首先按分数排序
      if (a.score !== b.score) {
        return b.score - a.score;
      }
      // 分数相同时，博客在前
      if (a.type !== b.type) {
        return a.type === 'blog' ? -1 : 1;
      }
      // 相同类型按日期排序
      const dateA = new Date(a.item.date).getTime();
      const dateB = new Date(b.item.date).getTime();
      return dateB - dateA;
    });

    return NextResponse.json({
      results: searchResults,
      total: searchResults.length
    });
    
  } catch (error) {
    console.error('搜索API错误:', error);
    return NextResponse.json(
      { error: '搜索失败' },
      { status: 500 }
    );
  }
} 