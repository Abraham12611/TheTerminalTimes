import React from 'react';

export const metadata = {
  title: 'Linux News | The Terminal Times',
  description: 'Stay updated with the latest Linux news, releases, and community updates.',
};

export default function NewsPage() {
  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-8">Linux News</h1>
      
      {/* Featured News */}
      <div className="bg-gray-900 rounded-lg p-8 mb-12 border border-gray-800">
        <span className="text-green-500 text-sm">Breaking News</span>
        <h2 className="text-2xl font-bold mt-2 mb-4">Major Security Update Released for Linux Kernel</h2>
        <p className="text-gray-400 mb-6">Important security patches have been released for all major Linux distributions.</p>
        <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors">
          Read Full Story
        </button>
      </div>
      
      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* News Cards */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <span className="text-green-500 text-sm">News</span>
            <h3 className="text-xl font-bold mt-2 mb-2">Linux News Story #{item}</h3>
            <p className="text-gray-400 mb-4">Stay updated with the latest developments in the Linux world.</p>
            <a href="#" className="text-green-500 hover:text-green-400">Read More →</a>
          </div>
        ))}
      </div>
    </div>
  );
} 