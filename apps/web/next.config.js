/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["ui"],
  images: {
    domains: ["pbs.twimg.com", "github.com"],
  },
};

module.exports = nextConfig;
