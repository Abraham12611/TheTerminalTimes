import { createClient } from 'contentful';

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export interface Author {
  name: string;
  bio?: string;
  email?: string;
  profilePicture?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

export interface BlogPost {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    description?: string;
    content: any; // Using 'any' for now, but you might want to type this properly
    publishDate: string;
    author: {
      fields: Author;
    };
    categories: Array<{
      fields: {
        name: string;
        slug: string;
      };
    }>;
    featuredImage?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    seoMetadata?: any;
  };
}

export async function getBlogPosts() {
  const response = await client.getEntries<BlogPost>({
    content_type: 'blogPost',
    include: 2, // Include linked entries (author and categories)
    order: '-fields.publishDate', // Sort by publish date descending
  });

  return response.items;
}

export async function getBlogPostsByCategory(categorySlug: string) {
  const response = await client.getEntries<BlogPost>({
    content_type: 'blogPost',
    include: 2,
    'fields.categories.sys.contentType.sys.id': 'category',
    'fields.categories.fields.slug': categorySlug,
    order: '-fields.publishDate',
  });

  return response.items;
} 