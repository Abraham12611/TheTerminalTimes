import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <span className="text-green-500 font-mono">$_</span>
          <span className="font-bold">TheTerminalTimes</span>
        </div>
        <div className="flex space-x-6">
          <a href="/" className="hover:text-green-500">Home</a>
          <a href="/distros" className="hover:text-green-500">Distros</a>
          <a href="/tutorials" className="hover:text-green-500">Tutorials</a>
          <a href="/about" className="hover:text-green-500">About</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Explore the World of Linux</h1>
        <p className="text-xl text-gray-400 mb-8">Discover distributions, tips, and tutorials</p>
        <button className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors">
          Explore Distros
        </button>
      </section>

      {/* Featured Posts */}
      <section className="px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tutorial Post */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-green-500 text-sm mb-2">Tutorials</div>
            <h3 className="text-xl font-bold mb-2">Getting Started with Ubuntu 22.04</h3>
            <p className="text-gray-400">Learn how to install and set up Ubuntu 22.04, the latest LTS release.</p>
          </div>

          {/* Comparison Post */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-green-500 text-sm mb-2">Comparisons</div>
            <h3 className="text-xl font-bold mb-2">Arch Linux vs Manjaro: Which One Is Right for You?</h3>
            <p className="text-gray-400">Compare two popular rolling release distributions and find out which suits your needs.</p>
          </div>

          {/* Tips Post */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-green-500 text-sm mb-2">Tips & Tricks</div>
            <h3 className="text-xl font-bold mb-2">Top 10 Linux Commands Every User Should Know</h3>
            <p className="text-gray-400">Master these essential command-line tools to boost your productivity.</p>
          </div>
        </div>
      </section>

      {/* Categories and Popular Posts */}
      <section className="px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories */}
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-8">Categories</h2>
            <div className="grid grid-cols-2 gap-4">
              <a href="/tutorials" className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-green-500">
                <h3 className="text-xl font-bold">Tutorials</h3>
              </a>
              <a href="/distro-reviews" className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-green-500">
                <h3 className="text-xl font-bold">Distro Reviews</h3>
              </a>
              <a href="/tips-tricks" className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-green-500">
                <h3 className="text-xl font-bold">Tips & Tricks</h3>
              </a>
              <a href="/news" className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-green-500">
                <h3 className="text-xl font-bold">News</h3>
              </a>
            </div>
          </div>

          {/* Popular Posts */}
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold mb-8">Popular Posts</h2>
            <div className="space-y-4">
              <a href="#" className="block text-gray-400 hover:text-green-500">
                How to Customize Your Linux Desktop
              </a>
              <a href="#" className="block text-gray-400 hover:text-green-500">
                Understanding Linux File Permissions
              </a>
              <a href="#" className="block text-gray-400 hover:text-green-500">
                The Best Linux Distros for Beginners in 2023
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 