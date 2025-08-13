import { ContactsRepository, SubscribersRepository, JobApplicationsRepository } from "@/db/collections"
import { createSuccessResponse, createErrorResponse } from "@/lib/api-response"

export const runtime = "nodejs"

// Simple admin endpoint to get basic stats (in production, this should be protected)
export async function GET() {
  try {
    // Get basic statistics
    const [recentContacts, subscriberCount, recentApplications] = await Promise.all([
      ContactsRepository.findRecent(5),
      SubscribersRepository.getActiveCount(),
      JobApplicationsRepository.findRecent(5),
    ])

    const stats = {
      contacts: {
        recent: recentContacts.length,
        total: recentContacts.length, // In a real app, you'd get the total count
      },
      subscribers: {
        active: subscriberCount,
      },
      applications: {
        recent: recentApplications.length,
        total: recentApplications.length, // In a real app, you'd get the total count
      },
      timestamp: new Date().toISOString(),
    }

    return createSuccessResponse(stats, "Statistics retrieved successfully")
  } catch (error) {
    console.error("Stats retrieval error:", error)
    return createErrorResponse("An error occurred while retrieving statistics.", 500, "INTERNAL_ERROR")
  }
}

// Handle unsupported methods
export async function POST() {
  return createErrorResponse("Method not allowed", 405, "METHOD_NOT_ALLOWED")
}

export async function PUT() {
  return createErrorResponse("Method not allowed", 405, "METHOD_NOT_ALLOWED")
}

export async function DELETE() {
  return createErrorResponse("Method not allowed", 405, "METHOD_NOT_ALLOWED")
}
