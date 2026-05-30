import React from 'react';

// Studio живёт вне [locale], поэтому ей нужен собственный html/body
// (корневой src/app/layout.tsx — pass-through, а html/body отдаёт [locale]/layout.tsx).
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
