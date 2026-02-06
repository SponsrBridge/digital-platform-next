import type { Metadata } from 'next';
import InsightsPageContent from '@/components/insights/InsightsPageContent';
import { getFeaturedPost, getPosts, getPostCount } from '@/lib/queries';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Insights & Perspectives',
  description: 'Practical strategies, market intelligence, and expert perspectives on building predictable sponsorship revenue for B2B conferences.',
  alternates: { canonical: '/insights' },
  openGraph: {
    images: ['/images/og/insights.png'],
  },
};

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateString;
  }
}

export default async function InsightsPage() {
  let featured = null;
  let articles: any[] = [];
  let totalCount = 0;

  try {
    const [featuredData, articlesData, count] = await Promise.all([
      getFeaturedPost(),
      getPosts(6, 0),
      getPostCount(),
    ]);

    if (featuredData) {
      featured = {
        title: featuredData.title,
        excerpt: featuredData.excerpt,
        tag: featuredData.tag,
        date: formatDate(featuredData.date),
        readTime: featuredData.readTime || '5 min read',
        image: featuredData.image || '',
        slug: featuredData.slug?.current || '',
      };
    }

    if (articlesData && articlesData.length > 0) {
      articles = articlesData.map((a: any) => ({
        title: a.title,
        excerpt: a.excerpt,
        tag: a.tag,
        date: formatDate(a.date),
        readTime: a.readTime || '5 min read',
        image: a.image || '',
        slug: a.slug?.current || '',
      }));
      totalCount = count || 0;
    }
  } catch (err) {
    console.warn('Sanity fetch failed:', err);
  }

  return (
    <InsightsPageContent
      initialFeatured={featured}
      initialArticles={articles}
      totalCount={totalCount}
    />
  );
}
