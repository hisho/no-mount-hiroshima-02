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
  pageExtensions: ['page.tsx'],
  poweredByHeader: false,
  reactStrictMode: false,
  redirects: async () => {
    return [
      {
        destination: '/1',
        permanent:true,
        source: '/'
      },
      {
        destination: '/1',
        permanent:true,
        source: '/0'
      },
    ]
  },
}

module.exports = nextConfig
