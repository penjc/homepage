'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Comments from '../../components/Comments';

// 动画组件
function AnimatedSection({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 随笔项动画组件
function AnimatedThought({ children, index = 0 }: { 
  children: React.ReactNode; 
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          duration: 0.6,
          delay: index * 0.1,
          ease: "easeOut"
        }
      } : { opacity: 0, y: 50, scale: 0.95 }}
      whileHover={{ 
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
    >
      {children}
    </motion.div>
  );
}

interface Thought {
  content: string;
  date: string;
  mood: string;
  tags: string[];
  filename?: string;
  id?: string;
}

interface ThoughtsClientProps {
  initialThoughts: Thought[];
  initialTags: string[];
  initialMoods: string[];
}

export default function ThoughtsClient({
  initialThoughts,
  initialTags,
  initialMoods,
}: ThoughtsClientProps) {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [highlightedThought, setHighlightedThought] = useState<string>('');

  // 处理URL hash定位
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash.substring(1);
        console.log('Hash changed to:', hash); // 调试日志
        
        if (hash) {
          setHighlightedThought(hash);
          
          // 等待DOM更新后再滚动
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              console.log('Scrolling to element:', hash); // 调试日志
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              
              // 移除高亮效果
              setTimeout(() => {
                setHighlightedThought('');
              }, 1000);
            } else {
              console.log('Element not found:', hash); // 调试日志
            }
          }, 100);
        } else {
          // 如果没有hash，清除高亮
          setHighlightedThought('');
        }
      }
    };

    // 初始加载时处理hash
    handleHashChange();
    
    // 监听hash变化
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // 筛选后的随笔
  const filteredThoughts = useMemo(() => {
    return initialThoughts.filter(thought => {
      const matchesMood = !selectedMood || thought.mood === selectedMood;
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => thought.tags.includes(tag));
      return matchesMood && matchesTags;
    });
  }, [initialThoughts, selectedMood, selectedTags]);

  // 筛选结果变化后重新检查hash定位（仅在搜索跳转时生效）
  useEffect(() => {
    // 只有当URL中包含来自搜索的参数时才进行定位和高亮
    if (typeof window !== 'undefined' && window.location.hash) {
      const urlParams = new URLSearchParams(window.location.search);
      const isFromSearch = urlParams.get('from') === 'search';
      
      if (isFromSearch) {
        const hash = window.location.hash.substring(1);
        const element = document.getElementById(hash);
        if (element && filteredThoughts.some(thought => (thought.id || `thought-${thought.date}-0`) === hash)) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setHighlightedThought(hash);
            setTimeout(() => {
              setHighlightedThought('');
              // 清除搜索参数，避免后续筛选时重复触发
              const newUrl = window.location.pathname + window.location.hash;
              window.history.replaceState(null, '', newUrl);
            }, 3000);
          }, 100);
        }
      }
    }
  }, [filteredThoughts]);

  // 切换心情筛选
  const toggleMood = (mood: string) => {
    setSelectedMood(selectedMood === mood ? '' : mood);
  };

  // 切换标签筛选
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // 重置筛选条件
  const resetFilters = () => {
    setSelectedMood('');
    setSelectedTags([]);
  };

  return (
    <>
      {/* 筛选器区域 */}
      <AnimatedSection className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 筛选器标题 */}
          <motion.div
              className="flex items-center justify-between mb-6"
              initial={{opacity: 0, x: -20}}
              animate={{opacity: 1, x: 0}}
              transition={{duration: 0.6, delay: 0.1}}
          >
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-thin tracking-wide font-serif text-gray-900 dark:text-white">筛选随笔</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">
                {filteredThoughts.length} / {initialThoughts.length} 篇
              </div>
            </div>
            {(selectedMood || selectedTags.length > 0) && (
                <motion.button
                    onClick={resetFilters}
                    className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors font-thin tracking-wide font-serif"
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                >
                  清除筛选
                </motion.button>
            )}
          </motion.div>

          {/* 心情筛选 - 直接使用emoji */}
          <motion.div
              className="mb-6"
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.2}}
          >
            <h3 className="text-sm font-thin tracking-wide font-serif text-gray-700 dark:text-gray-300 mb-3">按心情筛选</h3>
            <div className="flex flex-wrap gap-3">
              {initialMoods.map((mood, index) => {
                const count = initialThoughts.filter(t => t.mood === mood).length;
                const isSelected = selectedMood === mood;
                return (
                    <motion.button
                        key={mood}
                        onClick={() => toggleMood(mood)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 font-thin tracking-wide font-serif ${
                            isSelected
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 ring-2 ring-gray-400 dark:ring-gray-500'
                                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                        }`}
                        whileHover={{
                          scale: 1.05,
                          transition: {duration: 0.2}
                        }}
                        whileTap={{scale: 0.95}}
                    >
                      <span className="text-lg">{mood}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">({count})</span>
                    </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* 标签筛选 - 文字按钮样式 */}
          <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.4}}
          >
            <h3 className="text-sm font-thin tracking-wide font-serif text-gray-700 dark:text-gray-300 mb-3">按标签筛选（可多选）</h3>
            <div className="flex flex-wrap gap-2">
              {initialTags.map((tag, index) => {
                const count = initialThoughts.filter(t => t.tags.includes(tag)).length;
                const isSelected = selectedTags.includes(tag);
                return (
                    <motion.button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 font-thin tracking-wide font-serif ${
                            isSelected
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 ring-1 ring-gray-400 dark:ring-gray-500'
                                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                        }`}
                        whileHover={{
                          scale: 1.05,
                          transition: {duration: 0.2}
                        }}
                        whileTap={{scale: 0.95}}
                    >
                      #{tag} ({count})
                    </motion.button>
                );
              })}
            </div>
          </motion.div>

        {/* 当前筛选状态提示 */}
        {(selectedMood || selectedTags.length > 0) && (
            <motion.div
                className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                initial={{opacity: 0, y: -20, scale: 0.95}}
                animate={{opacity: 1, y: 0, scale: 1}}
                exit={{opacity: 0, y: -20, scale: 0.95}}
                transition={{duration: 0.4, ease: "easeOut"}}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div
                      className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-thin tracking-wide font-serif">当前筛选条件：
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedMood && (
                        <motion.span
                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-thin tracking-wide font-serif"
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.3}}
                        >
                          {selectedMood}
                          <button
                              onClick={() => setSelectedMood('')}
                              className="ml-1 hover:text-gray-900 dark:hover:text-gray-100"
                          >
                            ×
                          </button>
                        </motion.span>
                    )}
                    {selectedTags.map((tag) => (
                        <motion.span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-thin tracking-wide font-serif"
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.3}}
                        >
                          #{tag}
                          <button
                              onClick={() => toggleTag(tag)}
                              className="ml-1 hover:text-gray-900 dark:hover:text-gray-100"
                          >
                            ×
                          </button>
                        </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
        )}
      </div>
    </AnimatedSection>

{/* 随笔内容区域 - 居中显示 */
}
  <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    {filteredThoughts.length === 0 ? (
        <AnimatedSection className="text-center py-16" delay={0.2}>
            <motion.div 
              className="text-gray-400 dark:text-gray-500 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <svg className="mx-auto h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </motion.div>
            <motion.h3 
              className="text-xl font-thin tracking-wide font-serif text-gray-900 dark:text-white mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {initialThoughts.length === 0 ? '还没有随笔' : '没有找到匹配的随笔'}
            </motion.h3>
            <motion.p 
              className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto font-thin tracking-wide font-serif"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {initialThoughts.length === 0 
                ? '开始记录你的生活点滴和思考吧！' 
                : '试试调整筛选条件，或者查看所有随笔'
              }
            </motion.p>
            {(selectedMood || selectedTags.length > 0) && (
              <motion.button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 font-medium py-3 px-6 rounded-md transition-colors duration-200 shadow-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 font-thin tracking-wide font-serif no-underline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                查看所有随笔
              </motion.button>
            )}
          </AnimatedSection>
        ) : (
          <div className="space-y-8">
            {filteredThoughts.map((thought, index) => {
              const thoughtId = thought.id || `thought-${thought.date}-${index}`;
              const isHighlighted = highlightedThought === thoughtId;
              
              return (
                <AnimatedThought key={`${thought.date}-${index}`} index={index}>
                  <article
                    id={thoughtId}
                    className={`rounded-lg shadow-sm border p-8 hover:shadow-md transition-all duration-200 ${
                      isHighlighted 
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-600 shadow-lg' 
                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'
                    }`}
                  >
                    {/* 文章头部 */}
                    <header className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <motion.button
                          onClick={() => toggleMood(thought.mood)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer font-thin tracking-wide font-serif ${
                            selectedMood === thought.mood
                              ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 ring-2 ring-gray-400 dark:ring-gray-500'
                              : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          title={`点击筛选${thought.mood}心情的随笔`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="text-base">{thought.mood}</span>
                        </motion.button>
                        <time className="text-sm text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">
                          {new Date(thought.date).toLocaleDateString('zh-CN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            weekday: 'long'
                          })}
                        </time>
                      </div>
                    </header>
                    
                    {/* 文章内容 */}
                    <div className="prose prose-gray dark:prose-invert max-w-none mb-6">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base whitespace-pre-wrap font-thin tracking-wide font-serif">
                        {thought.content}
                      </p>
                    </div>
                    
                    {/* 标签 */}
                    {thought.tags.length > 0 && (
                      <footer className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                        {thought.tags.map((tag, tagIndex) => (
                          <motion.button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1 rounded-md text-sm transition-colors font-thin tracking-wide font-serif ${
                              selectedTags.includes(tag)
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 ring-1 ring-gray-400 dark:ring-gray-500'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                              opacity: 1, 
                              scale: 1,
                              transition: { 
                                delay: 0.5 + (tagIndex * 0.1),
                                duration: 0.4,
                                ease: "easeOut"
                              }
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            #{tag}
                          </motion.button>
                        ))}
                      </footer>
                    )}
                  </article>
                </AnimatedThought>
              );
            })}
          </div>
        )}

        {/* 底部统计 */}
        {filteredThoughts.length > 0 && (
          <AnimatedSection className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700" delay={0.3}>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">
              {(selectedMood || selectedTags.length > 0) ? (
                <>显示 <span className="font-medium text-gray-900 dark:text-gray-100">
                  {filteredThoughts.length}
                </span> 篇筛选结果，共 {initialThoughts.length} 篇随笔</>
              ) : (
                <>共 <span className="font-medium text-gray-900 dark:text-gray-100">
                  {initialThoughts.length}
                </span> 篇随笔</>
              )}
            </p>
          </AnimatedSection>
        )}

        {/* 评论区 */}
        <AnimatedSection className="mt-16" delay={0.4}>
          <Comments 
            pageId="thoughts"
            pageTitle="随笔"
            pageUrl="/thoughts"
          />
        </AnimatedSection>
      </main>
    </>
  );
} 