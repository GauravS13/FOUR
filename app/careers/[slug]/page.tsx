import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock, Users, DollarSign } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { JobApplicationForm } from "@/components/ui/job-application-form"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

interface CareerPageProps {
  params: {
    slug: string
  }
}

// Sample job data (in a real app, this would come from an API or database)
const jobRoles = {
  "senior-frontend-developer": {
    id: "senior-frontend-developer",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    description:
      "Lead frontend development using React, Next.js, and TypeScript. Work with our design team to create beautiful, performant user interfaces.",
    responsibilities: [
      "Lead frontend architecture decisions and implementation",
      "Mentor junior developers and conduct code reviews",
      "Collaborate with designers to implement pixel-perfect UIs",
      "Optimize applications for maximum speed and scalability",
      "Stay up-to-date with emerging frontend technologies",
      "Participate in technical planning and sprint ceremonies",
    ],
    requirements: [
      "5+ years of experience with React and modern JavaScript",
      "Strong proficiency in TypeScript and Next.js",
      "Experience with state management (Redux, Zustand, etc.)",
      "Knowledge of CSS-in-JS solutions and styling frameworks",
      "Experience with testing frameworks (Jest, React Testing Library)",
      "Strong understanding of web performance optimization",
      "Leadership and mentoring experience",
      "Excellent communication and collaboration skills",
    ],
    niceToHave: [
      "Experience with React Native or mobile development",
      "Knowledge of backend technologies (Node.js, databases)",
      "Experience with cloud platforms (AWS, Vercel)",
      "Open source contributions",
      "Experience with design systems and component libraries",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Unlimited PTO and flexible working hours",
      "Remote work options with home office stipend",
      "$2,000 annual learning and development budget",
      "Top-tier equipment and tools",
      "Team retreats and company events",
    ],
  },
  // Add more job roles as needed
}

export async function generateMetadata({ params }: CareerPageProps): Promise<Metadata> {
  const job = jobRoles[params.slug as keyof typeof jobRoles]

  if (!job) {
    return {
      title: "Job Not Found",
    }
  }

  return {
    title: `${job.title} - Careers`,
    description: job.description,
  }
}

export default function CareerPage({ params }: CareerPageProps) {
  const job = jobRoles[params.slug as keyof typeof jobRoles]

  if (!job) {
    notFound()
  }

  return (
    <>
      <Header />
      <main>
        {/* Job Header */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <Container>
            <div className="space-y-8">
              <Breadcrumbs items={[{ label: "Careers", href: "/careers" }, { label: job.title }]} />

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{job.department}</Badge>
                    <Badge variant="outline">{job.type}</Badge>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold">{job.title}</h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">{job.description}</p>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{job.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>{job.salary}</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Job Details */}
        <section className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Job Information */}
              <div className="lg:col-span-2 space-y-12">
                {/* Responsibilities */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">What You'll Do</h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Requirements */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">What We're Looking For</h2>
                  <ul className="space-y-3">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Nice to Have */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Nice to Have</h2>
                  <ul className="space-y-3">
                    {job.niceToHave.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Benefits */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">What We Offer</h2>
                  <ul className="space-y-3">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Application Form */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Apply for this position</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <JobApplicationForm roleId={job.id} />
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button variant="ghost" asChild>
                    <Link href="/careers">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Careers
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
