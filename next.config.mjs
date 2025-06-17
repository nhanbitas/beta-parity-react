import mdx from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkCalloutDirective from './plugins/remark-callout.js';
import remarkDisableIndentedCode from './plugins/remark-disable-intented-code.js';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypeHighlight, rehypeSlug],
    remarkPlugins: [remarkGfm, remarkDirective, remarkCalloutDirective, remarkDisableIndentedCode]
  }
});

const isGHPProd = process.env.GITHUB_PAGE_ENV === 'production';
const isNextProd = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com']
  },
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  reactStrictMode: false,
  pageExtensions: ['js', 'jsx', 'mdx', 'md', 'ts', 'tsx'],
  productionBrowserSourceMaps: true,
  eslint: {
    dirs: [],
    ignoreDuringBuilds: true
  },

  ...(!isNextProd && {
    basePath: isGHPProd ? '/beta-parity-react' : '',
    assetPrefix: isGHPProd ? '/beta-parity-react/' : ''
  })
};

export default withMDX(nextConfig);
