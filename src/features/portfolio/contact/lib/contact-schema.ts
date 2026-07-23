import { z } from 'zod'

export const contactMessageSchema = z.object({
  firstName: z.string().trim().max(80).optional().default(''),
  lastName: z.string().trim().max(80).optional().default(''),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().default(''),
  subject: z.string().trim().max(160).optional().default(''),
  message: z.string().trim().min(1).max(5000),
  /** Honeypot — bots fill this; browsers must not autofill it */
  hp_company: z.string().optional().default(''),
})

export type ContactMessageInput = z.infer<typeof contactMessageSchema>
