/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  images: {
    domains: [],
  },
  env: { jwt_secret: "process.env.JWT_SECRET" },
};

module.exports = nextConfig;
