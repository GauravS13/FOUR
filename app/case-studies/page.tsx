import type { Metadata } from "next"
import { Container } from "@/components/ui/container"
import { CaseStudyCard } from "@/components/ui/case-study-card"
import { CTASection } from "@/components/ui/cta-section"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Explore our successful projects and see how we've helped businesses transform with technology.",
}

// Sample case studies data
const caseStudies = [
  {
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
  },
  {
    id: "healthcare-portal",
    title: "Patient Management System",
    client: "HealthTech Solutions",
    industry: "Healthcare",
    description: "HIPAA-compliant patient portal with appointment scheduling and secure messaging.",
    image: "/healthcare-dashboard.png",
    tags: ["React", "Node.js", "PostgreSQL", "HIPAA"],
    metrics: [
      { label: "Patient Satisfaction", value: "+85%" },
      { label: "Admin Efficiency", value: "+40%" },
    ],
  },
  {
    id: "fintech-mobile-app",
    title: "Mobile Banking Application",
    client: "FinanceFirst",
    industry: "Financial Services",
    description: "Secure mobile banking app with biometric authentication and real-time transactions.",
    image: "/mobile-banking-app.png",
    tags: ["React Native", "Node.js", "MongoDB", "Biometrics"],
    metrics: [
      { label: "User Adoption", value: "+250%" },
      { label: "Transaction Speed", value: "2x faster" },
    ],
  },
  {
    id: "logistics-platform",
    title: "Supply Chain Management Platform",
    client: "LogiFlow",
    industry: "Logistics",
    description: "Real-time tracking and inventory management system for global supply chains.",
    image: "/logistics-tracking-dashboard.png",
    tags: ["Vue.js", "Python", "PostgreSQL", "IoT"],
    metrics: [
      { label: "Tracking Accuracy", value: "99.9%" },
      { label: "Cost Reduction", value: "-30%" },
    ],
  },
  {
    id: "education-platform",
    title: "Online Learning Management System",
    client: "EduTech Academy",
    industry: "Education",
    description: "Comprehensive LMS with video streaming, assessments, and progress tracking.",
    image: "/online-learning-platform.png",
    tags: ["Next.js", "TypeScript", "MongoDB", "Video Streaming"],
    metrics: [
      { label: "Student Engagement", value: "+120%" },
      { label: "Course Completion", value: "+65%" },
    ],
  },
  {
    id: "real-estate-crm",
    title: "Real Estate CRM System",
    client: "PropertyPro",
    industry: "Real Estate",
    description: "Customer relationship management system with property listings and lead tracking.",
    image: "/real-estate-crm-dashboard.png",
    tags: ["React", "Node.js", "MySQL", "CRM"],
    metrics: [
      { label: "Lead Conversion", value: "+180%" },
      { label: "Agent Productivity", value: "+50%" },
    ],
  },
]

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <Container>
            <div className="space-y-8">
              <Breadcrumbs items={[{ label: "Case Studies" }]} />

              <div className="text-center space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold">Our Success Stories</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Discover how we've helped businesses across various industries achieve their goals through innovative
                  technology solutions and strategic partnerships.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.id} {...caseStudy} />
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <CTASection
          title="Ready to Create Your Success Story?"
          description="Let's work together to build a solution that drives real results for your business."
          primaryButton={{ text: "Start Your Project", href: "/contact" }}
          secondaryButton={{ text: "View Our Services", href: "/services" }}
          variant="accent"
        />
      </main>
      <Footer />
    </>
  )
}
