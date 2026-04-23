import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

const beats = [
  'AI and agentic software workflows',
  'Programming tools, infrastructure, and deployment systems',
  'Practical writing for technical operators and builders'
];

export default function HomePage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="shell publication-shell">
      <header className="masthead">
        <div>
          <p className="eyebrow">John Crowley</p>
          <h1 className="publication-title">Systems, Software & AI</h1>
        </div>
        <p className="masthead-copy">
          A publication-style site for clear, informative articles on AI tooling, software systems,
          and practical engineering workflows.
        </p>
      </header>

      <section className="home-grid">
        <div className="lead-column">
          {featured && (
            <article className="featured-story">
              <p className="section-kicker">Featured analysis</p>
              <p className="post-meta">{featured.date} · {featured.readingTime}</p>
              <h2>{featured.title}</h2>
              <p className="featured-excerpt">{featured.excerpt}</p>
              <Link href={`/posts/${featured.slug}`} className="text-link">Read the full article</Link>
            </article>
          )}

          <section className="story-list-block" id="latest">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker">Latest coverage</p>
                <h2>Recent articles</h2>
              </div>
              <p className="section-copy">
                Markdown-first publishing with a layout designed to feel like a technical publication,
                not a personal journal.
              </p>
            </div>

            <div className="story-list">
              {rest.map((post) => (
                <article key={post.slug} className="story-row">
                  <div>
                    <p className="post-meta">{post.date} · {post.readingTime}</p>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                  </div>
                  <Link href={`/posts/${post.slug}`} className="text-link">Open article</Link>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="sidebar-panel">
          <section>
            <p className="section-kicker">Coverage</p>
            <ul className="beat-list">
              {beats.map((beat) => (
                <li key={beat}>{beat}</li>
              ))}
            </ul>
          </section>

          <section className="sidebar-note">
            <p className="section-kicker">Publishing model</p>
            <p>
              Static Next.js build, TypeScript codebase, markdown source files, and GitHub Pages
              deployment through Actions.
            </p>
          </section>

          <section className="sidebar-note">
            <p className="section-kicker">Source</p>
            <a href="https://github.com/johncrowleydev/johncrowley-blog" target="_blank" rel="noreferrer" className="text-link">
              View repository
            </a>
          </section>
        </aside>
      </section>
    </main>
  );
}
