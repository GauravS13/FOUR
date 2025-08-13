// MongoDB setup script
// Run this script in MongoDB shell or MongoDB Compass

// Declare variables
const db = db.getSiblingDB("techflow-solutions")
const use = db.use

// Switch to the database
use("techflow-solutions")

// Create collections with validation
db.createCollection("contacts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "budget", "message", "createdAt"],
      properties: {
        name: {
          bsonType: "string",
          minLength: 2,
          maxLength: 100,
          description: "Contact name is required and must be 2-100 characters",
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
          description: "Valid email address is required",
        },
        company: {
          bsonType: "string",
          maxLength: 100,
          description: "Company name must be less than 100 characters",
        },
        budget: {
          enum: ["under-10k", "10k-25k", "25k-50k", "50k-100k", "100k-plus"],
          description: "Budget must be one of the predefined ranges",
        },
        message: {
          bsonType: "string",
          minLength: 10,
          maxLength: 2000,
          description: "Message must be 10-2000 characters",
        },
        status: {
          enum: ["new", "contacted", "qualified", "closed"],
          description: "Status must be one of the predefined values",
        },
        createdAt: {
          bsonType: "date",
          description: "Creation date is required",
        },
        updatedAt: {
          bsonType: "date",
          description: "Update date is required",
        },
      },
    },
  },
})

db.createCollection("subscribers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "subscribedAt"],
      properties: {
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
          description: "Valid email address is required",
        },
        status: {
          enum: ["active", "unsubscribed"],
          description: "Status must be active or unsubscribed",
        },
        subscribedAt: {
          bsonType: "date",
          description: "Subscription date is required",
        },
        unsubscribedAt: {
          bsonType: "date",
          description: "Unsubscription date",
        },
      },
    },
  },
})

db.createCollection("jobs", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "roleId", "createdAt"],
      properties: {
        name: {
          bsonType: "string",
          minLength: 2,
          maxLength: 100,
          description: "Applicant name is required and must be 2-100 characters",
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
          description: "Valid email address is required",
        },
        roleId: {
          bsonType: "string",
          minLength: 1,
          description: "Role ID is required",
        },
        resumeUrl: {
          bsonType: "string",
          pattern: "^https?://.+",
          description: "Resume URL must be a valid HTTP/HTTPS URL",
        },
        portfolioUrl: {
          bsonType: "string",
          pattern: "^https?://.+",
          description: "Portfolio URL must be a valid HTTP/HTTPS URL",
        },
        message: {
          bsonType: "string",
          maxLength: 1000,
          description: "Message must be less than 1000 characters",
        },
        status: {
          enum: ["submitted", "reviewing", "interview", "rejected", "hired"],
          description: "Status must be one of the predefined values",
        },
        createdAt: {
          bsonType: "date",
          description: "Creation date is required",
        },
      },
    },
  },
})

// Create indexes for optimal performance
print("Creating indexes...")

// Contacts indexes
db.contacts.createIndex({ email: 1, createdAt: -1 }, { name: "email_createdAt" })
db.contacts.createIndex({ createdAt: -1 }, { name: "createdAt_desc" })
db.contacts.createIndex({ status: 1 }, { name: "status" })

// Subscribers indexes
db.subscribers.createIndex({ email: 1 }, { unique: true, name: "email_unique" })
db.subscribers.createIndex({ subscribedAt: -1 }, { name: "subscribedAt_desc" })
db.subscribers.createIndex({ status: 1 }, { name: "status" })

// Job applications indexes
db.jobs.createIndex({ roleId: 1, createdAt: -1 }, { name: "roleId_createdAt" })
db.jobs.createIndex({ email: 1 }, { name: "email" })
db.jobs.createIndex({ createdAt: -1 }, { name: "createdAt_desc" })
db.jobs.createIndex({ status: 1 }, { name: "status" })

print("Database setup completed successfully!")
print("Collections created: contacts, subscribers, jobs")
print("Indexes created for optimal query performance")
print("Schema validation rules applied")
