import type { Metadata } from 'next';
import AboutContent from '@/components/pages/AboutContent';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about SponsrBridge, our philosophy, values, and the team behind the sponsorship revenue architecture.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <AboutContent />;
}
