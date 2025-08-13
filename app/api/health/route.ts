import { getDatabaseHealth } from "@/lib/database"
import { createSuccessResponse, createErrorResponse } from "@/lib/api-response"

export const runtime = "nodejs"

export async function GET() {
  try {
    const dbHealth = await getDatabaseHealth()

    const healthData = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      database: dbHealth,
      uptime: process.uptime(),
    }

    const statusCode = dbHealth.status === "healthy" ? 200 : 503

    return createSuccessResponse(healthData, "Health check completed", statusCode)
  } catch (error) {
    console.error("Health check error:", error)
    return createErrorResponse("Health check failed", 503, "HEALTH_CHECK_FAILED")
  }
}
