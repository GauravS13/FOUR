import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CTASection } from "@/components/ui/cta-section"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getServiceContent } from "@/lib/content"

interface ServicePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = await getServiceContent(params.slug)

  if (!service) {
    return {
      title: "Service Not Found",
    }
  }

  return {
    title: service.title,
    description: service.description,
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = await getServiceContent(params.slug)

  if (!service) {
    notFound()
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <Container>
            <div className="space-y-8">
              <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: service.title }]} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h1 className="text-4xl lg:text-5xl font-bold">{service.hero.title}</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">{service.hero.description}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" asChild>
                      <Link href="/contact">Get Started</Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/case-studies">View Examples</Link>
                    </Button>
                  </div>
                </div>

                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={service.hero.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Problem Section */}
        <section className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">{service.problem.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{service.problem.description}</p>
              </div>

              <div className="space-y-4">
                {service.problem.points.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Solution Section */}
        <section className="py-20 bg-muted/30">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">{service.solution.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{service.solution.description}</p>
              </div>

              <div className="space-y-4">
                {service.solution.points.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Key Benefits</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Measurable results that drive your business forward
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="text-3xl font-bold text-primary">{benefit.metric}</div>
                    <h3 className="text-lg font-semibold">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Technologies Section */}
        <section className="py-20 bg-muted/30">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Technologies We Use</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Modern, proven technologies for reliable solutions
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {service.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm px-4 py-2">
                  {tech}
                </Badge>
              ))}
            </div>
          </Container>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Our Process</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A structured approach to ensure project success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process.map((step) => (
                <div key={step.step} className="text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mx-auto">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <CTASection
          title={service.cta.title}
          description={service.cta.description}
          primaryButton={{ text: service.cta.primaryButton, href: "/contact" }}
          secondaryButton={{ text: service.cta.secondaryButton, href: "/case-studies" }}
          variant="accent"
        />
      </main>
      <Footer />
    </>
  )
}
