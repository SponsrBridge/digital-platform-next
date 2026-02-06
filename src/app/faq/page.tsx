import type { Metadata } from 'next';
import FAQContent from '@/components/pages/FAQContent';
import JsonLd from '@/components/seo/JsonLd';
import { faqs } from '@/lib/faq-data';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Conference Sponsorship FAQ - Pricing, Process & Results',
  description: 'Common questions about sponsorship sales, pricing models, timelines, and ROI. Learn how SponsrBridge scales conference revenue for event organizers.',
  alternates: { canonical: '/faq' },
  openGraph: {
    images: ['/images/og/faq.png'],
  },
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
