import { z } from "zod"

// Contact Form Schema
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  budget: z.enum(["under-10k", "10k-25k", "25k-50k", "50k-100k", "100k-plus"], {
    required_error: "Please select a budget range",
  }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
})

export type ContactFormData = z.infer<typeof contactSchema>

// Newsletter Subscription Schema
export const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export type SubscribeFormData = z.infer<typeof subscribeSchema>

// Job Application Schema
export const jobApplicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  roleId: z.string().min(1, "Role ID is required"),
  resumeUrl: z.string().url("Please provide a valid resume URL").optional(),
  portfolioUrl: z.string().url("Please provide a valid portfolio URL").optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
    .optional(),
})

export type JobApplicationData = z.infer<typeof jobApplicationSchema>

// Budget options for forms
export const budgetOptions = [
  { value: "under-10k", label: "Under $10,000" },
  { value: "10k-25k", label: "$10,000 - $25,000" },
  { value: "25k-50k", label: "$25,000 - $50,000" },
  { value: "50k-100k", label: "$50,000 - $100,000" },
  { value: "100k-plus", label: "$100,000+" },
] as const
