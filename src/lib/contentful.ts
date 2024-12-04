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

export async function getBlogPostsByCategory(category: string) {
  const response = await client.getEntries({
    content_type: 'blogPost',
    'fields.category': category,
    order: ['-fields.date'],
    include: 2,
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