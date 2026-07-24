import { z } from 'zod'

/** Map Persian / Arabic-Indic digits to ASCII so local keyboards validate cleanly. */
export function normalizePhoneDigits(value: string): string {
  return value.replace(/[\u06F0-\u06F9\u0660-\u0669]/g, (ch) => {
    const code = ch.charCodeAt(0)
    if (code >= 0x06f0 && code <= 0x06f9) return String(code - 0x06f0)
    return String(code - 0x0660)
  })
}

/** Optional phone: empty OK; otherwise 7–15 digits with common separators. */
export function isValidPhoneNumber(value: string): boolean {
  const trimmed = normalizePhoneDigits(value).trim()
  if (!trimmed) return true
  if (!/^[+]?[\d\s().-]+$/.test(trimmed)) return false
  const digits = trimmed.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15
}

export const contactMessageSchema = z.object({
  firstName: z.string().trim().max(80).optional().default(''),
  lastName: z.string().trim().max(80).optional().default(''),
  email: z.string().trim().email().max(254),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine(isValidPhoneNumber, { message: 'Invalid phone number' })
    .optional()
    .default(''),
  subject: z.string().trim().max(160).optional().default(''),
  message: z.string().trim().min(1).max(5000),
  /** Google reCAPTCHA v3 token — required only when enabled in production */
  recaptchaToken: z.string().trim().optional().default(''),
  /** Honeypot — bots fill this; browsers must not autofill it */
  hp_company: z.string().optional().default(''),
})

export type ContactMessageInput = z.infer<typeof contactMessageSchema>
