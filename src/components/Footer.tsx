import Link from 'next/link';
import { Github, Twitter, Rss } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">The Terminal Times</h3>
            <p className="text-gray-400 mb-4">
              Your trusted source for Linux news, tutorials, distribution reviews, and command-line tips.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="/rss"
                className="text-gray-400 hover:text-green-500 transition-colors"
              >
                <Rss className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/tutorials" 
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link 
                  href="/news" 
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  News
                </Link>
              </li>
              <li>
                <Link 
                  href="/distro-reviews" 
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Distro Reviews
                </Link>
              </li>
              <li>
                <Link 
                  href="/tips-tricks" 
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Tips & Tricks
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} The Terminal Times. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link 
                href="/privacy" 
                className="text-gray-400 hover:text-green-500 transition-colors text-sm"
              >
                Privacy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-green-500 transition-colors text-sm"
              >
                Terms
              </Link>
              <Link 
                href="/sitemap" 
                className="text-gray-400 hover:text-green-500 transition-colors text-sm"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 