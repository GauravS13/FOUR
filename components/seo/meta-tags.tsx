import Head from "next/head"

interface MetaTagsProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: "website" | "article"
}

export function MetaTags({ title, description, image = "/og-image.png", url, type = "website" }: MetaTagsProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://techflowsolutions.com"
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`

  return (
    <Head>
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="TechFlow Solutions" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@techflowsolutions" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="TechFlow Solutions" />
      <link rel="canonical" href={fullUrl} />
    </Head>
  )
}
