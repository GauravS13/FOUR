"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Mail, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { subscribeSchema, type SubscribeFormData } from "@/lib/validations"

interface NewsletterFormProps {
  title?: string
  description?: string
  placeholder?: string
  buttonText?: string
  variant?: "default" | "inline"
}

export function NewsletterForm({
  title = "Stay in the Loop",
  description = "Get the latest insights, tips, and updates delivered straight to your inbox.",
  placeholder = "Enter your email address",
  buttonText = "Subscribe",
  variant = "default",
}: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
  })

  const onSubmit = async (data: SubscribeFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubscribed(true)
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        })
        reset()
      } else {
        throw new Error(result.error?.message || "Failed to subscribe")
      }
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubscribed) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">You're all set!</h3>
          <p className="text-muted-foreground">Check your email for a confirmation message.</p>
        </div>
      </div>
    )
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 max-w-md">
        <div className="flex-1">
          <Input
            type="email"
            {...register("email")}
            placeholder={placeholder}
            className={errors.email ? "border-destructive" : ""}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
        </Button>
      </form>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            {...register("email")}
            placeholder={placeholder}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              {buttonText}
            </>
          )}
        </Button>
      </form>

      <p className="text-xs text-muted-foreground text-center">We respect your privacy. Unsubscribe at any time.</p>
    </div>
  )
}
