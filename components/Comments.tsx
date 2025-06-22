'use client';

import { useEffect, useState, useRef } from 'react';
import { MessageCircle, Github, Users, Settings } from 'lucide-react';
import { siteConfig } from '../site.config';

interface CommentsProps {
  pageId: string;
  pageTitle: string;
  pageUrl?: string;
  className?: string;
}

// 评论系统配置接口
interface CommentConfig {
  enabled: boolean;
  provider: 'giscus' | 'gitalk' | 'valine' | 'waline' | 'twikoo';
  config: {
    [key: string]: any;
  };
}

// Giscus 配置
interface GiscusConfig {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: 'pathname' | 'url' | 'title';
  theme: 'light' | 'dark' | 'preferred_color_scheme';
  lang: string;
  loading: 'lazy' | 'eager';
  reactionsEnabled: '1' | '0';
  emitMetadata: '1' | '0';
  inputPosition: 'top' | 'bottom';
}

// Gitalk 配置
interface GitalkConfig {
  clientID: string;
  clientSecret: string;
  repo: string;
  owner: string;
  admin: string[];
  id?: string;
  title?: string;
  body?: string;
  language: string;
  perPage: number;
  distractionFreeMode: boolean;
  pagerDirection: 'last' | 'first';
  createIssueManually: boolean;
  proxy?: string;
  flipMoveOptions?: any;
  enableHotKey: boolean;
}

// Valine/Waline 配置
interface ValineConfig {
  appId: string;
  appKey: string;
  serverURL?: string;
  placeholder?: string;
  avatar?: 'mp' | 'identicon' | 'monsterid' | 'wavatar' | 'retro' | 'hide';
  meta?: string[];
  pageSize?: number;
  lang?: string;
  visitor?: boolean;
  highlight?: boolean;
  recordIP?: boolean;
  enableQQ?: boolean;
  requiredFields?: string[];
}

// 从配置文件或环境变量获取评论配置（配置文件优先）
const getCommentConfig = (): CommentConfig | null => {
  if (typeof window === 'undefined') return null;

  const commentsConfig = siteConfig.comments;

  // 优先检查配置文件
  if (commentsConfig && commentsConfig.enabled) {
    const provider = commentsConfig.provider;

    // 根据配置的提供商返回相应的配置
    switch (provider) {
      case 'giscus': {
        const config = commentsConfig.giscus;
        // 检查必要配置是否存在
        if (config.repo && config.repoId && config.categoryId) {
          return {
            enabled: true,
            provider: 'giscus',
            config: {
              repo: config.repo,
              repoId: config.repoId,
              category: config.category,
              categoryId: config.categoryId,
              mapping: config.mapping,
              theme: config.theme,
              lang: config.lang,
              loading: config.loading,
              reactionsEnabled: config.reactionsEnabled ? '1' : '0',
              emitMetadata: config.emitMetadata ? '1' : '0',
              inputPosition: config.inputPosition
            } as GiscusConfig
          };
        }
        break;
      }

      case 'gitalk': {
        const config = commentsConfig.gitalk;
        // 检查必要配置是否存在
        if (config.clientID && config.clientSecret && config.repo && config.owner) {
          return {
            enabled: true,
            provider: 'gitalk',
            config: {
              clientID: config.clientID,
              clientSecret: config.clientSecret,
              repo: config.repo,
              owner: config.owner,
              admin: config.admin,
              language: config.language,
              perPage: config.perPage,
              distractionFreeMode: config.distractionFreeMode,
              pagerDirection: config.pagerDirection,
              createIssueManually: config.createIssueManually,
              enableHotKey: config.enableHotKey
            } as GitalkConfig
          };
        }
        break;
      }

      case 'valine': {
        const config = commentsConfig.valine;
        // 检查必要配置是否存在
        if (config.appId && config.appKey) {
          return {
            enabled: true,
            provider: 'valine',
            config: {
              appId: config.appId,
              appKey: config.appKey,
              placeholder: config.placeholder,
              avatar: config.avatar,
              meta: config.meta,
              pageSize: config.pageSize,
              lang: config.lang,
              visitor: config.visitor,
              highlight: config.highlight,
              recordIP: config.recordIP,
              enableQQ: config.enableQQ,
              requiredFields: config.requiredFields
            } as ValineConfig
          };
        }
        break;
      }

      case 'waline': {
        const config = commentsConfig.waline;
        // 检查必要配置是否存在
        if (config.serverURL) {
          return {
            enabled: true,
            provider: 'waline',
            config: {
              serverURL: config.serverURL,
              placeholder: config.placeholder,
              avatar: config.avatar,
              meta: config.meta,
              pageSize: config.pageSize,
              lang: config.lang,
              visitor: config.visitor,
              highlight: config.highlight,
              recordIP: config.recordIP,
              enableQQ: config.enableQQ,
              requiredFields: config.requiredFields
            } as ValineConfig
          };
        }
        break;
      }
    }
  }

  // 回退到环境变量检查（向后兼容）
  // 检查是否有 Giscus 环境变量配置
  const giscusRepo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  if (giscusRepo) {
    return {
      enabled: true,
      provider: 'giscus',
      config: {
        repo: giscusRepo,
        repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || '',
        category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'General',
        categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '',
        mapping: (process.env.NEXT_PUBLIC_GISCUS_MAPPING as any) || 'pathname',
        theme: (process.env.NEXT_PUBLIC_GISCUS_THEME as any) || 'preferred_color_scheme',
        lang: process.env.NEXT_PUBLIC_GISCUS_LANG || 'zh-CN',
        loading: (process.env.NEXT_PUBLIC_GISCUS_LOADING as any) || 'lazy',
        reactionsEnabled: process.env.NEXT_PUBLIC_GISCUS_REACTIONS_ENABLED === 'true' ? '1' : '0',
        emitMetadata: process.env.NEXT_PUBLIC_GISCUS_EMIT_METADATA === 'true' ? '1' : '0',
        inputPosition: (process.env.NEXT_PUBLIC_GISCUS_INPUT_POSITION as any) || 'bottom'
      } as GiscusConfig
    };
  }

  // 检查是否有 Gitalk 环境变量配置
  const gitalkClientID = process.env.NEXT_PUBLIC_GITALK_CLIENT_ID;
  if (gitalkClientID) {
    return {
      enabled: true,
      provider: 'gitalk',
      config: {
        clientID: gitalkClientID,
        clientSecret: process.env.NEXT_PUBLIC_GITALK_CLIENT_SECRET || '',
        repo: process.env.NEXT_PUBLIC_GITALK_REPO || '',
        owner: process.env.NEXT_PUBLIC_GITALK_OWNER || '',
        admin: (process.env.NEXT_PUBLIC_GITALK_ADMIN || '').split(',').filter(Boolean),
        language: process.env.NEXT_PUBLIC_GITALK_LANGUAGE || 'zh-CN',
        perPage: parseInt(process.env.NEXT_PUBLIC_GITALK_PER_PAGE || '10'),
        distractionFreeMode: process.env.NEXT_PUBLIC_GITALK_DISTRACTION_FREE_MODE === 'true',
        pagerDirection: (process.env.NEXT_PUBLIC_GITALK_PAGER_DIRECTION as any) || 'last',
        createIssueManually: process.env.NEXT_PUBLIC_GITALK_CREATE_ISSUE_MANUALLY === 'true',
        enableHotKey: process.env.NEXT_PUBLIC_GITALK_ENABLE_HOT_KEY !== 'false'
      } as GitalkConfig
    };
  }

  // 检查是否有 Valine 环境变量配置
  const valineAppId = process.env.NEXT_PUBLIC_VALINE_APP_ID;
  if (valineAppId) {
    return {
      enabled: true,
      provider: 'valine',
      config: {
        appId: valineAppId,
        appKey: process.env.NEXT_PUBLIC_VALINE_APP_KEY || '',
        placeholder: process.env.NEXT_PUBLIC_VALINE_PLACEHOLDER || '请输入评论内容...',
        avatar: (process.env.NEXT_PUBLIC_VALINE_AVATAR as any) || 'mp',
        meta: (process.env.NEXT_PUBLIC_VALINE_META || 'nick,mail,link').split(','),
        pageSize: parseInt(process.env.NEXT_PUBLIC_VALINE_PAGE_SIZE || '10'),
        lang: process.env.NEXT_PUBLIC_VALINE_LANG || 'zh-CN',
        visitor: process.env.NEXT_PUBLIC_VALINE_VISITOR === 'true',
        highlight: process.env.NEXT_PUBLIC_VALINE_HIGHLIGHT !== 'false',
        recordIP: process.env.NEXT_PUBLIC_VALINE_RECORD_IP === 'true',
        enableQQ: process.env.NEXT_PUBLIC_VALINE_ENABLE_QQ === 'true',
        requiredFields: (process.env.NEXT_PUBLIC_VALINE_REQUIRED_FIELDS || '').split(',').filter(Boolean)
      } as ValineConfig
    };
  }

  // 检查是否有 Waline 环境变量配置
  const walineServerURL = process.env.NEXT_PUBLIC_WALINE_SERVER_URL;
  if (walineServerURL) {
    return {
      enabled: true,
      provider: 'waline',
      config: {
        serverURL: walineServerURL,
        placeholder: process.env.NEXT_PUBLIC_WALINE_PLACEHOLDER || '请输入评论内容...',
        avatar: (process.env.NEXT_PUBLIC_WALINE_AVATAR as any) || 'mp',
        meta: (process.env.NEXT_PUBLIC_WALINE_META || 'nick,mail,link').split(','),
        pageSize: parseInt(process.env.NEXT_PUBLIC_WALINE_PAGE_SIZE || '10'),
        lang: process.env.NEXT_PUBLIC_WALINE_LANG || 'zh-CN',
        visitor: process.env.NEXT_PUBLIC_WALINE_VISITOR === 'true',
        highlight: process.env.NEXT_PUBLIC_WALINE_HIGHLIGHT !== 'false',
        recordIP: process.env.NEXT_PUBLIC_WALINE_RECORD_IP === 'true',
        enableQQ: process.env.NEXT_PUBLIC_WALINE_ENABLE_QQ === 'true',
        requiredFields: (process.env.NEXT_PUBLIC_WALINE_REQUIRED_FIELDS || '').split(',').filter(Boolean)
      } as ValineConfig
    };
  }

  return null;
};

// Giscus 组件
const GiscusComments = ({ config, pageId }: { config: GiscusConfig; pageId: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // 清空容器
    ref.current.innerHTML = '';

    // 创建 script 标签
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', config.repo);
    script.setAttribute('data-repo-id', config.repoId);
    script.setAttribute('data-category', config.category);
    script.setAttribute('data-category-id', config.categoryId);
    script.setAttribute('data-mapping', config.mapping);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', config.reactionsEnabled);
    script.setAttribute('data-emit-metadata', config.emitMetadata);
    script.setAttribute('data-input-position', config.inputPosition);
    script.setAttribute('data-theme', config.theme);
    script.setAttribute('data-lang', config.lang);
    script.setAttribute('data-loading', config.loading);
    script.crossOrigin = 'anonymous';
    script.async = true;

    ref.current.appendChild(script);
  }, [config, pageId]);

  return <div ref={ref} className="giscus-container" />;
};

// Gitalk 组件
const GitalkComments = ({ config, pageId, pageTitle }: { config: GitalkConfig; pageId: string; pageTitle: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // 动态加载 Gitalk
    const loadGitalk = async () => {
      if (typeof window === 'undefined') return;

      // 加载 CSS
      if (!document.querySelector('link[href*="gitalk"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/gitalk@latest/dist/gitalk.css';
        document.head.appendChild(link);
      }

      // 加载 JS
      if (!(window as any).Gitalk) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/gitalk@latest/dist/gitalk.min.js';
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }

      const Gitalk = (window as any).Gitalk;
      if (Gitalk && ref.current) {
        const gitalk = new Gitalk({
          ...config,
          id: pageId.length > 50 ? pageId.substring(0, 50) : pageId,
          title: pageTitle,
          body: `评论来自页面: ${pageTitle}`
        });

        gitalk.render(ref.current);
      }
    };

    loadGitalk();
  }, [config, pageId, pageTitle]);

  return <div ref={ref} className="gitalk-container" />;
};

// Valine 组件
const ValineComments = ({ config, pageId }: { config: ValineConfig; pageId: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 动态加载 Valine
    const loadValine = async () => {
      if (typeof window === 'undefined') return;

      // 加载 Valine
      if (!(window as any).Valine) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/valine@latest/dist/Valine.min.js';
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }

      const Valine = (window as any).Valine;
      if (Valine && ref.current) {
        new Valine({
          el: ref.current,
          path: pageId,
          ...config
        });
      }
    };

    loadValine();
  }, [config, pageId]);

  return <div ref={ref} className="valine-container" />;
};

// Waline 组件
const WalineComments = ({ config, pageId }: { config: ValineConfig; pageId: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 动态加载 Waline
    const loadWaline = async () => {
      if (typeof window === 'undefined') return;

      // 加载 Waline CSS
      if (!document.querySelector('link[href*="waline"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/@waline/client@v2/dist/waline.css';
        document.head.appendChild(link);
      }

      // 加载 Waline JS
      if (!(window as any).Waline) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@waline/client@v2/dist/waline.js';
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }

      const Waline = (window as any).Waline;
      if (Waline && ref.current) {
        Waline.init({
          el: ref.current,
          path: pageId,
          ...config
        });
      }
    };

    loadWaline();
  }, [config, pageId]);

  return <div ref={ref} className="waline-container" />;
};

export default function Comments({ pageId, pageTitle, pageUrl, className = '' }: CommentsProps) {
  const [mounted, setMounted] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const commentConfig = getCommentConfig();
  const commentsConfig = siteConfig.comments;

  useEffect(() => {
    setMounted(true);
    // const timer = setTimeout(() => {
    //   setIsLoading(false);
    // }, 1000);

    // return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  // 如果评论功能被明确禁用，不显示任何内容
  if (commentsConfig && commentsConfig.enabled === false) {
    return null;
  }

  // 如果评论功能启用但配置不正确，显示配置提示
  if (!commentConfig) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="flex flex-col items-center gap-6">
          {/* 注释掉图标和标题
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle size={18} className="text-gray-500 dark:text-gray-400" strokeWidth={1.5} />
            <h3 className="text-xl font-light text-gray-800 dark:text-gray-200 tracking-wide font-serif">
              评论
            </h3>
          </div>
          */}
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm">
            <Settings size={28} className="text-gray-400 dark:text-gray-500" strokeWidth={1.5} />
          </div>
          <div className="max-w-md">
            <p className="text-gray-500 dark:text-gray-400 text-sm font-light tracking-wide leading-relaxed">
              评论功能配置不完整，请在 site.config.ts 中完善评论系统配置
            </p>
          </div>
          <details className="mt-6 w-full max-w-lg">
            <summary className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm hover:text-gray-800 dark:hover:text-gray-200 transition-colors font-light tracking-wide">
              查看配置说明
            </summary>
            <div className="mt-4 p-5 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs text-gray-600 dark:text-gray-300 font-mono border border-gray-200 dark:border-gray-700">
              <p className="mb-3 font-medium text-gray-700 dark:text-gray-200">支持的评论系统：</p>
              <ul className="space-y-1.5 list-disc list-inside mb-4">
                <li>Giscus (GitHub Discussions)</li>
                <li>Gitalk (GitHub Issues)</li>
                <li>Valine (LeanCloud)</li>
                <li>Waline (增强版 Valine)</li>
              </ul>
              <p className="mb-3 font-medium text-gray-700 dark:text-gray-200">配置示例：</p>
              <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-600 overflow-x-auto">
{`// 在 site.config.ts 中配置
comments: {
  enabled: true,
  provider: "giscus", // 选择评论系统
  
  // 配置对应的评论系统参数
  giscus: {
    repo: "owner/repo",
    repoId: "repo_id",
    category: "General",
    categoryId: "category_id",
    // ... 其他配置
  }
}`}
              </pre>
              <p className="mt-3 text-gray-600 dark:text-gray-400 font-light">
                详细配置请查看 docs/COMMENTS.md 文档
              </p>
            </div>
          </details>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`py-12 ${className}`}>
        {/* 注释掉图标和标题
        <div className="flex items-center gap-3 mb-6">
          <MessageCircle size={18} className="text-gray-500 dark:text-gray-400" strokeWidth={1.5} />
          <h3 className="text-xl font-light text-gray-800 dark:text-gray-200 tracking-wide font-serif">
            评论
          </h3>
        </div>
        */}
        <div className="text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center shadow-sm">
              <Settings size={28} className="text-red-400 dark:text-red-500" strokeWidth={1.5} />
            </div>
            <div className="max-w-md">
              <h4 className="text-lg font-light text-red-700 dark:text-red-300 mb-3 tracking-wide">
                评论加载失败
              </h4>
              <p className="text-red-600 dark:text-red-400 text-sm font-light tracking-wide leading-relaxed">
                {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderCommentSystem = () => {
    try {
      switch (commentConfig.provider) {
        case 'giscus':
          return <GiscusComments config={commentConfig.config as GiscusConfig} pageId={pageId} />;
        case 'gitalk':
          return <GitalkComments config={commentConfig.config as GitalkConfig} pageId={pageId} pageTitle={pageTitle} />;
        case 'valine':
          return <ValineComments config={commentConfig.config as ValineConfig} pageId={pageId} />;
        case 'waline':
          return <WalineComments config={commentConfig.config as ValineConfig} pageId={pageId} />;
        default:
          throw new Error(`不支持的评论系统: ${commentConfig.provider}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
      return null;
    }
  };

  return (
    <div className={`${className}`}>
      {/* 注释掉简化的评论标题
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle size={18} className="text-gray-500 dark:text-gray-400" strokeWidth={1.5} />
        <h3 className="text-xl font-light text-gray-800 dark:text-gray-200 tracking-wide font-serif">
          评论
        </h3>
      </div>
      */}

      {/* 评论系统容器 - 采用优雅的样式 */}
      <div className="mt-16 pt-8 border-t border-gray-200/60 dark:border-gray-700/60 relative">
        {/* 顶部装饰线 */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent opacity-50"></div>
        </div>
        
        {/* 评论系统主体 */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {renderCommentSystem()}
        </div>
      </div>
    </div>
  );
} 