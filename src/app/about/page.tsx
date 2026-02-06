import type { Metadata } from 'next';
import AboutContent from '@/components/pages/AboutContent';

export const metadata: Metadata = {
  title: 'About Us - Conference Sponsorship Revenue Experts',
  description: 'Meet the SponsrBridge team. 15+ years experience in B2B conference sponsorship sales, strategy, and revenue optimization for event organizers.',
  alternates: { canonical: '/about' },
  openGraph: {
    images: ['/images/og/about.png'],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
