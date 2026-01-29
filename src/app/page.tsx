import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import { ChallengesSection, WhatWeDoSection, ProcessSection, WhyUsSection } from '@/components/home/Features';
import { IndustriesSection, ModelsSection } from '@/components/home/Market';
import { InsightsSection, FAQSection } from '@/components/home/Resources';
import ContactSection from '@/components/home/Contact';
import { getLatestPosts } from '@/lib/queries';
import JsonLd from '@/components/seo/JsonLd';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'SponsrBridge — Conference Sponsorship Revenue Architecture',
  description:
    'SponsrBridge is a strategic sponsorship revenue consultancy that operates as an embedded commercial team for B2B conferences.',
  alternates: { canonical: '/' },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
};

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateString;
  }
}

export default async function HomePage() {
  const rawPosts = await getLatestPosts(3);
  const articles = rawPosts.map((a: any) => ({
    title: a.title,
    excerpt: a.excerpt,
    tag: a.tag || 'Insight',
    date: formatDate(a.date),
    readTime: a.readTime || '5 min read',
    image: a.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    slug: a.slug?.current || '',
  }));

  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <Hero />
      <ChallengesSection />
      <WhatWeDoSection />
      <ProcessSection />
      <WhyUsSection />
      <IndustriesSection />
      <ModelsSection />
      <InsightsSection articles={articles.length > 0 ? articles : undefined} />
      <FAQSection />
      <ContactSection />
    </>
  );
}
