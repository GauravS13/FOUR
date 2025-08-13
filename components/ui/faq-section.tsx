"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  description?: string
  faqs: FAQItem[]
}

const defaultFAQs: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer:
      "We offer comprehensive IT services including web development, mobile app development, cloud solutions, digital transformation, and ongoing technical support. Our team specializes in modern technologies like React, Next.js, Node.js, and cloud platforms.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity and scope. A simple website might take 2-4 weeks, while a complex web application could take 3-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the development process.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes, we offer comprehensive support and maintenance packages. This includes regular updates, security patches, performance monitoring, and technical support. We believe in long-term partnerships with our clients.",
  },
  {
    question: "What is your development process?",
    answer:
      "Our process includes Discovery & Planning, Design & Prototyping, Development, Testing, and Launch phases. We use agile methodologies with regular check-ins and demos to ensure the project meets your expectations.",
  },
  {
    question: "Can you work with our existing team?",
    answer:
      "We're experienced in collaborating with in-house teams, other agencies, and stakeholders. We can integrate seamlessly into your existing workflows and provide the expertise you need to complement your team.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "We specialize in modern web technologies including React, Next.js, TypeScript, Node.js, MongoDB, PostgreSQL, AWS, and Docker. We stay current with the latest industry trends and best practices.",
  },
]

export function FAQSection({
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about our services and process.",
  faqs = defaultFAQs,
}: FAQSectionProps) {
  return (
    <section className="py-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">{title}</h2>
            <p className="text-muted-foreground text-lg">{description}</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  )
}
