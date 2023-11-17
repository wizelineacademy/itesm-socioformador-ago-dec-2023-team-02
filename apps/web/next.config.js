/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*?)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://lh3.googleusercontent.com/',
          },
          // {
          //   key: 'Content-Security-Policy',
          //   value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
          // },
        ],
      },
    ];
  },
  reactStrictMode: false,
  transpilePackages: ["ui"],
  images: {
    domains: [
      "pbs.twimg.com",
      "github.com",
      "logowik.com",
      "lh3.googleusercontent.com",
    ],
  },
  poweredByHeader: false,
};

module.exports = nextConfig;
