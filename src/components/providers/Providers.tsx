'use client';

import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { ScrollToTop } from './ScrollToTop';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <ScrollToTop />
        {children}
      </SmoothScrollProvider>
    </ThemeProvider>
  );
};
