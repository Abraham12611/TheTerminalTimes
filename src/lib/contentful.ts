import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export type Author = {
  name: string;
  picture: {
    url: string;
  };
};

export interface PostFields {
  title: string;
  slug: string;
  excerpt: string;
  content: Document;
  coverImage: {
    url: string;
  };
  author: Author;
  date: string;
  category: string;
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

export async function getBlogPostsByCategory(categorySlug: string) {
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
    order: ['-fields.publishDate'],
    include: 2
  });

  return response.items;
}

export async function getAllPosts() {
  const response = await client.getEntries({
    content_type: 'post',
    order: ['-fields.date'],
    include: 2,
  });

  return response.items;
}

export async function getPostBySlug(slug: string) {
  const response = await client.getEntries({
    content_type: 'post',
    'fields.slug': slug,
    limit: 1,
    include: 2,
  });

  return response.items[0];
} 