import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  sassOptions: {
    // process.cwd() is reliable in Docker/Liara; __dirname can break with ESM next.config.ts
    includePaths: [path.join(process.cwd(), 'src')],
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
    unoptimized: false,
  },
}

export default nextConfig
