'use client';

import { BlogPost, Thought } from '../lib/types';
import Navigation from './Navigation';

interface NavigationWrapperProps {
  posts?: BlogPost[];
  thoughts?: Thought[];
}

export default function NavigationWrapper({ posts = [], thoughts = [] }: NavigationWrapperProps) {
  return <Navigation posts={posts} thoughts={thoughts} />;
} 