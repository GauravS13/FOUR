import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { OrganizationStructuredData } from "@/components/seo/structured-data"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: {
    default: "TechFlow Solutions - Professional IT Services & Development",
    template: "%s | TechFlow Solutions",
  },
  description:
    "Leading IT company providing web development, cloud solutions, and digital transformation services. Expert team delivering scalable, secure, and innovative technology solutions.",
  keywords: ["IT services", "web development", "cloud solutions", "digital transformation", "software development"],
  authors: [{ name: "TechFlow Solutions" }],
  creator: "TechFlow Solutions",
  metadataBase: new URL("https://techflow-solutions.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://techflow-solutions.com",
    siteName: "TechFlow Solutions",
    title: "TechFlow Solutions - Professional IT Services & Development",
    description: "Leading IT company providing web development, cloud solutions, and digital transformation services.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechFlow Solutions - Professional IT Services & Development",
    description: "Leading IT company providing web development, cloud solutions, and digital transformation services.",
    creator: "@techflowsolutions",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${inter.style.fontFamily};
  --font-sans: ${inter.variable};
  --font-mono: ${jetbrainsMono.variable};
}
        `}</style>
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <OrganizationStructuredData />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
