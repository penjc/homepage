'use client';

import { useAnalytics } from '../lib/useAnalytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  useAnalytics();
  
  return <>{children}</>;
} 