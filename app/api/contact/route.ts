import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import nodemailer from "nodemailer"

// -------------------- Validation Schema --------------------
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject is too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
})

// -------------------- Rate Limit --------------------
const rateLimitStore = new Map<string, { count: number; resetTime: number; blocked: boolean }>()

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  const ip = forwarded ? forwarded.split(",")[0] : realIP || request.ip || "unknown"
  return ip
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const limit = rateLimitStore.get(key)

  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + 300000, blocked: false })
    return false
  }

  if (limit.blocked) return true

  if (limit.count >= 3) {
    limit.blocked = true
    return true
  }

  limit.count++
  return false
}

// -------------------- Sanitizer --------------------
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim()
}

// -------------------- POST Handler --------------------
export async function POST(request: NextRequest) {
  try {
    const rateLimitKey = getRateLimitKey(request)
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": "300",
            "X-RateLimit-Limit": "3",
            "X-RateLimit-Remaining": "0",
          },
        },
      )
    }

    const formData = await request.formData()
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    // Validation
    const validatedData = contactSchema.parse(data)

    // Sanitization
    const sanitizedData = {
      name: sanitizeInput(validatedData.name),
      email: validatedData.email.toLowerCase().trim(),
      subject: sanitizeInput(validatedData.subject),
      message: sanitizeInput(validatedData.message),
    }

    // Spam filtering
    const suspiciousPatterns = [
      /\b(viagra|cialis|casino|lottery|winner)\b/i,
      /\b(click here|act now|limited time)\b/i,
      /<script|javascript:|data:/i,
    ]
    const isSuspicious = suspiciousPatterns.some((pattern) =>
      pattern.test(sanitizedData.name + sanitizedData.subject + sanitizedData.message),
    )

    if (isSuspicious) {
      return NextResponse.json(
        { error: "Message flagged as suspicious. Please contact directly via email." },
        { status: 400 },
      )
    }

    // -------------------- Nodemailer Setup --------------------
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    })

    const mailOptions = {
      from: `"${sanitizedData.name}" <${sanitizedData.email}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: sanitizedData.subject,
      text: `Name: ${sanitizedData.name}
Email: ${sanitizedData.email}

${sanitizedData.message}
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    // Simulate delay for frontend UX
    await new Promise((r) => setTimeout(r, 1500))

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      {
        headers: {
          "X-RateLimit-Limit": "3",
          "X-RateLimit-Remaining": String(2 - (rateLimitStore.get(rateLimitKey)?.count || 0)),
        },
      },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Server Error:", error)
    return NextResponse.json({ error: "Internal server error. Please try again later." }, { status: 500 })
  }
}
