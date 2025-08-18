import { MetadataRoute } from 'next'

import { SITE_CONFIG } from '@/data/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_CONFIG.siteUrl}/sitemap.xml`,
  }
}
