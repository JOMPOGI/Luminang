'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';
import { useRouter, usePathname } from 'next/navigation';
import { MobileMenu } from './MobileMenu';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Global Header Component
 * 
 * Displays the main navigation, logo, and authentication controls.
 * Adapts to mobile and desktop viewports.
 * 
 * Key Features:
 * - Smooth scrolling to sections on the homepage.
 * - Dynamic "Login" vs "Profile" button based on AuthContext state.
 * - Mobile menu drawer for smaller screens.
 */
export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const scrollToSection = (sectionId: string) => {
    // If not on homepage, go to homepage first
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800">
      <nav className="section-container py-4" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="Luminang home">
            <div className="w-6 h-6 bg-gold-500 rounded" aria-hidden="true" />
            <span className="text-gold-500 font-serif text-xl font-bold">
              LUMINANG
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-300 hover:text-gold-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
              aria-label="Navigate to home section"
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-gray-300 hover:text-gold-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
              aria-label="Navigate to gallery section"
            >
              GALLERY
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-gold-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
              aria-label="Navigate to about section"
            >
              ABOUT
            </button>
            {/* Role Based Navigation */}
            {isAuthenticated && (
              <Link href={isAdmin ? "/admin" : "/dashboard"}>
                <button className="text-amber-500 hover:text-amber-300 transition-colors font-bold px-2 py-1">
                  {isAdmin ? "ADMIN CONSOLE" : "MY JOURNEY"}
                </button>
              </Link>
            )}
          </div>

          {/* Auth Button */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <Button
                onClick={logout}
                variant="secondary"
                className="text-sm border-amber-600 text-amber-500 hover:bg-amber-950"
              >
                LOG OUT
              </Button>
            ) : (
              <Link href="/auth">
                <Button variant="primary" className="text-sm">
                  LOG IN
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <MobileMenu onNavigate={scrollToSection} />
        </div>
      </nav>
    </header>
  );
}
