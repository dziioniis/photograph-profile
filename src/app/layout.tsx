import React from 'react';
import type { Metadata } from 'next';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Photographer | Professional Photography & Videography',
  description:
    'Professional photographer specializing in weddings, portraits, and family photography. Capturing your precious moments with timeless elegance.',
  keywords: [
    'photographer',
    'wedding photography',
    'portrait photography',
    'family photography',
    'videography',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
