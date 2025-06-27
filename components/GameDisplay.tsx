'use client';

import { useState } from 'react';

interface Game {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  gameUrl: string;
  category: string;
}

const sampleGames: Game[] = [
  {
    id: 1,
    title: "Space Explorer",
    description: "Navigate through space and collect stars in this WebGL adventure",
    thumbnail: "/api/placeholder/300/200",
    gameUrl: "#",
    category: "Adventure"
  },
  {
    id: 2,
    title: "Puzzle Master",
    description: "Solve challenging puzzles with stunning 3D graphics",
    thumbnail: "/api/placeholder/300/200",
    gameUrl: "#",
    category: "Puzzle"
  },
  {
    id: 3,
    title: "Racing Thunder",
    description: "High-speed racing with realistic physics and graphics",
    thumbnail: "/api/placeholder/300/200",
    gameUrl: "#",
    category: "Racing"
  }
];

export default function GameDisplay() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const categories = ['All', 'Adventure', 'Puzzle', 'Racing'];
  
  const filteredGames = selectedCategory === 'All' 
    ? sampleGames 
    : sampleGames.filter(game => game.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-[#F5F0F6]">Game Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-[#AC5654] text-[#F5F0F6]'
                  : 'bg-[#464141] text-[#F5F0F6] hover:bg-[#AC5654]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="bg-[#464141] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedGame(game)}
          >
            <div className="w-full h-48 bg-[#221C1C] flex items-center justify-center">
              <div className="w-16 h-16 bg-[#AC5654] rounded-full flex items-center justify-center">
                <span className="text-[#F5F0F6] text-2xl">🎮</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-[#F5F0F6]">{game.title}</h3>
              <p className="text-[#F5F0F6] opacity-80 text-sm mb-3">{game.description}</p>
              <div className="flex justify-between items-center">
                <span className="px-2 py-1 bg-[#AC5654] text-[#F5F0F6] text-xs rounded">
                  {game.category}
                </span>
                <button className="text-[#AC5654] hover:text-[#F5F0F6] font-medium">
                  Play Now →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Game Modal */}
      {selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#464141] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-[#F5F0F6]">{selectedGame.title}</h3>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="text-[#F5F0F6] hover:text-[#AC5654] text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="w-full h-64 bg-[#221C1C] rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#AC5654] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-[#F5F0F6] text-3xl">🎮</span>
                  </div>
                  <p className="text-[#F5F0F6]">Game Preview</p>
                </div>
              </div>
              <p className="text-[#F5F0F6] mb-4">{selectedGame.description}</p>
              <div className="flex gap-4">
                <button className="flex-1 bg-[#AC5654] text-[#F5F0F6] py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors">
                  Play Full Screen
                </button>
                <button className="px-4 py-2 bg-[#221C1C] text-[#F5F0F6] rounded-lg hover:bg-opacity-80 transition-colors">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}