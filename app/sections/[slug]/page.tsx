import Link from 'next/link';
import ThemeToggle from '@/app/theme-toggle';
import { getPostsBySectionSlug, getSectionBySlug, SECTIONS } from '@/lib/posts';
import { withBasePath } from '@/lib/site';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return SECTIONS.map((section) => ({ slug: section.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const section = getSectionBySlug(slug);
  if (!section) return {};

  return {
    title: `${section.name} | The Crowley Review`,
    description: section.blurb
  };
}

export default async function SectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const section = getSectionBySlug(slug);
  if (!section) notFound();

  const posts = getPostsBySectionSlug(slug);

  return (
    <main className="shell section-shell">
      <div className="section-topbar">
        <Link href="/" className="back-link">← Front page</Link>
        <ThemeToggle />
      </div>

      <header className="section-hero">
        <p className="publication-kicker">The Crowley Review</p>
        <h1>{section.name}</h1>
        <p className="section-hero-copy">{section.blurb}</p>
      </header>

      <section className="section-post-list">
        {posts.map((post) => (
          <article key={post.slug} className="section-list-item">
            {post.image ? <img src={withBasePath(post.image)} alt={post.title} className="section-list-image" /> : null}
            <div>
              <p className="post-meta">{post.date} · {post.readingTime}</p>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <Link href={`/posts/${post.slug}`} className="text-link">Read article</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
