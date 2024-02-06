/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'http', hostname: 'localhost', port: '12345' },
    ]
  }
}

module.exports = nextConfig
