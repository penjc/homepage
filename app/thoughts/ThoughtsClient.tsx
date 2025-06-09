'use client';

import { useState, useMemo, useEffect } from 'react';

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
      <section className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 筛选器标题 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-thin tracking-wide font-serif text-gray-900 dark:text-white">筛选随笔</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">
                {filteredThoughts.length} / {initialThoughts.length} 篇
              </div>
            </div>
            {(selectedMood || selectedTags.length > 0) && (
              <button
                onClick={resetFilters}
                className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors font-thin tracking-wide font-serif"
              >
                清除筛选
              </button>
            )}
          </div>

          {/* 心情筛选 - 直接使用emoji */}
          <div className="mb-6">
            <h3 className="text-sm font-thin tracking-wide font-serif text-gray-700 dark:text-gray-300 mb-3">按心情筛选</h3>
            <div className="flex flex-wrap gap-3">
              {initialMoods.map(mood => {
                const count = initialThoughts.filter(t => t.mood === mood).length;
                const isSelected = selectedMood === mood;
                return (
                  <button
                    key={mood}
                    onClick={() => toggleMood(mood)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 font-thin tracking-wide font-serif ${
                      isSelected
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 ring-2 ring-gray-400 dark:ring-gray-500'
                        : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <span className="text-lg">{mood}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 标签筛选 - 文字按钮样式 */}
          <div>
            <h3 className="text-sm font-thin tracking-wide font-serif text-gray-700 dark:text-gray-300 mb-3">按标签筛选（可多选）</h3>
            <div className="flex flex-wrap gap-2">
              {initialTags.map(tag => {
                const count = initialThoughts.filter(t => t.tags.includes(tag)).length;
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 font-thin tracking-wide font-serif ${
                      isSelected
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 ring-1 ring-gray-400 dark:ring-gray-500'
                        : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    #{tag} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* 当前筛选状态提示 */}
          {(selectedMood || selectedTags.length > 0) && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-thin tracking-wide font-serif">当前筛选条件：</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedMood && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-thin tracking-wide font-serif">
                        {selectedMood}
                        <button
                          onClick={() => setSelectedMood('')}
                          className="ml-1 hover:text-gray-900 dark:hover:text-gray-100"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {selectedTags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-thin tracking-wide font-serif"
                      >
                        #{tag}
                        <button
                          onClick={() => toggleTag(tag)}
                          className="ml-1 hover:text-gray-900 dark:hover:text-gray-100"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 随笔内容区域 - 居中显示 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredThoughts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-500 mb-6">
              <svg className="mx-auto h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-thin tracking-wide font-serif italic text-gray-900 dark:text-white mb-3">
              {initialThoughts.length === 0 ? '还没有随笔' : '没有找到匹配的随笔'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto font-thin tracking-wide font-serif">
              {initialThoughts.length === 0 
                ? '开始记录你的生活点滴和思考吧！' 
                : '试试调整筛选条件，或者查看所有随笔'
              }
            </p>
            {(selectedMood || selectedTags.length > 0) && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors font-thin tracking-wide font-serif"
              >
                查看所有随笔
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {filteredThoughts.map((thought, index) => {
              const thoughtId = thought.id || `thought-${thought.date}-${index}`;
              const isHighlighted = highlightedThought === thoughtId;
              
              return (
              <article
                key={`${thought.date}-${index}`}
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
                    <button
                      onClick={() => toggleMood(thought.mood)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer font-thin tracking-wide font-serif ${
                        selectedMood === thought.mood
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 ring-2 ring-gray-400 dark:ring-gray-500'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      title={`点击筛选${thought.mood}心情的随笔`}
                    >
                      <span className="text-base">{thought.mood}</span>
                    </button>
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
                    {thought.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-md text-sm transition-colors font-thin tracking-wide font-serif ${
                          selectedTags.includes(tag)
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 ring-1 ring-gray-400 dark:ring-gray-500'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </footer>
                )}
              </article>
              );
            })}
          </div>
        )}

        {/* 底部统计 */}
        {filteredThoughts.length > 0 && (
          <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
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
          </div>
        )}
      </main>
    </>
  );
} 