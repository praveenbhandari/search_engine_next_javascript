import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXTAUTH_URL: 'https://www.humanrightsdossier.com',
    NEXTAUTH_SECRET:"289e4a7e7fb07625fdc5c9e18e0f6376",
    GOOGLE_CLIENT_ID:'643219696715-fq9tcpoiqorpuf0ro8dueggss1mmp2v8.apps.googleusercontent.com',
GOOGLE_CLIENT_SECRET:'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',


    // Add other environment variables here
  },
  async rewrites() {
    return [
      {
        source: '/robot.txt',
        destination: '/api/robots'
      }
    ];
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig;
