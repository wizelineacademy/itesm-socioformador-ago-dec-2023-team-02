/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  images: {
    domains: ["pbs.twimg.com", "github.com"],
  },
};

module.exports = nextConfig;
