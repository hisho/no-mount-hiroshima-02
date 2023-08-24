/**
 *
 * @return {import('next').NextConfig}
 */
const nextConfig = () => {
  const __PROD__ = process.env.NODE_ENV === 'production'

  return {
    compiler: {
      removeConsole: __PROD__
        ? {
            exclude: ['error'],
          }
        : false,
    },
    experimental: {
      typedRoutes: true,
    },
    poweredByHeader: false,
    reactStrictMode: false,
  }
}

module.exports = nextConfig()
