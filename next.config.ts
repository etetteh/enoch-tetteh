
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Fix for 'async_hooks' and other OpenTelemetry related module not found errors
    // Ensure this modification only applies to client-side bundles
    if (!isServer) {
      // Initialize config.resolve if it doesn't exist
      if (!config.resolve) {
        config.resolve = {};
      }
      // Initialize config.resolve.fallback if it doesn't exist
      if (!config.resolve.fallback) {
        config.resolve.fallback = {};
      }
      // Add or overwrite async_hooks to be ignored (false means it's treated as an empty module)
      config.resolve.fallback.async_hooks = false;
      config.resolve.fallback['@opentelemetry/exporter-jaeger'] = false; // Add this line
    }
    return config;
  },
};

export default nextConfig;
