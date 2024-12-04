import React from 'react';
import Link from 'next/link';

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      {/* Category Navigation */}
      <div className="border-b border-gray-800 mb-8">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex space-x-6 text-sm">
            <Link 
              href="/tutorials" 
              className="text-gray-400 hover:text-green-500 transition-colors"
            >
              Tutorials
            </Link>
            <Link 
              href="/distro-reviews" 
              className="text-gray-400 hover:text-green-500 transition-colors"
            >
              Distro Reviews
            </Link>
            <Link 
              href="/tips-tricks" 
              className="text-gray-400 hover:text-green-500 transition-colors"
            >
              Tips & Tricks
            </Link>
            <Link 
              href="/news" 
              className="text-gray-400 hover:text-green-500 transition-colors"
            >
              News
            </Link>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  );
} 