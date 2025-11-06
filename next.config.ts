import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['localhost:3000', '127.0.0.1'],
  basePath: '/your-dreamboard-results',
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'https',
        hostname: 'dream-explorer-storage.s3.eu-north-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'd3m7r2hywaso4h.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'dreamsofa-next.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'dreamsofa.com',
      },
    ],
  },
};

export default nextConfig;
