'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#AC5654] border-b-2 border-[#AC5654] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo on the left */}
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-[#F5F0F6] rounded flex items-center justify-center">
              <span className="text-[#AC5654] font-bold text-xl font-mono">F</span>
            </div> 
            <span className="ml-2 text-[#F5F0F6] text-lg font-bold font-mono">undation.game</span>
          </Link>

          {/* Navigation links on the right */}
          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-[#F5F0F6] hover:bg-[#8e3e3c] hover:text-[#F5F0F6] px-3 py-1 rounded transition-colors font-mono text-sm"
            >
              Game
            </Link>
            <Link
              href="/developer-logs"
              className="text-[#F5F0F6] hover:bg-[#8e3e3c] hover:text-[#F5F0F6] px-3 py-1 rounded transition-colors font-mono text-sm"
            >
              Log Developer
            </Link>
            <a
              href="https://github.com/UCYenyen/Hackonomics-website"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5F0F6] hover:bg-[#23272e] hover:text-[#F5F0F6] px-3 py-1 rounded transition-colors font-mono text-sm"
            >
              GitHub
            </a>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#F5F0F6] hover:text-[#8e3e3c]"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[#AC5654] pt-2 pb-3">
            <div className="space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-[#F5F0F6] hover:bg-[#8e3e3c] hover:text-[#F5F0F6] rounded font-mono text-sm"
              >
                Game
              </Link>
              <Link
                href="/developer-logs"
                className="block px-3 py-2 text-[#F5F0F6] hover:bg-[#8e3e3c] hover:text-[#F5F0F6] rounded font-mono text-sm"
              >
                Log Developer
              </Link>
              <a
                href="https://github.com/jaysn/Hackonomics-website"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-[#F5F0F6] hover:bg-[#23272e] hover:text-[#F5F0F6] rounded font-mono text-sm"
              >
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}