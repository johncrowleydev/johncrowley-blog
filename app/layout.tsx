import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'John Crowley — Systems, Software, Science & Art',
  description: 'A publication-style personal site featuring in-depth articles on programming, AI, engineering, mathematics, photography, and music.',
  metadataBase: new URL('https://johncrowleydev.github.io/johncrowley-blog/')
};

const themeScript = `
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var theme = saved === 'dark' || saved === 'light' ? saved : preferred;
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
