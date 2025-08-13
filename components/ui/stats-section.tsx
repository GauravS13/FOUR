import { Container } from "@/components/ui/container"

interface Stat {
  value: string
  label: string
  description?: string
}

interface StatsSectionProps {
  title?: string
  description?: string
  stats: Stat[]
  variant?: "default" | "accent"
}

const defaultStats: Stat[] = [
  {
    value: "100+",
    label: "Projects Completed",
    description: "Successfully delivered projects across various industries",
  },
  {
    value: "50+",
    label: "Happy Clients",
    description: "Long-term partnerships with satisfied customers",
  },
  {
    value: "5+",
    label: "Years Experience",
    description: "Proven track record in modern web development",
  },
  {
    value: "24/7",
    label: "Support Available",
    description: "Round-the-clock technical support and maintenance",
  },
]

export function StatsSection({
  title = "Our Track Record",
  description = "Numbers that speak to our commitment to excellence and client satisfaction.",
  stats = defaultStats,
  variant = "default",
}: StatsSectionProps) {
  return (
    <section className={`py-20 ${variant === "accent" ? "bg-primary text-primary-foreground" : "bg-muted/30"}`}>
      <Container>
        <div className="space-y-16">
          {title && (
            <div className="text-center space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold">{title}</h2>
              {description && (
                <p
                  className={`text-lg max-w-2xl mx-auto ${variant === "accent" ? "text-primary-foreground/90" : "text-muted-foreground"}`}
                >
                  {description}
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl lg:text-5xl font-bold text-primary">{stat.value}</div>
                <div className="text-lg font-semibold">{stat.label}</div>
                {stat.description && (
                  <p
                    className={`text-sm ${variant === "accent" ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                  >
                    {stat.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
