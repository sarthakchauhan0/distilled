/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack configuration to fix root detection issue
  turbopack: {
    root: '.',
  },
};

export default nextConfig;
