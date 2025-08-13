interface StructuredDataProps {
  type: "Organization" | "WebSite" | "Service" | "Article" | "JobPosting"
  data: Record<string, any>
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
  }

  const structuredData = { ...baseData, ...data }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function OrganizationStructuredData() {
  const organizationData = {
    name: "TechFlow Solutions",
    description:
      "Leading IT solutions provider specializing in web development, mobile apps, cloud solutions, and AI integration.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://techflowsolutions.com",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://techflowsolutions.com"}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "+1-555-123-4567",
      contactType: "customer service",
      email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "contact@techflowsolutions.com",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Tech Street",
      addressLocality: "Innovation City",
      addressRegion: "IC",
      postalCode: "12345",
      addressCountry: "US",
    },
    sameAs: [
      "https://linkedin.com/company/techflow-solutions",
      "https://twitter.com/techflowsolutions",
      "https://github.com/techflow-solutions",
    ],
  }

  return <StructuredData type="Organization" data={organizationData} />
}
