"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { jobApplicationSchema, type JobApplicationData } from "@/lib/validations"

interface JobApplicationFormProps {
  roleId: string
}

export function JobApplicationForm({ roleId }: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobApplicationData>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      roleId,
    },
  })

  const onSubmit = async (data: JobApplicationData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Application submitted successfully!",
          description: "We'll review your application and get back to you soon.",
        })
        reset()
      } else {
        throw new Error(result.error?.message || "Failed to submit application")
      }
    } catch (error) {
      toast({
        title: "Error submitting application",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Your full name"
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="your.email@example.com"
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="resumeUrl">Resume URL</Label>
        <Input
          id="resumeUrl"
          type="url"
          {...register("resumeUrl")}
          placeholder="https://drive.google.com/..."
          className={errors.resumeUrl ? "border-destructive" : ""}
        />
        {errors.resumeUrl && <p className="text-sm text-destructive">{errors.resumeUrl.message}</p>}
        <p className="text-xs text-muted-foreground">
          Please provide a link to your resume (Google Drive, Dropbox, etc.)
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="portfolioUrl">Portfolio URL</Label>
        <Input
          id="portfolioUrl"
          type="url"
          {...register("portfolioUrl")}
          placeholder="https://yourportfolio.com"
          className={errors.portfolioUrl ? "border-destructive" : ""}
        />
        {errors.portfolioUrl && <p className="text-sm text-destructive">{errors.portfolioUrl.message}</p>}
        <p className="text-xs text-muted-foreground">Link to your portfolio, GitHub, or personal website</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Cover Letter / Message</Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Tell us why you're interested in this role and what makes you a great fit..."
          rows={6}
          className={errors.message ? "border-destructive" : ""}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting Application...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Submit Application
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting this application, you agree to our privacy policy and terms of service.
      </p>
    </form>
  )
}
