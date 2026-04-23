import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export const SECTIONS = [
  { name: 'Programming', slug: 'programming', blurb: 'Software design, developer tools, and code as craft.' },
  { name: 'AI', slug: 'ai', blurb: 'Models, agents, interfaces, and operational AI systems.' },
  { name: 'Engineering', slug: 'engineering', blurb: 'Architecture, infrastructure, and systems judgment.' },
  { name: 'Science & Math', slug: 'science-math', blurb: 'Scientific habits of mind, mathematical structure, and modeling.' },
  { name: 'Photography', slug: 'photography', blurb: 'Seeing, process, medium, and image-making practice.' },
  { name: 'Music', slug: 'music', blurb: 'Jazz, classical form, listening, theory, and composition.' }
] as const;

export type SectionName = (typeof SECTIONS)[number]['name'];

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  image?: string;
  content: string;
  readingTime: string;
};

type Frontmatter = {
  title: string;
  date: string;
  excerpt: string;
  category?: string;
  image?: string;
};

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function getSectionByName(name: string) {
  return SECTIONS.find((section) => section.name === name);
}

export function getSectionBySlug(slug: string) {
  return SECTIONS.find((section) => section.slug === slug);
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      return getPostBySlug(slug);
    })
    .filter((post): post is Post => Boolean(post))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsBySectionSlug(slug: string) {
  return getAllPosts().filter((post) => post.categorySlug === slug);
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const frontmatter = data as Frontmatter;
  const category = frontmatter.category ?? 'General';
  const section = getSectionByName(category);

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    excerpt: frontmatter.excerpt,
    category,
    categorySlug: section?.slug ?? 'general',
    image: frontmatter.image,
    content,
    readingTime: estimateReadingTime(content)
  };
}
