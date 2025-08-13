import type { NextRequest } from "next/server"
import { subscribeSchema } from "@/lib/validations"
import { SubscribersRepository } from "@/db/collections"
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
    const validationResult = subscribeSchema.safeParse(body)
    if (!validationResult.success) {
      return createErrorResponse("Invalid email address", 400, "VALIDATION_ERROR", validationResult.error.errors)
    }

    const { email } = validationResult.data

    // Rate limiting - 10 requests per 10 minutes per IP
    const rateLimitKey = `subscribe:${clientIP}`
    const rateLimitResult = await checkRateLimit(rateLimitKey, 10, 10 * 60 * 1000)

    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult.reset)
    }

    // Check if already subscribed
    const existingSubscriber = await SubscribersRepository.findByEmail(email)
    if (existingSubscriber && existingSubscriber.status === "active") {
      return createErrorResponse("This email is already subscribed to our newsletter.", 409, "ALREADY_SUBSCRIBED")
    }

    // Create or reactivate subscription
    const subscriber = await SubscribersRepository.create({
      email,
      status: "active",
      source: "website",
      preferences: {
        newsletter: true,
        productUpdates: false,
        marketing: false,
      },
    })

    // TODO: Send welcome email
    // TODO: Add to email marketing platform

    return createSuccessResponse(
      { subscriberId: subscriber._id },
      "Successfully subscribed! Check your email for confirmation.",
      201,
    )
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return createErrorResponse(
      "An error occurred while processing your subscription. Please try again later.",
      500,
      "INTERNAL_ERROR",
    )
  }
}

// Unsubscribe endpoint
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return createErrorResponse("Email parameter is required", 400, "MISSING_EMAIL")
    }

    const validationResult = subscribeSchema.safeParse({ email })
    if (!validationResult.success) {
      return createErrorResponse("Invalid email address", 400, "VALIDATION_ERROR")
    }

    const success = await SubscribersRepository.unsubscribe(email)
    if (!success) {
      return createErrorResponse("Email not found in our subscription list", 404, "NOT_FOUND")
    }

    return createSuccessResponse(null, "Successfully unsubscribed from our newsletter.")
  } catch (error) {
    console.error("Newsletter unsubscribe error:", error)
    return createErrorResponse("An error occurred while unsubscribing. Please try again later.", 500, "INTERNAL_ERROR")
  }
}

// Handle unsupported methods
export async function GET() {
  return createErrorResponse("Method not allowed", 405, "METHOD_NOT_ALLOWED")
}

export async function PUT() {
  return createErrorResponse("Method not allowed", 405, "METHOD_NOT_ALLOWED")
}
