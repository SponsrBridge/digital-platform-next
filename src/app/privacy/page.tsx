import type { Metadata } from 'next';
import PrivacyContent from '@/components/pages/PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy — SponsrBridge',
  description: 'SponsrBridge Privacy Policy including Cookie Policy. Learn how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
