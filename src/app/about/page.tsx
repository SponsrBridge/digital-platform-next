import type { Metadata } from 'next';
import AboutContent from '@/components/pages/AboutContent';

export const metadata: Metadata = {
  title: 'About Us — SponsrBridge',
  description: 'Learn about SponsrBridge, our philosophy, values, and the team behind the sponsorship revenue architecture.',
};

export default function AboutPage() {
  return <AboutContent />;
}
