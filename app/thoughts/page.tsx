import { getAllThoughts, getAllThoughtTags, getAllMoods } from '../../lib/blog';
import PageLayout from '../../components/PageLayout';
import ThoughtsClient from './ThoughtsClient';

interface Thought {
  content: string;
  date: string;
  mood: string;
  tags: string[];
  filename?: string;
}

export default async function ThoughtsPage() {
  // 在服务端获取数据
  const thoughts = getAllThoughts();
  const tags = getAllThoughtTags();
  const moods = getAllMoods();

  return (
    <PageLayout>
      {/* Header */}
      <header className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-thin tracking-widest font-serif mb-4">随笔</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-thin tracking-widest font-serif italic">
              记录生活中的点滴思考
            </p>
          </div>
        </div>
      </header>

      {/* 传递数据给客户端组件 */}
      <ThoughtsClient 
        initialThoughts={thoughts}
        initialTags={tags}
        initialMoods={moods}
      />
    </PageLayout>
  );
} 