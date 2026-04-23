import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'John Crowley — Systems, Software, Science & Art',
  description: 'A publication-style personal site featuring in-depth articles on programming, AI, engineering, mathematics, photography, and music.',
  metadataBase: new URL('https://johncrowleydev.github.io/johncrowley-blog/')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
