import { NextResponse } from 'next/server';
import { getAllPosts } from '../../../../../lib/blog';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const tag = decodeURIComponent(resolvedParams.slug);
    
    const allPosts = getAllPosts();
    const tagPosts = allPosts.filter(post => post.tags.includes(tag));
    
    return NextResponse.json({ posts: tagPosts, tag });
  } catch (error) {
    console.error('Error fetching tag posts:', error);
    return NextResponse.json({ posts: [], tag: '' });
  }
} 