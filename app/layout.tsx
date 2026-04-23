import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'John Crowley — Notes on AI, Code, and Systems',
  description: 'A clean markdown-powered blog built with Next.js and TypeScript.',
  metadataBase: new URL('https://johncrowleydev.github.io/johncrowley-blog/')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
