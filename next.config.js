/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
}

const withNextIntl = require('next-intl/plugin')('./src/i18n/request.ts');

module.exports = withNextIntl(nextConfig)
