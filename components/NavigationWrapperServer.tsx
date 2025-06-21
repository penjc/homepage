import { getAllPosts, getAllThoughts } from '../lib/blog';
import NavigationWrapper from './NavigationWrapper';

export default function NavigationWrapperServer() {
  // 在服务端获取数据
  const posts = getAllPosts();
  const thoughts = getAllThoughts();

  return <NavigationWrapper posts={posts} thoughts={thoughts} />;
} 