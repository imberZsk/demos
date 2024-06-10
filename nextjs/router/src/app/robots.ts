import siteMetadata from '@/app/data/siteMetadata'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl
  }
}
