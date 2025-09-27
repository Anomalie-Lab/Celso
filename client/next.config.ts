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
      // Configuração dinâmica para arquivos públicos
      ...(process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? [
        {
          protocol: 'http' as const,
          hostname: 'localhost',
          port: '9000',
          pathname: '/public/**',
        }
      ] : [
        {
          protocol: 'https' as const,
          hostname: process.env.NEXT_PUBLIC_API_URL?.replace('https://', '').replace('http://', '') || 'localhost',
          port: '',
          pathname: '/public/**',
        }
      ])
    ],
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
