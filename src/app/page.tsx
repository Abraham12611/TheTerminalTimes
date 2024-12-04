import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f1219]">
      {/* Header/Navigation */}
      <header className="border-b border-gray-800">
        <nav className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-green-500 text-2xl">$_</span>
              <Link href="/" className="text-xl font-bold text-white">
                TheTerminalTimes
              </Link>
            </div>
            <div className="flex space-x-8">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/distros" className="nav-link">Distros</Link>
              <Link href="/tutorials" className="nav-link">Tutorials</Link>
              <Link href="/about" className="nav-link">About</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center bg-[#0f1219]">
        <div className="container">
          <h1 className="text-5xl font-bold mb-6">
            Explore the World of Linux
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Discover distributions, tips, and tutorials
          </p>
          <Link href="/distros" className="btn-primary">
            Explore Distros
          </Link>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-[#0f1219]">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Post Card */}
            <article className="card">
              <div className="aspect-video bg-gray-800 relative"></div>
              <div className="p-6">
                <div className="category-tag mb-2">Tutorials</div>
                <h3 className="text-xl font-bold mb-2">
                  Getting Started with Ubuntu 22.04
                </h3>
                <p className="text-gray-400 mb-4">
                  Learn how to install and set up Ubuntu 22.04, the latest LTS release.
                </p>
              </div>
            </article>

            {/* Additional Featured Post Cards */}
            <article className="card">
              <div className="aspect-video bg-gray-800 relative"></div>
              <div className="p-6">
                <div className="category-tag mb-2">Comparisons</div>
                <h3 className="text-xl font-bold mb-2">
                  Arch Linux vs Manjaro: Which One Is Right for You?
                </h3>
                <p className="text-gray-400 mb-4">
                  Compare two popular rolling release distributions and find out which suits your needs.
                </p>
              </div>
            </article>

            <article className="card">
              <div className="aspect-video bg-gray-800 relative"></div>
              <div className="p-6">
                <div className="category-tag mb-2">Tips & Tricks</div>
                <h3 className="text-xl font-bold mb-2">
                  Top 10 Linux Commands Every User Should Know
                </h3>
                <p className="text-gray-400 mb-4">
                  Master these essential command-line tools to boost your productivity.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-[#0f1219]">
        <div className="container">
          <div className="flex justify-between items-start">
            <div className="w-3/4">
              <h2 className="text-3xl font-bold mb-8">Categories</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/tutorials" className="card p-4 hover:bg-[#242938]">
                  <h3 className="text-xl font-bold">Tutorials</h3>
                </Link>
                <Link href="/distro-reviews" className="card p-4 hover:bg-[#242938]">
                  <h3 className="text-xl font-bold">Distro Reviews</h3>
                </Link>
                <Link href="/tips-tricks" className="card p-4 hover:bg-[#242938]">
                  <h3 className="text-xl font-bold">Tips & Tricks</h3>
                </Link>
                <Link href="/news" className="card p-4 hover:bg-[#242938]">
                  <h3 className="text-xl font-bold">News</h3>
                </Link>
              </div>
            </div>

            {/* Popular Posts Sidebar */}
            <div className="w-1/4 pl-8">
              <h2 className="text-xl font-bold mb-4">Popular Posts</h2>
              <div className="space-y-4">
                <Link href="/post/1" className="block text-gray-400 hover:text-white">
                  How to Customize Your Linux Desktop
                </Link>
                <Link href="/post/2" className="block text-gray-400 hover:text-white">
                  Understanding Linux File Permissions
                </Link>
                <Link href="/post/3" className="block text-gray-400 hover:text-white">
                  The Best Linux Distros for Beginners in 2023
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 