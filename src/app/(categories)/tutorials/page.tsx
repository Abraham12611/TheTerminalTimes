import React from 'react';

export const metadata = {
  title: 'Linux Tutorials | The Terminal Times',
  description: 'Learn Linux with our comprehensive tutorials, from beginner basics to advanced system administration.',
};

export default function TutorialsPage() {
  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-8">Linux Tutorials</h1>
      
      {/* Featured Tutorial */}
      <div className="bg-gray-900 rounded-lg p-8 mb-12 border border-gray-800">
        <span className="text-green-500 text-sm">Featured Tutorial</span>
        <h2 className="text-2xl font-bold mt-2 mb-4">Getting Started with Linux Command Line</h2>
        <p className="text-gray-400 mb-6">Master the basics of the Linux terminal with this comprehensive guide for beginners.</p>
        <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors">
          Read Tutorial
        </button>
      </div>
      
      {/* Tutorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tutorial Cards */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <span className="text-green-500 text-sm">Beginner</span>
            <h3 className="text-xl font-bold mt-2 mb-2">Linux Tutorial #{item}</h3>
            <p className="text-gray-400 mb-4">Learn essential Linux skills with our step-by-step guide.</p>
            <a href="#" className="text-green-500 hover:text-green-400">Read More →</a>
          </div>
        ))}
      </div>
    </div>
  );
} 