import { NextResponse } from 'next/server';
import { getAllPosts, getRecentPosts } from '../../../lib/blog';
import { siteConfig } from '../../../site.config';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = searchParams.get('limit');

    if (type === 'recent') {
      const count = limit ? parseInt(limit, 10) : siteConfig.blog.homepage.recentPostsCount;
      const posts = getRecentPosts(count);
      return NextResponse.json({ posts });
    }

    // 默认返回所有博客文章
    const posts = getAllPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ posts: [] });
  }
} 