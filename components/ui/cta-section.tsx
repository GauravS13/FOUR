import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

interface CTASectionProps {
  title: string
  description: string
  primaryButton: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
  variant?: "default" | "accent"
}

export function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
  variant = "default",
}: CTASectionProps) {
  return (
    <section className={`py-20 ${variant === "accent" ? "bg-primary text-primary-foreground" : "bg-muted/30"}`}>
      <Container>
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">{title}</h2>
            <p
              className={`text-lg leading-relaxed ${variant === "accent" ? "text-primary-foreground/90" : "text-muted-foreground"}`}
            >
              {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant={variant === "accent" ? "secondary" : "default"}
              className="text-lg px-8 py-6"
            >
              <Link href={primaryButton.href}>
                {primaryButton.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            {secondaryButton && (
              <Button
                asChild
                size="lg"
                variant={variant === "accent" ? "outline" : "outline"}
                className={`text-lg px-8 py-6 ${variant === "accent" ? "border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" : ""}`}
              >
                <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
