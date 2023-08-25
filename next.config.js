const __PROD__ = process.env.NODE_ENV === 'production'

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  compiler: {
    removeConsole: __PROD__
      ? {
          exclude: ['error'],
        }
      : false,
  },
  poweredByHeader: false,
  reactStrictMode: false,
}

module.exports = nextConfig
