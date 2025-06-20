import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Heart, Sparkles, Globe, Code, Palette } from 'lucide-react';
import { siteConfig } from '../../site.config';
import Footer from '../../components/Footer';
import NavigationWrapper from '../../components/NavigationWrapper';
import Comments from '../../components/Comments';
import { getAssetPath } from '../../lib/utils';
import BackToTop from '../../components/BackToTop';

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
                            src={getAssetPath(friend.avatar)}
                            alt={friend.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          {/* 头像扫描效果 */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-hover:animate-scan-horizontal"></div>
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
                    <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {otherFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-all duration-300"
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
                        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-300 dark:group-hover:ring-blue-600 transition-all duration-300">
                          <Image
                            src={getAssetPath(friend.avatar)}
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
                            <Globe className="w-3 h-3 text-gray-400 flex-shrink-0" />
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif truncate">
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
                        {friend.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 text-xs text-gray-600 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 rounded-full font-thin tracking-wide font-serif"
                          >
                            {tag}
                          </span>
                        ))}
                        {friend.tags.length > 2 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-thin">
                            +{friend.tags.length - 2}
                          </span>
                        )}
                      </div>

                      {/* 访问按钮 */}
                      <Link
                        href={friend.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 w-full justify-center px-3 py-2 text-xs text-gray-700 dark:text-gray-300 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 font-thin tracking-wide font-serif group/btn"
                      >
                        <span>访问</span>
                        <ExternalLink size={12} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 申请友链说明 */}
        <section className="py-16 bg-gray-50/50 dark:bg-gray-800/20 relative overflow-hidden friends-animate-section">
          {/* 背景动画装饰 */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-2 h-2 bg-blue-300/40 dark:bg-blue-500/20 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
            <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-purple-300/40 dark:bg-purple-500/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-pink-300/40 dark:bg-pink-500/20 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
            <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-green-300/40 dark:bg-green-500/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-20 right-10 w-2 h-2 bg-indigo-300/40 dark:bg-indigo-500/20 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 friends-animate-section">
              <div className="flex items-center justify-center gap-2 mb-6 friends-animate-item" style={{'--delay': '0.1s'} as React.CSSProperties}>
                <div className="relative">
                  <Heart className="w-6 h-6 text-red-500 animate-pulse" />
                  <div className="absolute inset-0 animate-ping">
                    <Heart className="w-6 h-6 text-red-500/30" />
                  </div>
                </div>
                <Sparkles className="w-5 h-5 text-yellow-500 animate-bounce" style={{animationDelay: '0.5s'}} />
              </div>
              <h3 className="text-3xl md:text-4xl font-thin tracking-[0.1em] font-serif text-gray-900 dark:text-white mb-4 friends-animate-item" style={{'--delay': '0.2s'} as React.CSSProperties}>
                申请友链
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-thin tracking-wide font-serif leading-relaxed max-w-2xl mx-auto friends-animate-item" style={{'--delay': '0.3s'} as React.CSSProperties}>
                欢迎志同道合的朋友申请友链，一起构建互联网的美好连接
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden relative group friends-animate-item" style={{'--delay': '0.4s'} as React.CSSProperties}>
              {/* 悬浮时的边框动画 */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50/80 via-blue-50/60 to-gray-50/80 dark:from-gray-700/20 dark:via-gray-600/30 dark:to-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
              
              {/* 顶部扫描线动画 */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/60 dark:via-blue-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="p-8 md:p-10 relative z-10">
                {/* 要求和信息网格 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* 申请要求 */}
                  <div className="friends-animate-item" style={{'--delay': '0.5s'} as React.CSSProperties}>
                    <h4 className="text-lg font-thin tracking-wide font-serif text-gray-900 dark:text-white mb-4 flex items-center gap-2 group/title">
                      <Code className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/title:text-blue-500 dark:group-hover/title:text-blue-400 transition-colors duration-300 group-hover/title:rotate-12 transform" />
                      申请要求
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300 font-thin tracking-wide font-serif">
                      <li className="flex items-start gap-3 group/item friends-animate-item" style={{'--delay': '0.6s'} as React.CSSProperties}>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0 group-hover/item:bg-blue-500 transition-colors duration-300 group-hover/item:scale-125 transform"></div>
                        <span className="group-hover/item:text-gray-800 dark:group-hover/item:text-gray-200 transition-colors duration-300">网站内容原创且有价值</span>
                      </li>
                      <li className="flex items-start gap-3 group/item friends-animate-item" style={{'--delay': '0.7s'} as React.CSSProperties}>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0 group-hover/item:bg-green-500 transition-colors duration-300 group-hover/item:scale-125 transform"></div>
                        <span className="group-hover/item:text-gray-800 dark:group-hover/item:text-gray-200 transition-colors duration-300">网站可以正常访问</span>
                      </li>
                      <li className="flex items-start gap-3 group/item friends-animate-item" style={{'--delay': '0.8s'} as React.CSSProperties}>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0 group-hover/item:bg-purple-500 transition-colors duration-300 group-hover/item:scale-125 transform"></div>
                        <span className="group-hover/item:text-gray-800 dark:group-hover/item:text-gray-200 transition-colors duration-300">技术相关或个人博客</span>
                      </li>
                      <li className="flex items-start gap-3 group/item friends-animate-item" style={{'--delay': '0.9s'} as React.CSSProperties}>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0 group-hover/item:bg-pink-500 transition-colors duration-300 group-hover/item:scale-125 transform"></div>
                        <span className="group-hover/item:text-gray-800 dark:group-hover/item:text-gray-200 transition-colors duration-300">网站设计美观</span>
                      </li>
                    </ul>
                  </div>

                  {/* 提供信息 */}
                  <div className="friends-animate-item" style={{'--delay': '0.5s'} as React.CSSProperties}>
                    <h4 className="text-lg font-thin tracking-wide font-serif text-gray-900 dark:text-white mb-4 flex items-center gap-2 group/title">
                      <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/title:text-green-500 dark:group-hover/title:text-green-400 transition-colors duration-300 group-hover/title:rotate-12 transform" />
                      提供信息
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300 font-thin tracking-wide font-serif">
                      <li className="flex items-start gap-3 group/item friends-animate-item" style={{'--delay': '0.6s'} as React.CSSProperties}>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0 group-hover/item:bg-orange-500 transition-colors duration-300 group-hover/item:scale-125 transform"></div>
                        <span className="group-hover/item:text-gray-800 dark:group-hover/item:text-gray-200 transition-colors duration-300">网站名称</span>
                      </li>
                      <li className="flex items-start gap-3 group/item friends-animate-item" style={{'--delay': '0.7s'} as React.CSSProperties}>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0 group-hover/item:bg-teal-500 transition-colors duration-300 group-hover/item:scale-125 transform"></div>
                        <span className="group-hover/item:text-gray-800 dark:group-hover/item:text-gray-200 transition-colors duration-300">网站地址</span>
                      </li>
                      <li className="flex items-start gap-3 group/item friends-animate-item" style={{'--delay': '0.8s'} as React.CSSProperties}>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0 group-hover/item:bg-indigo-500 transition-colors duration-300 group-hover/item:scale-125 transform"></div>
                        <span className="group-hover/item:text-gray-800 dark:group-hover/item:text-gray-200 transition-colors duration-300">网站描述</span>
                      </li>
                      <li className="flex items-start gap-3 group/item friends-animate-item" style={{'--delay': '0.9s'} as React.CSSProperties}>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0 group-hover/item:bg-rose-500 transition-colors duration-300 group-hover/item:scale-125 transform"></div>
                        <span className="group-hover/item:text-gray-800 dark:group-hover/item:text-gray-200 transition-colors duration-300">头像链接</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 分隔线 */}
                <div className="border-t border-gray-200/60 dark:border-gray-700/60 my-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/20 dark:via-gray-600/20 to-transparent animate-pulse"></div>
                </div>

                {/* 申请按钮区域 */}
                <div className="text-center friends-animate-item" style={{'--delay': '1s'} as React.CSSProperties}>
                  {siteConfig.profile.email && (
                    <div className="space-y-4">
                      <Link
                        href={`mailto:${siteConfig.profile.email}?subject=友链申请&body=网站名称：%0A网站地址：%0A网站描述：%0A头像链接：`}
                        className="group/btn inline-flex items-center gap-2 px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/60 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 rounded-lg transition-all duration-300 font-thin tracking-wide font-serif hover:scale-105 hover:shadow-lg dark:hover:shadow-xl transform relative overflow-hidden"
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
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif animate-pulse">
                        申请后我会在 24 小时内回复
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Comments 
              pageId="friends"
              pageTitle="友链"
            />
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
} 