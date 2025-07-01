"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Game from "@/components/Game";

export default function Homepage() {
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const gameRef = useRef<{ toggleFullscreen: () => void }>(null);
  const shareUrl = "https://fundation.vercel.app/";

  const handlePlayGame = () => {
    setIsGameLoaded(true);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      "Check out this awesome Financial Tycoon 8-bit game! 🎮💰 Master the art of financial management in this retro-style game. #IndieGame #Tycoon #8bit #FinancialGame"
    );
    const url = encodeURIComponent(shareUrl);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  const handleFullscreen = () => {
    gameRef.current?.toggleFullscreen();
  };

  const copyToClipboard = async () => {
    try {
      const shareText = `Check out this awesome Financial Tycoon 8-bit game! 🎮💰\n\nMaster the art of financial management in this retro-style tycoon game. Build your business empire and become the ultimate financial tycoon!\n\n${shareUrl}\n\n#IndieGame #Tycoon #8bit #FinancialGame`;
      await navigator.clipboard.writeText(shareText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = `Check out this awesome Financial Tycoon 8-bit game! 🎮💰\n\nMaster the art of financial management in this retro-style game.\n\n${shareUrl}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#d1d1d1]">
      <div className="bg-[#d1d1d1] border-0 border-[#AC5654]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-[#221C1C] rounded-lg overflow-hidden">
                <div className="aspect-video bg-[#221C1C] border-2 border-[#AC5654] relative">
                  {!isGameLoaded ? (
                    // Play button and preview
                    <div
                      className="w-full h-full relative group cursor-pointer"
                      onClick={handlePlayGame}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-[#464141] to-[#221C1C] flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-32 h-32 bg-[#AC5654] rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <span className="text-[#F5F0F6] text-6xl">💰</span>
                          </div>
                          <h3 className="text-[#F5F0F6] text-xl font-mono font-bold mb-2">
                            Fundation.game
                          </h3>
                          <p className="text-[#F5F0F6] opacity-80 text-sm font-mono mb-4">
                            Click to play game
                          </p>
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#AC5654] rounded-full shadow-lg group-hover:scale-110 transition-transform">
                            <svg
                              className="w-6 h-6 text-[#F5F0F6] ml-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full overflow-hidden">
                      <Game ref={gameRef} />
                    </div>
                  )}
                </div>

                <div className="p-4 bg-[#464141] flex flex-col sm:flex-row sm:justify-between items-center gap-2">
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={handlePlayGame}
                      className={`flex-grow px-4 py-2 rounded font-mono text-sm transition-colors ${
                        !isGameLoaded
                          ? "bg-[#AC5654] text-[#F5F0F6] hover:bg-opacity-80"
                          : "bg-[#221C1C] text-[#F5F0F6] hover:bg-[#AC5654]"
                      }`}
                    >
                      {!isGameLoaded ? "▶ Play" : "Playing..."}
                    </button>
                    <button
                      onClick={() => setIsGameLoaded(false)}
                      className="flex-grow px-4 py-2 bg-[#221C1C] text-[#F5F0F6] rounded font-mono text-sm hover:bg-[#AC5654] transition-colors"
                      disabled={!isGameLoaded}
                    >
                      🔄 Restart
                    </button>
                  </div>
                  <button
                    onClick={handleFullscreen}
                    className="w-full sm:w-auto px-4 py-2 bg-[#221C1C] text-[#F5F0F6] rounded font-mono text-sm hover:bg-[#AC5654] transition-colors"
                    disabled={!isGameLoaded}
                  >
                    ⛶ Fullscreen
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-[#221C1C] rounded-lg p-6">
                <h1 className="text-2xl font-bold text-[#F5F0F6] mb-2 font-mono">
                  Fundation.game
                </h1>
                <p className="text-[#AC5654] text-sm mb-4 font-mono">
                  by Betty
                </p>

                <div className="mb-6">
                  <p className="text-[#F5F0F6] text-sm leading-relaxed">
                    Master the art of financial management in this retro-style
                    2D tycoon game. Build your business empire, manage
                    resources, and make strategic decisions to become the
                    ultimate financial tycoon!
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[#F5F0F6] opacity-80 text-sm">
                      Genre:
                    </span>
                    <span className="text-[#AC5654] text-sm font-mono">
                      Tycoon/Strategy
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F5F0F6] opacity-80 text-sm">
                      Platform:
                    </span>
                    <span className="text-[#AC5654] text-sm font-mono">
                      WebGL
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F5F0F6] opacity-80 text-sm">
                      Style:
                    </span>
                    <span className="text-[#AC5654] text-sm font-mono">
                      2D 8-bit
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F5F0F6] opacity-80 text-sm">
                      Status:
                    </span>
                    <span className="text-[#AC5654] text-sm font-mono">
                      {isGameLoaded ? "Currently Playing" : "In Development"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePlayGame}
                  className="w-full bg-[#AC5654] text-[#F5F0F6] py-3 px-4 rounded font-mono font-bold hover:bg-opacity-80 transition-colors mb-4"
                >
                  {!isGameLoaded ? "Play in Browser" : "Game Active"}
                </button>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-[#464141] text-[#F5F0F6] text-xs rounded font-mono">
                    tycoon
                  </span>
                  <span className="px-2 py-1 bg-[#464141] text-[#F5F0F6] text-xs rounded font-mono">
                    8-bit
                  </span>
                  <span className="px-2 py-1 bg-[#464141] text-[#F5F0F6] text-xs rounded font-mono">
                    finance
                  </span>
                  <span className="px-2 py-1 bg-[#464141] text-[#F5F0F6] text-xs rounded font-mono">
                    strategy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-[#464141] rounded-lg p-6">
          <h3 className="text-[#f5f5f5] font-mono text-lg mb-4 text-center">
            🎥 Gameplay Walkthrough
          </h3>
          <div className="aspect-video relative">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg border-2 border-[#AC5654]"
              src="https://www.youtube.com/embed/ekBGEGY_2WI"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  "/photo1.png",
                  "/photo2.png",
                  "/photo3.png",
                  "/photo4.png",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="aspect-video bg-[#464141] rounded-lg flex items-center justify-center border border-[#AC5654] overflow-hidden relative"
                  >
                    <Image
                      src={src}
                      alt={`Screenshot ${i + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-[#464141] rounded-lg p-6">
                <div className="prose prose-sm max-w-none">
                  <p className="text-[#F5F0F6] mb-4">
                    Welcome to{" "}
                    <strong className="text-[#AC5654]">Fundation.game</strong>,
                    a retro-style business simulation game where every financial
                    decision matters!
                  </p>

                  <h3 className="text-[#AC5654] font-mono text-lg mb-2">
                    🎮 Gameplay Features
                  </h3>
                  <ul className="text-[#F5F0F6] space-y-1 mb-4">
                    <li>• Manage multiple staff and game production</li>
                    <li>
                      • Make strategic financial decisions that impact your
                      studio
                    </li>
                    <li>• Unlock new business opportunities as you grow</li>
                    <li>• Experience authentic 8-bit pixel art</li>
                  </ul>

                  <h3 className="text-[#AC5654] font-mono text-lg mb-2">
                    💼 Master Financial Management
                  </h3>
                  <p className="text-[#F5F0F6] mb-4">
                    From humble beginnings to financial domination, it&apos;s all in
                    your hands. Master the art of balancing risk and reward,
                    optimize your cash flow, and implement rock-solid business
                    practices to forge an unstoppable empire.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 lg:row-span-2 self-start">
            <div className="flex flex-col gap-6">
              <div className="bg-[#464141] rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#F5F0F6] mb-4 font-mono">
                  Developer
                </h3>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#AC5654] rounded-full flex items-center justify-center mr-3">
                    <span className="text-[#F5F0F6] text-xl">👨‍💻</span>
                  </div>
                  <div>
                    <p className="text-[#F5F0F6] font-mono font-bold">
                      Betty Studio
                    </p>
                    <p className="text-[#F5F0F6] opacity-60 text-sm">
                      Indie Game Developer
                    </p>
                  </div>
                </div>
                <p className="text-[#F5F0F6] text-sm">
                  Passionate about creating engaging financial simulation games
                  with a retro aesthetic.
                </p>
              </div>

              <div className="bg-[#464141] rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#F5F0F6] mb-4 font-mono">
                  Controls
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#F5F0F6] opacity-80">
                      Navigate Menus:
                    </span>
                    <span className="text-[#AC5654] font-mono">
                      Mouse Click
                    </span>
                  </div>
                  <div className="flex justify-between"></div>
                  <div className="flex justify-between">
                    <span className="text-[#F5F0F6] opacity-80">
                      Fullscreen:
                    </span>
                    <span className="text-[#AC5654] font-mono">F11</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#464141] rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#F5F0F6] mb-4 font-mono">
                  Share
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={shareOnTwitter}
                    className="flex-1 bg-[#221C1C] text-[#F5F0F6] py-2 px-3 rounded text-sm hover:bg-[#1DA1F2] hover:text-white transition-colors flex items-center justify-center gap-1"
                    title="Share on Twitter"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Twitter
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className={`flex-1 py-2 px-3 rounded text-sm transition-colors flex items-center justify-center gap-1 ${
                      copySuccess
                        ? "bg-green-600 text-white"
                        : "bg-[#221C1C] text-[#F5F0F6] hover:bg-[#AC5654]"
                    }`}
                    title="Copy full share message"
                  >
                    {copySuccess ? (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                    )}
                    {copySuccess ? "Copied!" : "Copy Message"}
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-[#221C1C]">
                  <p className="text-[#F5F0F6] opacity-60 text-xs font-mono mb-2">
                    Tip: Copy the message and paste it on your favorite social
                    media platform
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const whatsappText = encodeURIComponent(
                          `Check out this awesome Financial Tycoon 8-bit game! 🎮💰\n\nMaster the art of financial management in this retro-style game.\n\n${shareUrl}`
                        );
                        window.open(
                          `https://wa.me/?text=${whatsappText}`,
                          "_blank"
                        );
                      }}
                      className="w-full bg-[#221C1C] text-[#F5F0F6] py-1 px-2 rounded text-xs hover:bg-[#25D366] hover:text-white transition-colors flex items-center justify-center gap-1"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488" />
                      </svg>
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
