import type { Metadata } from 'next';
import TermsContent from '@/components/pages/TermsContent';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'SponsrBridge Terms and Conditions governing the use of our website and conference sponsorship consulting services. Read our legal terms and service agreements.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return <TermsContent />;
}
