import mdx from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import rehypeHighlight from 'rehype-highlight';
import remarkCalloutDirective from './plugins/remark-callout.js';
import remarkDisableIndentedCode from './plugins/remark-disable-intented-code.js';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypeHighlight],
    remarkPlugins: [remarkGfm, remarkDirective, remarkCalloutDirective, remarkDisableIndentedCode]
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com']
  },
  reactStrictMode: false,
  pageExtensions: ['js', 'jsx', 'mdx', 'md', 'ts', 'tsx'],
  productionBrowserSourceMaps: true
};

export default withMDX(nextConfig);
