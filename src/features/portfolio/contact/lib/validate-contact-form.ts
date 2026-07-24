import { pickLocale } from '@/cv-data'
import type { Locale } from '@/shared/types'
import { contactCopy } from '../data/contact'
import { contactMessageSchema } from './contact-schema'
import type { ZodIssue } from 'zod'

export type ContactFieldKey =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'subject'
  | 'message'

export type ContactFieldError = {
  field: ContactFieldKey
  label: string
  message: string
}

const FIELD_KEYS = new Set<ContactFieldKey>([
  'firstName',
  'lastName',
  'email',
  'phone',
  'subject',
  'message',
])

const fieldLabels: Record<
  ContactFieldKey,
  (typeof contactCopy.form)[ContactFieldKey]
> = {
  firstName: contactCopy.form.firstName,
  lastName: contactCopy.form.lastName,
  email: contactCopy.form.email,
  phone: contactCopy.form.phone,
  subject: contactCopy.form.subject,
  message: contactCopy.form.message,
}

function isContactField(value: unknown): value is ContactFieldKey {
  return typeof value === 'string' && FIELD_KEYS.has(value as ContactFieldKey)
}

function messageForField(
  field: ContactFieldKey,
  value: string,
  locale: Locale,
  code?: string,
): string {
  const v = contactCopy.form.validation

  if (field === 'email') {
    if (!value.trim()) return pickLocale(v.emailRequired, locale)
    if (code === 'too_big') return pickLocale(v.emailMax, locale)
    return pickLocale(v.emailInvalid, locale)
  }

  if (field === 'message') {
    if (!value.trim() || code === 'too_small') {
      return pickLocale(v.messageRequired, locale)
    }
    return pickLocale(v.messageMax, locale)
  }

  if (field === 'firstName') return pickLocale(v.firstNameMax, locale)
  if (field === 'lastName') return pickLocale(v.lastNameMax, locale)
  if (field === 'phone') {
    if (code === 'too_big') return pickLocale(v.phoneMax, locale)
    return pickLocale(v.phoneInvalid, locale)
  }
  return pickLocale(v.subjectMax, locale)
}

function toFieldError(
  field: ContactFieldKey,
  value: string,
  locale: Locale,
  code?: string,
): ContactFieldError {
  return {
    field,
    label: pickLocale(fieldLabels[field], locale).replace(/\s*\*$/, ''),
    message: messageForField(field, value, locale, code),
  }
}

/** Map Zod issues to one localized error per field (first issue wins). */
export function localizeContactIssues(
  issues: ZodIssue[],
  values: Partial<Record<ContactFieldKey, string>>,
  locale: Locale,
): ContactFieldError[] {
  const seen = new Set<ContactFieldKey>()
  const errors: ContactFieldError[] = []

  for (const issue of issues) {
    const field = issue.path[0]
    if (!isContactField(field) || seen.has(field)) continue
    seen.add(field)
    errors.push(toFieldError(field, values[field] ?? '', locale, issue.code))
  }

  return errors
}

export function validateContactForm(
  values: {
    firstName: string
    lastName: string
    email: string
    phone: string
    subject: string
    message: string
  },
  locale: Locale,
): { ok: true } | { ok: false; errors: ContactFieldError[] } {
  const parsed = contactMessageSchema.safeParse({
    ...values,
    recaptchaToken: '',
    hp_company: '',
  })

  if (parsed.success) return { ok: true }

  return {
    ok: false,
    errors: localizeContactIssues(parsed.error.issues, values, locale),
  }
}

/** Turn API `flatten().fieldErrors` keys into localized field errors. */
export function localizeFieldErrorMap(
  fieldErrors: Record<string, string[] | undefined>,
  values: Partial<Record<ContactFieldKey, string>>,
  locale: Locale,
): ContactFieldError[] {
  const errors: ContactFieldError[] = []

  for (const field of FIELD_KEYS) {
    if (!fieldErrors[field]?.length) continue
    errors.push(toFieldError(field, values[field] ?? '', locale))
  }

  return errors
}
