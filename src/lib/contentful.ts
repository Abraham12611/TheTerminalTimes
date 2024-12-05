import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

// Define interfaces for your content types
export interface Author {
  fields: {
    name: string;
    profilePicture?: {
      fields: {
        file: {
          url: string;
        }
      }
    };
  }
}

export interface BlogPostFields {
  title: string;
  slug: string;
  excerpt?: string;
  content: Document;
  featuredImage?: {
    fields: {
      file: {
        url: string;
      }
    }
  };
  author: {
    fields: Author['fields']
  };
  publishDate: string;
  categories: {
    fields: {
      name: string;
      slug: string;
    }
  }[];
}

// Create client as a constant that can be imported
export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getBlogPostsByCategory(categorySlug: string) {
  try {
    // First, get the category entry
    const categoryResponse = await client.getEntries({
      content_type: 'category',
      'fields.slug': categorySlug,
      limit: 1
    });

    if (!categoryResponse.items.length) {
      return [];
    }

    const categoryId = categoryResponse.items[0].sys.id;

    // Then, get all blog posts that link to this category
    const response = await client.getEntries<BlogPostFields>({
      content_type: 'blogPost',
      links_to_entry: categoryId,
      order: ['-sys.createdAt'],
      include: 2
    });

    return response.items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getAllPosts() {
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

export async function getPostBySlug(slug: string) {
  try {
    const response = await client.getEntries<BlogPostFields>({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
      include: 2,
    });

    return response.items[0];
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
} 