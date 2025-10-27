// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  }
  // Removed output: 'export' to allow dynamic routes
}

module.exports = nextConfig