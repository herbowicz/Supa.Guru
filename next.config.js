const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'robohash.org',
        port: '',
      }
    ]
  }
}

module.exports = withPWA(nextConfig)
