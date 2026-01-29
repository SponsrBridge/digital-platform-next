import { NextRequest, NextResponse } from 'next/server';
import { getPosts } from '@/lib/queries';

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateString;
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get('limit') || '6', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  try {
    const rawPosts = await getPosts(limit, offset);
    const posts = rawPosts.map((a: any) => ({
      title: a.title,
      excerpt: a.excerpt,
      tag: a.tag,
      date: formatDate(a.date),
      readTime: a.readTime || '5 min read',
      image: a.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      slug: a.slug?.current || '',
    }));

    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ posts: [] });
  }
}
