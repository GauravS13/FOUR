import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, CheckCircle } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CTASection } from "@/components/ui/cta-section"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

interface CaseStudyPageProps {
  params: {
    slug: string
  }
}

// Sample case study data (in a real app, this would come from a CMS or database)
const caseStudies = {
  "ecommerce-transformation": {
    id: "ecommerce-transformation",
    title: "E-commerce Platform Transformation",
    client: "RetailCorp",
    industry: "E-commerce",
    description:
      "Complete digital transformation resulting in 300% increase in online sales and improved user experience.",
    image: "/modern-ecommerce-dashboard.png",
    tags: ["Next.js", "TypeScript", "Stripe", "AWS"],
    metrics: [
      { label: "Sales Increase", value: "+300%", description: "Online sales growth within 6 months" },
      { label: "Page Load Time", value: "-60%", description: "Faster loading across all pages" },
      { label: "Conversion Rate", value: "+45%", description: "Improved checkout completion rate" },
      { label: "User Satisfaction", value: "95%", description: "Customer satisfaction score" },
    ],
    challenge: `RetailCorp was struggling with an outdated e-commerce platform that couldn't handle their growing customer base. The legacy system had slow loading times, poor mobile experience, and limited scalability. Customer complaints were increasing, and sales were declining despite growing market demand.

Key challenges included:
• Legacy PHP codebase that was difficult to maintain
• Poor mobile experience with high bounce rates
• Slow checkout process leading to cart abandonment
• Limited inventory management capabilities
• No real-time analytics or reporting`,
    solution: `We designed and implemented a complete digital transformation using modern technologies and best practices. Our approach focused on performance, scalability, and user experience.

Technical Implementation:
• Migrated to Next.js with TypeScript for better performance and developer experience
• Implemented server-side rendering for improved SEO and loading times
• Built responsive design with mobile-first approach
• Integrated Stripe for secure payment processing
• Deployed on AWS with auto-scaling capabilities
• Added real-time inventory management system
• Implemented comprehensive analytics dashboard`,
    results: [
      "300% increase in online sales within 6 months",
      "60% reduction in page load times across all pages",
      "45% improvement in conversion rates",
      "95% customer satisfaction score",
      "50% reduction in cart abandonment",
      "Zero downtime during peak shopping seasons",
    ],
    technologies: ["Next.js", "TypeScript", "Stripe", "AWS", "MongoDB", "Redis", "Tailwind CSS"],
    testimonial: {
      quote:
        "TechFlow Solutions transformed our entire business. The new platform not only looks amazing but performs incredibly well. Our sales have tripled, and our customers love the new experience.",
      author: "Jennifer Smith",
      role: "CEO, RetailCorp",
    },
    featured: true,
  },
  // Add more case studies as needed
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = caseStudies[params.slug as keyof typeof caseStudies]

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    }
  }

  return {
    title: `${caseStudy.title} - Case Study`,
    description: caseStudy.description,
  }
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = caseStudies[params.slug as keyof typeof caseStudies]

  if (!caseStudy) {
    notFound()
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <Container>
            <div className="space-y-8">
              <Breadcrumbs items={[{ label: "Case Studies", href: "/case-studies" }, { label: caseStudy.title }]} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{caseStudy.industry}</Badge>
                      <span className="text-muted-foreground">{caseStudy.client}</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold">{caseStudy.title}</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">{caseStudy.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {caseStudy.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={caseStudy.image || "/placeholder.svg"}
                    alt={caseStudy.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Metrics Section */}
        <section className="py-20 bg-muted/30">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Key Results</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Measurable impact delivered through strategic technology implementation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {caseStudy.metrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="text-4xl font-bold text-primary">{metric.value}</div>
                    <h3 className="text-lg font-semibold">{metric.label}</h3>
                    <p className="text-sm text-muted-foreground">{metric.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Challenge Section */}
        <section className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">The Challenge</h2>
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-line text-muted-foreground leading-relaxed">{caseStudy.challenge}</div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Our Solution</h2>
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-line text-muted-foreground leading-relaxed">{caseStudy.solution}</div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Results Section */}
        <section className="py-20 bg-muted/30">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Results Achieved</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Concrete outcomes that demonstrate the success of our approach
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudy.results.map((result, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Technologies Section */}
        <section className="py-20">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Technologies Used</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Modern, proven technologies for reliable solutions
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {caseStudy.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm px-4 py-2">
                  {tech}
                </Badge>
              ))}
            </div>
          </Container>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 bg-muted/30">
          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold">Client Testimonial</h2>
              <blockquote className="text-2xl font-medium leading-relaxed">"{caseStudy.testimonial.quote}"</blockquote>
              <div className="space-y-2">
                <div className="font-semibold">{caseStudy.testimonial.author}</div>
                <div className="text-muted-foreground">{caseStudy.testimonial.role}</div>
              </div>
            </div>
          </Container>
        </section>

        {/* Navigation */}
        <section className="py-12 border-t">
          <Container>
            <div className="flex justify-between items-center">
              <Button variant="ghost" asChild>
                <Link href="/case-studies">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Case Studies
                </Link>
              </Button>
              <Button asChild>
                <Link href="/contact">
                  Start Your Project
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <CTASection
          title="Ready to Transform Your Business?"
          description="Let's discuss how we can help you achieve similar results with a custom solution tailored to your needs."
          primaryButton={{ text: "Start Your Project", href: "/contact" }}
          secondaryButton={{ text: "View More Case Studies", href: "/case-studies" }}
          variant="accent"
        />
      </main>
      <Footer />
    </>
  )
}
