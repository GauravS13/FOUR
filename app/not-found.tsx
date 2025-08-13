"use client"

import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 lg:py-32">
          <Container>
            <div className="text-center space-y-8 max-w-2xl mx-auto">
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-8xl font-bold text-primary">404</h1>
                <h2 className="text-2xl lg:text-3xl font-bold">Page Not Found</h2>
                <p className="text-lg text-muted-foreground">
                  Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered
                  the wrong URL.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
