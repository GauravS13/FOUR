export const SITE_CONFIG = {
  name: "TechFlow Solutions",
  description: "Leading IT company providing web development, cloud solutions, and digital transformation services.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://techflow-solutions.com",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/techflowsolutions",
    github: "https://github.com/techflowsolutions",
    linkedin: "https://linkedin.com/company/techflowsolutions",
  },
  contact: {
    email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "contact@techflow-solutions.com",
    phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "+1 (555) 123-4567",
    address: "123 Tech Street, Innovation District, San Francisco, CA 94105",
  },
} as const

export const NAVIGATION_ITEMS = [
  {
    title: "Services",
    href: "/services",
    description: "Our comprehensive IT solutions",
  },
  {
    title: "Case Studies",
    href: "/case-studies",
    description: "Success stories and client results",
  },
  {
    title: "About",
    href: "/about",
    description: "Learn about our team and mission",
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Latest insights and industry trends",
  },
  {
    title: "Careers",
    href: "/careers",
    description: "Join our growing team",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Get in touch with us",
  },
] as const

export const SERVICES = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Custom web applications built with modern technologies",
    icon: "code",
    features: ["React & Next.js", "TypeScript", "Responsive Design", "Performance Optimization"],
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and migration services",
    icon: "cloud",
    features: ["AWS & Azure", "DevOps", "Containerization", "Monitoring"],
  },
  {
    id: "mobile-development",
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications",
    icon: "smartphone",
    features: ["React Native", "iOS & Android", "App Store Deployment", "Push Notifications"],
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    description: "Modernize your business processes and technology stack",
    icon: "trending-up",
    features: ["Process Automation", "Legacy System Migration", "API Integration", "Data Analytics"],
  },
] as const

export const TECH_STACK = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "MongoDB", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "Tailwind CSS", category: "Styling" },
] as const
