import type { Metadata } from 'next';
import PrivacyContent from '@/components/pages/PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'SponsrBridge Privacy Policy including Cookie Policy. Learn how we collect, use, and protect your personal information when using our conference sponsorship services.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
