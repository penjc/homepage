'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { siteConfig } from '../../site.config';
import PageLayout from '../../components/PageLayout';
import Comments from '../../components/Comments';
import { 
  ArrowTopRightOnSquareIcon, 
  MapPinIcon, 
  EnvelopeIcon,
  CheckCircleIcon,
  CodeBracketIcon,
  ServerIcon,
  CloudIcon,
  BriefcaseIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import {
  EnvelopeIcon as EnvelopeSolidIcon,
  BriefcaseIcon as BriefcaseSolidIcon,
  UserIcon as UserSolidIcon
} from '@heroicons/react/24/solid';
import { getAssetPath } from '../../lib/utils';

// 动画变体定义
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 }
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

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

// 技能图标映射
const skillIcons: { [key: string]: any } = {
  '后端开发': ServerIcon,
  '数据库': ServerIcon,
  '云服务与运维': CloudIcon,
  '前端技术': CodeBracketIcon,
};

export default function AboutPage() {
  const { about, profile, name } = siteConfig;

  return (
    <PageLayout>
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden"
      >
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-64 h-64 relative group cursor-pointer"
            >
              {/* 头像光环效果 */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  background: [
                    "conic-gradient(from 0deg, rgba(156, 163, 175, 0.3), rgba(209, 213, 219, 0.5), rgba(156, 163, 175, 0.3))",
                    "conic-gradient(from 360deg, rgba(156, 163, 175, 0.3), rgba(209, 213, 219, 0.5), rgba(156, 163, 175, 0.3))"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  padding: "3px",
                  borderRadius: "50%"
                }}
              >
                <div className="w-full h-full rounded-full bg-gray-50 dark:bg-gray-900" />
              </motion.div>

              {/* 头像容器 */}
              <motion.div
                className="absolute inset-1 rounded-full overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -2, 2, 0],
                  transition: { 
                    scale: { duration: 0.3, ease: "easeOut" },
                    rotate: { duration: 0.6, ease: "easeInOut" }
                  }
                }}
                whileTap={{ 
                  scale: 0.95,
                  rotate: [0, -5, 5, -3, 3, 0],
                  transition: { 
                    scale: { duration: 0.1 },
                    rotate: { duration: 0.5, ease: "easeInOut" }
                  }
                }}
                onHoverStart={() => {
                  // 可以在这里添加悬浮开始的逻辑
                }}
                onHoverEnd={() => {
                  // 可以在这里添加悬浮结束的逻辑
                }}
                onClick={() => {
                  // 可以在这里添加点击逻辑，比如打开大图预览
                  console.log('头像被点击了！');
                }}
              >
                {/* 悬浮时的发光效果 */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-400/20 to-gray-600/20 opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: [0, 0.3, 0],
                    scale: [1, 1.1, 1],
                    transition: { 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                />

                {/* 头像图片 */}
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{
                    filter: [
                      "brightness(1) contrast(1) saturate(1)",
                      "brightness(1.1) contrast(1.1) saturate(1.2)",
                      "brightness(1) contrast(1) saturate(1)"
                    ],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <Image
                    src={getAssetPath(profile.avatar)}
                    alt={name}
                    width={256}
                    height={256}
                    className="w-full h-full rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                    priority
                  />
                </motion.div>

                {/* 点击波纹效果 */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-gray-400 dark:border-gray-500 opacity-0"
                  animate={{
                    scale: [1, 1.2, 1.4],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-gray-400 dark:border-gray-500 opacity-0"
                  animate={{
                    scale: [1, 1.2, 1.4],
                    opacity: [0, 0.4, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.5
                  }}
                />
              </motion.div>

              {/* 悬浮提示文字 */}
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                <span className="text-sm text-gray-500 dark:text-gray-400 font-thin tracking-wide font-serif bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-md">
                  点击查看大图
                </span>
              </motion.div>
            </motion.div>
            <div className="flex-1 text-center lg:text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl md:text-5xl font-thin tracking-widest font-serif italic mb-4"
              >
                {name}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl text-gray-600 dark:text-gray-400 mb-6 font-thin tracking-widest font-serif italic"
              >
                {profile.bio}
              </motion.p>
              {profile.location && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex items-center justify-center lg:justify-start gap-2 text-gray-500 dark:text-gray-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-thin tracking-wide font-serif">{profile.location}</span>
                </motion.div>
              )}
              
              {/* 社交媒体图标 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-6 max-w-md lg:max-w-none"
              >
                {/* 创建社交媒体图标数组，优先显示常用的 */}
                {((): Array<{ href: string; title: string; target?: string; svg: React.ReactNode }> => {
                  const socialLinks = [];

                  // 邮箱 - 始终显示（如果有）
                  if (profile.email) {
                    socialLinks.push({ 
                      href: `mailto:${profile.email}`, 
                      title: "邮箱",
                      svg: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )
                    });
                  }

                  // GitHub - 始终显示（如果有）
                  if (profile.github) {
                    socialLinks.push({ 
                      href: profile.github, 
                      title: "GitHub",
                      target: "_blank",
                      svg: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      )
                    });
                  }

                  // 添加可选的社交媒体
                  if (profile.social && (profile.social as any).linkedin) {
                    socialLinks.push({
                      href: (profile.social as any).linkedin, 
                      title: "LinkedIn",
                      target: "_blank",
                      svg: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      )
                    });
                  }

                  if (profile.social && (profile.social as any).twitter) {
                    socialLinks.push({
                      href: (profile.social as any).twitter, 
                      title: "Twitter",
                      target: "_blank",
                      svg: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      )
                    });
                  }

                  if (profile.social && (profile.social as any).bilibili) {
                    socialLinks.push({
                      href: (profile.social as any).bilibili, 
                      title: "哔哩哔哩",
                      target: "_blank",
                      svg: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .356-.124.657-.373.906l-1.174 1.12zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.789 1.894v7.52c.02.765.283 1.396.789 1.894.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.789-1.894v-7.52c-.02-.765-.283-1.396-.789-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8.24 9.867c.799 0 1.454.311 1.967.934.513.623.77 1.392.77 2.311 0 .919-.257 1.688-.77 2.311-.513.623-1.168.934-1.967.934s-1.454-.311-1.967-.934c-.513-.623-.77-1.392-.77-2.311 0-.919.257-1.688.77-2.311.513-.623 1.168-.934 1.967-.934zm7.467 0c.799 0 1.454.311 1.967.934.513.623.77 1.392.77 2.311 0 .919-.257 1.688-.77 2.311-.513.623-1.168.934-1.967.934s-1.454-.311-1.967-.934c-.513-.623-.77-1.392-.77-2.311 0-.919.257-1.688.77-2.311.513-.623 1.168-.934 1.967-.934z"/>
                        </svg>
                      )
                    });
                  }

                  if (profile.social && (profile.social as any).youtube) {
                    socialLinks.push({
                      href: (profile.social as any).youtube, 
                      title: "YouTube",
                      target: "_blank",
                      svg: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      )
                    });
                  }

                  if (profile.social && (profile.social as any).instagram) {
                    socialLinks.push({
                      href: (profile.social as any).instagram, 
                      title: "Instagram",
                      target: "_blank",
                      svg: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      )
                    });
                  }

                  if (profile.social && (profile.social as any).telegram) {
                    socialLinks.push({
                      href: (profile.social as any).telegram, 
                      title: "Telegram",
                      target: "_blank",
                      svg: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                      )
                    });
                  }

                  // 添加 RSS 订阅按钮
                  if (profile.rss && profile.rss.enabled) {
                    socialLinks.push({
                      href: "/rss.xml", 
                      title: profile.rss.title || "RSS 订阅",
                      target: "_blank",
                      svg: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248S0 22.546 0 20.752s1.456-3.248 3.252-3.248 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"/>
                        </svg>
                      )
                    });
                  }

                  // 添加旧版主页按钮
                  if (profile.oldSite && profile.oldSite.enabled) {
                    socialLinks.push({
                      href: profile.oldSite.url, 
                      title: profile.oldSite.title || "旧版主页",
                      target: "_blank",
                      svg: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      )
                    });
                  }

                  // 限制显示前10个图标
                  return socialLinks.slice(0, 10);
                })().map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.target || undefined}
                    rel={social.target ? "noopener noreferrer" : undefined}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    title={social.title}
                  >
                    {social.svg}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction - 只有当 intro 存在且有段落时才显示 */}
        {about.intro && about.intro.paragraphs && about.intro.paragraphs.length > 0 && (
          <AnimatedSection className="mb-20">
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-thin tracking-widest font-serif text-gray-900 dark:text-white mb-4"
              >
                {about.intro.title || '个人简介'}
              </motion.h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-24 h-1 bg-gray-800 dark:bg-gray-200 mx-auto rounded-full"
              />
            </div>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              {about.intro.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={fadeInUp}
                  className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-center font-thin tracking-wide font-serif"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </AnimatedSection>
        )}

        {/* Education - 只有当 education 存在且有项目时才显示 */}
        {about.education && about.education.items && about.education.items.length > 0 && (
          <AnimatedSection className="mb-20">
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-thin tracking-widest font-serif text-gray-900 dark:text-white mb-4"
              >
                {about.education.title || '教育背景'}
              </motion.h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-24 h-1 bg-gray-800 dark:bg-gray-200 mx-auto rounded-full"
              />
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 hidden md:block"></div>
              
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-12"
              >
                {about.education.items.map((edu, index) => (
                  <motion.div 
                    key={index} 
                    variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                    className="relative flex gap-8"
                  >
                    {/* Timeline dot */}
                    <div className="hidden md:flex w-16 h-16 bg-gray-800 dark:bg-gray-200 rounded-full items-center justify-center flex-shrink-0 shadow-lg">
                      <AcademicCapIcon className="w-8 h-8 text-white dark:text-gray-900" />
                    </div>
                    
                    <motion.div 
                      whileHover={{ 
                        y: -4, 
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        borderColor: "rgb(209 213 219)"
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="flex-1 bg-white dark:bg-gray-900 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-800"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          {(edu as any).degree && (
                            <motion.h3 
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              viewport={{ once: true }}
                              className="text-2xl font-thin tracking-wide font-serif italic text-gray-900 dark:text-white mb-2"
                            >
                              {(edu as any).degree}
                            </motion.h3>
                          )}
                          {edu.school && (
                            <motion.p 
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                              viewport={{ once: true }}
                              className="text-gray-600 dark:text-gray-400 font-medium text-lg font-thin tracking-wide font-serif"
                            >
                              {edu.school}
                            </motion.p>
                          )}
                        </div>
                        <div className="text-right mt-2 md:mt-0">
                          {edu.year && (
                            <motion.span 
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4, delay: 0.4 }}
                              viewport={{ once: true }}
                              className="text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md text-sm font-thin tracking-wide font-serif"
                            >
                              {edu.year}
                            </motion.span>
                          )}
                          {(edu as any).gpa && (
                            <motion.p 
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.5 }}
                              viewport={{ once: true }}
                              className="text-gray-700 dark:text-gray-300 font-bold mt-2 font-thin tracking-wide font-serif"
                            >
                              GPA: {(edu as any).gpa}
                            </motion.p>
                          )}
                        </div>
                      </div>
                      {edu.description && (
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          viewport={{ once: true }}
                          className="text-gray-600 dark:text-gray-300 leading-relaxed font-thin tracking-wide font-serif"
                        >
                          {edu.description}
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </AnimatedSection>
        )}

        {/* Experience - 只有当 experience 存在且有项目时才显示 */}
        {(about as any).experience?.items && (about as any).experience.items.length > 0 && (
          <AnimatedSection className="mb-20">
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-thin tracking-widest font-serif text-gray-900 dark:text-white mb-4"
              >
                {(about as any).experience.title || '工作经历'}
              </motion.h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-24 h-1 bg-gray-800 dark:bg-gray-200 mx-auto rounded-full"
              />
            </div>
            <div className="relative">
              {/* Timeline line */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.2, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute left-8 top-0 w-0.5 bg-gray-300 dark:bg-gray-700 hidden md:block"
              />
              
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-12"
              >
                {(about as any).experience.items.map((exp: any, index: number) => (
                  <motion.div 
                    key={index} 
                    variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                    className="relative flex gap-8"
                  >
                    {/* Timeline dot */}
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="hidden md:flex w-16 h-16 bg-gray-800 dark:bg-gray-200 rounded-full items-center justify-center text-white dark:text-gray-900 font-bold text-sm shadow-lg"
                    >
                      {index + 1}
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ 
                        y: -4, 
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        borderColor: "rgb(209 213 219)"
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="flex-1 bg-white dark:bg-gray-900 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-800"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          {exp.title && (
                            <motion.h3 
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              viewport={{ once: true }}
                              className="text-2xl font-thin tracking-wide font-serif italic text-gray-900 dark:text-white mb-2"
                            >
                              {exp.title}
                            </motion.h3>
                          )}
                          {exp.company && (
                            <motion.p 
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                              viewport={{ once: true }}
                              className="text-gray-600 dark:text-gray-400 font-medium text-lg font-thin tracking-wide font-serif"
                            >
                              {exp.company}
                            </motion.p>
                          )}
                        </div>
                        {exp.year && (
                          <motion.span 
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md text-sm mt-2 md:mt-0 font-thin tracking-wide font-serif"
                          >
                            {exp.year}
                          </motion.span>
                        )}
                      </div>
                      {exp.description && (
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          viewport={{ once: true }}
                          className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed font-thin tracking-wide font-serif"
                        >
                          {exp.description}
                        </motion.p>
                      )}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                          viewport={{ once: true }}
                          className="space-y-3"
                        >
                          {exp.highlights.map((highlight: string, idx: number) => (
                            <motion.div 
                              key={idx} 
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                              viewport={{ once: true }}
                              className="flex items-start gap-3"
                            >
                              <CheckCircleIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-300 font-thin tracking-wide font-serif">{highlight}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </AnimatedSection>
        )}

        {/* Skills - 只有当 skills 存在且有分类时才显示 */}
        {about.skills && about.skills.categories && about.skills.categories.length > 0 && (
          <AnimatedSection className="mb-20">
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-thin tracking-widest font-serif text-gray-900 dark:text-white mb-4"
              >
                {about.skills.title || '技能专长'}
              </motion.h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-24 h-1 bg-gray-800 dark:bg-gray-200 mx-auto rounded-full"
              />
            </div>
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {about.skills.categories.map((category, index) => {
                const IconComponent = skillIcons[category.name] || CodeBracketIcon;
                return (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ 
                      y: -4, 
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      borderColor: "rgb(209 213 219)"
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="group bg-white dark:bg-gray-900 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-800"
                  >
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-center mb-6"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="w-16 h-16 bg-gray-800 dark:bg-gray-200 rounded-full flex items-center justify-center"
                      >
                        <IconComponent className="w-8 h-8 text-white dark:text-gray-900" />
                      </motion.div>
                    </motion.div>
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-2xl font-thin tracking-wide font-serif text-gray-900 dark:text-white mb-6 text-center"
                    >
                      {category.name}
                    </motion.h3>
                    {category.skills && category.skills.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="space-y-5"
                      >
                        {category.skills.map((skill, idx) => (
                          <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 + idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group/skill"
                          >
                            <div className="flex justify-between mb-3">
                              <span className="text-gray-900 dark:text-white font-medium text-sm font-thin tracking-wide font-serif">
                                {skill.name}
                              </span>
                              <motion.span 
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 + idx * 0.1 }}
                                viewport={{ once: true }}
                                className="text-gray-600 dark:text-gray-400 font-bold text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md font-thin tracking-wide font-serif"
                              >
                                {skill.level}%
                              </motion.span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ 
                                  duration: 1.2, 
                                  delay: 0.7 + index * 0.1 + idx * 0.1,
                                  ease: "easeOut"
                                }}
                                viewport={{ once: true }}
                                className="h-2.5 rounded-full bg-gray-800 dark:bg-gray-200"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatedSection>
        )}

        {/* Comments Section */}
        <section className="mb-20">
          <Comments 
            pageId="about"
            pageTitle="关于我"
            pageUrl="/about"
          />
        </section>
      </div>
    </PageLayout>
  );
} 