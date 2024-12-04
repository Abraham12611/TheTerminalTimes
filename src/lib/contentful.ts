import { createClient, Entry, EntryCollection } from 'contentful';
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

export type Post = Entry<PostFields>;

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const response = await client.getEntries<PostFields>({
    content_type: 'post',
    'fields.slug': slug,
    include: 2,
  });

  return response.items[0];
}

export async function getAllPosts(): Promise<Post[]> {
  const response = await client.getEntries<PostFields>({
    content_type: 'post',
    order: ['-fields.date'],
    include: 2,
  });

  return response.items;
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const response = await client.getEntries<PostFields>({
    content_type: 'post',
    'fields.category': category,
    order: ['-fields.date'],
    include: 2,
  });

  return response.items;
} 