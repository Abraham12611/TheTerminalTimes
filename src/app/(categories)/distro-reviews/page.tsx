import React from 'react';
import { getBlogPostsByCategory, BlogPost } from '@/lib/contentful';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

export const metadata = {
  title: 'Linux Distro Reviews | The Terminal Times',
  description: 'In-depth reviews of various Linux distributions.',
};

// Force dynamic rendering and revalidation
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function DistroReviewsPage() {
  const posts = await getBlogPostsByCategory('distro-reviews');
  
  // Debug output
  console.log('Distro Reviews Page - Received posts:', {
    total: posts.length,
    posts: posts.map(p => ({
      title: p.fields.title,
      categorySlugs: p.fields.categories?.map(c => c.fields.slug)
    }))
  });

  if (!posts || posts.length === 0) {
    return (
      <div className="text-white">
        <h1 className="text-4xl font-bold mb-8">Linux Distro Reviews</h1>
        <p className="text-gray-400">No reviews found. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="text-white mb-16">
      <h1 className="text-4xl font-bold mb-8">Linux Distro Reviews</h1>
      
      {/* Featured Post - Latest Post */}
      {posts.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-8 mb-12 border border-gray-800">
          <span className="text-green-500 text-sm">Featured Review</span>
          <h2 className="text-2xl font-bold mt-2 mb-4">
            {String(posts[0].fields.title)}
          </h2>
          <p className="text-gray-400 mb-6">
            {String(posts[0].fields.excerpt || '')}
          </p>
          <Link 
            href={`/posts/${posts[0].fields.slug}`}
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors inline-block"
          >
            Read Review
          </Link>
        </div>
      )}
      
      {/* Reviews Grid - Remaining Pots */}
      {posts.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {posts.slice(1).map((post) => (
            <div key={post.sys.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              {post.fields.featuredImage && (
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={`https:${post.fields.featuredImage.fields.file.url}`}
                    alt={String(post.fields.title)}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
              <span className="text-green-500 text-sm">Distro Review</span>
              <h3 className="text-xl font-bold mt-2 mb-2">
                {String(post.fields.title)}
              </h3>
              <p className="text-gray-400 mb-4">
                {String(post.fields.excerpt || '')}
              </p>
              <div className="flex justify-between items-center">
                <Link 
                  href={`/posts/${post.fields.slug}`}
                  className="text-green-500 hover:text-green-400"
                >
                  Read Review →
                </Link>
                <span className="text-sm text-gray-500">
                  {format(new Date(post.fields.publishDate), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 