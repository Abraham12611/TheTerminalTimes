import { getBlogPostsByCategory } from '@/lib/contentful';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  
  if (!category) {
    return NextResponse.json({ error: 'Category is required' }, { status: 400 });
  }

  const posts = await getBlogPostsByCategory(category);
  
  return NextResponse.json({
    category,
    total: posts.length,
    posts: posts.map(post => ({
      id: post.sys.id,
      title: post.fields.title,
      categories: post.fields.categories?.map(cat => cat.fields.slug)
    }))
  });
} 