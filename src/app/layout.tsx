import React from 'react';

// This root layout is a pass-through
// The actual layout with providers, header, and footer is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
