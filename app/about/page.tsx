import type { Metadata } from "next"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatsSection } from "@/components/ui/stats-section"
import { CTASection } from "@/components/ui/cta-section"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about TechFlow Solutions - our mission, team, and commitment to delivering exceptional IT services.",
}

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    image: "/ceo-headshot.png",
    bio: "10+ years in tech leadership, former CTO at major startups.",
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    image: "/professional-cto-headshot.png",
    bio: "Full-stack architect with expertise in scalable cloud solutions.",
  },
  {
    name: "Michael Rodriguez",
    role: "Lead Developer",
    image: "/professional-headshot-developer.png",
    bio: "React and Node.js specialist with 8+ years of experience.",
  },
  {
    name: "Emily Davis",
    role: "Design Director",
    image: "/designer-woman-headshot.png",
    bio: "UX/UI expert focused on creating intuitive user experiences.",
  },
]

const values = [
  {
    title: "Innovation",
    description: "We stay ahead of technology trends to deliver cutting-edge solutions.",
  },
  {
    title: "Quality",
    description: "Every project meets the highest standards of code quality and performance.",
  },
  {
    title: "Partnership",
    description: "We work closely with clients as trusted technology partners.",
  },
  {
    title: "Transparency",
    description: "Clear communication and honest feedback throughout every project.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <Container>
            <div className="space-y-8">
              <Breadcrumbs items={[{ label: "About" }]} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h1 className="text-4xl lg:text-5xl font-bold">About TechFlow Solutions</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      We're a team of passionate developers, designers, and strategists dedicated to helping businesses
                      thrive in the digital age through innovative technology solutions.
                    </p>
                  </div>
                </div>

                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image src="/placeholder-em3gt.png" alt="TechFlow Solutions team" fill className="object-cover" />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <Container>
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To empower businesses with technology solutions that drive growth, improve efficiency, and create
                exceptional user experiences. We believe that great software should be both powerful and intuitive,
                scalable and maintainable.
              </p>
            </div>
          </Container>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Our Values</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center space-y-4">
                    <h3 className="text-lg font-semibold">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Meet Our Team</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Experienced professionals passionate about technology and innovation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{member.name}</h3>
                      <Badge variant="secondary">{member.role}</Badge>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Stats */}
        <StatsSection />

        {/* CTA */}
        <CTASection
          title="Ready to Work Together?"
          description="Let's discuss how we can help transform your business with the right technology solutions."
          primaryButton={{ text: "Start a Project", href: "/contact" }}
          secondaryButton={{ text: "View Our Work", href: "/case-studies" }}
          variant="accent"
        />
      </main>
      <Footer />
    </>
  )
}
