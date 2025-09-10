import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imagesunsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
      // Configuração dinâmica para uploads
      ...(process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? [
        {
          protocol: 'http' as const,
          hostname: 'localhost',
          port: '9000',
          pathname: '/uploads/**',
        }
      ] : [
        {
          protocol: 'https' as const,
          hostname: process.env.NEXT_PUBLIC_API_URL?.replace('https://', '').replace('http://', '') || 'localhost',
          port: '',
          pathname: '/uploads/**',
        }
      ])
    ],
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
