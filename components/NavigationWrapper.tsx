import { getAllPosts, getAllThoughts } from '../lib/blog';
import Navigation from './Navigation';

export default function NavigationWrapper() {
  const posts = getAllPosts();
  const thoughts = getAllThoughts();

  return <Navigation posts={posts} thoughts={thoughts} />;
} 