import type { Metadata } from "next"
import { Container } from "@/components/ui/container"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Header } from "@/components/layout/header"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how TechFlow Solutions collects, uses, and protects your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 lg:py-32">
          <Container>
            <div className="max-w-4xl mx-auto space-y-8">
              <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-bold">Privacy Policy</h1>
                  <p className="text-muted-foreground">Last updated: January 1, 2024</p>
                </div>

                <div className="prose prose-lg max-w-none space-y-8">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Introduction</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      TechFlow Solutions ("we," "our," or "us") is committed to protecting your privacy. This Privacy
                      Policy explains how we collect, use, disclose, and safeguard your information when you visit our
                      website or use our services.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Information We Collect</h2>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Personal Information</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We may collect personal information that you voluntarily provide to us when you:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Fill out contact forms or request information</li>
                        <li>Subscribe to our newsletter</li>
                        <li>Apply for job positions</li>
                        <li>Engage with our customer support</li>
                      </ul>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-bold">How We Use Your Information</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We use the information we collect for various purposes, including:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Responding to your inquiries and providing customer support</li>
                      <li>Sending you newsletters and marketing communications (with your consent)</li>
                      <li>Processing job applications and recruitment activities</li>
                      <li>Improving our website and services</li>
                      <li>Complying with legal obligations</li>
                    </ul>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Data Security</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We implement appropriate technical and organizational security measures to protect your personal
                      information against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Your Rights</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Depending on your location, you may have certain rights regarding your personal information,
                      including:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>The right to access your personal information</li>
                      <li>The right to correct inaccurate information</li>
                      <li>The right to delete your personal information</li>
                      <li>The right to object to processing</li>
                      <li>The right to data portability</li>
                    </ul>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      If you have any questions about this Privacy Policy, please contact us at:
                    </p>
                    <div className="bg-muted/50 p-6 rounded-lg space-y-2">
                      <p className="font-medium">TechFlow Solutions</p>
                      <p className="text-muted-foreground">Email: privacy@techflowsolutions.com</p>
                      <p className="text-muted-foreground">Phone: (555) 123-4567</p>
                      <p className="text-muted-foreground">Address: 123 Tech Street, Innovation City, IC 12345</p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}
