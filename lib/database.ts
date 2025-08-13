"use server"

import { initializeDatabase, checkDatabaseConnection } from "@/db/collections"

// Server-only database utilities
export async function ensureDatabaseConnection(): Promise<void> {
  const isConnected = await checkDatabaseConnection()
  if (!isConnected) {
    throw new Error("Database connection failed")
  }
}

export async function setupDatabase(): Promise<void> {
  await ensureDatabaseConnection()
  await initializeDatabase()
}

// Health check endpoint helper
export async function getDatabaseHealth(): Promise<{
  status: "healthy" | "unhealthy"
  message: string
  timestamp: string
}> {
  try {
    const isConnected = await checkDatabaseConnection()
    return {
      status: isConnected ? "healthy" : "unhealthy",
      message: isConnected ? "Database connection successful" : "Database connection failed",
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      status: "unhealthy",
      message: error instanceof Error ? error.message : "Unknown database error",
      timestamp: new Date().toISOString(),
    }
  }
}
