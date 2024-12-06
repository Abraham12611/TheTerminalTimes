import { createClient } from 'contentful';
import type { Entry, EntryCollection } from 'contentful';

// Define the content type for blog posts
interface BlogPostFields {
  title: string;
  slug: string;
  excerpt?: string;
  content: any;
  publishDate: string;
  featuredImage?: {
    fields: {
      file: {
        url: string;
      }
    }
  };
  categories: Array<{
    sys: { id: string };
    fields: {
      name: string;
      slug: string;
    }
  }>;
}

export type BlogPost = Entry<BlogPostFields>;

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

export async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  try {
    console.log('Fetching posts for category:', categorySlug);
    
    const response = await client.getEntries<BlogPostFields>({
      content_type: 'blogPost',
      // Link to categories with matching slug
      links_to_entry: categorySlug,
      'fields.categories.sys.contentType.sys.id': 'category',
      order: ['-sys.createdAt'],
      include: 2,
    });

    console.log('Response:', {
      total: response.total,
      items: response.items.length,
      firstPost: response.items[0]?.fields.title,
      categorySlug
    });

    // Filter posts to ensure they belong to the correct category
    const filteredPosts = response.items.filter(post => 
      post.fields.categories?.some(category => 
        category.fields.slug === categorySlug
      )
    );

    console.log('Filtered posts:', {
      total: filteredPosts.length,
      firstPost: filteredPosts[0]?.fields.title
    });

    return filteredPosts;
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const response = await client.getEntries<BlogPostFields>({
      content_type: 'blogPost',
      order: ['-sys.createdAt'],
      include: 2,
    });

    return response.items;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await client.getEntries<BlogPostFields>({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
      include: 2,
    });

    return response.items[0] || null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
} 