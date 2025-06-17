'use client';

import React from 'react';
import Link, { LinkProps } from 'next/link';
import { usePageLoading } from './PageLoadingProvider';

interface LinkWithLoadingProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  showLoading?: boolean;
}

const LinkWithLoading: React.FC<LinkWithLoadingProps> = ({
  children,
  className = '',
  onClick,
  showLoading = true,
  ...linkProps
}) => {
  const { startLoading } = usePageLoading();

  const handleClick = () => {
    if (showLoading) {
      startLoading();
    }
    onClick?.();
  };

  return (
    <Link
      {...linkProps}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default LinkWithLoading; 