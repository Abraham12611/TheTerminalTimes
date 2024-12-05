/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/vg7snmqkoio2/**',
      },
    ],
  },
};

module.exports = nextConfig; 