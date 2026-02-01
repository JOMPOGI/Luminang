'use client';

import { Button } from '@/components/ui';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock data for the journey - ALL UNLOCKED
const LEVELS = [
  {
    id: 1,
    name: "Cebuano",
    status: "active",
    progress: 100,
    placeName: "Magellan's Cross",
    location: "Cebu City, Visayas",
    synopsis: "Guardian of the Tide. Help Rajah protect the Cebuano Crystal from the Tide Thief as the ocean itself obeys the ancient trade dialects.",
    stars: 3
  },
  {
    id: 2,
    name: "Ilocano",
    status: "active",
    progress: 35,
    placeName: "Calle Crisologo",
    location: "Vigan, Ilocos Sur",
    synopsis: "The Echoes of Vigan. Learn from Apo Lakay to survive the Stone Smuggler's wrath. Every phrase is a stone in the wall of your defense.",
    stars: 1
  },
  {
    id: 3,
    name: "Hiligaynon",
    status: "active",
    progress: 0,
    placeName: "The Ruins",
    location: "Talisay, Negros Occidental",
    synopsis: "River of Remembrance. Walk with the Balyan and face the Flood Baron. Discover that words are not just sounds, but a flow that binds families together.",
    stars: 0
  },
  {
    id: 4,
    name: "Bicolano",
    status: "active",
    progress: 0,
    placeName: "Cagsawa Ruins",
    location: "Albay, Bicol",
    synopsis: "Shadow of Mayon. Master the tone of respect with Tiya Nena and Lina to calm the enrages of Bakunawa and the perfect cone.",
    stars: 0
  },
  {
    id: 5,
    name: "Maranao",
    status: "active",
    progress: 0,
    placeName: "Torogan Royal House",
    location: "Lanao del Sur, Mindanao",
    synopsis: "The Darangen Epic. Follow Onor into the royal courts to banish the Walo-Walo and protect the memories woven into the language of the lake.",
    stars: 0
  },
];

const LEADERBOARD = [
  { rank: 1, name: "Lakapati_99", region: "Visayas", progress: "100%" },
  { rank: 2, name: "Bathala_Main", region: "Luzon", progress: "98%" },
  { rank: 3, name: "Maria_Makiling", region: "Luzon", progress: "95%" },
  { rank: 4, name: "Tala_Star", region: "Mindanao", progress: "92%" },
  { rank: 5, name: "Apolaki_Sun", region: "Luzon", progress: "90%" },
];

import { useState, useEffect } from 'react';
import { Settings, X, User, Lock, Camera, Save, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

/**
 * User Dashboard Page
 * 
 * Protected route that serves as the player's main hub.
 * 
 * Security:
 * - Checks `isAuthenticated` from AuthContext.
 * - Redirects unauthenticated users to /auth.
 * 
 * Data Flow:
 * - Hydrates user state from AuthContext on mount.
 * - Manages local UI state for "Journey Map" selection.
 */
export default function DashboardPage() {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const { user: authUser, isAuthenticated, isLoading, logout: authLogout } = useAuth();
  const router = useRouter();
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isLoading, isAuthenticated, router]);

  const [user, setUser] = useState({
    username: authUser?.username || "Player_001",
    role: authUser?.role === 'admin' ? "Master Archivist" : "Novice explorer",
    avatar: "P1"
  });

  // Sync user from context when it loads
  useEffect(() => {
    if (authUser) {
      setUser(prev => ({
        ...prev,
        username: authUser.username,
        role: authUser.role === 'admin' ? "Master Archivist" : "Novice explorer"
      }));
    }
  }, [authUser]);

  return (
    <div className="min-h-screen bg-zinc-950 bg-[url('/images/map-bg.jpg')] bg-cover bg-fixed bg-center relative overflow-hidden">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0" />

      {/* Profile Settings Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 border border-amber-500/30 w-full max-w-md rounded-2xl p-6 shadow-2xl relative"
          >
            <button
              onClick={() => setProfileOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-serif text-amber-400 mb-6 flex items-center gap-2">
              <Settings size={24} /> Edit Profile
            </h2>

            <div className="space-y-6">
              {/* Avatar Change */}
              <div className="flex flex-col items-center">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg border-4 border-zinc-900">
                    {user.avatar}
                  </div>
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">Tap to change avatar</p>
              </div>

              {/* Username Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                  <User size={16} /> Username
                </label>
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                  <Lock size={16} /> New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <Button className="w-full gap-2 font-bold" onClick={() => setProfileOpen(false)}>
                <Save size={18} /> Save Changes
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="relative z-10 section-container max-w-7xl py-12 md:py-20 flex flex-col md:flex-row gap-12">

        {/* LEFT COLUMN: Leaderboard & Stats */}
        <div className="w-full md:w-1/3 space-y-8 order-2 md:order-1">
          {/* Profile Card */}
          <div className="bg-zinc-900/80 backdrop-blur-md border border-amber-500/30 rounded-2xl p-6 shadow-xl relative group">
            <button
              onClick={() => setProfileOpen(true)}
              className="absolute top-4 right-4 text-gray-500 hover:text-amber-400 transition-colors p-2 hover:bg-white/5 rounded-full"
              title="Edit Profile"
            >
              <Settings size={20} />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                {user.avatar}
              </div>
              <div>
                <h2 className="text-xl font-bold text-amber-300">{user.username}</h2>
                <p className="text-sm text-gray-400">{user.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-white">12,500</div>
                <div className="text-xs text-amber-500 uppercase">Score</div>
              </div>
              <div className="bg-black/40 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-white">20%</div>
                <div className="text-xs text-amber-500 uppercase">Progress</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-amber-800/30 flex justify-between items-center text-sm">
              {authUser?.role === 'admin' ? (
                <Link href="/admin" className="text-amber-500 hover:text-amber-300 transition-colors font-bold">
                  ADMIN CONSOLE →
                </Link>
              ) : (
                <div />
              )}
              <button
                onClick={authLogout}
                className="text-gray-400 hover:text-red-400 transition-colors"
                aria-label="Process logout"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-zinc-900/80 backdrop-blur-md border border-amber-500/30 rounded-2xl p-6 shadow-xl">
            <h3 className="text-amber-400 font-serif text-xl border-b border-amber-800/50 pb-4 mb-4 flex items-center gap-2">
              <span>🏆</span> TOP EXPLORERS
            </h3>
            <div className="space-y-3">
              {LEADERBOARD.map((player) => (
                <div key={player.rank} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`font-bold w-6 text-center ${player.rank <= 3 ? 'text-yellow-400' : 'text-gray-500'}`}>
                      {player.rank}
                    </span>
                    <div>
                      <p className="text-gray-200 font-medium text-sm">{player.name}</p>
                      <p className="text-xs text-gray-500">{player.region}</p>
                    </div>
                  </div>
                  <span className="text-amber-500 font-bold text-sm">{player.progress}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Journey Map */}
        <div className="w-full md:w-2/3 order-1 md:order-2">
          <div className="text-center mb-12">
            <h1 className="text-amber-400 font-serif text-4xl md:text-5xl drop-shadow-2xl mb-2">
              YOUR JOURNEY
            </h1>
            <p className="text-gray-400 text-sm md:text-base mb-2">
              All regions unlocked. Explore freely.
            </p>
            {/* Rule 1: Clear instructions for users */}
            <p className="text-amber-500/80 text-xs md:text-sm font-medium">
              {selectedLevelId
                ? '✓ Region selected. Click the button below to begin.'
                : '← Click any region card to select it'}
            </p>
          </div>

          <div className="relative min-h-[800px] flex flex-col items-center justify-start pt-10 space-y-16">
            {/* Connecting Line */}
            <div className="absolute top-0 bottom-0 w-2 bg-gradient-to-b from-amber-600/50 via-amber-900/30 to-transparent rounded-full left-1/2 -translate-x-1/2 z-0" />

            {LEVELS.map((level, index) => (
              <LevelNode
                key={level.id}
                level={level}
                index={index}
                isSelected={selectedLevelId === level.id}
                onSelect={() => setSelectedLevelId(level.id)}
              />
            ))}
          </div>

          {/* Floating Play Button */}
          <div className="fixed bottom-8 right-8 z-50 transition-opacity duration-300">
            {selectedLevelId ? (
              <Link href={`/gameplay?level=${selectedLevelId}`} target="_blank">
                <Button className="rounded-full h-16 w-16 md:w-auto md:px-8 shadow-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold border-4 border-amber-300 animate-bounce">
                  <span className="md:hidden">▶</span>
                  <span className="hidden md:inline">
                    START JOURNEY: {LEVELS.find(l => l.id === selectedLevelId)?.name.toUpperCase()} ►
                  </span>
                </Button>
              </Link>
            ) : (
              <Button disabled className="rounded-full h-16 w-16 md:w-auto md:px-8 shadow-xl bg-zinc-800 text-zinc-500 font-bold border-4 border-zinc-700 cursor-not-allowed">
                <span className="md:hidden">▶</span>
                <span className="hidden md:inline">CHOOSE A REGION</span>
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function LevelNode({ level, index, isSelected, onSelect }: { level: any, index: number, isSelected: boolean, onSelect: () => void }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative z-10 w-full flex ${isLeft ? 'justify-start md:justify-center' : 'justify-end md:justify-center'}`}
    >
      <div
        onClick={onSelect}
        className={`relative group w-full md:w-[450px] flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 px-4 md:px-0 cursor-pointer`}
      >

        {/* Node Circle */}
        <div className={`shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 flex items-center justify-center shadow-2xl 
          transition-all duration-300 z-20 relative
          ${isSelected
            ? 'bg-amber-600 border-white scale-110 shadow-amber-500/50'
            : 'bg-zinc-900 border-amber-500 group-hover:scale-110 group-hover:border-amber-400'
          }
        `}>

          {/* Icon instead of Number */}
          <MapPin size={32} className={`text-white drop-shadow-md transition-transform duration-300 ${isSelected ? 'scale-110' : ''}`} />

          {/* Selection Ring */}
          {isSelected && (
            <div className="absolute inset-[-8px] rounded-full border-2 border-white/50 animate-ping" />
          )}

          {/* Circular Progress Border - CSS Conic Gradient would be ideal here, simplified for now */}
          {level.progress > 0 && (
            <div className="absolute inset-[-4px] rounded-full border-4 border-amber-300 opacity-50 animate-pulse" />
          )}

          {/* Stars */}
          {level.stars > 0 && (
            <div className="absolute -top-3 flex gap-1 bg-black/80 px-2 py-0.5 rounded-full border border-amber-500/50">
              {[...Array(3)].map((_, i) => (
                <span key={i} className={`text-xs ${i < level.stars ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
              ))}
            </div>
          )}
        </div>

        <div className={`flex-1 bg-zinc-900/90 backdrop-blur-md border p-5 rounded-xl shadow-xl transition-all duration-200 transform
           ${isLeft ? 'text-left' : 'text-right'}
           ${isSelected ? 'border-amber-400 bg-zinc-800/90 scale-[1.02] shadow-amber-900/20' : 'border-amber-500/30 hover:border-amber-400 group-hover:scale-[1.02]'}
        `}>
          <div className={`flex flex-col ${isLeft ? 'items-start' : 'items-end'}`}>
            <span className="text-xs text-amber-500 font-bold tracking-widest uppercase mb-1">{level.placeName}</span>
            <h3 className="text-2xl font-serif font-bold text-white mb-1 group-hover:text-amber-300">{level.name}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
              <span>📍 {level.location}</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed max-w-xs mb-4">
              {level.synopsis}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full"
                style={{ width: `${level.progress}%` }}
              />
            </div>
            <div className={`mt-1 text-xs font-mono text-amber-400 w-full ${isLeft ? 'text-left' : 'text-right'}`}>
              {level.progress}% Complete
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}