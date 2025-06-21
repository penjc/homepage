'use client';

import { useEffect } from 'react';
import { getClientAssetPath } from '../lib/useAssetPath';

export default function DynamicHead() {
  useEffect(() => {
    // 更新 favicon 路径
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      favicon.href = getClientAssetPath('/favicon.svg');
    }

    // 更新 RSS feed 路径
    const rss = document.querySelector('link[type="application/rss+xml"]') as HTMLLinkElement;
    if (rss) {
      rss.href = getClientAssetPath('/rss.xml');
    }

    // 更新 Atom feed 路径
    const atom = document.querySelector('link[type="application/atom+xml"]') as HTMLLinkElement;
    if (atom) {
      atom.href = getClientAssetPath('/atom.xml');
    }
  }, []);

  return null;
} 