import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

const highlights = [
  'Agentic coding experiments and workflows',
  'Practical notes on AI tooling and local infrastructure',
  'Programming, systems design, and developer operations'
];

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main className="shell">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">John Crowley</span>
          <h1>Notes on AI, code, and systems.</h1>
          <p className="lede">
            A professional markdown-first blog powered by Next.js static generation.
            Fast, simple, and easy to publish from GitHub.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#posts">Read the blog</a>
            <a className="button" href="https://github.com/johncrowleydev" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <div className="hero-card">
          <p className="card-label">Focus</p>
          <ul>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-header" id="posts">
        <div>
          <span className="eyebrow">Latest posts</span>
          <h2>Recent writing</h2>
        </div>
        <p className="section-copy">Markdown posts live in the repo, so publishing is just a commit.</p>
      </section>

      <section className="post-grid">
        {posts.map((post) => (
          <article key={post.slug} className="post-card">
            <p className="post-meta">{post.date} · {post.readingTime}</p>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <Link href={`/posts/${post.slug}`} className="text-link">Read article</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
