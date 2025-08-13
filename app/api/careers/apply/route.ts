import type { NextRequest } from "next/server"
import { jobApplicationSchema } from "@/lib/validations"
import { JobApplicationsRepository } from "@/db/collections"
import { checkRateLimit } from "@/lib/rate-limit"
import { createSuccessResponse, createErrorResponse, createRateLimitResponse } from "@/lib/api-response"

export const runtime = "nodejs"

// Available job roles (in a real app, this might come from a database)
const AVAILABLE_ROLES = [
  "senior-frontend-developer",
  "backend-developer",
  "fullstack-developer",
  "devops-engineer",
  "ui-ux-designer",
  "project-manager",
  "qa-engineer",
] as const

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.ip || request.headers.get("x-forwarded-for") || "anonymous"

    // Parse request body
    const body = await request.json()

    // Validate input data
    const validationResult = jobApplicationSchema.safeParse(body)
    if (!validationResult.success) {
      return createErrorResponse("Invalid application data", 400, "VALIDATION_ERROR", validationResult.error.errors)
    }

    const { name, email, roleId, resumeUrl, portfolioUrl, message } = validationResult.data

    // Validate role exists
    if (!AVAILABLE_ROLES.includes(roleId as any)) {
      return createErrorResponse("Invalid role ID", 400, "INVALID_ROLE")
    }

    // Rate limiting - 5 applications per 10 minutes per IP
    const rateLimitKey = `careers:${clientIP}`
    const rateLimitResult = await checkRateLimit(rateLimitKey, 5, 10 * 60 * 1000)

    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult.reset)
    }

    // Check for duplicate applications (same email + role within 24 hours)
    const recentApplications = await JobApplicationsRepository.findByRole(roleId)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

    const duplicateApplication = recentApplications.find((app) => app.email === email && app.createdAt > oneDayAgo)

    if (duplicateApplication) {
      return createErrorResponse(
        "You have already applied for this position recently. Please wait 24 hours before applying again.",
        409,
        "DUPLICATE_APPLICATION",
      )
    }

    // Create job application record
    const application = await JobApplicationsRepository.create({
      name,
      email,
      roleId,
      resumeUrl,
      portfolioUrl,
      message,
      status: "submitted",
    })

    // TODO: Send email notification to HR team
    // TODO: Send confirmation email to applicant
    // TODO: Parse resume and extract relevant information

    return createSuccessResponse(
      { applicationId: application._id },
      "Thank you for your application! We'll review it and get back to you soon.",
      201,
    )
  } catch (error) {
    console.error("Job application submission error:", error)
    return createErrorResponse(
      "An error occurred while processing your application. Please try again later.",
      500,
      "INTERNAL_ERROR",
    )
  }
}

// Get available roles
export async function GET() {
  try {
    const roles = [
      {
        id: "senior-frontend-developer",
        title: "Senior Frontend Developer",
        department: "Engineering",
        location: "Remote / San Francisco",
        type: "Full-time",
        description: "Lead frontend development using React, Next.js, and TypeScript.",
      },
      {
        id: "backend-developer",
        title: "Backend Developer",
        department: "Engineering",
        location: "Remote / San Francisco",
        type: "Full-time",
        description: "Build scalable backend services using Node.js and cloud technologies.",
      },
      {
        id: "fullstack-developer",
        title: "Fullstack Developer",
        department: "Engineering",
        location: "Remote / San Francisco",
        type: "Full-time",
        description: "Work across the full stack to deliver end-to-end solutions.",
      },
      {
        id: "devops-engineer",
        title: "DevOps Engineer",
        department: "Engineering",
        location: "Remote / San Francisco",
        type: "Full-time",
        description: "Manage cloud infrastructure and deployment pipelines.",
      },
      {
        id: "ui-ux-designer",
        title: "UI/UX Designer",
        department: "Design",
        location: "Remote / San Francisco",
        type: "Full-time",
        description: "Create beautiful and intuitive user experiences.",
      },
      {
        id: "project-manager",
        title: "Project Manager",
        department: "Operations",
        location: "Remote / San Francisco",
        type: "Full-time",
        description: "Lead project delivery and coordinate cross-functional teams.",
      },
      {
        id: "qa-engineer",
        title: "QA Engineer",
        department: "Engineering",
        location: "Remote / San Francisco",
        type: "Full-time",
        description: "Ensure quality through comprehensive testing strategies.",
      },
    ]

    return createSuccessResponse(roles, "Available job roles retrieved successfully.")
  } catch (error) {
    console.error("Error fetching job roles:", error)
    return createErrorResponse("An error occurred while fetching job roles.", 500, "INTERNAL_ERROR")
  }
}

// Handle unsupported methods
export async function PUT() {
  return createErrorResponse("Method not allowed", 405, "METHOD_NOT_ALLOWED")
}

export async function DELETE() {
  return createErrorResponse("Method not allowed", 405, "METHOD_NOT_ALLOWED")
}
