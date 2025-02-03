/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'avatars0.githubusercontent.com',
      'avatars1.githubusercontent.com',
      'avatars2.githubusercontent.com',
      'avatars3.githubusercontent.com',
      'avatars4.githubusercontent.com',
      'avatars5.githubusercontent.com',
      'avatars.githubusercontent.com',
    ],
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
