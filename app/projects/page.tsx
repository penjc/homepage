'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink, Star, Code2, Zap, Clock } from 'lucide-react';
import { siteConfig } from '../../site.config';
import Footer from '../../components/Footer';
import NavigationWrapper from '../../components/NavigationWrapper';
import Comments from '../../components/Comments';
import { getAssetPath } from '../../lib/utils';

// 项目状态类型定义
type ProjectStatus = 'active' | 'completed' | 'archived';

// 项目状态映射
const statusConfig: Record<ProjectStatus, { label: string; color: string }> = {
  active: { label: '进行中', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
  completed: { label: '已完成', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' },
  archived: { label: '已归档', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400' }
};

export default function ProjectsPage() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // 如果项目功能未启用，返回 404
  if (!siteConfig.projects?.enabled) {
    return null;
  }

  const { projects } = siteConfig;
  const featuredProjects = projects.items.filter(project => project.featured);
  const otherProjects = projects.items.filter(project => !project.featured);

  return (
    <>
      <NavigationWrapper />
      
      <main className="min-h-screen bg-white dark:bg-gray-900 pt-16">
        {/* Hero Section */}
        <section className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-thin tracking-widest font-serif mb-4">{projects.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-thin tracking-widest font-serif italic">
              {projects.description}
            </p>
          </div>
          

        </section>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-thin tracking-[0.1em] font-serif mb-12 text-center text-gray-900 dark:text-white">
                精选项目
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 glow-effect"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* 悬浮背景效果 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    
                    {/* 项目图片 */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                      {project.image ? (
                        <Image
                          src={getAssetPath(project.image)}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                          <Code2 size={48} className="text-gray-400 dark:text-gray-500" />
                        </div>
                      )}
                      
                      {/* 状态标签 */}
                      <div className="absolute top-4 right-4 z-20">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[project.status as ProjectStatus]?.color || statusConfig.completed.color}`}>
                          {project.status === 'active' && <Zap size={12} />}
                          {project.status === 'completed' && <Star size={12} />}
                          {project.status === 'archived' && <Clock size={12} />}
                          {statusConfig[project.status as ProjectStatus]?.label || '已完成'}
                        </span>
                      </div>
                    </div>

                    {/* 项目内容 */}
                    <div className="relative z-10 p-6">
                      <h3 className="text-xl font-thin tracking-wide font-serif mb-3 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 font-thin tracking-wide font-serif leading-relaxed">
                        {project.description}
                      </p>

                      {/* 技术标签 */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 rounded-full font-thin tracking-wide font-serif transition-all duration-200 hover:scale-105 hover:bg-gray-200/80 dark:hover:bg-gray-600/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* 链接按钮 */}
                      <div className="flex items-center gap-3">
                        {project.github && (
                          <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 rounded-lg hover:bg-gray-200/80 dark:hover:bg-gray-600/80 transition-all duration-200 font-thin tracking-wide font-serif"
                          >
                            <Github size={16} />
                            <span>代码</span>
                          </Link>
                        )}
                        
                        {project.demo && (
                          <Link
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg transition-all duration-200 font-thin tracking-wide font-serif"
                          >
                            <ExternalLink size={16} />
                            <span>演示</span>
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* 扫描线动画 */}
                    <div 
                      className={`absolute inset-0 rounded-2xl pointer-events-none overflow-hidden ${
                        hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                      } transition-opacity duration-300`}
                    >
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/60 dark:via-blue-500/60 to-transparent animate-scan-horizontal"></div>
                      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400/60 dark:via-purple-500/60 to-transparent animate-scan-vertical"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <section className="py-16 bg-gray-50/50 dark:bg-gray-800/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-thin tracking-[0.1em] font-serif mb-12 text-center text-gray-900 dark:text-white">
                更多项目
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200/60 dark:border-gray-700/60 p-6 hover:shadow-lg dark:hover:shadow-xl transition-all duration-300"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* 简化的悬浮效果 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-blue-50/50 dark:from-gray-700/30 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                    
                    <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
                        <Code2 size={24} className="text-gray-600 dark:text-gray-400" />
                      </div>
                      
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[project.status as ProjectStatus]?.color || statusConfig.completed.color}`}>
                        {project.status === 'active' && <Zap size={10} />}
                        {project.status === 'completed' && <Star size={10} />}
                        {project.status === 'archived' && <Clock size={10} />}
                        {statusConfig[project.status as ProjectStatus]?.label || '已完成'}
                      </span>
                    </div>

                    <h3 className="text-lg font-thin tracking-wide font-serif mb-2 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 font-thin tracking-wide font-serif text-sm leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 text-xs text-gray-600 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 rounded font-thin tracking-wide font-serif"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-thin">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 rounded hover:bg-gray-200/80 dark:hover:bg-gray-600/80 transition-all duration-200 font-thin tracking-wide font-serif"
                        >
                          <Github size={14} />
                          <span>代码</span>
                        </Link>
                      )}
                      
                                              {project.demo && (
                          <Link
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded transition-all duration-200 font-thin tracking-wide font-serif"
                          >
                            <ExternalLink size={14} />
                            <span>演示</span>
                          </Link>
                        )}
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty State */}
        {projects.items.length === 0 && (
          <section className="py-24">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Code2 size={64} className="mx-auto text-gray-400 dark:text-gray-500 mb-6" />
              <h2 className="text-2xl font-thin tracking-wide font-serif mb-4 text-gray-900 dark:text-white">
                暂无项目
              </h2>
              <p className="text-gray-600 dark:text-gray-300 font-thin tracking-wide font-serif">
                项目正在开发中，敬请期待...
              </p>
            </div>
          </section>
        )}

        {/* Comments Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Comments 
              pageId="projects"
              pageTitle="项目"
              pageUrl="/projects"
            />
          </div>
        </section>
      </main>

      <Footer />
      
      <style jsx>{`


        @keyframes scan-horizontal {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes scan-vertical {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }



        .animate-scan-horizontal {
          animation: scan-horizontal 2s ease-in-out infinite;
        }

        .animate-scan-vertical {
          animation: scan-vertical 2.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
} 