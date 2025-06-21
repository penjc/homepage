'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Github, ExternalLink, Star, Code2, Zap, Clock } from 'lucide-react';
import { siteConfig } from '../../site.config';
import Footer from '../../components/Footer';
import NavigationWrapper from '../../components/NavigationWrapper';
import Comments from '../../components/Comments';
import ClientImage from '../../components/ClientImage';
import BackToTop from '../../components/BackToTop';

// 动画组件
function AnimatedSection({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 项目状态类型定义
type ProjectStatus = 'active' | 'completed' | 'archived';

// 项目状态映射
const statusConfig: Record<ProjectStatus, { label: string; color: string }> = {
  active: { label: '进行中', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
  completed: { label: '已完成', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' },
  archived: { label: '已归档', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400' }
};

// 简化的动画变量
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const heroVariants = {
  hidden: { 
    opacity: 0, 
    y: 20
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function ProjectsPage() {
  // 如果项目功能未启用，返回 404
  if (!siteConfig.projects?.enabled) {
    return null;
  }

  const { projects } = siteConfig;
  const featuredProjects = projects.items.filter(project => project.featured);
  const otherProjects = projects.items.filter(project => !project.featured);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <NavigationWrapper />
      
      <main className="min-h-screen bg-white dark:bg-gray-900 pt-16">
        {/* Hero Section */}
        <motion.section 
          className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16 relative overflow-hidden"
          variants={heroVariants}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-thin tracking-widest font-serif mb-4">{projects.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-thin tracking-widest font-serif italic">
              {projects.description}
            </p>
          </div>
        </motion.section>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <AnimatedSection className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-thin tracking-[0.1em] font-serif mb-12 text-center text-gray-900 dark:text-white">
                精选项目
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-all duration-300"
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    {/* 悬浮背景效果 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    
                    {/* 项目图片 */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                      {project.image ? (
                        <ClientImage
                          src={project.image}
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
                        {project.tags.map((tag, tagIndex) => (
                          <motion.span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 rounded-full font-thin tracking-wide font-serif transition-all duration-200"
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ 
                              opacity: 1, 
                              scale: 1,
                              y: 0,
                              transition: { 
                                delay: 0.5 + (0.1 * tagIndex),
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1]
                              }
                            }}
                            whileHover={{ 
                              scale: 1.05,
                              backgroundColor: "rgba(59, 130, 246, 0.1)",
                              transition: { duration: 0.3 }
                            }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      {/* 链接按钮 */}
                      <div className="flex items-center gap-3">
                        {project.github && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 rounded-lg hover:bg-gray-200/80 dark:hover:bg-gray-600/80 transition-all duration-200 font-thin tracking-wide font-serif"
                            >
                              <Github size={16} />
                              <span>代码</span>
                            </Link>
                          </motion.div>
                        )}
                        
                        {project.demo && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg transition-all duration-200 font-thin tracking-wide font-serif"
                            >
                              <ExternalLink size={16} />
                              <span>演示</span>
                            </Link>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* 扫描线动画 */}
                    <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/60 dark:via-blue-500/60 to-transparent animate-scan-horizontal"></div>
                      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400/60 dark:via-purple-500/60 to-transparent animate-scan-vertical"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <AnimatedSection className="py-16 bg-gray-50/50 dark:bg-gray-800/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-thin tracking-[0.1em] font-serif mb-12 text-center text-gray-900 dark:text-white">
                更多项目
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200/60 dark:border-gray-700/60 p-6 hover:shadow-lg dark:hover:shadow-xl transition-all duration-300"
                    whileHover={{ 
                      y: -6,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
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
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 font-thin tracking-wide font-serif leading-relaxed text-sm">
                        {project.description}
                      </p>

                      {/* 技术标签 */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <motion.span
                            key={tag}
                            className="inline-flex items-center px-2 py-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 rounded-full font-thin tracking-wide font-serif"
                            initial={{ opacity: 0, x: -15, y: 5 }}
                            animate={{ 
                              opacity: 1, 
                              x: 0,
                              y: 0,
                              transition: { 
                                delay: 0.4 + (0.08 * tagIndex),
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1]
                              }
                            }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      {/* 链接按钮 */}
                      <div className="flex items-center gap-2">
                        {project.github && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 rounded-md hover:bg-gray-200/80 dark:hover:bg-gray-600/80 transition-all duration-200 font-thin tracking-wide font-serif"
                            >
                              <Github size={14} />
                              <span>代码</span>
                            </Link>
                          </motion.div>
                        )}
                        
                        {project.demo && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md transition-all duration-200 font-thin tracking-wide font-serif"
                            >
                              <ExternalLink size={14} />
                              <span>演示</span>
                            </Link>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Comments Section */}
        <AnimatedSection className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Comments 
              pageId="projects"
              pageTitle="项目"
            />
          </div>
        </AnimatedSection>
      </main>
      
      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </motion.div>
  );
} 