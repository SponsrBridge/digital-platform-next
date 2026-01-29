import type { Metadata } from 'next';
import FAQContent from '@/components/pages/FAQContent';

export const metadata: Metadata = {
  title: 'FAQ — SponsrBridge',
  description: 'Frequently asked questions about SponsrBridge services, process, and how we help conference organisers scale sponsorship revenue.',
};

export default function FAQPage() {
  return <FAQContent />;
}
