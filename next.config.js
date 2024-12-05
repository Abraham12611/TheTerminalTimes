/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig 