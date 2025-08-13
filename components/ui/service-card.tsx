import Link from "next/link"
import { ArrowRight, Code, Cloud, Smartphone, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const iconMap = {
  code: Code,
  cloud: Cloud,
  smartphone: Smartphone,
  "trending-up": TrendingUp,
} as const

interface ServiceCardProps {
  id: string
  title: string
  description: string
  icon: keyof typeof iconMap
  features: string[]
  href?: string
}

export function ServiceCard({ id, title, description, icon, features, href }: ServiceCardProps) {
  const Icon = iconMap[icon] || Code

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
        </div>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {features.slice(0, 3).map((feature) => (
            <Badge key={feature} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
          {features.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{features.length - 3} more
            </Badge>
          )}
        </div>
        <Button asChild variant="ghost" className="w-full justify-between group/button">
          <Link href={href || `/services/${id}`}>
            Learn More
            <ArrowRight className="h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
