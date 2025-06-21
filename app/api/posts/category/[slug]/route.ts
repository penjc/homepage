import { NextResponse } from 'next/server';
import { getAllPosts } from '../../../../../lib/blog';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const category = decodeURIComponent(resolvedParams.slug);
    
    const allPosts = getAllPosts();
    const categoryPosts = allPosts.filter(post => post.category === category);
    
    return NextResponse.json({ posts: categoryPosts, category });
  } catch (error) {
    console.error('Error fetching category posts:', error);
    return NextResponse.json({ posts: [], category: '' });
  }
} 