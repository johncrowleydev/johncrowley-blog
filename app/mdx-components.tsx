import type { ReactNode } from 'react';
import { withBasePath } from '@/lib/site';

function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="article-figure">
      <img src={withBasePath(src)} alt={alt} className="article-image" />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

function Aside({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="article-aside">
      <p className="article-aside-title">{title}</p>
      <div>{children}</div>
    </aside>
  );
}

export const mdxComponents = {
  Figure,
  Aside
};
