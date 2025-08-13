import type { Metadata } from "next"
import { Container } from "@/components/ui/container"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Header } from "@/components/layout/header"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using TechFlow Solutions services.",
}

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 lg:py-32">
          <Container>
            <div className="max-w-4xl mx-auto space-y-8">
              <Breadcrumbs items={[{ label: "Terms of Service" }]} />

              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-bold">Terms of Service</h1>
                  <p className="text-muted-foreground">Last updated: January 1, 2024</p>
                </div>

                <div className="prose prose-lg max-w-none space-y-8">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Acceptance of Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      By accessing and using TechFlow Solutions' website and services, you accept and agree to be bound
                      by the terms and provision of this agreement.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Use License</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Permission is granted to temporarily download one copy of the materials on TechFlow Solutions'
                      website for personal, non-commercial transitory viewing only.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Service Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Our services are provided "as is" and we make no warranties, expressed or implied, and hereby
                      disclaim and negate all other warranties including without limitation, implied warranties or
                      conditions of merchantability.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Contact Information</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      If you have any questions about these Terms of Service, please contact us at
                      legal@techflowsolutions.com.
                    </p>
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
