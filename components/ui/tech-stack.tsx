import { Badge } from "@/components/ui/badge"
import { TECH_STACK } from "@/lib/constants"

interface TechStackProps {
  title?: string
  description?: string
  showCategories?: boolean
}

export function TechStack({
  title = "Our Technology Stack",
  description = "We use cutting-edge technologies to build scalable and maintainable solutions.",
  showCategories = true,
}: TechStackProps) {
  const categories = showCategories ? Array.from(new Set(TECH_STACK.map((tech) => tech.category))) : []

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
      </div>

      {showCategories ? (
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category} className="space-y-4">
              <h3 className="text-lg font-semibold text-center">{category}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {TECH_STACK.filter((tech) => tech.category === category).map((tech) => (
                  <Badge key={tech.name} variant="secondary" className="text-sm px-4 py-2">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-3">
          {TECH_STACK.map((tech) => (
            <Badge key={tech.name} variant="secondary" className="text-sm px-4 py-2">
              {tech.name}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
