import { client } from '@/lib/contentful';
import { format } from 'date-fns';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { Entry, Asset } from 'contentful';
import { FaTwitter, FaFacebook, FaLinkedin, FaReddit, FaMastodon, FaInstagram } from 'react-icons/fa';
import RandomPosts from '@/components/RandomPosts';

// Define interfaces for your content types
interface Author {
  contentTypeId: 'author';
  fields: {
    name: string;
    profilePicture?: Asset;
  };
}

interface BlogPost {
  contentTypeId: 'blogPost';
  fields: {
    title: string;
    slug: string;
    content: Document;
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

// Add this new component for social sharing
function SocialShareButtons({ title, url }: { title: string, url: string }) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="flex space-x-4 mb-8">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1DA1F2] hover:opacity-80 transition-opacity"
        aria-label="Share on Twitter"
      >
        <FaTwitter size={24} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#4267B2] hover:opacity-80 transition-opacity"
        aria-label="Share on Facebook"
      >
        <FaFacebook size={24} />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#0077b5] hover:opacity-80 transition-opacity"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin size={24} />
      </a>
      <a
        href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#FF4500] hover:opacity-80 transition-opacity"
        aria-label="Share on Reddit"
      >
        <FaReddit size={24} />
      </a>
      <a
        href={`https://www.instagram.com/`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#E4405F] hover:opacity-80 transition-opacity"
        aria-label="Share on Instagram"
      >
        <FaInstagram size={24} />
      </a>
      <a
        href={`https://mastodon.social/share?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#563ACC] hover:opacity-80 transition-opacity"
        aria-label="Share on Mastodon"
      >
        <FaMastodon size={24} />
      </a>
    </div>
  );
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

  interface RichTextContent {
    nodeType: string;
    content: RichTextContent[];
    value?: string;
    data?: {
      uri?: string;
      target?: {
        sys: {
          id: string;
          type: string;
        };
      };
    };
  }

  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: RichTextContent) => (
        <p className="mb-4 leading-relaxed">{node.content[0].value}</p>
      ),
      [BLOCKS.HEADING_1]: (node: RichTextContent) => (
        <h1 className="text-3xl font-bold mb-4 text-white">{node.content[0].value}</h1>
      ),
      [BLOCKS.HEADING_2]: (node: RichTextContent) => (
        <h2 className="text-2xl font-bold mb-3 text-white">{node.content[0].value}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: RichTextContent) => (
        <h3 className="text-xl font-bold mb-2 text-white">{node.content[0].value}</h3>
      ),
      [BLOCKS.HYPERLINK]: (node: RichTextContent) => (
        <a 
          href={node.data?.uri} 
          className="text-emerald-400 hover:text-emerald-300 underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {node.content[0].value}
        </a>
      ),
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="lg:w-2/3">
          <h1 className="text-5xl font-bold mb-4">{post.fields.title}</h1>
          
          <SocialShareButtons 
            title={post.fields.title} 
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${params.slug}`}
          />

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
            {documentToReactComponents(post.fields.content, renderOptions)}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">
          <div className="sticky top-8">
            <RandomPosts currentSlug={params.slug} />
          </div>
        </div>
      </div>
    </div>
  );
} 