import { SITE_CONFIG } from '@/lib/constants';
import Link from 'next/link';
import { Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gold-500 rounded" />
              <span className="text-gold-500 font-serif text-xl font-bold">
                LUMINANG
              </span>
            </div>
         <p className="text-sm text-gray-400 mb-4">
            © 2026 {SITE_CONFIG.name}. All rights reserved.
            </p>
            <p className="text-sm text-gray-400">
              {SITE_CONFIG.email}
            </p>
          </div>
          
          <div>
            <h3 className="text-gold-500 font-semibold mb-4">SUPPORT</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-gold-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gold-500 font-semibold mb-4">SOCIAL</h3>
            <div className="flex gap-4">
              <Link href="https://instagram.com" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="https://youtube.com" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Youtube className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}