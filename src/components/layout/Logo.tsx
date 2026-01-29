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

  return (
    <>
      <Image
        src="/images/main-label.png"
        alt="SponsrBridge"
        width={dimensions.w}
        height={dimensions.h}
        className={`${classMap[variant][size]} ${resolved ? '' : 'hidden'}`}
        priority
      />
      <Image
        src="/images/light-label.png"
        alt="SponsrBridge"
        width={dimensions.w}
        height={dimensions.h}
        className={`${classMap[variant][size]} ${resolved ? 'hidden' : ''}`}
        priority
      />
    </>
  );
};

export default Logo;
