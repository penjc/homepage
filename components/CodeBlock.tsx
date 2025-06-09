'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

// 动态导入 Prism，避免 SSR 问题
const PrismHighlighter = dynamic(() => import('./PrismHighlighter'), {
  ssr: false,
  loading: () => <div>加载中...</div>
});

// 复制图标组件
const CopyIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

// 展开图标组件
const ExpandIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

interface CodeBlockProps {
  children: string;
  className?: string;
  inline?: boolean;
}

export default function CodeBlock({ 
  children, 
  className = '', 
  inline = false
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 从 className 中提取语言
  let language = className.replace('language-', '') || 'text';
  
  // 语言映射
  const languageMap: { [key: string]: string } = {
    'js': 'javascript',
    'ts': 'typescript',
    'jsx': 'jsx',
    'tsx': 'tsx',
    'css': 'css',
    'scss': 'scss',
    'json': 'json',
    'md': 'markdown',
    'bash': 'bash',
    'sh': 'bash',
    'shell': 'bash',
    'py': 'python',
    'python': 'python',
    'java': 'java',
    'go': 'go',
    'rs': 'rust',
    'rust': 'rust',
    'sql': 'sql',
  };

  language = languageMap[language] || language;
  
  // 处理代码内容
  const codeString = String(children).replace(/\n$/, '');
  const lines = codeString.split('\n');

  useEffect(() => {
    setMounted(true);
  }, []);

  // 复制功能
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // 降级方案
      const textArea = document.createElement('textarea');
      textArea.value = codeString;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 行内代码
  if (inline) {
    return (
      <code className="px-1 py-0.5 rounded text-sm font-mono bg-gray-600 text-gray-100">
        {children}
      </code>
    );
  }

  // 如果还没有挂载，显示简化版本
  if (!mounted) {
    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden my-4">
        <div className="bg-gray-700 px-4 py-2 text-sm text-gray-300">
          {language === 'text' ? 'CODE' : language.toUpperCase()}
        </div>
        <pre className="bg-gray-800 p-4 text-gray-100 overflow-x-auto">
          <code>{codeString}</code>
        </pre>
      </div>
    );
  }

  return (
    <div 
      className="custom-code-block-container my-4" 
      suppressHydrationWarning
      style={{ 
        border: 'none', 
        background: 'transparent', 
        margin: 0,
        padding: 0,
        boxShadow: 'none',
        outline: 'none',
        position: 'relative',
        display: 'block'
      }}
    >
      {/* 代码内容 */}
      {!isCollapsed ? (
        <div style={{ margin: 0, padding: 0 }}>
          {/* macOS风格的标题栏 */}
          <div 
            style={{
              background: '#2d3748',
              borderRadius: '8px 8px 0 0',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #4a5568'
            }}
          >
            {/* macOS窗口控制按钮 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28ca42' }}></div>
            </div>
            
            {/* 语言标识 */}
            <div style={{ 
              color: '#a0aec0', 
              fontSize: '12px', 
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {language === 'text' ? 'CODE' : language}
            </div>
            
            {/* 操作按钮 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={copyToClipboard}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#a0aec0',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="复制代码"
              >
                {copied ? (
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>

              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#a0aec0',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'transform 0.2s ease'
                }}
                title={isCollapsed ? '展开代码' : '收起代码'}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 14l5-5 5 5" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* 代码内容区域 */}
          <div 
            style={{ 
              background: '#1a202c', 
              border: 'none', 
              padding: 0, 
              borderRadius: '0 0 8px 8px', 
              overflow: 'auto', 
              fontSize: '14px', 
              lineHeight: '1.6', 
              margin: 0,
              boxShadow: 'none',
              outline: 'none',
              fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
              display: 'flex'
            }}
          >
            {/* 行号列 */}
            <div style={{
              background: '#2d3748',
              padding: '20px 12px 20px 16px',
              color: '#718096',
              fontSize: '14px',
              lineHeight: '1.6',
              textAlign: 'right',
              userSelect: 'none',
              borderRight: '1px solid #4a5568',
              minWidth: 'fit-content',
              fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace"
            }}>
              {lines.map((_, index) => (
                <div key={index} style={{ 
                  height: '22.4px',
                  lineHeight: '22.4px',
                  fontSize: '14px'
                }}>
                  {index + 1}
                </div>
              ))}
            </div>
            
            {/* 代码内容 */}
            <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
              <PrismHighlighter 
                code={codeString}
                language={language}
                lines={lines}
              />
            </div>
          </div>
        </div>
      ) : (
        // 收起状态显示为一行
        <div style={{ margin: 0, padding: 0 }}>
          {/* macOS风格的标题栏 - 收起状态 */}
          <div 
            style={{
              background: '#2d3748',
              borderRadius: '8px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: 'none'
            }}
          >
            {/* macOS窗口控制按钮 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28ca42' }}></div>
            </div>
            
            {/* 语言标识和收起信息 */}
            <div style={{ 
              color: '#a0aec0', 
              fontSize: '12px', 
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              代码已收起 ({lines.length} 行) - {language === 'text' ? 'CODE' : language}
            </div>
            
            {/* 展开按钮 */}
            <button
              onClick={() => setIsCollapsed(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#a0aec0',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
              title="展开代码"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}