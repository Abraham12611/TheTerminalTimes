import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">The Terminal Times</h1>
          <p className="mt-2 text-gray-300">Your Tech Blog for the Digital Age</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder Card */}
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-200 h-48"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
                <p className="text-gray-600 mb-4">
                  Stay tuned for exciting articles about technology, development, and more!
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Coming Soon</span>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>&copy; 2024 The Terminal Times. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 