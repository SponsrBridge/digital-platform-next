import type { Metadata } from 'next';
import ServicesContent from '@/components/pages/ServicesContent';
import JsonLd from '@/components/seo/JsonLd';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Conference Sponsorship Services - Full-Service & Advisory',
  description: 'Choose from Full-Service Management, Sales Execution Partnership, or Strategic Advisory. Proven models delivering 28-45% revenue growth for B2B conferences.',
  alternates: { canonical: '/services' },
  openGraph: {
    images: ['/images/og/services.png'],
  },
};

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Conference Sponsorship Management',
  provider: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
  areaServed: {
    '@type': 'Place',
    name: 'Worldwide',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Sponsorship Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Full-Service Management',
          description: 'Comprehensive sponsorship revenue architecture and management for B2B conferences.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Sales Execution Partnership',
          description: 'Targeted sponsorship sales execution working alongside your existing team.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Strategic Advisory',
          description: 'Strategic commercial advisory for optimizing sponsorship revenue strategy.',
        },
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesJsonLd} />
      <ServicesContent />
    </>
  );
}
