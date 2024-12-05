'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

interface SearchResult {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    excerpt?: string;
    publishDate: string;
    categories?: Array<{ fields: { name: string } }>;
  };
}

export default function SearchDialog({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    const searchPosts = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchPosts, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-gray-900 w-full max-w-2xl rounded-lg shadow-lg border border-gray-800">
        {/* Search Headers */}
        <div className="p-4 border-b border-gray-800 flex items-center">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow bg-transparent text-white placeholder-gray-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[70vh] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">Searching...</div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-gray-800">
              {results.map((result) => (
                <Link
                  key={result.sys.id}
                  href={`/posts/${result.fields.slug}`}
                  onClick={onClose}
                  className="block p-4 hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {result.fields.categories?.map((category) => (
                      <span
                        key={category.fields.name}
                        className="text-green-500 text-sm"
                      >
                        {category.fields.name}
                      </span>
                    ))}
                    <span className="text-gray-400 text-sm">
                      {format(new Date(result.fields.publishDate), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold mb-1">
                    {result.fields.title}
                  </h3>
                  {result.fields.excerpt && (
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {result.fields.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-gray-400">
              No results found for "{query}"
            </div>
          ) : (
            <div className="p-4 text-center text-gray-400">
              Type at least 2 characters to search
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 