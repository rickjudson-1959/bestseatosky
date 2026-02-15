import type { Metadata } from 'next';
import { DM_Serif_Display, Source_Sans_3 } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Best Sea to Sky | Your Guide to Squamish, Whistler & Pemberton',
    template: '%s | Best Sea to Sky',
  },
  description:
    'Discover the best restaurants, hotels, adventures, and attractions across the Sea to Sky corridor. Curated guides for Squamish, Whistler, and Pemberton.',
  keywords: [
    'Sea to Sky',
    'Squamish',
    'Whistler',
    'Pemberton',
    'restaurants',
    'hotels',
    'hiking',
    'skiing',
    'things to do',
  ],
  openGraph: {
    title: 'Best Sea to Sky | Your Guide to the Corridor',
    description:
      'Discover the best restaurants, hotels, adventures, and attractions across the Sea to Sky corridor.',
    url: 'https://bestseatosky.com',
    siteName: 'Best Sea to Sky',
    locale: 'en_CA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${sourceSans.variable}`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
