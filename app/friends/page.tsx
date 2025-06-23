'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Heart, Sparkles, Globe, Code, Palette } from 'lucide-react';
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

// 友链状态类型定义
type FriendStatus = 'active' | 'inactive';

// 友链状态映射
const statusConfig: Record<FriendStatus, { label: string; color: string }> = {
  active: { label: '在线', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
  inactive: { label: '离线', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400' }
};

// 标签图标映射
const tagIcons: { [key: string]: any } = {
  '技术': Code,
  '博客': Globe,
  '前端': Code,
  '后端': Code,
  'Java': Code,
  'Spring': Code,
  '设计': Palette,
  'UI/UX': Palette,
  '创意': Sparkles,
};

// 简化的动画变量
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const heroVariants = {
  hidden: { 
    opacity: 0, 
    y: 30
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function FriendsPage() {
  // 如果友链功能未启用，返回 404
  if (!siteConfig.friends?.enabled) {
    return null;
  }

  const { friends } = siteConfig;
  const featuredFriends = friends.items.filter(friend => friend.featured);
  const otherFriends = friends.items.filter(friend => !friend.featured);

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
            <h1 className="text-4xl md:text-5xl font-thin tracking-widest font-serif mb-4">{friends.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-thin tracking-widest font-serif italic">
              {friends.description}
            </p>
          </div>
        </motion.section>

        {/* Featured Friends */}
        {featuredFriends.length > 0 && (
          <AnimatedSection className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-thin tracking-[0.1em] font-serif mb-12 text-center text-gray-900 dark:text-white flex items-center justify-center gap-3">
                精选友链
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredFriends.map((friend) => (
                  <motion.div
                    key={friend.id}
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-all duration-300"
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                    }}
                  >
                    {/* 悬浮背景效果 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    
                    {/* 状态标签 */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[friend.status as FriendStatus]?.color || statusConfig.active.color}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${friend.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                        {statusConfig[friend.status as FriendStatus]?.label || '在线'}
                      </span>
                    </div>

                    {/* 友链内容 */}
                    <div className="relative z-10 p-6">
                      {/* 头像和基本信息 */}
                      <div className="flex items-center gap-4 mb-4">
                        <div
                            className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-300 dark:group-hover:ring-blue-600 transition-all duration-300">
                          <ClientImage
                              src={friend.avatar}
                              alt={friend.name}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          {/* 头像扫描效果 */}
                          <div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-hover:animate-scan-horizontal"></div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-thin tracking-wide font-serif text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {friend.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Globe className="w-4 h-4 text-gray-400"/>
                            <span
                                className="text-sm text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif truncate">
                              {friend.url.replace(/^https?:\/\//, '')}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 font-thin tracking-wide font-serif leading-relaxed text-sm">
                        {friend.description}
                      </p>

                      {/* 技术标签 */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {friend.tags.map((tag, tagIndex) => {
                          const IconComponent = tagIcons[tag] || Globe;
                          return (
                              <motion.span
                                  key={tag}
                                  className="inline-flex items-center px-2 py-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 rounded-full font-thin tracking-wide font-serif"
                                  initial={{opacity: 0, x: -15, y: 5}}
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
                                <IconComponent size={12}/>
                                {tag}
                              </motion.span>
                          );
                        })}
                      </div>

                      {/* 访问按钮 */}
                      <motion.div
                          initial={{opacity: 0, x: -15, y: 5}}
                          animate={{
                            opacity: 1,
                            x: 0,
                            y: 0,
                            transition: {
                              delay: 0.4,
                              duration: 0.8,
                              ease: [0.22, 1, 0.36, 1]
                            }
                          }}
                      >
                        <Link
                            href={friend.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 font-thin tracking-wide font-serif group/btn"
                        >
                          <span>访问网站</span>
                          <ExternalLink size={16}
                                        className="group-hover/btn:translate-x-1 transition-transform duration-200"/>
                        </Link>
                  </motion.div>
                  </div>

                {/* 扫描线动画 */}
                <div
                    className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                      className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/60 dark:via-blue-500/60 to-transparent animate-scan-horizontal"></div>
                  <div
                      className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400/60 dark:via-purple-500/60 to-transparent animate-scan-vertical"></div>
                </div>
              </motion.div>
              ))}
            </div>
          </div>
          </AnimatedSection>
          )}

        {/* Other Friends */}
        {otherFriends.length > 0 && (
          <AnimatedSection className="py-16 bg-gray-50/50 dark:bg-gray-800/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-thin tracking-[0.1em] font-serif mb-12 text-center text-gray-900 dark:text-white">
                更多友链
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {otherFriends.map((friend) => (
                  <motion.div
                    key={friend.id}
                    className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-all duration-300"
                    whileHover={{ 
                      y: -6,
                      scale: 1.02,
                      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                    }}
                  >
                    {/* 简化的悬浮效果 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-blue-50/50 dark:from-gray-700/30 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                    
                    {/* 状态标签 */}
                    <div className="absolute top-3 right-3 z-20">
                      <div className={`w-2 h-2 rounded-full ${friend.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    </div>

                    <div className="relative z-10 p-4">
                      {/* 头像和基本信息 */}
                      <div className="flex items-center gap-3 mb-3">
                        <div
                            className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-300 dark:group-hover:ring-blue-600 transition-all duration-300">
                          <ClientImage
                              src={friend.avatar}
                              alt={friend.name}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-thin tracking-wide font-serif text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                            {friend.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Globe className="w-3 h-3 text-gray-400 flex-shrink-0"/>
                            <span
                                className="text-xs text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif truncate">
                              {friend.url.replace(/^https?:\/\//, '')}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-3 font-thin tracking-wide font-serif leading-relaxed text-xs line-clamp-2">
                        {friend.description}
                      </p>

                      {/* 技术标签 */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {friend.tags.slice(0, 2).map((tag, tagIndex) => (
                            <motion.span
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 text-xs text-gray-600 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 rounded-full font-thin tracking-wide font-serif"
                                initial={{opacity: 0, x: -15, scale: 0.9}}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                  scale: 1,
                                  transition: {
                                    delay: 0.3 + (0.1 * tagIndex),
                                    duration: 0.5,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                  }
                                }}
                            >
                              {tag}
                            </motion.span>
                        ))}
                        {friend.tags.length > 2 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-thin">
                            +{friend.tags.length - 2}
                          </span>
                        )}
                      </div>

                      {/* 访问按钮 */}
                      <motion.div
                          initial={{opacity: 0, x: -15, y: 5}}
                          animate={{
                            opacity: 1,
                            x: 0,
                            y: 0,
                            transition: {
                              delay: 0.4,
                              duration: 0.8,
                              ease: [0.22, 1, 0.36, 1]
                            }
                          }}
                      >
                        <Link
                            href={friend.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 w-full justify-center px-3 py-2 text-xs text-gray-700 dark:text-gray-300 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 font-thin tracking-wide font-serif group/btn"
                        >
                          <span>访问</span>
                          <ExternalLink size={12}
                                        className="group-hover/btn:translate-x-0.5 transition-transform duration-200"/>
                        </Link>
                  </motion.div>
                  </div>
                  </motion.div>
                  ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* 申请友链说明 */}
        <AnimatedSection className="pt-16 pb-0 bg-gray-50/50 dark:bg-gray-800/20 relative overflow-hidden">
          {/* 背景动画装饰 */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
                className="absolute top-20 left-10 w-2 h-2 bg-blue-300/40 dark:bg-blue-500/20 rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
            />
            <motion.div 
              className="absolute top-40 right-20 w-1.5 h-1.5 bg-purple-300/40 dark:bg-purple-500/20 rounded-full"
              animate={{ 
                y: [0, -8, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div 
              className="absolute bottom-32 left-1/4 w-1 h-1 bg-pink-300/40 dark:bg-pink-500/20 rounded-full"
              animate={{ 
                y: [0, -6, 0],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div 
                className="flex items-center justify-center gap-2 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="relative">
                  <Heart className="w-6 h-6 text-red-500 animate-pulse" />
                  <div className="absolute inset-0 animate-ping">
                    <Heart className="w-6 h-6 text-red-500/30" />
                  </div>
                </div>
                <Sparkles className="w-5 h-5 text-yellow-500 animate-bounce" style={{animationDelay: '0.5s'}} />
              </motion.div>
              <h3 className="text-3xl md:text-4xl font-thin tracking-[0.1em] font-serif text-gray-900 dark:text-white mb-4">
                申请友链
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-thin tracking-wide font-serif leading-relaxed max-w-2xl mx-auto">
                欢迎志同道合的朋友申请友链，一起构建互联网的美好连接
              </p>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden relative group"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* 悬浮时的边框动画 */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50/80 via-blue-50/60 to-gray-50/80 dark:from-gray-700/20 dark:via-gray-600/30 dark:to-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
              
              {/* 顶部扫描线动画 */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/60 dark:via-blue-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="p-8 md:p-10 relative z-10">
                {/* 要求和信息网格 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* 申请要求 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                  >
                    <h4 className="text-lg font-thin tracking-wide font-serif text-gray-900 dark:text-white mb-4 flex items-center gap-2 group/title">
                      <Code className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/title:text-blue-500 dark:group-hover/title:text-blue-400 transition-colors duration-300 group-hover/title:rotate-12 transform" />
                      申请要求
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300 font-thin tracking-wide font-serif">
                                              {[
                                                  '网站内容原创且有价值',
                        '网站可以正常访问',
                        '技术相关或个人博客',
                        '网站设计美观'
                      ].map((item, index) => (
                        <motion.li 
                          key={index}
                          className="flex items-start gap-3 group/item"
                                                      initial={{ opacity: 0, x: -15, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 + (index * 0.05) }}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 transition-colors duration-300 group-hover/item:scale-125 transform ${
                            index === 0 ? 'bg-blue-400 group-hover/item:bg-blue-500' :
                            index === 1 ? 'bg-green-400 group-hover/item:bg-green-500' :
                            index === 2 ? 'bg-purple-400 group-hover/item:bg-purple-500' :
                            'bg-pink-400 group-hover/item:bg-pink-500'
                          }`}></div>
                          <span className="group-hover/item:text-gray-800 dark:group-hover/item:text-gray-200 transition-colors duration-300">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* 提供信息 */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                  >
                    <h4 className="text-lg font-thin tracking-wide font-serif text-gray-900 dark:text-white mb-4 flex items-center gap-2 group/title">
                      <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/title:text-green-500 dark:group-hover/title:text-green-400 transition-colors duration-300 group-hover/title:rotate-12 transform" />
                      提供信息
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300 font-thin tracking-wide font-serif">
                                              {[
                                                  '网站名称',
                        '网站地址',
                        '网站描述',
                        '头像链接'
                      ].map((item, index) => (
                        <motion.li 
                          key={index}
                          className="flex items-start gap-3 group/item"
                                                      initial={{ opacity: 0, x: 15, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 + (index * 0.05) }}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 transition-colors duration-300 group-hover/item:scale-125 transform ${
                            index === 0 ? 'bg-orange-400 group-hover/item:bg-orange-500' :
                            index === 1 ? 'bg-teal-400 group-hover/item:bg-teal-500' :
                            index === 2 ? 'bg-indigo-400 group-hover/item:bg-indigo-500' :
                            'bg-rose-400 group-hover/item:bg-rose-500'
                          }`}></div>
                          <span className="group-hover/item:text-gray-800 dark:group-hover/item:text-gray-200 transition-colors duration-300">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* 分隔线 */}
                <div className="border-t border-gray-200/60 dark:border-gray-700/60 my-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/20 dark:via-gray-600/20 to-transparent animate-pulse"></div>
                </div>

                {/* 申请按钮区域 */}
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
                >
                  {siteConfig.profile.email && (
                    <div className="space-y-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={`mailto:${siteConfig.profile.email}?subject=友链申请&body=网站名称：%0A网站地址：%0A网站描述：%0A头像链接：`}
                          className="group/btn inline-flex items-center gap-2 px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 rounded-lg transition-all duration-300 font-thin tracking-wide font-serif hover:shadow-lg dark:hover:shadow-xl transform relative overflow-hidden"
                        >
                          {/* 按钮背景动画 */}
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-100/60 to-gray-200/60 dark:from-gray-600/30 dark:to-gray-500/30 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          
                          <span className="relative z-10 group-hover/btn:text-gray-800 dark:group-hover/btn:text-gray-100 transition-colors">申请友链</span>
                          <ExternalLink className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 group-hover/btn:scale-110 transform transition-all duration-300" />
                          
                          {/* 按钮光效 */}
                          <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-flow-right"></div>
                          </div>
                        </Link>
                      </motion.div>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif animate-pulse">
                        申请后我会在 24 小时内回复
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Comments Section */}
        <AnimatedSection className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Comments 
              pageId="friends"
              pageTitle="友链"
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