import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.uel.ac.uk' },
      { protocol: 'https', hostname: 'imgproxy.gamma.app' },
      { protocol: 'https', hostname: 'cdn.gamma.app' },
    ],
  },
}

export default nextConfig
