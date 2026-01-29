import type { Metadata } from 'next';
import InsightsPageContent from '@/components/insights/InsightsPageContent';
import { getFeaturedPost, getPosts, getPostCount } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Insights & Perspectives — SponsrBridge',
  description: 'Practical strategies, market intelligence, and expert perspectives on building predictable sponsorship revenue for B2B conferences.',
};

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateString;
  }
}

const fallbackFeatured = {
  title: "The Death of the Gold-Silver-Bronze Model: Why Tiered Sponsorship Packages Are Failing Modern B2B Events",
  excerpt: "For decades, conference organisers have relied on the familiar Gold-Silver-Bronze sponsorship model. It's easy to understand, simple to sell, and universally recognised. But in today's B2B landscape, this legacy approach is leaving significant revenue on the table.",
  tag: "Sponsorship Strategy",
  date: "January 15, 2025",
  readTime: "8 min read",
  image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600",
  slug: "death-of-gold-silver-bronze-model"
};

const fallbackArticles = [
  {
    title: "5 Signs Your Conference Is Under-Monetising Its Sponsor Potential",
    excerpt: "Strong attendance, quality content, senior audience — yet sponsorship revenue stays flat year after year. Here are the five warning signs that your commercial model needs a rethink.",
    tag: "Revenue Strategy",
    date: "January 8, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800",
    slug: "5-signs-under-monetising-sponsor-potential"
  },
];

export default async function InsightsPage() {
  let featured = fallbackFeatured;
  let articles = fallbackArticles;
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
        image: featuredData.image || fallbackFeatured.image,
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
        image: a.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
        slug: a.slug?.current || '',
      }));
      totalCount = count || 0;
    }
  } catch (err) {
    console.warn('Sanity fetch failed, using fallback data:', err);
  }

  return (
    <InsightsPageContent
      initialFeatured={featured}
      initialArticles={articles}
      totalCount={totalCount}
    />
  );
}
