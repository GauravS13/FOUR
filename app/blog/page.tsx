import type { Metadata } from "next"
import { Search } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { BlogCard } from "@/components/ui/blog-card"
import { CTASection } from "@/components/ui/cta-section"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Blog",
  description: "Latest insights, tutorials, and industry trends from the TechFlow Solutions team.",
}

// Sample blog posts data (in a real app, this would come from a CMS or database)
const blogPosts = [
  {
    id: "next-js-15-features",
    title: "Exploring Next.js 15: New Features and Performance Improvements",
    description:
      "A deep dive into the latest Next.js release, covering new features, performance enhancements, and migration tips.",
    author: "Sarah Chen",
    publishedAt: "2024-01-15",
    tags: ["Next.js", "React", "Performance", "Web Development"],
    image: "/blog-nextjs-15.png",
    readingTime: 8,
    featured: true,
  },
  {
    id: "typescript-best-practices",
    title: "TypeScript Best Practices for Large-Scale Applications",
    description:
      "Learn how to structure and organize TypeScript code for maintainability and scalability in enterprise applications.",
    author: "Michael Rodriguez",
    publishedAt: "2024-01-10",
    tags: ["TypeScript", "Best Practices", "Architecture", "Enterprise"],
    image: "/blog-typescript-practices.png",
    readingTime: 12,
    featured: false,
  },
  {
    id: "cloud-migration-guide",
    title: "Complete Guide to Cloud Migration: AWS vs Azure vs GCP",
    description:
      "Compare major cloud platforms and learn step-by-step strategies for successful cloud migration projects.",
    author: "Alex Johnson",
    publishedAt: "2024-01-05",
    tags: ["Cloud", "AWS", "Azure", "GCP", "Migration"],
    image: "/blog-cloud-migration.png",
    readingTime: 15,
    featured: false,
  },
  {
    id: "react-performance-optimization",
    title: "React Performance Optimization: Advanced Techniques",
    description:
      "Master advanced React optimization techniques including memoization, code splitting, and bundle analysis.",
    author: "Emily Davis",
    publishedAt: "2024-01-01",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    image: "/blog-react-performance.png",
    readingTime: 10,
    featured: false,
  },
  {
    id: "database-design-patterns",
    title: "Modern Database Design Patterns for Web Applications",
    description:
      "Explore database design patterns, indexing strategies, and performance optimization for modern web apps.",
    author: "Sarah Chen",
    publishedAt: "2023-12-28",
    tags: ["Database", "MongoDB", "PostgreSQL", "Design Patterns"],
    image: "/blog-database-design.png",
    readingTime: 14,
    featured: false,
  },
  {
    id: "api-security-best-practices",
    title: "API Security Best Practices: Protecting Your Endpoints",
    description:
      "Comprehensive guide to securing REST APIs including authentication, rate limiting, and vulnerability prevention.",
    author: "Michael Rodriguez",
    publishedAt: "2023-12-20",
    tags: ["API", "Security", "Authentication", "Best Practices"],
    image: "/blog-api-security.png",
    readingTime: 11,
    featured: false,
  },
]

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <Container>
            <div className="space-y-8">
              <Breadcrumbs items={[{ label: "Blog" }]} />

              <div className="text-center space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold">Our Blog</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Stay up-to-date with the latest trends, best practices, and insights from our team of experts in web
                  development, cloud computing, and digital transformation.
                </p>
              </div>

              {/* Search */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Search articles..." className="pl-10 bg-background" />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Featured Post */}
        <section className="py-20">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Featured Article</h2>
            </div>

            <div className="max-w-4xl mx-auto">
              {blogPosts
                .filter((post) => post.featured)
                .map((post) => (
                  <BlogCard key={post.id} {...post} />
                ))}
            </div>
          </Container>
        </section>

        {/* All Posts */}
        <section className="py-20 bg-muted/30">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Latest Articles</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts
                .filter((post) => !post.featured)
                .map((post) => (
                  <BlogCard key={post.id} {...post} />
                ))}
            </div>
          </Container>
        </section>

        {/* Newsletter CTA */}
        <CTASection
          title="Never Miss an Update"
          description="Subscribe to our newsletter and get the latest articles, tutorials, and industry insights delivered to your inbox."
          primaryButton={{ text: "Subscribe Now", href: "#newsletter" }}
          secondaryButton={{ text: "View All Posts", href: "/blog" }}
          variant="accent"
        />
      </main>
      <Footer />
    </>
  )
}
