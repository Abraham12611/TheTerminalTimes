import { client } from '@/lib/contentful';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

interface RandomPost {
  fields: {
    title: string;
    slug: string;
    publishDate: string;
    featuredImage?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
}

async function getRandomPosts(excludeSlug: string, count: number = 3) {
  const response = await client.getEntries({
    content_type: 'blogPost',
    limit: 100, // Get a larger set to randomly select from
  });

  // Filter out the current post and shuffle the array
  const filteredPosts = response.items
    .filter((post: any) => post.fields.slug !== excludeSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  return filteredPosts;
}

export default async function RandomPosts({ currentSlug }: { currentSlug: string }) {
  const randomPosts = await getRandomPosts(currentSlug);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4 text-white">You May Also Like</h3>
      {randomPosts.map((post: RandomPost) => (
        <Link
          href={`/posts/${post.fields.slug}`}
          key={post.fields.slug}
          className="block group"
        >
          <div className="bg-gray-900 rounded-lg overflow-hidden transition-transform hover:scale-105">
            {post.fields.featuredImage && (
              <div className="relative w-full h-32">
                <Image
                  src={`https:${post.fields.featuredImage.fields.file.url}`}
                  alt={post.fields.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 line-clamp-2">
                {post.fields.title}
              </h4>
              <time className="text-xs text-gray-400">
                {format(new Date(post.fields.publishDate), 'MMMM d, yyyy')}
              </time>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 