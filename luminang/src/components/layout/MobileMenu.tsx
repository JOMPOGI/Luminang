'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface MobileMenuProps {
  onNavigate: (sectionId: string) => void;
}

export function MobileMenu({ onNavigate }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const router = useRouter();

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-300 hover:text-gold-500 transition-colors p-2"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 top-16"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        >
          <nav className="bg-zinc-900 border-b border-zinc-800 p-6" onClick={(e) => e.stopPropagation()}>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="text-gray-300 hover:text-gold-500 transition-colors text-lg w-full text-left font-serif"
                >
                  HOME
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('gallery')}
                  className="text-gray-300 hover:text-gold-500 transition-colors text-lg w-full text-left font-serif"
                >
                  GALLERY
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="text-gray-300 hover:text-gold-500 transition-colors text-lg w-full text-left font-serif"
                >
                  ABOUT
                </button>
              </li>
              <li className="pt-4 border-t border-zinc-800 space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link href={isAdmin ? "/admin" : "/dashboard"} onClick={() => setIsOpen(false)}>
                      <Button variant="secondary" className="w-full font-bold text-amber-500 border-amber-600">
                        {isAdmin ? "ADMIN CONSOLE" : "MY JOURNEY"}
                      </Button>
                    </Link>
                    <Button
                      variant="primary"
                      className="w-full font-bold"
                      onClick={handleLogout}
                    >
                      LOG OUT
                    </Button>
                  </>
                ) : (
                  <Link href="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" className="w-full font-bold">
                      LOG IN / SIGN UP
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
