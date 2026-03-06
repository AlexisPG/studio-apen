'use client';

import Link from 'next/link';
import { useSessionStore } from '@/store/sessionStore';

const links = [
  { href: '/workshop', label: 'Workshop' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/collection', label: 'Collection' }
];

export default function Header() {
  const togglePromptLibrary = useSessionStore((state) => state.togglePromptLibrary);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-black/10 bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:px-6">
        <h1 className="font-serif text-2xl">Studio Apen</h1>
        <nav className="flex items-center gap-5 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-champagne">
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={togglePromptLibrary}
            className="inline-flex items-center gap-1 rounded border border-black/20 px-2.5 py-1.5 text-xs transition hover:border-champagne hover:text-champagne"
            aria-label="Open prompt library"
          >
            ✦ <span>Prompts</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
