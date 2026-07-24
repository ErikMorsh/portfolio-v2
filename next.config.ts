import path from 'node:path'
import { pathToFileURL } from 'node:url'
import type { NextConfig } from 'next'

const srcDir = path.join(process.cwd(), 'src')

/** Resolve `@/...` Sass loads the same way as the TS path alias (`@/*` → `./src/*`). */
const atAliasImporter = {
  findFileUrl(url: string) {
    if (!url.startsWith('@/')) return null
    return new URL(url.slice(2), pathToFileURL(`${srcDir}/`))
  },
}

const nextConfig: NextConfig = {
  // Set here so Liara/Docker does not need to rewrite next.config and drop sassOptions.
  output: 'standalone',
  sassOptions: {
    includePaths: [srcDir],
    importers: [atAliasImporter],
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
    unoptimized: false,
  },
}

export default nextConfig
