/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;
