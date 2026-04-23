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
    <main className="shell post-shell">
      <Link href="/" className="back-link">← Back to home</Link>
      <article className="article">
        <header className="article-header">
          <p className="post-meta">{post.date} · {post.readingTime}</p>
          <h1>{post.title}</h1>
          <p className="lede">{post.excerpt}</p>
        </header>
        <div className="markdown" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </main>
  );
}
