const repo = 'johncrowley-blog';
const isGithubPages = process.env.GITHUB_ACTIONS || process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isGithubPages ? `/${repo}` : '',
  assetPrefix: isGithubPages ? `/${repo}/` : '',
  trailingSlash: true,
  pageExtensions: ['ts', 'tsx', 'md']
};

export default nextConfig;
