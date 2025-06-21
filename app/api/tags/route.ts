import { NextResponse } from 'next/server';
import { getAllTags } from '../../../lib/blog';

export async function GET() {
  try {
    const tags = getAllTags();
    return NextResponse.json({ tags });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ tags: [] });
  }
} 