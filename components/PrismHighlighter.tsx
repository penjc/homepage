'use client';

import { useEffect, useState } from 'react';
import Prism from 'prismjs';

// 导入语言支持
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-sql';

interface PrismHighlighterProps {
  code: string;
  language: string;
  lines: string[];
}

export default function PrismHighlighter({ code, language, lines }: PrismHighlighterProps) {
  const [highlightedLines, setHighlightedLines] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const processLines = () => {
      const processed = lines.map(line => {
        if (Prism.languages[language]) {
          try {
            return Prism.highlight(line || '\n', Prism.languages[language], language);
          } catch (error) {
            console.log('语法高亮失败:', error);
            return line || '\u00A0';
          }
        }
        return line || '\u00A0';
      });
      setHighlightedLines(processed);
    };

    processLines();
  }, [code, language, lines, isClient]);

  // 添加自定义 CSS 样式
  useEffect(() => {
    if (!isClient) return;

    const style = document.createElement('style');
    style.textContent = `
      .prism-dark-theme .token.comment,
      .prism-dark-theme .token.prolog,
      .prism-dark-theme .token.doctype,
      .prism-dark-theme .token.cdata,
      .prism-dark-theme .token.single-line-comment,
      .prism-dark-theme .token.multiline-comment,
      .prism-dark-theme .token.block-comment,
      .prism-dark-theme .token.line-comment {
        color: #6b7280 !important;
        font-style: italic !important;
        opacity: 0.7 !important;
      }

      /* 特别针对Python的#注释 */
      .prism-dark-theme .language-python .token.comment {
        color: #6b7280 !important;
        font-style: italic !important;
        opacity: 0.7 !important;
      }

      /* 特别针对Java的//和/**/注释 */
      .prism-dark-theme .language-java .token.comment {
        color: #6b7280 !important;
        font-style: italic !important;
        opacity: 0.7 !important;
      }

      /* 通用注释样式 - 使用更强的选择器 */
      .prism-dark-theme .token[class*="comment"] {
        color: #6b7280 !important;
        font-style: italic !important;
        opacity: 0.7 !important;
      }

      .prism-dark-theme .token.punctuation {
        color: #f8f8f2;
      }

      .prism-dark-theme .token.property,
      .prism-dark-theme .token.tag,
      .prism-dark-theme .token.constant,
      .prism-dark-theme .token.symbol,
      .prism-dark-theme .token.deleted {
        color: #f92672;
      }

      .prism-dark-theme .token.boolean,
      .prism-dark-theme .token.number {
        color: #ae81ff;
      }

      .prism-dark-theme .token.selector,
      .prism-dark-theme .token.attr-name,
      .prism-dark-theme .token.string,
      .prism-dark-theme .token.char,
      .prism-dark-theme .token.builtin,
      .prism-dark-theme .token.inserted {
        color: #a6e22e;
      }

      .prism-dark-theme .token.operator,
      .prism-dark-theme .token.entity,
      .prism-dark-theme .token.url,
      .prism-dark-theme .language-css .token.string,
      .prism-dark-theme .style .token.string,
      .prism-dark-theme .token.variable {
        color: #f8f8f2;
      }

      .prism-dark-theme .token.atrule,
      .prism-dark-theme .token.attr-value,
      .prism-dark-theme .token.function,
      .prism-dark-theme .token.class-name {
        color: #e6db74;
      }

      .prism-dark-theme .token.keyword {
        color: #66d9ef;
      }

      .prism-dark-theme .token.regex,
      .prism-dark-theme .token.important {
        color: #fd971f;
      }

      .prism-dark-theme .token.important,
      .prism-dark-theme .token.bold {
        font-weight: bold;
      }

      .prism-dark-theme .token.italic {
        font-style: italic;
      }

      .prism-dark-theme .token.entity {
        cursor: help;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <code 
        style={{ 
          color: '#e2e8f0', 
          background: 'transparent', 
          border: 'none',
          display: 'block',
          whiteSpace: 'pre',
          fontSize: '14px',
          lineHeight: '1.6',
          fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace"
        }}
      >
        {lines.map((line, index) => (
          <div key={index} style={{ 
            height: '22.4px',
            lineHeight: '22.4px',
            fontSize: '14px',
            minHeight: '22.4px'
          }}>
            {line || '\u00A0'}
          </div>
        ))}
      </code>
    );
  }

  return (
    <code 
      className={`language-${language} prism-dark-theme`}
      style={{ 
        color: '#e2e8f0', 
        background: 'transparent', 
        border: 'none',
        display: 'block',
        whiteSpace: 'pre',
        fontSize: '14px',
        lineHeight: '1.6',
        fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace"
      }}
    >
      {highlightedLines.length > 0 ? (
        highlightedLines.map((line, index) => (
          <div key={index} style={{ 
            height: '22.4px',
            lineHeight: '22.4px',
            fontSize: '14px',
            minHeight: '22.4px'
          }}>
            <span dangerouslySetInnerHTML={{ __html: line }} />
          </div>
        ))
      ) : (
        // 降级方案：显示纯文本
        lines.map((line, index) => (
          <div key={index} style={{ 
            height: '22.4px',
            lineHeight: '22.4px',
            fontSize: '14px',
            minHeight: '22.4px'
          }}>
            {line || '\u00A0'}
          </div>
        ))
      )}
    </code>
  );
} 