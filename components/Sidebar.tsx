'use client';

import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const gameCategories = [
    { name: 'All Games', count: 12 },
    { name: 'Adventure', count: 4 },
    { name: 'Puzzle', count: 3 },
    { name: 'Racing', count: 2 },
    { name: 'Action', count: 3 },
  ];

  const recentGames = [
    'Space Explorer',
    'Puzzle Master',
    'Racing Thunder',
    'Cosmic Journey',
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-20 left-4 z-50 bg-[#AC5654] text-[#F5F0F6] p-2 rounded-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`fixed md:relative top-0 left-0 h-full w-64 bg-[#464141] transform transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-6 pt-20 md:pt-6">
          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-[#F5F0F6] font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {gameCategories.map((category) => (
                <li key={category.name}>
                  <button className="flex justify-between items-center w-full text-left px-3 py-2 rounded-lg text-[#F5F0F6] hover:bg-[#AC5654] transition-colors">
                    <span>{category.name}</span>
                    <span className="text-sm opacity-60">({category.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Games */}
          <div className="mb-8">
            <h3 className="text-[#F5F0F6] font-semibold mb-4">Recently Played</h3>
            <ul className="space-y-2">
              {recentGames.map((game) => (
                <li key={game}>
                  <button className="w-full text-left px-3 py-2 rounded-lg text-[#F5F0F6] hover:bg-[#AC5654] transition-colors text-sm">
                    {game}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="bg-[#221C1C] rounded-lg p-4">
            <h3 className="text-[#F5F0F6] font-semibold mb-3">Your Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#F5F0F6]">
                <span>Games Played:</span>
                <span className="text-[#AC5654]">8</span>
              </div>
              <div className="flex justify-between text-[#F5F0F6]">
                <span>Time Played:</span>
                <span className="text-[#AC5654]">4h 32m</span>
              </div>
              <div className="flex justify-between text-[#F5F0F6]">
                <span>Favorite:</span>
                <span className="text-[#AC5654]">Puzzle</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}