'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { siteConfig } from '../site.config';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function GoogleAnalytics() {
  const { googleAnalyticsId } = siteConfig.analytics;

  useEffect(() => {
    // 当GA ID存在时，初始化dataLayer
    if (googleAnalyticsId && googleAnalyticsId.trim() !== '' && typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', googleAnalyticsId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [googleAnalyticsId]);

  // 如果没有配置GA ID，则不渲染
  if (!googleAnalyticsId || googleAnalyticsId.trim() === '') {
    return null;
  }

  return (
    <>
      {/* Google Analytics脚本 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// 用于追踪页面浏览的函数
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', siteConfig.analytics.googleAnalyticsId, {
      page_location: url,
    });
  }
};

// 用于追踪自定义事件的函数
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}; 