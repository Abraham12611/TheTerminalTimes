'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Terminal, Search } from 'lucide-react';
import SearchDialog from './SearchDialog';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-green-500 transition-colors">
              <Terminal className="w-6 h-6" />
              <span className="text-lg font-bold">TheTerminalTimes</span>
            </Link>

            {/* Main Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/tutorials" 
                className="text-gray-300 hover:text-green-500 transition-colors"
              >
                Tutorials
              </Link>
              <Link 
                href="/news" 
                className="text-gray-300 hover:text-green-500 transition-colors"
              >
                News
              </Link>
              <Link 
                href="/distro-reviews" 
                className="text-gray-300 hover:text-green-500 transition-colors"
              >
                Distro Reviews
              </Link>
              <Link 
                href="/tips-tricks" 
                className="text-gray-300 hover:text-green-500 transition-colors"
              >
                Tips & Tricks
              </Link>
            </div>

            {/* Search and CTA */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-300 hover:text-green-500 transition-colors p-2"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                href="/subscribe"
                className="hidden md:block bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
              >
                Subscribe
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <SearchDialog 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
} 