import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/shared/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const lastModified = new Date()

  return [
    {
      url: base,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${base}/jobs`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/resume`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]
}
