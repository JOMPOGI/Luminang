import { Button } from '@/components/ui';
import { Download, Play } from 'lucide-react';
import Link from 'next/link';

export function GameInfoSection() {

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black via-amber-950/20 to-black">
      <div className="section-container">
        <h2 className="text-amber-400 font-serif text-5xl text-center mb-12">
          ABOUT THIS GAME
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column - Description */}
          <div>
            <p className="text-gray-200 mb-6 leading-relaxed">
              Embark on an epic journey across the mystical islands of the Philippine archipelago.
              As the chosen heir, you will explore ancient ruins, decode forgotten languages, and
              unlock the secrets of a civilization lost to time.
            </p>

            <p className="text-gray-200 mb-6 leading-relaxed">
              Discover hidden temples in misty mountains, navigate crystal-clear lagoons, and
              traverse lush jungles where every step reveals a new mystery. Master regional
              dialects to communicate with spirits, solve environmental puzzles, and piece
              together the story of your ancestors.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-gradient-to-br from-amber-900/30 to-transparent p-4 rounded-lg border border-amber-700/30">
                <h3 className="text-amber-300 font-semibold mb-2">🗺️ VAST HORIZONS</h3>
                <p className="text-gray-300 text-sm">
                  Explore five stunning regions
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-900/30 to-transparent p-4 rounded-lg border border-amber-700/30">
                <h3 className="text-amber-300 font-semibold mb-2">💬 LANGUAGE PUZZLES</h3>
                <p className="text-gray-300 text-sm">
                  Learn Filipino dialects
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-900/30 to-transparent p-4 rounded-lg border border-amber-700/30">
                <h3 className="text-amber-300 font-semibold mb-2">🎨 AUTHENTIC ART</h3>
                <p className="text-gray-300 text-sm">
                  Traditional Filipino visuals
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-900/30 to-transparent p-4 rounded-lg border border-amber-700/30">
                <h3 className="text-amber-300 font-semibold mb-2">🎵 CULTURAL SOUNDS</h3>
                <p className="text-gray-300 text-sm">
                  Authentic Filipino music
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Play on Web */}
            <div className="bg-gradient-to-br from-amber-900/40 to-zinc-900 border-2 border-amber-600/50 rounded-xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 text-black fill-black ml-0.5" />
                </div>
                <h3 className="text-amber-300 font-bold text-xl">PLAY ON WEB</h3>
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Jump into the adventure right from your browser.
                No downloads needed—perfect for desktop and laptop.
              </p>

              {/* Desktop View: Launch Game */}
              <div className="hidden md:block">
                <Link href="/gameplay" target="_blank">
                  <Button
                    variant="primary"
                    className="w-full text-base font-bold"
                  >
                    LAUNCH GAME →
                  </Button>
                </Link>
              </div>

              {/* Mobile View: Disabled Button */}
              <div className="block md:hidden">
                <Button
                  variant="secondary"
                  className="w-full text-base font-bold border-amber-800 text-amber-800 cursor-not-allowed opacity-50"
                  disabled
                >
                  BEST ON DESKTOP
                </Button>
                <p className="text-[10px] text-amber-600/60 text-center mt-2 italic">
                  WebGL version is optimized for desktop browsers
                </p>
              </div>

              <p className="text-xs text-gray-400 text-center mt-3 hidden md:block">
                Opens in new tab • Best experienced with headphones
              </p>
            </div>

            {/* Install Mobile - Only show button on mobile */}
            <div className="bg-gradient-to-br from-zinc-900 to-amber-950/30 border-2 border-amber-700/30 rounded-xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center shadow-lg">
                  <Download className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-amber-300 font-bold text-xl">INSTALL MOBILE</h3>
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Take the full adventure with you! Download for iOS and Android
                to explore all five worlds offline.
              </p>

              {/* Mobile View: Download Button */}
              <div className="block md:hidden">
                <Button variant="secondary" className="w-full text-base font-bold border-amber-500 text-amber-400 hover:bg-amber-500">
                  DOWNLOAD NOW ↓
                </Button>
              </div>

              {/* Desktop View: Disabled Button */}
              <div className="hidden md:block">
                <Button
                  variant="secondary"
                  className="w-full text-base font-bold border-amber-700 text-amber-700 cursor-not-allowed opacity-50"
                  disabled
                >
                  AVAILABLE ON MOBILE
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-amber-800/50">
                <h4 className="text-amber-400 font-semibold mb-3">
                  INSTALLATION STEPS
                </h4>
                <ol className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-bold text-lg">1</span>
                    <span>Download APK</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-bold text-lg">2</span>
                    <span>Enable Unknown Sources</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-bold text-lg">3</span>
                    <span>Install and Play</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}