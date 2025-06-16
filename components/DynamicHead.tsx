'use client';

import { useEffect } from 'react';
import { getAssetPath } from '../lib/utils';

export default function DynamicHead() {
  useEffect(() => {
    // 更新 favicon 路径
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      favicon.href = getAssetPath('/favicon.svg');
    }

    // 更新 manifest 路径
    const manifest = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;
    if (manifest) {
      manifest.href = getAssetPath('/manifest.json');
    }

    // 更新 RSS feed 路径
    const rss = document.querySelector('link[type="application/rss+xml"]') as HTMLLinkElement;
    if (rss) {
      rss.href = getAssetPath('/rss.xml');
    }

    // 更新 Atom feed 路径
    const atom = document.querySelector('link[type="application/atom+xml"]') as HTMLLinkElement;
    if (atom) {
      atom.href = getAssetPath('/atom.xml');
    }
  }, []);

  return null;
} 