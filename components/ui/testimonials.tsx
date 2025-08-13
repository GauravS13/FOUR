import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Container } from "@/components/ui/container"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
}

interface TestimonialsProps {
  title?: string
  description?: string
  testimonials?: Testimonial[]
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "CTO",
    company: "InnovateTech",
    content:
      "TechFlow Solutions transformed our outdated system into a modern, scalable platform. Their expertise in React and cloud architecture was exactly what we needed. The project was delivered on time and exceeded our expectations.",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Founder",
    company: "StartupXYZ",
    content:
      "Working with TechFlow was a game-changer for our startup. They built our MVP quickly and efficiently, allowing us to get to market faster. Their ongoing support has been invaluable as we've scaled.",
    rating: 5,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "GrowthCorp",
    content:
      "The team's attention to detail and commitment to quality is outstanding. They didn't just build what we asked for – they provided valuable insights that improved our entire user experience.",
    rating: 5,
  },
]

export function Testimonials({
  title = "What Our Clients Say",
  description = "Don't just take our word for it. Here's what our clients have to say about working with us.",
  testimonials = defaultTestimonials,
}: TestimonialsProps) {
  return (
    <section className="py-20 bg-muted/30">
      <Container>
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">{title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardContent className="p-8">
                <div className="absolute -top-4 left-8">
                  <div className="bg-primary p-3 rounded-full">
                    <Quote className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>

                <div className="space-y-6 mt-4">
                  {/* Rating */}
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-muted-foreground leading-relaxed">"{testimonial.content}"</blockquote>

                  {/* Author */}
                  <div className="space-y-1">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
