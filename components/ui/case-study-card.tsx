import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CaseStudyCardProps {
  id: string
  title: string
  client: string
  industry: string
  description: string
  image: string
  tags: string[]
  metrics?: Array<{
    label: string
    value: string
  }>
  featured?: boolean
}

export function CaseStudyCard({
  id,
  title,
  client,
  industry,
  description,
  image,
  tags,
  metrics,
  featured = false,
}: CaseStudyCardProps) {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${featured ? "border-primary" : ""}`}>
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground">Featured</Badge>
          </div>
        )}
      </div>
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{industry}</Badge>
            <span className="text-sm text-muted-foreground">{client}</span>
          </div>
          <CardTitle className="text-xl leading-tight">{title}</CardTitle>
          <CardDescription className="leading-relaxed">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {metrics.slice(0, 2).map((metric, index) => (
              <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="font-bold text-lg text-primary">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Button asChild variant="ghost" className="w-full justify-between group/button">
          <Link href={`/case-studies/${id}`}>
            View Case Study
            <ArrowRight className="h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
