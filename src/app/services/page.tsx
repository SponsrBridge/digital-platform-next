import type { Metadata } from 'next';
import ServicesContent from '@/components/pages/ServicesContent';

export const metadata: Metadata = {
  title: 'Services — SponsrBridge',
  description: 'Explore SponsrBridge service models: Full-Service Management, Sales Execution Partnership, and Strategic Commercial Advisory.',
};

export default function ServicesPage() {
  return <ServicesContent />;
}
