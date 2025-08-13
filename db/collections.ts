import type { Collection, CreateIndexesOptions, IndexSpecification } from "mongodb"
import { z } from "zod"
import { getDatabase } from "./client"

// Zod schemas for database documents
export const ContactDocumentSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  company: z.string().optional(),
  budget: z.enum(["under-10k", "10k-25k", "25k-50k", "50k-100k", "100k-plus"]),
  message: z.string(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  status: z.enum(["new", "contacted", "qualified", "closed"]).default("new"),
  source: z.string().default("website"),
})

export const SubscriberDocumentSchema = z.object({
  _id: z.string().optional(),
  email: z.string().email(),
  status: z.enum(["active", "unsubscribed"]).default("active"),
  subscribedAt: z.date().default(() => new Date()),
  unsubscribedAt: z.date().optional(),
  source: z.string().default("website"),
  preferences: z
    .object({
      newsletter: z.boolean().default(true),
      productUpdates: z.boolean().default(false),
      marketing: z.boolean().default(false),
    })
    .default({}),
})

export const JobApplicationDocumentSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  roleId: z.string(),
  resumeUrl: z.string().url().optional(),
  portfolioUrl: z.string().url().optional(),
  message: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  status: z.enum(["submitted", "reviewing", "interview", "rejected", "hired"]).default("submitted"),
  notes: z.string().optional(),
})

// Type definitions
export type ContactDocument = z.infer<typeof ContactDocumentSchema>
export type SubscriberDocument = z.infer<typeof SubscriberDocumentSchema>
export type JobApplicationDocument = z.infer<typeof JobApplicationDocumentSchema>

// Collection names
export const COLLECTIONS = {
  CONTACTS: "contacts",
  SUBSCRIBERS: "subscribers",
  JOB_APPLICATIONS: "jobs",
} as const

export async function checkDatabaseConnection(): Promise<{ connected: boolean; error?: string }> {
  try {
    const db = await getDatabase()
    // Ping the database to check connection
    await db.admin().ping()
    return { connected: true }
  } catch (error) {
    console.error("Database connection check failed:", error)
    return {
      connected: false,
      error: error instanceof Error ? error.message : "Unknown database error",
    }
  }
}

// Collection getters with proper typing
export async function getContactsCollection(): Promise<Collection<ContactDocument>> {
  const db = await getDatabase()
  return db.collection<ContactDocument>(COLLECTIONS.CONTACTS)
}

export async function getSubscribersCollection(): Promise<Collection<SubscriberDocument>> {
  const db = await getDatabase()
  return db.collection<SubscriberDocument>(COLLECTIONS.SUBSCRIBERS)
}

export async function getJobApplicationsCollection(): Promise<Collection<JobApplicationDocument>> {
  const db = await getDatabase()
  return db.collection<JobApplicationDocument>(COLLECTIONS.JOB_APPLICATIONS)
}

// Initialize database indexes
export async function initializeDatabase(): Promise<void> {
  try {
    console.log("Initializing database indexes...")

    const contactsCollection = await getContactsCollection()
    const subscribersCollection = await getSubscribersCollection()
    const jobApplicationsCollection = await getJobApplicationsCollection()

    // Create indexes for contacts
    for (const { spec, options } of contactIndexes) {
      await contactsCollection.createIndex(spec, options)
    }

    // Create indexes for subscribers
    for (const { spec, options } of subscriberIndexes) {
      await subscribersCollection.createIndex(spec, options)
    }

    // Create indexes for job applications
    for (const { spec, options } of jobApplicationIndexes) {
      await jobApplicationsCollection.createIndex(spec, options)
    }

    console.log("Database indexes initialized successfully")
  } catch (error) {
    console.error("Failed to initialize database indexes:", error)
    throw error
  }
}

// Helper functions for common database operations
export class ContactsRepository {
  static async create(data: Omit<ContactDocument, "_id" | "createdAt" | "updatedAt">): Promise<ContactDocument> {
    const collection = await getContactsCollection()
    const document = ContactDocumentSchema.parse({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const result = await collection.insertOne(document)
    return { ...document, _id: result.insertedId.toString() }
  }

  static async findByEmail(email: string): Promise<ContactDocument | null> {
    const collection = await getContactsCollection()
    return await collection.findOne({ email })
  }

  static async findRecent(limit = 10): Promise<ContactDocument[]> {
    const collection = await getContactsCollection()
    return await collection.find({}).sort({ createdAt: -1 }).limit(limit).toArray()
  }

  static async updateStatus(id: string, status: ContactDocument["status"]): Promise<boolean> {
    const collection = await getContactsCollection()
    const result = await collection.updateOne({ _id: id }, { $set: { status, updatedAt: new Date() } })
    return result.modifiedCount > 0
  }
}

export class SubscribersRepository {
  static async create(data: Omit<SubscriberDocument, "_id" | "subscribedAt">): Promise<SubscriberDocument> {
    const collection = await getSubscribersCollection()
    const document = SubscriberDocumentSchema.parse({
      ...data,
      subscribedAt: new Date(),
    })

    try {
      const result = await collection.insertOne(document)
      return { ...document, _id: result.insertedId.toString() }
    } catch (error: any) {
      if (error.code === 11000) {
        // Duplicate email - update existing subscriber
        await collection.updateOne(
          { email: data.email },
          {
            $set: {
              status: "active",
              subscribedAt: new Date(),
              $unset: { unsubscribedAt: "" },
            },
          },
        )
        return (await collection.findOne({ email: data.email })) as SubscriberDocument
      }
      throw error
    }
  }

  static async findByEmail(email: string): Promise<SubscriberDocument | null> {
    const collection = await getSubscribersCollection()
    return await collection.findOne({ email })
  }

  static async unsubscribe(email: string): Promise<boolean> {
    const collection = await getSubscribersCollection()
    const result = await collection.updateOne(
      { email },
      { $set: { status: "unsubscribed", unsubscribedAt: new Date() } },
    )
    return result.modifiedCount > 0
  }

  static async getActiveCount(): Promise<number> {
    const collection = await getSubscribersCollection()
    return await collection.countDocuments({ status: "active" })
  }
}

export class JobApplicationsRepository {
  static async create(
    data: Omit<JobApplicationDocument, "_id" | "createdAt" | "updatedAt">,
  ): Promise<JobApplicationDocument> {
    const collection = await getJobApplicationsCollection()
    const document = JobApplicationDocumentSchema.parse({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const result = await collection.insertOne(document)
    return { ...document, _id: result.insertedId.toString() }
  }

  static async findByRole(roleId: string, limit = 50): Promise<JobApplicationDocument[]> {
    const collection = await getJobApplicationsCollection()
    return await collection.find({ roleId }).sort({ createdAt: -1 }).limit(limit).toArray()
  }

  static async updateStatus(id: string, status: JobApplicationDocument["status"], notes?: string): Promise<boolean> {
    const collection = await getJobApplicationsCollection()
    const updateData: any = { status, updatedAt: new Date() }
    if (notes) updateData.notes = notes

    const result = await collection.updateOne({ _id: id }, { $set: updateData })
    return result.modifiedCount > 0
  }

  static async findRecent(limit = 20): Promise<JobApplicationDocument[]> {
    const collection = await getJobApplicationsCollection()
    return await collection.find({}).sort({ createdAt: -1 }).limit(limit).toArray()
  }
}

// Index definitions
const contactIndexes: Array<{ spec: IndexSpecification; options?: CreateIndexesOptions }> = [
  { spec: { email: 1, createdAt: -1 }, options: { name: "email_createdAt" } },
  { spec: { createdAt: -1 }, options: { name: "createdAt_desc" } },
  { spec: { status: 1 }, options: { name: "status" } },
]

const subscriberIndexes: Array<{ spec: IndexSpecification; options?: CreateIndexesOptions }> = [
  { spec: { email: 1 }, options: { unique: true, name: "email_unique" } },
  { spec: { subscribedAt: -1 }, options: { name: "subscribedAt_desc" } },
  { spec: { status: 1 }, options: { name: "status" } },
]

const jobApplicationIndexes: Array<{ spec: IndexSpecification; options?: CreateIndexesOptions }> = [
  { spec: { roleId: 1, createdAt: -1 }, options: { name: "roleId_createdAt" } },
  { spec: { email: 1 }, options: { name: "email" } },
  { spec: { createdAt: -1 }, options: { name: "createdAt_desc" } },
  { spec: { status: 1 }, options: { name: "status" } },
]
