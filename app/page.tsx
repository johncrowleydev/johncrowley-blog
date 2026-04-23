import Link from 'next/link';
import ThemeToggle from './theme-toggle';
import { getAllPosts, SECTIONS, type Post } from '@/lib/posts';
import { withBasePath } from '@/lib/site';

function StoryImage({ post, className }: { post: Post; className: string }) {
  if (!post.image) return null;
  return <img src={withBasePath(post.image)} alt={post.title} className={className} />;
}

export default function HomePage() {
  const posts = getAllPosts();
  const [lead, second, third, ...rest] = posts;

  return (
    <main className="shell publication-shell">
      <header className="publication-header">
        <div className="utility-row">
          <p className="issue-line">Independent publication · Edited by John Crowley</p>
          <ThemeToggle />
        </div>

        <div className="masthead-block">
          <p className="publication-kicker">The Crowley Review</p>
          <h1 className="publication-name">Technology, science, art, and the disciplines around them.</h1>
          <p className="publication-standfirst">
            A personal publication with the structure of a journal: essays, reported notes, and visual
            features across programming, AI, engineering, mathematics, photography, and music.
          </p>
        </div>

        <nav className="section-nav" aria-label="Sections">
          {SECTIONS.map((section) => (
            <Link key={section.slug} href={`/sections/${section.slug}`}>
              {section.name}
            </Link>
          ))}
        </nav>
      </header>

      <section className="front-page-grid">
        {lead && (
          <article className="lead-package">
            <StoryImage post={lead} className="lead-story-image" />
            <p className="category-chip">{lead.category}</p>
            <p className="post-meta">{lead.date} · {lead.readingTime}</p>
            <h2>{lead.title}</h2>
            <p className="featured-excerpt">{lead.excerpt}</p>
            <Link href={`/posts/${lead.slug}`} className="text-link">Read the cover story</Link>
          </article>
        )}

        <aside className="front-rail">
          {second && (
            <article className="rail-feature">
              <p className="category-chip inline-chip">{second.category}</p>
              <p className="post-meta">{second.date} · {second.readingTime}</p>
              <h3>{second.title}</h3>
              <p>{second.excerpt}</p>
              <Link href={`/posts/${second.slug}`} className="text-link">Read feature</Link>
            </article>
          )}

          <div className="editorial-note">
            <p className="section-kicker">Editorial note</p>
            <p>
              The goal is not to imitate a corporate media brand. It is to create something more like a
              small independent review: intellectually broad, visually composed, and recognizably personal
              without feeling diaristic.
            </p>
          </div>
        </aside>
      </section>

      <section className="notebook-section">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">Notebook</p>
            <h2>New and notable</h2>
          </div>
          <p className="section-copy">
            A front-page run of current pieces with stronger hierarchy and less of the repetitive blog-roll
            feeling.
          </p>
        </div>

        <div className="notebook-list">
          {[third, ...rest.slice(0, 3)].filter(Boolean).map((post, index) => {
            const story = post as Post;
            return (
              <article key={story.slug} className="notebook-item">
                <p className="notebook-index">0{index + 1}</p>
                <div className="notebook-main">
                  <StoryImage post={story} className="notebook-image" />
                  <div>
                    <p className="category-chip inline-chip">{story.category}</p>
                    <p className="post-meta">{story.date} · {story.readingTime}</p>
                    <h3>{story.title}</h3>
                    <p>{story.excerpt}</p>
                  </div>
                </div>
                <Link href={`/posts/${story.slug}`} className="text-link">Open</Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-directory">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">Departments</p>
            <h2>The publication by section</h2>
          </div>
          <p className="section-copy">
            Each section now has its own landing page, so the site reads more like a publication with beats
            and less like a single undifferentiated feed.
          </p>
        </div>

        <div className="directory-grid">
          {SECTIONS.map((section) => {
            const sectionPosts = posts.filter((post) => post.categorySlug === section.slug);
            const first = sectionPosts[0];
            return (
              <article key={section.slug} className="directory-card">
                <p className="section-kicker">{section.name}</p>
                <p className="directory-blurb">{section.blurb}</p>
                {first ? (
                  <>
                    <p className="post-meta">Latest: {first.date}</p>
                    <h3>{first.title}</h3>
                  </>
                ) : (
                  <p className="post-meta">Section in progress</p>
                )}
                <Link href={`/sections/${section.slug}`} className="text-link">Browse section</Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
