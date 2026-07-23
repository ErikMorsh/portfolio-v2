import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { Box, Button } from '@mui/material'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { contactCopy } from '../data/contact'

type ContactFormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
  hp_company: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

const initialState: ContactFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  hp_company: '',
}

export function ContactForm() {
  const { locale } = useAppTheme()
  const [form, setForm] = useState<ContactFormState>(initialState)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const update =
    (field: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }))
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')
    setErrorMessage(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          subject:
            form.subject.trim() ||
            pickLocale(contactCopy.form.subjectPlaceholder, locale),
          message: form.message,
          hp_company: form.hp_company,
        }),
      })

      const data = (await response.json().catch(() => null)) as {
        error?: string
        ok?: boolean
        id?: string
      } | null

      if (!response.ok) {
        throw new Error(
          data?.error || pickLocale(contactCopy.form.error, locale),
        )
      }

      // Real saves return an id; honeypot replies do not
      if (!data?.id) {
        throw new Error(pickLocale(contactCopy.form.error, locale))
      }

      setForm(initialState)
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : pickLocale(contactCopy.form.error, locale),
      )
    }
  }

  return (
    <Box
      className="contact-form"
      component="form"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Honeypot — obscure name so browsers/password managers do not autofill */}
      <input
        className="contact-form__honeypot"
        tabIndex={-1}
        autoComplete="new-password"
        aria-hidden
        name="hp_company"
        value={form.hp_company}
        onChange={update('hp_company')}
      />

      <Box className="contact-form__row">
        <label className="contact-form__field">
          <span className="contact-form__label">
            {pickLocale(contactCopy.form.firstName, locale)}
          </span>
          <input
            className="contact-form__input"
            name="firstName"
            autoComplete="given-name"
            placeholder={pickLocale(contactCopy.form.firstNamePlaceholder, locale)}
            value={form.firstName}
            onChange={update('firstName')}
            disabled={status === 'loading'}
          />
        </label>
        <label className="contact-form__field">
          <span className="contact-form__label">
            {pickLocale(contactCopy.form.lastName, locale)}
          </span>
          <input
            className="contact-form__input"
            name="lastName"
            autoComplete="family-name"
            placeholder={pickLocale(contactCopy.form.lastNamePlaceholder, locale)}
            value={form.lastName}
            onChange={update('lastName')}
            disabled={status === 'loading'}
          />
        </label>
      </Box>

      <label className="contact-form__field">
        <span className="contact-form__label">
          {pickLocale(contactCopy.form.email, locale)}
        </span>
        <input
          className="contact-form__input"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={pickLocale(contactCopy.form.emailPlaceholder, locale)}
          value={form.email}
          onChange={update('email')}
          disabled={status === 'loading'}
        />
      </label>

      <label className="contact-form__field">
        <span className="contact-form__label">
          {pickLocale(contactCopy.form.phone, locale)}
        </span>
        <input
          className="contact-form__input"
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder={pickLocale(contactCopy.form.phonePlaceholder, locale)}
          value={form.phone}
          onChange={update('phone')}
          disabled={status === 'loading'}
        />
      </label>

      <label className="contact-form__field">
        <span className="contact-form__label">
          {pickLocale(contactCopy.form.subject, locale)}
        </span>
        <input
          className="contact-form__input"
          name="subject"
          placeholder={pickLocale(contactCopy.form.subjectPlaceholder, locale)}
          value={form.subject}
          onChange={update('subject')}
          disabled={status === 'loading'}
        />
      </label>

      <label className="contact-form__field">
        <span className="contact-form__label">
          {pickLocale(contactCopy.form.message, locale)}
        </span>
        <textarea
          className="contact-form__textarea"
          name="message"
          required
          rows={5}
          placeholder={pickLocale(contactCopy.form.messagePlaceholder, locale)}
          value={form.message}
          onChange={update('message')}
          disabled={status === 'loading'}
        />
      </label>

      {status === 'success' ? (
        <p className="contact-form__feedback contact-form__feedback--ok" role="status">
          {pickLocale(contactCopy.form.success, locale)}
        </p>
      ) : null}
      {status === 'error' && errorMessage ? (
        <p className="contact-form__feedback contact-form__feedback--error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button
        className="contact-form__submit"
        type="submit"
        variant="contained"
        endIcon={<SendRoundedIcon />}
        disabled={status === 'loading'}
      >
        {status === 'loading'
          ? pickLocale(contactCopy.form.sending, locale)
          : pickLocale(contactCopy.form.submit, locale)}
      </Button>
    </Box>
  )
}
