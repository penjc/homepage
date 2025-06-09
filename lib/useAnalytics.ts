'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '../components/GoogleAnalytics';

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 构建完整的URL
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    
    // 追踪页面访问
    trackPageView(url);
  }, [pathname, searchParams]);
} 