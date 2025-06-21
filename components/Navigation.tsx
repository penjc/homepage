'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { siteConfig } from '../site.config';
import SearchModal from './SearchModal';
import { BlogPost, Thought } from '../lib/types';
import { trackEvent } from './GoogleAnalytics';
import LinkWithLoading from './LinkWithLoading';

interface NavigationProps {
  posts: BlogPost[];
  thoughts: Thought[];
}

export default function Navigation({ posts, thoughts }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavClick = (itemName: string, href: string) => {
    trackEvent('click_navigation', 'navigation', `${itemName} - ${href}`);
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
    trackEvent('open_search', 'search', 'navigation_search');
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <LinkWithLoading href="/" className="text-xl font-thin tracking-widest text-gray-900 dark:text-white font-serif italic">
              {siteConfig.name}
            </LinkWithLoading>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {siteConfig.navigation.main
                .filter(item => {
                  // 如果是项目链接且项目功能未启用，则不显示
                  if (item.href.includes('projects')) {
                    return siteConfig.projects?.enabled || false;
                  }
                  return true;
                })
                .map((item) => (
                <LinkWithLoading
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors font-thin tracking-wide font-serif"
                  onClick={() => handleNavClick(item.name, item.href)}
                >
                  {item.name}
                </LinkWithLoading>
              ))}
              
              {/* Search Button */}
              <button
                onClick={handleSearchOpen}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                aria-label="搜索"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={handleSearchOpen}
                className="p-2 text-gray-600 dark:text-gray-300"
                aria-label="搜索"
              >
                <Search size={20} />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600 dark:text-gray-300"
                aria-label="切换菜单"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
              {siteConfig.navigation.main
                .filter(item => {
                  // 如果是项目链接且项目功能未启用，则不显示
                  if (item.href.includes('projects')) {
                    return siteConfig.projects?.enabled || false;
                  }
                  return true;
                })
                .map((item) => (
                <LinkWithLoading
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors font-thin tracking-wide font-serif"
                  onClick={() => {
                    handleNavClick(item.name, item.href);
                    setIsOpen(false);
                  }}
                >
                  {item.name}
                </LinkWithLoading>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        posts={posts}
        thoughts={thoughts}
      />
    </>
  );
} 