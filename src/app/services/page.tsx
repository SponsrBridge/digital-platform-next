import type { Metadata } from 'next';
import ServicesContent from '@/components/pages/ServicesContent';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore SponsrBridge service models: Full-Service Management, Sales Execution Partnership, and Strategic Commercial Advisory.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
