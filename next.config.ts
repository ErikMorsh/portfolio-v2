import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
    unoptimized: false,
  },
}

export default nextConfig
