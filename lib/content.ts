import fs from "fs"
import path from "path"
import { cache } from "react"

export interface ServiceContent {
  id: string
  title: string
  subtitle: string
  description: string
  hero: {
    title: string
    description: string
    image: string
  }
  problem: {
    title: string
    description: string
    points: string[]
  }
  solution: {
    title: string
    description: string
    points: string[]
  }
  benefits: Array<{
    title: string
    description: string
    metric: string
  }>
  technologies: string[]
  process: Array<{
    step: number
    title: string
    description: string
  }>
  cta: {
    title: string
    description: string
    primaryButton: string
    secondaryButton: string
  }
}

export interface CaseStudy {
  id: string
  title: string
  client: string
  industry: string
  description: string
  image: string
  tags: string[]
  metrics: Array<{
    label: string
    value: string
    description: string
  }>
  challenge: string
  solution: string
  results: string[]
  technologies: string[]
  featured: boolean
}

export interface BlogPost {
  id: string
  title: string
  description: string
  content: string
  author: string
  publishedAt: string
  updatedAt?: string
  tags: string[]
  image: string
  featured: boolean
  readingTime: number
}

// Cache content loading functions
export const getServiceContent = cache(async (serviceId: string): Promise<ServiceContent | null> => {
  try {
    const filePath = path.join(process.cwd(), "content", "services", `${serviceId}.json`)
    const fileContent = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContent) as ServiceContent
  } catch (error) {
    console.error(`Error loading service content for ${serviceId}:`, error)
    return null
  }
})

export const getAllServices = cache(async (): Promise<ServiceContent[]> => {
  try {
    const servicesDir = path.join(process.cwd(), "content", "services")
    const files = fs.readdirSync(servicesDir)
    const services = await Promise.all(
      files
        .filter((file) => file.endsWith(".json"))
        .map(async (file) => {
          const serviceId = file.replace(".json", "")
          return getServiceContent(serviceId)
        }),
    )
    return services.filter((service): service is ServiceContent => service !== null)
  } catch (error) {
    console.error("Error loading services:", error)
    return []
  }
})

// Placeholder functions for future content types
export const getCaseStudy = cache(async (caseStudyId: string): Promise<CaseStudy | null> => {
  // TODO: Implement when case studies content is added
  return null
})

export const getAllCaseStudies = cache(async (): Promise<CaseStudy[]> => {
  // TODO: Implement when case studies content is added
  return []
})

export const getBlogPost = cache(async (postId: string): Promise<BlogPost | null> => {
  // TODO: Implement when blog content is added
  return null
})

export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  // TODO: Implement when blog content is added
  return []
})
