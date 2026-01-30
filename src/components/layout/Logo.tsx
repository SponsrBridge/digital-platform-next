'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/components/providers/ThemeProvider';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  isLightMode?: boolean;
}

const sizeMap = {
  icon: { sm: { h: 28, w: 28 }, md: { h: 36, w: 36 }, lg: { h: 48, w: 48 } },
  full: { sm: { h: 28, w: 112 }, md: { h: 36, w: 144 }, lg: { h: 48, w: 192 } },
};

const classMap = {
  icon: { sm: 'h-7 w-7', md: 'h-9 w-9', lg: 'h-12 w-12' },
  full: { sm: 'h-7 w-auto', md: 'h-9 w-auto', lg: 'h-12 w-auto' },
};

const Logo: React.FC<LogoProps> = ({ variant = 'full', size = 'md', isLightMode }) => {
  const { isDark } = useTheme();
  const resolved = isLightMode ?? !isDark;
  const dimensions = sizeMap[variant][size];
  const sizeClass = classMap[variant][size];

  const defaultSrc = resolved ? '/images/dark-label.png' : '/images/light-label.png';
  const hoverSrc = resolved ? '/images/main-light-label.png' : '/images/main-dark-label.png';

  return (
    <span className="group inline-flex">
      <Image
        src={defaultSrc}
        alt="SponsrBridge"
        width={dimensions.w}
        height={dimensions.h}
        className={`${sizeClass} transition-opacity duration-300 group-hover:opacity-0`}
        priority
      />
      <Image
        src={hoverSrc}
        alt="SponsrBridge"
        width={dimensions.w}
        height={dimensions.h}
        className={`${sizeClass} absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100`}
        priority
      />
    </span>
  );
};

export default Logo;
