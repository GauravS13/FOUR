import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2 } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Sample blog post data (in a real app, this would come from a CMS or database)
const blogPosts = {
  "next-js-15-features": {
    id: "next-js-15-features",
    title: "Exploring Next.js 15: New Features and Performance Improvements",
    description:
      "A deep dive into the latest Next.js release, covering new features, performance enhancements, and migration tips.",
    content: `
# Exploring Next.js 15: New Features and Performance Improvements

Next.js 15 brings exciting new features and significant performance improvements that make it easier than ever to build fast, scalable web applications. In this comprehensive guide, we'll explore the key updates and how they can benefit your projects.

## Key Features in Next.js 15

### 1. Improved App Router Performance

The App Router has received significant performance optimizations, with faster page transitions and reduced bundle sizes. The new streaming architecture allows for better user experiences with progressive loading.

### 2. Enhanced Image Optimization

The Image component now supports more formats and provides better optimization out of the box. WebP and AVIF formats are automatically served when supported by the browser.

### 3. Server Actions Improvements

Server Actions are now more stable and performant, with better error handling and type safety. This makes it easier to build full-stack applications without separate API routes.

## Performance Benchmarks

Our testing shows significant improvements across key metrics:

- **First Contentful Paint**: 25% faster
- **Largest Contentful Paint**: 30% improvement
- **Bundle Size**: 15% reduction in average bundle size

## Migration Guide

Upgrading to Next.js 15 is straightforward for most applications. Here's what you need to know:

1. Update your package.json dependencies
2. Review breaking changes in the migration guide
3. Test your application thoroughly
4. Deploy with confidence

## Conclusion

Next.js 15 represents a significant step forward in web development tooling. The performance improvements and new features make it an excellent choice for modern web applications.
    `,
    author: "Sarah Chen",
    publishedAt: "2024-01-15",
    updatedAt: "2024-01-16",
    tags: ["Next.js", "React", "Performance", "Web Development"],
    image: "/blog-nextjs-15.png",
    readingTime: 8,
    featured: true,
  },
  // Add more blog posts as needed
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <Header />
      <main>
        {/* Article Header */}
        <section className="py-20 lg:py-32">
          <Container>
            <div className="max-w-4xl mx-auto space-y-8">
              <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title.substring(0, 50) + "..." }]} />

              {/* Article Meta */}
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">{post.title}</h1>

                <p className="text-xl text-muted-foreground leading-relaxed">{post.description}</p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
            </div>
          </Container>
        </section>

        {/* Article Content */}
        <section className="pb-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                {/* In a real app, you'd render MDX content here */}
                <div className="whitespace-pre-line text-muted-foreground leading-relaxed">{post.content}</div>
              </div>

              <Separator className="my-12" />

              {/* Article Footer */}
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Written by {post.author}</h3>
                    <p className="text-sm text-muted-foreground">
                      Published on {formattedDate} • {post.readingTime} min read
                    </p>
                  </div>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Article
                  </Button>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-8 border-t">
                  <Button variant="ghost" asChild>
                    <Link href="/blog">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Blog
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link href="/blog">
                      More Articles
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
