import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactForm } from "@/components/ui/contact-form"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SITE_CONFIG } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with TechFlow Solutions. We're here to help with your technology needs.",
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: SITE_CONFIG.contact.email,
    href: `mailto:${SITE_CONFIG.contact.email}`,
  },
  {
    icon: Phone,
    title: "Phone",
    value: SITE_CONFIG.contact.phone,
    href: `tel:${SITE_CONFIG.contact.phone}`,
  },
  {
    icon: MapPin,
    title: "Address",
    value: SITE_CONFIG.contact.address,
    href: "#",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon-Fri: 9AM-6PM PST",
    href: "#",
  },
]

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <Container>
            <div className="space-y-8">
              <Breadcrumbs items={[{ label: "Contact" }]} />

              <div className="text-center space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold">Get In Touch</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Ready to start your project? Have questions about our services? We'd love to hear from you and discuss
                  how we can help.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Contact Information</h2>
                  <p className="text-muted-foreground">We're here to help and answer any questions you might have.</p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        {item.href !== "#" ? (
                          <a href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Common Questions</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Quick answers to questions you might have
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "How quickly can you start my project?",
                  answer:
                    "We typically begin new projects within 1-2 weeks of contract signing, depending on our current workload and project complexity.",
                },
                {
                  question: "Do you offer ongoing support?",
                  answer:
                    "Yes, we provide comprehensive maintenance and support packages to ensure your application continues to perform optimally.",
                },
                {
                  question: "What's your typical project timeline?",
                  answer:
                    "Timelines vary by project scope. Simple websites take 2-4 weeks, while complex applications may take 3-6 months.",
                },
                {
                  question: "Do you work with international clients?",
                  answer:
                    "We work with clients worldwide and are experienced in remote collaboration across different time zones.",
                },
              ].map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-semibold">{item.question}</h3>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
