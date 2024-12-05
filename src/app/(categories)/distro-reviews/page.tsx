import Link from 'next/link';
import { client } from '@/lib/contentful';
import { format } from 'date-fns';
import { Entry, EntrySkeletonType } from 'contentful';

interface Category {
  fields: {
    name: string;
    slug: string;
  };
}

interface BlogPost extends EntrySkeletonType {
  contentTypeId: 'blogPost';
  fields: {
    title: string;
    slug: string;
    excerpt?: string;
    publishDate: string;
    content: any;
    category: Entry<Category>;
  };
}

export default async function DistroReviews() {
  const response = await client.getEntries<BlogPost>({
    content_type: 'blogPost',
    'fields.category.sys.id': 'distroReviews',
    order: '-fields.publishDate',
    include: 2
  });

  const posts = response.items;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">Linux Distro Reviews</h1>
      
      {posts.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-8 mb-12 border border-gray-800">
          <span className="text-green-500 text-sm">Latest Review</span>
          <h2 className="text-2xl font-bold mt-2 mb-4">{posts[0].fields.title}</h2>
          <p className="text-gray-400 mb-6">{posts[0].fields.excerpt}</p>
          <Link 
            href={`/posts/${posts[0].fields.slug}`}
            className="inline-block bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
          >
            Read Review
          </Link>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.slice(1).map((post) => (
          <Link 
            key={post.fields.slug}
            href={`/posts/${post.fields.slug}`}
            className="block bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-green-500 transition-colors"
          >
            <h2 className="text-xl font-bold text-white mb-2">{post.fields.title}</h2>
            <p className="text-gray-400 mb-4">{post.fields.excerpt}</p>
            <time className="text-sm text-gray-500">
              {format(new Date(post.fields.publishDate), 'MMMM d, yyyy')}
            </time>
          </Link>
        ))}
      </div>
    </div>
  );
} 