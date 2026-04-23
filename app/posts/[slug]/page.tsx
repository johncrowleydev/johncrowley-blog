import Link from 'next/link';
import ThemeToggle from '@/app/theme-toggle';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | John Crowley`,
    description: post.excerpt
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="shell article-shell">
      <div className="article-topbar">
        <Link href="/" className="back-link">← Publication home</Link>
        <div className="article-topbar-right">
          <div className="article-topbar-meta">
            <span className="category-chip inline-chip">{post.category}</span>
            <p className="post-meta">{post.date} · {post.readingTime}</p>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <article className="article-layout">
        <header className="article-header">
          <p className="section-kicker">Feature</p>
          <h1 className="article-title">{post.title}</h1>
          <p className="article-dek">{post.excerpt}</p>
        </header>

        <div className="article-body markdown" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </main>
  );
}
