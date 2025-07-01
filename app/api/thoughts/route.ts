import { NextResponse } from 'next/server';
import { getAllThoughts, getAllThoughtTags, getAllMoods } from '../../../lib/blog';

// 强制动态渲染，因为需要处理查询参数
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'tags') {
      const tags = getAllThoughtTags();
      return NextResponse.json({ tags });
    }

    if (type === 'moods') {
      const moods = getAllMoods();
      return NextResponse.json({ moods });
    }

    // 默认返回所有随笔
    const thoughts = getAllThoughts();
    return NextResponse.json({ thoughts });
  } catch (error) {
    console.error('Error fetching thoughts:', error);
    return NextResponse.json({ thoughts: [] });
  }
} 