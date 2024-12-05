import React from 'react';
import { getBlogPostsByCategory } from '@/lib/contentful';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function TutorialsPage() {
  const posts = await getBlogPostsByCategory('tutorials');

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-10 text-white">
        <h1>No tutorials found</h1>
      </div>
    );
  }

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-8">Linux Tutorials</h1>
      
      {/* Featured Tutorial */}
      {posts.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-8 mb-12 border border-gray-800 hover:border-green-500 transition-colors">
          <span className="text-green-500 text-sm mb-2 block">Featured Tutorial</span>
          <h2 className="text-2xl font-bold mb-4">{posts[0].fields.title}</h2>
          <p className="text-gray-400 mb-6">{posts[0].fields.description}</p>
          <Link 
            href={`/posts/${posts[0].fields.slug}`}
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors inline-block"
          >
            Read Tutorial
          </Link>
        </div>
      )}
      
      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(1).map((post) => (
          <Link 
            key={post.sys.id} 
            href={`/posts/${post.fields.slug}`}
            className="group bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-green-500 transition-all duration-300"
          >
            {post.fields.featuredImage && (
              <div className="relative w-full h-48">
                <Image
                  src={`https:${post.fields.featuredImage.fields.file.url}`}
                  alt={post.fields.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-6">
              <span className="text-green-500 text-sm mb-2 block">Tutorial</span>
              <h3 className="text-xl font-bold mb-2 group-hover:text-green-500 transition-colors">
                {post.fields.title}
              </h3>
              <p className="text-gray-400 mb-4 line-clamp-2">
                {post.fields.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {post.fields.author?.fields?.profilePicture && (
                    <div className="relative w-8 h-8 mr-2">
                      <Image
                        src={`https:${post.fields.author.fields.profilePicture.fields.file.url}`}
                        alt={post.fields.author.fields.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                  <span className="text-sm text-gray-400">
                    {post.fields.author?.fields?.name}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {format(new Date(post.fields.publishDate), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 