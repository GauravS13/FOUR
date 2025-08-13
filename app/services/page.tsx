import type { Metadata } from "next"
import { Container } from "@/components/ui/container"
import { ServiceCard } from "@/components/ui/service-card"
import { CTASection } from "@/components/ui/cta-section"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SERVICES } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive IT services including web development, cloud solutions, mobile apps, and digital transformation.",
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <Container>
            <div className="space-y-8">
              <Breadcrumbs items={[{ label: "Services" }]} />

              <div className="text-center space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold">Our Services</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  We offer comprehensive IT solutions designed to help your business thrive in the digital age. From
                  custom web applications to cloud infrastructure, we've got you covered.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SERVICES.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          </Container>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-muted/30">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Our Process</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A proven methodology that ensures successful project delivery
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description: "We analyze your requirements and create a detailed project roadmap.",
                },
                {
                  step: "02",
                  title: "Design",
                  description: "Create wireframes and interactive prototypes for validation.",
                },
                {
                  step: "03",
                  title: "Development",
                  description: "Build your solution using modern technologies and best practices.",
                },
                {
                  step: "04",
                  title: "Launch",
                  description: "Comprehensive testing followed by deployment and monitoring.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center space-y-4">
                  <div className="text-4xl font-bold text-primary">{item.step}</div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <CTASection
          title="Ready to Get Started?"
          description="Let's discuss your project requirements and create a custom solution for your business."
          primaryButton={{ text: "Contact Us", href: "/contact" }}
          secondaryButton={{ text: "View Case Studies", href: "/case-studies" }}
        />
      </main>
      <Footer />
    </>
  )
}
