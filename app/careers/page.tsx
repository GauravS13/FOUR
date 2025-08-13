import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, Clock, Users } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CTASection } from "@/components/ui/cta-section"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Careers",
  description: "Join our team at TechFlow Solutions. Explore open positions and grow your career with us.",
}

// This would typically come from an API or database
const jobRoles = [
  {
    id: "senior-frontend-developer",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-time",
    description: "Lead frontend development using React, Next.js, and TypeScript.",
    requirements: ["5+ years React experience", "TypeScript proficiency", "Leadership skills"],
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-time",
    description: "Build scalable backend services using Node.js and cloud technologies.",
    requirements: ["3+ years Node.js experience", "Database design", "API development"],
  },
  {
    id: "fullstack-developer",
    title: "Fullstack Developer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-time",
    description: "Work across the full stack to deliver end-to-end solutions.",
    requirements: ["Full-stack experience", "React & Node.js", "Problem-solving skills"],
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote / San Francisco",
    type: "Full-time",
    description: "Create beautiful and intuitive user experiences.",
    requirements: ["Design portfolio", "Figma proficiency", "User research experience"],
  },
]

export default function CareersPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <Container>
            <div className="space-y-8">
              <Breadcrumbs items={[{ label: "Careers" }]} />

              <div className="text-center space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold">Join Our Team</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  We're looking for talented individuals who are passionate about technology and want to make a real
                  impact. Join us in building the future of digital solutions.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Company Culture */}
        <section className="py-20">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Why Work With Us?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We believe in creating an environment where everyone can thrive
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Remote-First Culture",
                  description: "Work from anywhere with flexible hours and a focus on results, not location.",
                  icon: MapPin,
                },
                {
                  title: "Growth Opportunities",
                  description: "Continuous learning budget, conference attendance, and career development support.",
                  icon: Users,
                },
                {
                  title: "Work-Life Balance",
                  description: "Unlimited PTO, mental health support, and a culture that respects your time.",
                  icon: Clock,
                },
              ].map((benefit, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="p-3 rounded-lg bg-primary/10 w-fit mx-auto">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Open Positions */}
        <section className="py-20 bg-muted/30">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Open Positions</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Find your next opportunity and help us build amazing products
              </p>
            </div>

            <div className="space-y-6">
              {jobRoles.map((role) => (
                <Card key={role.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{role.title}</CardTitle>
                        <CardDescription className="text-base">{role.description}</CardDescription>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <div className="flex gap-2">
                          <Badge variant="secondary">{role.department}</Badge>
                          <Badge variant="outline">{role.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{role.location}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Key Requirements:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {role.requirements.map((req, index) => (
                            <li key={index}>• {req}</li>
                          ))}
                        </ul>
                      </div>
                      <Button asChild>
                        <Link href={`/careers/${role.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <CTASection
          title="Don't See the Right Role?"
          description="We're always looking for talented people. Send us your resume and tell us how you'd like to contribute."
          primaryButton={{ text: "Send Resume", href: "/contact" }}
          secondaryButton={{ text: "Learn About Us", href: "/about" }}
          variant="accent"
        />
      </main>
      <Footer />
    </>
  )
}
