import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Studio Apen',
  description: 'Luxury prompt and image management for high jewelry visual generation.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-canvas text-ink font-sans`}>
        <Header />
        <main className="min-h-screen px-4 pb-24 pt-20 md:px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
