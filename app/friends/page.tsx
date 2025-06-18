'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Heart, Sparkles, Globe, Code, Palette } from 'lucide-react';
import { siteConfig } from '../../site.config';
import Footer from '../../components/Footer';
import NavigationWrapper from '../../components/NavigationWrapper';
import Comments from '../../components/Comments';

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

export default function FriendsPage() {
  const [hoveredFriend, setHoveredFriend] = useState<string | null>(null);

  // 如果友链功能未启用，返回 404
  if (!siteConfig.friends?.enabled) {
    return null;
  }

  const { friends } = siteConfig;
  const featuredFriends = friends.items.filter(friend => friend.featured);
  const otherFriends = friends.items.filter(friend => !friend.featured);

  return (
    <>
      <NavigationWrapper />
      
      <main className="min-h-screen bg-white dark:bg-gray-900 pt-16">
        {/* Hero Section */}
        <section className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/*<div className="inline-flex items-center gap-3 mb-6">*/}
            {/*  <Users className="w-12 h-12 text-gray-600 dark:text-gray-400" />*/}
            {/*  <Heart className="w-8 h-8 text-red-500 animate-pulse" />*/}
            {/*</div>*/}
            <h1 className="text-4xl md:text-5xl font-thin tracking-widest font-serif mb-4">{friends.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-thin tracking-widest font-serif italic">
              {friends.description}
            </p>
            
            {/* 统计信息 */}
            {/*<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 max-w-md mx-auto">*/}
            {/*  <div className="text-center">*/}
            {/*    <div className="text-2xl font-thin tracking-wide font-serif text-gray-900 dark:text-white">*/}
            {/*      {friends.items.length}*/}
            {/*    </div>*/}
            {/*    <div className="text-sm text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">*/}
            {/*      总友链*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="text-center">*/}
            {/*    <div className="text-2xl font-thin tracking-wide font-serif text-gray-900 dark:text-white">*/}
            {/*      {friends.items.filter(f => f.status === 'active').length}*/}
            {/*    </div>*/}
            {/*    <div className="text-sm text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">*/}
            {/*      在线*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="text-center col-span-2 md:col-span-1">*/}
            {/*    <div className="text-2xl font-thin tracking-wide font-serif text-gray-900 dark:text-white">*/}
            {/*      {featuredFriends.length}*/}
            {/*    </div>*/}
            {/*    <div className="text-sm text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif">*/}
            {/*      精选*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
          
          {/* 背景动画点 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-gray-400/20 dark:bg-gray-500/20 rounded-full animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-0.5 h-0.5 bg-gray-400/30 dark:bg-gray-500/30 rounded-full animate-ping"></div>
            <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-gray-400/15 dark:bg-gray-500/15 rounded-full animate-pulse delay-500"></div>
            <div className="absolute top-1/2 right-1/6 w-0.5 h-0.5 bg-gray-400/25 dark:bg-gray-500/25 rounded-full animate-ping delay-1000"></div>
            
            {/* 环绕粒子 */}
            <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-blue-400/10 dark:bg-blue-500/10 rounded-full animate-orbit"></div>
            <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-purple-400/10 dark:bg-purple-500/10 rounded-full animate-orbit" style={{ animationDelay: '2s' }}></div>
          </div>
        </section>

        {/* Featured Friends */}
        {featuredFriends.length > 0 && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-thin tracking-[0.1em] font-serif mb-12 text-center text-gray-900 dark:text-white flex items-center justify-center gap-3">
                精选友链
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 glow-effect"
                    onMouseEnter={() => setHoveredFriend(friend.id)}
                    onMouseLeave={() => setHoveredFriend(null)}
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
                        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-300 dark:group-hover:ring-blue-600 transition-all duration-300">
                          <Image
                            src={friend.avatar}
                            alt={friend.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          {/* 头像扫描效果 */}
                          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-300 ${hoveredFriend === friend.id ? 'opacity-100 animate-scan-horizontal' : 'opacity-0'}`}></div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-thin tracking-wide font-serif text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {friend.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif truncate">
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
                        {friend.tags.map((tag) => {
                          const IconComponent = tagIcons[tag] || Globe;
                          return (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 rounded-full font-thin tracking-wide font-serif transition-all duration-200 hover:scale-105 hover:bg-gray-200/80 dark:hover:bg-gray-600/60"
                            >
                              <IconComponent size={12} />
                              {tag}
                            </span>
                          );
                        })}
                      </div>

                                             {/* 访问按钮 */}
                       <Link
                         href={friend.url}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 font-thin tracking-wide font-serif group/btn"
                       >
                         <span>访问网站</span>
                         <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                       </Link>
                    </div>

                    {/* 扫描线动画 */}
                    <div 
                      className={`absolute inset-0 rounded-2xl pointer-events-none overflow-hidden ${
                        hoveredFriend === friend.id ? 'opacity-100' : 'opacity-0'
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

        {/* Other Friends */}
        {otherFriends.length > 0 && (
          <section className="py-16 bg-gray-50/50 dark:bg-gray-800/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-thin tracking-[0.1em] font-serif mb-12 text-center text-gray-900 dark:text-white">
                更多友链
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {otherFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200/60 dark:border-gray-700/60 p-4 hover:shadow-md dark:hover:shadow-lg transition-all duration-300"
                    onMouseEnter={() => setHoveredFriend(friend.id)}
                    onMouseLeave={() => setHoveredFriend(null)}
                  >
                    {/* 简化的悬浮效果 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-blue-50/50 dark:from-gray-700/30 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                    
                    <div className="relative z-10">
                      {/* 头像和名称 */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700">
                          <Image
                            src={friend.avatar}
                            alt={friend.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-thin tracking-wide font-serif text-gray-900 dark:text-white truncate">
                            {friend.name}
                          </h3>
                          <div className={`inline-flex items-center gap-1 text-xs ${statusConfig[friend.status as FriendStatus]?.color || statusConfig.active.color}`}>
                            <div className={`w-1 h-1 rounded-full ${friend.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                            {statusConfig[friend.status as FriendStatus]?.label || '在线'}
                          </div>
                        </div>
                      </div>
                      
                                             <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 font-thin tracking-wide font-serif leading-relaxed h-8 overflow-hidden">
                         {friend.description}
                       </p>

                                             {/* 访问按钮 */}
                       <Link
                         href={friend.url}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="inline-flex items-center gap-2 w-full justify-center px-3 py-2 text-xs text-gray-700 dark:text-gray-300 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 font-thin tracking-wide font-serif"
                       >
                         <span>访问</span>
                         <ExternalLink size={12} />
                       </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 申请友链说明 */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                         <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200/60 dark:border-gray-700/60">
               <div className="flex items-center justify-center gap-3 mb-4">
                 <h3 className="text-2xl font-thin tracking-wide font-serif text-gray-900 dark:text-white">
                   申请友链
                 </h3>
                 <Heart className="w-6 h-6 text-red-500 animate-pulse" />
               </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 font-thin tracking-wide font-serif leading-relaxed">
                欢迎志同道合的朋友申请友链！请确保您的网站内容积极向上，并且能够正常访问。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <div className="text-left">
                  <h4 className="font-thin tracking-wide font-serif text-gray-700 dark:text-gray-300 mb-2">申请要求：</h4>
                  <ul className="space-y-1 font-thin tracking-wide font-serif">
                    <li>• 网站内容原创且有价值</li>
                    <li>• 网站可以正常访问</li>
                    <li>• 技术相关或个人博客</li>
                    <li>• 网站设计美观</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h4 className="font-thin tracking-wide font-serif text-gray-700 dark:text-gray-300 mb-2">提供信息：</h4>
                  <ul className="space-y-1 font-thin tracking-wide font-serif">
                    <li>• 网站名称</li>
                    <li>• 网站地址</li>
                    <li>• 网站描述</li>
                    <li>• 头像链接</li>
                  </ul>
                </div>
              </div>
              
                             {siteConfig.profile.email && (
                 <Link
                   href={`mailto:${siteConfig.profile.email}?subject=友链申请&body=网站名称：%0A网站地址：%0A网站描述：%0A头像链接：`}
                   className="inline-flex items-center gap-2 px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 font-thin tracking-wide font-serif"
                 >
                   <span>申请友链</span>
                 </Link>
               )}
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="py-16 bg-gray-50/50 dark:bg-gray-800/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Comments 
              pageId="friends"
              pageTitle="友链"
              pageUrl="/friends"
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
} 