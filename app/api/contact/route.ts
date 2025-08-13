import type { NextRequest } from "next/server"
import { contactSchema } from "@/lib/validations"
import { ContactsRepository } from "@/db/collections"
import { checkRateLimit } from "@/lib/rate-limit"
import { createSuccessResponse, createErrorResponse, createRateLimitResponse } from "@/lib/api-response"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.ip || request.headers.get("x-forwarded-for") || "anonymous"

    // Parse request body
    const body = await request.json()

    // Validate input data
    const validationResult = contactSchema.safeParse(body)
    if (!validationResult.success) {
      return createErrorResponse("Invalid form data", 400, "VALIDATION_ERROR", validationResult.error.errors)
    }

    const { name, email, company, budget, message } = validationResult.data

    // Rate limiting - 5 requests per 10 minutes per IP + email combination
    const rateLimitKey = `contact:${clientIP}:${email}`
    const rateLimitResult = await checkRateLimit(rateLimitKey, 5, 10 * 60 * 1000)

    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult.reset)
    }

    // Check if this email has submitted recently (prevent spam)
    const recentContact = await ContactsRepository.findByEmail(email)
    if (recentContact) {
      const timeSinceLastContact = Date.now() - recentContact.createdAt.getTime()
      const oneHourInMs = 60 * 60 * 1000

      if (timeSinceLastContact < oneHourInMs) {
        return createErrorResponse(
          "You have already submitted a contact form recently. Please wait before submitting again.",
          429,
          "DUPLICATE_SUBMISSION",
        )
      }
    }

    // Create contact record
    const contact = await ContactsRepository.create({
      name,
      email,
      company,
      budget,
      message,
      status: "new",
      source: "website",
    })

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to user

    return createSuccessResponse(
      { contactId: contact._id },
      "Thank you for your message! We'll get back to you within 24 hours.",
      201,
    )
  } catch (error) {
    console.error("Contact form submission error:", error)
    return createErrorResponse(
      "An error occurred while processing your request. Please try again later.",
      500,
      "INTERNAL_ERROR",
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return createErrorResponse("Method not allowed", 405, "METHOD_NOT_ALLOWED")
}

export async function PUT() {
  return createErrorResponse("Method not allowed", 405, "METHOD_NOT_ALLOWED")
}

export async function DELETE() {
  return createErrorResponse("Method not allowed", 405, "METHOD_NOT_ALLOWED")
}
