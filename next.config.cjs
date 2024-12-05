/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.secure.ctfassets.net',
        pathname: '/**'
      }
    ]
  }
}

module.exports = nextConfig