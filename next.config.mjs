/** @type {import('next').NextConfig} */
const nextConfig = {reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/robot.txt',
                destination: '/api/robots'
            }
        ];
    }
  }

export default nextConfig;
  