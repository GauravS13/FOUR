import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface BlogCardProps {
  id: string
  title: string
  description: string
  author: string
  publishedAt: string
  tags: string[]
  image: string
  readingTime: number
  featured?: boolean
}

export function BlogCard({
  id,
  title,
  description,
  author,
  publishedAt,
  tags,
  image,
  readingTime,
  featured = false,
}: BlogCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

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
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>
          <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">{title}</CardTitle>
          <CardDescription className="leading-relaxed">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">By {author}</span>
          <Button asChild variant="ghost" size="sm" className="group/button">
            <Link href={`/blog/${id}`}>
              Read More
              <ArrowRight className="h-4 w-4 ml-1 group-hover/button:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
