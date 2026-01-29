import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostContent from '@/components/insights/BlogPostContent';
import { getPostBySlug, getAllPostSlugs } from '@/lib/queries';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: 'Post Not Found — SponsrBridge' };
  }
  return {
    title: `${post.title} — SponsrBridge Insights`,
    description: post.excerpt || 'Read the latest insights from SponsrBridge.',
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}
