import type { Metadata } from 'next';
import ContactContent from '@/components/pages/ContactContent';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with SponsrBridge. Book a strategy call, send us a message, or visit our office.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactContent />;
}
