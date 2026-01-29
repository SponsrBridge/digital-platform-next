import type { Metadata } from 'next';
import FAQContent from '@/components/pages/FAQContent';
import JsonLd from '@/components/seo/JsonLd';
import { faqs } from '@/lib/faq-data';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about SponsrBridge services, process, and how we help conference organisers scale sponsorship revenue.',
  alternates: { canonical: '/faq' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <FAQContent />
    </>
  );
}
