'use client';

import { Play } from 'lucide-react';
import { useState } from 'react';

const REGIONS = [
  {
    id: 1,
    name: 'CEBUANO',
    placeName: "Magellan's Cross",
    location: "Cebu City, Visayas",
    synopsis: "Guardian of the Tide. Help Rajah protect the Cebuano Crystal from the Tide Thief as the ocean itself obeys the ancient trade dialects.",
    color: 'from-blue-600/30',
    image: '/images/image.png'
  },
  {
    id: 2,
    name: 'ILOCANO',
    placeName: "Calle Crisologo",
    location: "Vigan, Ilocos Sur",
    synopsis: "The Echoes of Vigan. Learn from Apo Lakay to survive the Stone Smuggler's wrath. Every phrase is a stone in the wall of your defense.",
    color: 'from-amber-600/30',
    image: '/images/image.png'
  },
  {
    id: 3,
    name: 'HILIGAYNON',
    placeName: "The Ruins",
    location: "Talisay, Negros Occidental",
    synopsis: "River of Remembrance. Walk with the Balyan and face the Flood Baron. Discover that words are not just sounds, but a flow that binds families together.",
    color: 'from-pink-600/30',
    image: '/images/image.png'
  },
  {
    id: 4,
    name: 'BICOLANO',
    placeName: "Cagsawa Ruins",
    location: "Albay, Bicol",
    synopsis: "Shadow of Mayon. Master the tone of respect with Tiya Nena and Lina to calm the enrages of Bakunawa and the perfect cone.",
    color: 'from-orange-600/30',
    image: '/images/image.png'
  },
  {
    id: 5,
    name: 'MARANAO',
    placeName: "Torogan Royal House",
    location: "Lanao del Sur, Mindanao",
    synopsis: "The Darangen Epic. Follow Onor into the royal courts to banish the Walo-Walo and protect the memories woven into the language of the lake.",
    color: 'from-emerald-600/30',
    image: '/images/image.png'
  }
];

export function GallerySection() {
  const [hoveredRegion, setHoveredRegion] = useState<typeof REGIONS[0] | null>(null);

  return (
    <section id="gallery" className="py-24 bg-black relative overflow-hidden" aria-labelledby="gallery-heading">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="section-container relative z-10">
        <h2 id="gallery-heading" className="text-amber-400 font-serif text-6xl text-center mb-4 tracking-wider">
          GALLERY
        </h2>
        <p className="text-gray-500 text-center mb-16 font-light max-w-2xl mx-auto italic">
          "Sa bawat wika, may kwento. Sa bawat kwento, may kapangyarihan."
        </p>

        {/* Video/Preview Area */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-amber-600/30 shadow-[0_0_50px_rgba(217,119,6,0.1)]">

            {/* Default Video Player - shown when no region is selected */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${hoveredRegion ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              {/* YouTube Embed */}
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/SpQpWCcNIlg?si=5tW4MFzC29ANAd6y"
                title="Luminang Cinematic Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
                <p className="text-amber-400 font-serif text-2xl mb-1 tracking-wide uppercase">Cinematic Trailer</p>
                <p className="text-gray-400 text-sm">
                  Experience the journey • Click a region below to preview
                </p>
              </div>
            </div>

            {/* Hovered Region Display */}
            {hoveredRegion && (
              <div className="absolute inset-0 animate-in fade-in duration-500">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={hoveredRegion.image}
                    alt={hoveredRegion.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${hoveredRegion.color} via-black/40 to-black opacity-80`} />
                </div>

                {/* Close Button - Return to Video */}
                <button
                  onClick={() => setHoveredRegion(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 hover:bg-black/80 border border-amber-500/50 hover:border-amber-400 rounded-full flex items-center justify-center transition-all duration-300 group"
                  aria-label="Return to trailer"
                  title="Back to trailer"
                >
                  <svg
                    className="w-5 h-5 text-amber-400 group-hover:text-amber-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-black via-black/60 to-transparent">
                  <div className="max-w-3xl">
                    <span className="text-xs text-amber-500/80 font-bold tracking-[0.2em] uppercase mb-2 block">
                      {hoveredRegion.location}
                    </span>
                    <h3 className="text-white font-serif text-5xl mb-2 tracking-wider text-amber-400">
                      {hoveredRegion.name}
                    </h3>
                    <p className="text-amber-200/60 text-sm mb-4 font-medium uppercase tracking-widest">
                      {hoveredRegion.placeName}
                    </p>

                    <p className="text-gray-200 text-lg leading-relaxed border-l-4 border-amber-600/50 pl-4 py-2">
                      {hoveredRegion.synopsis}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Single Row of Region Cards */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-4 flex-wrap" role="list">
            {REGIONS.map((region) => {
              const isSelected = hoveredRegion?.id === region.id;

              return (
                <div
                  key={region.id}
                  role="listitem"
                  className={`group relative w-[220px] bg-zinc-900 rounded-xl border overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-300 ${isSelected
                    ? 'border-amber-500 shadow-[0_10px_40px_rgba(217,119,6,0.5)] scale-105'
                    : 'border-amber-900/30 hover:border-amber-500/50 hover:shadow-[0_5px_20px_rgba(217,119,6,0.3)]'
                    }`}
                  tabIndex={0}
                  aria-label={`Preview ${region.name}`}
                  onClick={() => setHoveredRegion(region)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setHoveredRegion(region);
                    }
                  }}
                >
                  {/* Image Section */}
                  <div className="relative w-full h-[120px]">
                    <img
                      src={region.image}
                      alt={region.name}
                      className={`w-full h-full object-cover transition-all duration-300 ${isSelected ? 'opacity-100 brightness-105' : 'opacity-70'
                        }`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-b ${region.color} via-black/40 to-black transition-opacity duration-300 ${isSelected ? 'opacity-40' : 'opacity-60'
                      }`} />

                    {/* Selection Indicator on Image */}
                    <div className={`absolute inset-0 border-2 transition-all duration-300 ${isSelected ? 'border-amber-400/70' : 'border-transparent'
                      }`} />
                  </div>

                  {/* Text Content - No Synopsis */}
                  <div className="p-3 bg-zinc-900">
                    <span className="text-[8px] text-amber-500/80 font-bold tracking-[0.15em] uppercase mb-1 block">
                      {region.location}
                    </span>

                    <h3 className={`font-serif text-base mb-1 tracking-wider transition-all duration-300 ${isSelected ? 'text-amber-400' : 'text-white'
                      }`}>
                      {region.name}
                    </h3>

                    <p className="text-amber-200/60 text-[9px] font-medium uppercase tracking-widest">
                      {region.placeName}
                    </p>
                  </div>

                  {/* Bottom Accent Bar */}
                  <div className={`absolute inset-x-0 bottom-0 h-1 bg-amber-500 transition-all duration-300 ${isSelected ? 'scale-x-100' : 'scale-x-0'
                    } origin-left`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
