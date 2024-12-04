import React from 'react';
import { getBlogPostsByCategory } from '@/lib/contentful';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

export const metadata = {
  title: 'Linux Tutorials | The Terminal Times',
  description: 'Learn Linux with our comprehensive tutorials, from beginner basics to advanced system administration.',
};

export default async function TutorialsPage() {
  const posts = await getBlogPostsByCategory('tutorials');

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-8">Linux Tutorials</h1>
      
      {/* Featured Tutorial */}
      {posts.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-8 mb-12 border border-gray-800">
          <span className="text-green-500 text-sm">Featured Tutorial</span>
          <h2 className="text-2xl font-bold mt-2 mb-4">{posts[0].fields.title}</h2>
          <p className="text-gray-400 mb-6">{posts[0].fields.description}</p>
          <Link 
            href={`/posts/${posts[0].fields.slug}`}
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors inline-block"
          >
            Read Tutorial
          </Link>
        </div>
      )}
      
      {/* Tutorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(1).map((post) => (
          <div key={post.sys.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            {post.fields.featuredImage && (
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={`https:${post.fields.featuredImage.fields.file.url}`}
                  alt={post.fields.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            )}
            <span className="text-green-500 text-sm">Tutorial</span>
            <h3 className="text-xl font-bold mt-2 mb-2">{post.fields.title}</h3>
            <p className="text-gray-400 mb-4">{post.fields.description}</p>
            <div className="flex justify-between items-center">
              <Link 
                href={`/posts/${post.fields.slug}`}
                className="text-green-500 hover:text-green-400"
              >
                Read More →
              </Link>
              <span className="text-sm text-gray-500">
                {format(new Date(post.fields.publishDate), 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 