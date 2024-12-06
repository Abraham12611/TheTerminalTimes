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
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

export interface BlogPost {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    excerpt?: string;
    content: any;
    publishDate: string;
    featuredImage?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    categories: Array<{
      fields: {
        slug: string;
      };
    }>;
  };
}

export async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.categories.sys.contentType.sys.id': 'category',
      'fields.categories.fields.slug': categorySlug,
      order: '-fields.publishDate', // Sort by publish date descending
      include: 2, // Include linked entries (like categories and authors)
    });

    return response.items as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
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