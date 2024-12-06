import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import type { Entry, EntryCollection } from 'contentful';

// Define the content type for blog posts
interface BlogPostSkeleton {
  contentTypeId: 'blogPost';
  fields: {
    title: string;
    slug: string;
    excerpt?: string;
    content: Document;
    publishDate: string;
    featuredImage?: {
      fields: {
        file: {
          url: string;
        }
      }
    };
    categories: Array<{
      fields: {
        name: string;
        slug: string;
      }
    }>;
  };
}

export type BlogPost = Entry<BlogPostSkeleton>;

// Create the Contentful client
export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

export async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  try {
    const response: EntryCollection<BlogPostSkeleton> = await client.getEntries({
      content_type: 'blogPost',
      'fields.categories.sys.contentType.sys.id': 'category',
      'fields.categories.fields.slug': categorySlug,
      order: '-fields.publishDate',
      include: 2,
    });

    if (!response.items) {
      console.warn(`No posts found for category: ${categorySlug}`);
      return [];
    }

    return response.items;
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const response: EntryCollection<BlogPostSkeleton> = await client.getEntries({
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
    const response: EntryCollection<BlogPostSkeleton> = await client.getEntries({
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