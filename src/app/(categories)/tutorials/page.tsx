import React from 'react';
import { getBlogPostsByCategory } from '@/lib/contentful';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function TutorialsPage() {
  const posts = await getBlogPostsByCategory('tutorials');

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-10">
        <h1>No tutorials found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Tutorials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.sys.id} className="border rounded-lg overflow-hidden">
            {post.fields.featuredImage && (
              <Image
                src={`https:${post.fields.featuredImage.fields.file.url}`}
                alt={post.fields.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.fields.title}</h2>
              <p className="text-gray-600 mb-4">{post.fields.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {format(new Date(post.fields.publishDate), 'MMM dd, yyyy')}
                </span>
                <Link
                  href={`/articles/${post.fields.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 