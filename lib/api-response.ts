import { NextResponse } from "next/server"

export interface ApiError {
  message: string
  code?: string
  details?: unknown
}

export interface ApiSuccess<T = unknown> {
  success: true
  data?: T
  message?: string
}

export interface ApiErrorResponse {
  success: false
  error: ApiError
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiErrorResponse

export function createSuccessResponse<T>(data?: T, message?: string, status = 200): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    } satisfies ApiSuccess<T>,
    { status },
  )
}

export function createErrorResponse(message: string, status = 400, code?: string, details?: unknown): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code,
        details,
      },
    } satisfies ApiErrorResponse,
    { status },
  )
}

export function createRateLimitResponse(resetTime: Date): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: {
        message: "Too many requests. Please try again later.",
        code: "RATE_LIMIT_EXCEEDED",
        details: { resetTime: resetTime.toISOString() },
      },
    } satisfies ApiErrorResponse,
    {
      status: 429,
      headers: {
        "Retry-After": Math.ceil((resetTime.getTime() - Date.now()) / 1000).toString(),
      },
    },
  )
}
