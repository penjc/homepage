import { NextResponse } from 'next/server';
import { getAllThoughts, getAllThoughtTags, getAllMoods } from '../../../lib/blog';

export async function GET() {
  try {
    const thoughts = getAllThoughts();
    const tags = getAllThoughtTags();
    const moods = getAllMoods();

    return NextResponse.json({
      thoughts,
      tags,
      moods
    });
  } catch (error) {
    console.error('Error fetching thoughts:', error);
    return NextResponse.json({
      thoughts: [],
      tags: [],
      moods: []
    });
  }
} 