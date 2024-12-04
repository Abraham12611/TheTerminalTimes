import React from 'react';

export const metadata = {
  title: 'Linux Distribution Reviews | The Terminal Times',
  description: 'Comprehensive reviews of Linux distributions to help you choose the right one for your needs.',
};

export default function DistroReviewsPage() {
  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-8">Linux Distribution Reviews</h1>
      
      {/* Featured Review */}
      <div className="bg-gray-900 rounded-lg p-8 mb-12 border border-gray-800">
        <span className="text-green-500 text-sm">Latest Review</span>
        <h2 className="text-2xl font-bold mt-2 mb-4">Ubuntu 24.04 LTS Review</h2>
        <p className="text-gray-400 mb-6">A detailed look at the latest Long Term Support release from Ubuntu.</p>
        <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors">
          Read Review
        </button>
      </div>
      
      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Review Cards */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <span className="text-green-500 text-sm">Distribution Review</span>
            <h3 className="text-xl font-bold mt-2 mb-2">Linux Distro Review #{item}</h3>
            <p className="text-gray-400 mb-4">An in-depth look at this popular Linux distribution.</p>
            <a href="#" className="text-green-500 hover:text-green-400">Read More →</a>
          </div>
        ))}
      </div>
    </div>
  );
} 