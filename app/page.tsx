import Link from 'next/link';
import ThemeToggle from './theme-toggle';
import { getAllPosts, type Post } from '@/lib/posts';

const sections = [
  'Programming',
  'AI',
  'Engineering',
  'Science & Math',
  'Photography',
  'Music'
];

function groupByCategory(posts: Post[]) {
  return sections
    .map((category) => ({
      category,
      posts: posts.filter((post) => post.category === category).slice(0, 2)
    }))
    .filter((group) => group.posts.length > 0);
}

export default function HomePage() {
  const posts = getAllPosts();
  const [featured, second, ...rest] = posts;
  const categoryGroups = groupByCategory(posts);

  return (
    <main className="shell publication-shell">
      <header className="publication-header">
        <div className="brand-row">
          <p className="eyebrow">John Crowley</p>
          <div className="header-actions">
            <nav className="top-nav" aria-label="Sections">
              {sections.map((section) => (
                <a key={section} href={`#${section.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{section}</a>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>

        <div className="masthead">
          <div>
            <h1 className="publication-title">A personal publication about systems, ideas, and craft.</h1>
            <p className="masthead-copy">
              In-depth articles on programming, AI, engineering, science, mathematics, photography,
              and music — written with personality, but presented like a serious publication.
            </p>
          </div>
          <div className="mission-note">
            <p className="section-kicker">Editorial focus</p>
            <p>
              Technical judgment, creative practice, and the connective tissue between software,
              science, and the arts.
            </p>
          </div>
        </div>
      </header>

      <section className="lead-grid">
        {featured && (
          <article className="lead-story">
            <p className="category-chip">{featured.category}</p>
            <p className="post-meta">{featured.date} · {featured.readingTime}</p>
            <h2>{featured.title}</h2>
            <p className="featured-excerpt">{featured.excerpt}</p>
            <Link href={`/posts/${featured.slug}`} className="text-link">Read feature</Link>
          </article>
        )}

        <div className="secondary-column">
          {second && (
            <article className="secondary-story">
              <p className="category-chip">{second.category}</p>
              <p className="post-meta">{second.date} · {second.readingTime}</p>
              <h3>{second.title}</h3>
              <p>{second.excerpt}</p>
              <Link href={`/posts/${second.slug}`} className="text-link">Read article</Link>
            </article>
          )}

          <aside className="editor-note">
            <p className="section-kicker">About the site</p>
            <p>
              This is a markdown-first publication built in Next.js and TypeScript. It is personal in
              authorship, but structured like a magazine: topical sections, strong headlines, and
              longform articles worth sitting with.
            </p>
          </aside>
        </div>
      </section>

      <section className="latest-strip">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">Latest coverage</p>
            <h2>Fresh essays and reported notes</h2>
          </div>
          <p className="section-copy">
            A broad range of interests, filtered through the same editorial instinct: make it sharp,
            useful, and enjoyable to read.
          </p>
        </div>

        <div className="latest-list">
          {rest.slice(0, 4).map((post) => (
            <article key={post.slug} className="story-list-item">
              <div>
                <p className="category-chip inline-chip">{post.category}</p>
                <p className="post-meta">{post.date} · {post.readingTime}</p>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
              <Link href={`/posts/${post.slug}`} className="text-link">Open article</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="coverage-sections">
        {categoryGroups.map((group) => (
          <section key={group.category} className="category-section" id={group.category.toLowerCase().replace(/[^a-z]+/g, '-')}>
            <div className="category-heading">
              <p className="section-kicker">Section</p>
              <h2>{group.category}</h2>
            </div>
            <div className="category-story-list">
              {group.posts.map((post) => (
                <article key={post.slug} className="section-story-row">
                  <div>
                    <p className="post-meta">{post.date} · {post.readingTime}</p>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                  </div>
                  <Link href={`/posts/${post.slug}`} className="text-link">Read more</Link>
                </article>
              ))}
            </div>
          </section>
        ))}
      </section>
    </main>
  );
}
