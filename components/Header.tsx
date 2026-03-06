import Link from 'next/link';

const links = [
  { href: '/workshop', label: 'Workshop' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/collection', label: 'Collection' }
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-black/10 bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:px-6">
        <h1 className="font-serif text-2xl">Studio Apen</h1>
        <nav className="flex items-center gap-5 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-champagne transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
