'use client';

import React from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  isLightMode?: boolean;
}

const sizeMap = {
  icon: { sm: 'h-7 w-7', md: 'h-9 w-9', lg: 'h-12 w-12' },
  full: { sm: 'h-7', md: 'h-9', lg: 'h-12' },
};

const Logo: React.FC<LogoProps> = ({ variant = 'full', size = 'md', isLightMode }) => {
  const { isDark } = useTheme();
  const resolved = isLightMode ?? !isDark;
  const className = sizeMap[variant][size];

  return (
    <img
      src={resolved ? '/images/main-label.png' : '/images/light-label.png'}
      alt="SponsrBridge"
      className={className}
    />
  );
};

export default Logo;
