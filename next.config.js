/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    // ppr: 'incremental', Remove cause of Vercel platform internal bug
  },
};

module.exports = nextConfig;
