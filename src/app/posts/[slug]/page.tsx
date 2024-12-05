import { client } from '@/lib/contentful';
import { format } from 'date-fns';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { Entry, Asset } from 'contentful';

// Define interfaces for your content types
interface Author {
  fields: {
    name: string;
    profilePicture?: Asset;
  };
}

interface BlogPost {
  fields: {
    title: string;
    slug: string;
    content: any; // You can make this more specific if needed
    publishDate: string;
    author: Entry<Author>;
    featuredImage?: Asset;
  };
}

export async function generateStaticParams() {
  const response = await client.getEntries({
    content_type: 'blogPost',
  });

  return response.items.map((post) => ({
    slug: post.fields.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const response = await client.getEntries<BlogPost>({
    content_type: 'blogPost',
    'fields.slug': params.slug,
    include: 2,
  });

  const post = response.items[0];

  if (!post) {
    return <div>Post not found</div>;
  }

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        // Add null checks for embedded assets
        const { target } = node.data;
        if (!target || !target.fields) return null;
        
        const { file, title } = target.fields;
        if (!file || !file.details || !file.details.image) return null;

        return (
          <div className="my-8">
            <Image
              src={`https:${file.url}`}
              width={file.details.image.width}
              height={file.details.image.height}
              alt={title || 'Blog image'}
              className="rounded-lg"
            />
          </div>
        );
      },
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p className="mb-4 text-gray-300">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node: any, children: any) => (
        <h1 className="text-4xl font-bold mb-6">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <h2 className="text-3xl font-bold mb-4">{children}</h2>
      ),
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-white">
      <h1 className="text-5xl font-bold mb-4">{post.fields.title}</h1>
      <div className="flex items-center space-x-4 mb-8 text-gray-400">
        <div className="flex items-center">
          {post.fields.author?.fields?.profilePicture && (
            <Image
              src={`https:${post.fields.author.fields.profilePicture.fields.file.url}`}
              alt={post.fields.author.fields.name}
              width={40}
              height={40}
              className="rounded-full mr-2"
            />
          )}
          <span>{post.fields.author?.fields?.name}</span>
        </div>
        <span>•</span>
        <time>
          {format(new Date(post.fields.publishDate || Date.now()), 'MMMM d, yyyy')}
        </time>
      </div>
      
      {post.fields.featuredImage && (
        <div className="relative w-full h-96 mb-8">
          <Image
            src={`https:${post.fields.featuredImage.fields.file.url}`}
            alt={post.fields.title || 'Featured image'}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      )}
      
      <div className="prose prose-invert max-w-none">
        {documentToReactComponents(post.fields.content, options)}
      </div>
    </div>
  );
} 