
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // Compatibility with existing Vite project
  experimental: {
    esmExternals: 'loose',
  },
  // Setup for the app directory
  appDir: true,
  // Redirect from root to /app in development
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/app',
      },
    ];
  },
};

module.exports = nextConfig;
