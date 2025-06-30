import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t-2 border-transparent mt-12 bg-[#AC5654]">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          <div>
            <h4 className="text-[#F5F0F6] font-bold mb-3 font-mono">itch.game</h4>
            <ul className="space-y-1">
              <li><Link href="/" className="text-[#F5F0F6] opacity-80 hover:text-[#AC5654] font-mono">Game</Link></li>
              <li><Link href="/developer-logs" className="text-[#F5F0F6] opacity-80 hover:text-[#AC5654] font-mono">Log Developer</Link></li>
              <li><a href="#" className="text-[#F5F0F6] opacity-80 hover:text-[#AC5654] font-mono">Tentang</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#F5F0F6] font-bold mb-3 font-mono">Pengembangan</h4>
            <ul className="space-y-1">
              <li>
                <a 
                  href="https://github.com/jaysn/Hackonomics-website" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#F5F0F6] opacity-80 hover:text-[#AC5654] font-mono"
                >
                  Repository GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/jaysn/Hackonomics-website/issues" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#F5F0F6] opacity-80 hover:text-[#AC5654] font-mono"
                >
                  Laporkan Masalah
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/jaysn/Hackonomics-website/releases" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#F5F0F6] opacity-80 hover:text-[#AC5654] font-mono"
                >
                  Rilis
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#F5F0F6] font-bold mb-3 font-mono">Komunitas</h4>
            <ul className="space-y-1">
              <li><a href="#" className="text-[#F5F0F6] opacity-80 hover:text-[#AC5654] font-mono">Discord</a></li>
              <li><a href="#" className="text-[#F5F0F6] opacity-80 hover:text-[#AC5654] font-mono">Twitter</a></li>
              <li><a href="#" className="text-[#F5F0F6] opacity-80 hover:text-[#AC5654] font-mono">Masukan</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#F5F0F6] font-bold mb-3 font-mono">Dukungan</h4>
            <ul className="space-y-1">
              <li><a href="#" className="text-[#F5F0F6] opacity-80 hover:text-[#AC5654] font-mono">Kontak</a></li>
              <li><a href="#" className="text-[#F5F0F6] opacity-80 hover:text-[#AC5654] font-mono">Privasi</a></li>
              <li><a href="#" className="text-[#F5F0F6] opacity-80 hover:text-[#AC5654] font-mono">Syarat</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#221C1C] mt-6 pt-6 text-center">
          <p className="text-[#F5F0F6] opacity-60 font-mono text-xs">
            © 2024 Financial Tycoon 8-Bit - Pengembangan Game Open Source
          </p>
        </div>
      </div>
    </footer>
  );
}