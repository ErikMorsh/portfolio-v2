import { NextResponse } from 'next/server'
import { db, messages } from '@/db'
import { contactMessageSchema } from '@/features/portfolio/contact/lib/contact-schema'
import {
  checkRateLimit,
  clientIpFromHeaders,
} from '@/features/portfolio/contact/lib/rate-limit'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const ip = clientIpFromHeaders(request.headers)
  const limited = checkRateLimit(`contact:${ip}`)
  if (!limited.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(limited.retryAfterSec) },
      },
    )
  }

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const parsed = contactMessageSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed.', issues: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const data = parsed.data
  if (data.website) {
    // Honeypot tripped — pretend success
    return NextResponse.json({ ok: true })
  }

  const subject = data.subject || 'Project Inquiry'

  try {
    const [row] = await db
      .insert(messages)
      .values({
        firstName: data.firstName || '—',
        lastName: data.lastName || '',
        email: data.email,
        phone: data.phone || null,
        subject,
        body: data.message,
        status: 'unread',
      })
      .returning({ id: messages.id })

    return NextResponse.json({ ok: true, id: row?.id })
  } catch (error) {
    console.error('[contact] insert failed', error)
    return NextResponse.json(
      { error: 'Could not save your message. Please try again.' },
      { status: 500 },
    )
  }
}
