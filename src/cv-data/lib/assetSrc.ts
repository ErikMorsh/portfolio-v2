/** Normalize Vite/Next static asset imports to a usable URL string. */
export function assetSrc(src: string | { src: string }): string {
  return typeof src === 'string' ? src : src.src
}
