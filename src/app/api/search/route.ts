import { getAllPosts } from '@/lib/contentful';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase();

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const posts = await getAllPosts();
  
  const results = posts.filter(post => {
    const title = post.fields.title.toLowerCase();
    const excerpt = post.fields.excerpt?.toLowerCase() || '';
    const content = post.fields.content?.toString().toLowerCase() || '';
    const categories = post.fields.categories?.map(cat => 
      cat.fields.name.toLowerCase()
    ).join(' ') || '';

    return (
      title.includes(query) ||
      excerpt.includes(query) ||
      content.includes(query) ||
      categories.includes(query)
    );
  });

  return NextResponse.json({ results });
} 