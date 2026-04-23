import Link from 'next/link';
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
        <Link href="/" className="back-link">← All articles</Link>
        <p className="post-meta">{post.date} · {post.readingTime}</p>
      </div>

      <article className="article-layout">
        <header className="article-header">
          <p className="section-kicker">Analysis</p>
          <h1 className="article-title">{post.title}</h1>
          <p className="article-dek">{post.excerpt}</p>
        </header>

        <div className="article-body markdown" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </main>
  );
}
