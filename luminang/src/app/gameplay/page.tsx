import Link from 'next/link';
import { ArrowLeft, User, Settings } from 'lucide-react';

export default function GameplayPage() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Using an Iframe or typical game container approach since it's full screen */}
      <div className="w-full h-full relative">
        <div className="absolute inset-0 bg-[url('/images/loading-game.jpg')] bg-cover bg-center opacity-20 animate-pulse" />

        {/* HUD / Navigation Overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-50 pointer-events-none">
          {/* Back to Dashboard */}
          <Link href="/dashboard" className="pointer-events-auto flex items-center gap-3 text-white/50 hover:text-amber-400 transition-colors group">
            <div className="p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10 group-hover:border-amber-400/50 transition-colors">
              <ArrowLeft size={20} />
            </div>
            <span className="font-serif tracking-widest text-sm font-bold">EXIT TO MAP</span>
          </Link>

          {/* Quick Profile Access */}
          <div className="pointer-events-auto flex gap-3">
            <Link href="/dashboard" className="p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10 text-white/50 hover:text-amber-400 hover:border-amber-400/50 transition-colors" title="My Profile">
              <User size={20} />
            </Link>
            <button className="p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10 text-white/50 hover:text-amber-400 hover:border-amber-400/50 transition-colors" title="Settings">
              <Settings size={20} />
            </button>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 pointer-events-none">
          {/* Logo only, no text */}
          <h1 className="text-6xl text-amber-500 font-serif tracking-[0.2em] opacity-30 select-none">LUMINANG</h1>
        </div>
      </div>
    </div>
  );
}