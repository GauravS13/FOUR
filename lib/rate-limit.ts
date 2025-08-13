import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// Create Redis instance for rate limiting
const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null

// Fallback in-memory store for development
const inMemoryStore = new Map<string, { count: number; resetTime: number }>()

// Rate limiters
export const contactFormLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"), // 5 requests per 10 minutes
      analytics: true,
    })
  : null

export const apiLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(60, "10 m"), // 60 requests per 10 minutes
      analytics: true,
    })
  : null

// Fallback rate limiting for development
export async function checkRateLimit(
  identifier: string,
  limit = 5,
  windowMs: number = 10 * 60 * 1000, // 10 minutes
): Promise<{ success: boolean; remaining: number; reset: Date }> {
  if (redis && apiLimiter) {
    const result = await apiLimiter.limit(identifier)
    return {
      success: result.success,
      remaining: result.remaining,
      reset: new Date(result.reset),
    }
  }

  // Fallback in-memory rate limiting
  const now = Date.now()
  const key = identifier
  const record = inMemoryStore.get(key)

  if (!record || now > record.resetTime) {
    inMemoryStore.set(key, { count: 1, resetTime: now + windowMs })
    return { success: true, remaining: limit - 1, reset: new Date(now + windowMs) }
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0, reset: new Date(record.resetTime) }
  }

  record.count++
  return { success: true, remaining: limit - record.count, reset: new Date(record.resetTime) }
}
