import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ServiceCard } from "@/components/ui/service-card"
import { CaseStudyCard } from "@/components/ui/case-study-card"
import { Testimonials } from "@/components/ui/testimonials"
import { TechStack } from "@/components/ui/tech-stack"
import { FAQSection } from "@/components/ui/faq-section"
import { CTASection } from "@/components/ui/cta-section"
import { LogoStrip } from "@/components/ui/logo-strip"
import { StatsSection } from "@/components/ui/stats-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SERVICES } from "@/lib/constants"
import Link from "next/link"

// Sample featured case study data
const featuredCaseStudy = {
  id: "ecommerce-transformation",
  title: "E-commerce Platform Transformation",
  client: "RetailCorp",
  industry: "E-commerce",
  description:
    "Complete digital transformation resulting in 300% increase in online sales and improved user experience.",
  image: "/modern-ecommerce-dashboard.png",
  tags: ["Next.js", "TypeScript", "Stripe", "AWS"],
  metrics: [
    { label: "Sales Increase", value: "+300%" },
    { label: "Page Load Time", value: "-60%" },
  ],
  featured: true,
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-background via-background to-muted py-20 lg:py-32">
          <Container>
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <Badge variant="accent" className="mb-4">
                  Professional IT Solutions
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  Transform Your Business with <span className="text-primary">Cutting-Edge</span> Technology
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  We deliver scalable web applications, cloud infrastructure, and digital transformation solutions that
                  drive growth and innovation for forward-thinking companies.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link href="/contact">Start Your Project</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent" asChild>
                  <Link href="/case-studies">View Our Work</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Logo Strip */}
        <LogoStrip />

        {/* Services Section */}
        <section className="py-20">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Our Services</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Comprehensive IT solutions tailored to your business needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          </Container>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Featured Case Study */}
        <section className="py-20">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Featured Success Story</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                See how we helped RetailCorp transform their business
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <CaseStudyCard {...featuredCaseStudy} />
            </div>
          </Container>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* Tech Stack */}
        <section className="py-20">
          <Container>
            <TechStack />
          </Container>
        </section>

        {/* FAQ */}
        <FAQSection />

        {/* Final CTA */}
        <CTASection
          title="Ready to Transform Your Business?"
          description="Let's discuss your project and create a solution that drives real results for your company."
          primaryButton={{ text: "Get Started Today", href: "/contact" }}
          secondaryButton={{ text: "Schedule a Call", href: "/contact" }}
          variant="accent"
        />
      </main>
      <Footer />
    </>
  )
}
