/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack configuration to fix root detection issue
  turbopack: {
    root: '.',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com; frame-src 'self' https://challenges.cloudflare.com;"
          }
        ],
      },
    ];
  },
};

export default nextConfig;
