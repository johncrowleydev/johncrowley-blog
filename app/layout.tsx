import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'John Crowley — Systems, Software & AI',
  description: 'An editorial-style technical publication covering AI tooling, software systems, and practical engineering workflows.',
  metadataBase: new URL('https://johncrowleydev.github.io/johncrowley-blog/')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
