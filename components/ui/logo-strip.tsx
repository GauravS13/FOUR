import Image from "next/image"
import { Container } from "@/components/ui/container"

interface Logo {
  name: string
  src: string
  width?: number
  height?: number
}

interface LogoStripProps {
  title?: string
  logos?: Logo[]
  variant?: "default" | "minimal"
}

const defaultLogos: Logo[] = [
  { name: "TechCorp", src: "/techcorp-logo.png", width: 120, height: 60 },
  { name: "InnovateLab", src: "/innovatelab-logo.png", width: 120, height: 60 },
  { name: "StartupXYZ", src: "/startupxyz-logo.png", width: 120, height: 60 },
  { name: "GrowthCorp", src: "/growthcorp-logo.png", width: 120, height: 60 },
  { name: "FutureTech", src: "/futuretech-logo.png", width: 120, height: 60 },
  { name: "CloudFirst", src: "/cloudfirst-logo.png", width: 120, height: 60 },
]

export function LogoStrip({
  title = "Trusted by Leading Companies",
  logos = defaultLogos,
  variant = "default",
}: LogoStripProps) {
  return (
    <section className={`py-16 ${variant === "minimal" ? "" : "bg-muted/20"}`}>
      <Container>
        <div className="space-y-12">
          {title && (
            <div className="text-center">
              <h2 className="text-lg font-semibold text-muted-foreground">{title}</h2>
            </div>
          )}

          <div className="relative overflow-hidden">
            <div className="flex items-center justify-center space-x-12 md:space-x-16 lg:space-x-20">
              {logos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={`${logo.name} logo`}
                    width={logo.width || 120}
                    height={logo.height || 60}
                    className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Fade edges for scrolling effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>
        </div>
      </Container>
    </section>
  )
}
