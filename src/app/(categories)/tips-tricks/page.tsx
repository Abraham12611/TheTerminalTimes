import React from 'react';

export const metadata = {
  title: 'Linux Tips & Tricks | The Terminal Times',
  description: 'Discover useful Linux tips and tricks to enhance your productivity and system performance.',
};

export default function TipsAndTricksPage() {
  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-8">Linux Tips & Tricks</h1>
      
      {/* Featured Tip */}
      <div className="bg-gray-900 rounded-lg p-8 mb-12 border border-gray-800">
        <span className="text-green-500 text-sm">Featured Tip</span>
        <h2 className="text-2xl font-bold mt-2 mb-4">10 Terminal Shortcuts to Speed Up Your Workflow</h2>
        <p className="text-gray-400 mb-6">Essential keyboard shortcuts that every Linux user should know.</p>
        <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors">
          Read More
        </button>
      </div>
      
      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tip Cards */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <span className="text-green-500 text-sm">Quick Tip</span>
            <h3 className="text-xl font-bold mt-2 mb-2">Linux Tip #{item}</h3>
            <p className="text-gray-400 mb-4">Improve your Linux experience with this helpful tip.</p>
            <a href="#" className="text-green-500 hover:text-green-400">Read More →</a>
          </div>
        ))}
      </div>
    </div>
  );
} 