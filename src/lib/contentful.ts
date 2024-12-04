import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export type Author = {
  fields: {
    name: string;
    bio?: string;
    profilePicture?: {
      fields: {
        file: {
          url: string;
        }
      }
    };
    email?: string;
  }
};

export interface Category {
  fields: {
    name: string;
    slug: string;
  }
}

export interface BlogPostFields {
  title: string;
  slug: string;
  description?: string;
  content: Document;
  publishDate: string;
  author: {
    fields: Author['fields']
  };
  categories: {
    fields: Category['fields']
  }[];
  featuredImage?: {
    fields: {
      file: {
        url: string;
      }
    }
  };
  seoMetadata?: object;
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

export async function getBlogPostsByCategory(categorySlug: string) {
  const response = await client.getEntries<BlogPostFields>({
    content_type: 'blogPost',
    'fields.categories.sys.contentType.sys.id': 'category',
    'fields.categories.fields.slug[in]': categorySlug,
    include: 2,
    order: ['-fields.publishDate'],
  });

  return response.items;
}

export async function getAllPosts() {
  const response = await client.getEntries<BlogPostFields>({
    content_type: 'blogPost',
    order: ['-fields.publishDate'],
    include: 2,
  });

  return response.items;
}

export async function getPostBySlug(slug: string) {
  const response = await client.getEntries<BlogPostFields>({
    content_type: 'blogPost',
    'fields.slug': slug,
    include: 2,
  });

  return response.items[0];
} 