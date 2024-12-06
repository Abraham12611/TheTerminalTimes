import { getAllPosts } from '@/lib/contentful';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default async function Home() {
  const allPosts = await getAllPosts();
  const shuffledPosts = shuffleArray(allPosts);
  const featuredPosts = shuffledPosts.slice(0, 8); // Get 8 random post

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          The Terminal Times
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Your trusted source for Linux news, tutorials, distribution reviews, and command-line mastery.
        </p>
        <Link 
          href="/tutorials"
          className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors inline-block"
        >
          Get Started
        </Link>
      </section>

      {/* Featured Posts */}
      <section className="px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <div 
              key={post.sys.id} 
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-green-500 transition-all"
            >
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
              <div className="flex items-center space-x-2 mb-2">
                {post.fields.categories?.map((category) => (
                  <span 
                    key={category.fields.slug}
                    className="text-green-500 text-sm"
                  >
                    {category.fields.name}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold mb-2">{post.fields.title}</h3>
              <p className="text-gray-400 mb-4">{post.fields.excerpt}</p>
              <div className="flex justify-between items-center">
                <Link 
                  href={`/posts/${post.fields.slug}`}
                  className="text-green-500 hover:text-green-400 transition-colors"
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
      </section>

      {/* Categories Section */}
      <section className="px-4 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Explore Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              href="/tutorials"
              className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Tutorials</h3>
              <p className="text-gray-400">Step-by-step guides to master Linux.</p>
            </Link>
            <Link 
              href="/news"
              className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">News</h3>
              <p className="text-gray-400">Latest updates from the Linux world.</p>
            </Link>
            <Link 
              href="/distro-reviews"
              className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Distro Reviews</h3>
              <p className="text-gray-400">In-depth Linux distribution analysis.</p>
            </Link>
            <Link 
              href="/tips-tricks"
              className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Tips & Tricks</h3>
              <p className="text-gray-400">Useful commands and productivity hacks.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-8">
            Subscribe to our newsletter for the latest Linux news, tutorials, and tips.
          </p>
          <form className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-full focus:outline-none focus:border-green-500 flex-grow max-w-md"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
} 