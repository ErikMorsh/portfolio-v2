import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { Box, Button } from '@mui/material'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { contactCopy } from '../data/contact'
import {
  getRecaptchaToken,
  isRecaptchaEnabled,
  loadRecaptcha,
  RECAPTCHA_ACTIONS,
} from '../lib/recaptcha-client'

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

  const isPending = status !== 'idle'
  const isBusy = status === 'loading'

  useEffect(() => {
    if (!isRecaptchaEnabled()) return
    void loadRecaptcha(locale).catch(() => {
      // Script will retry on submit if preload fails
    })
  }, [locale])

  const update =
    (field: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }))
    }

  const dismissOverlay = () => {
    setStatus('idle')
    setErrorMessage(null)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')
    setErrorMessage(null)

    try {
      let recaptchaToken: string
      try {
        recaptchaToken = await getRecaptchaToken(locale, RECAPTCHA_ACTIONS.contact)
      } catch {
        throw new Error(pickLocale(contactCopy.form.captchaError, locale))
      }

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
          recaptchaToken,
        }),
      })

      const data = (await response.json().catch(() => null)) as {
        error?: string
        ok?: boolean
        id?: string
      } | null

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(pickLocale(contactCopy.form.captchaError, locale))
        }
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
      // Keep form values so the user can retry without retyping
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
      className={`contact-form${isPending ? ' contact-form--pending' : ''}`}
      component="form"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isBusy}
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
            disabled={isPending}
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
            disabled={isPending}
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
          disabled={isPending}
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
          disabled={isPending}
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
          disabled={isPending}
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
          disabled={isPending}
        />
      </label>

      <Box className="contact-form__footer">
        {isRecaptchaEnabled() ? (
          <p className="contact-form__captcha-note">
            {pickLocale(contactCopy.form.captchaNotice, locale)}{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
            >
              {pickLocale(contactCopy.form.captchaPrivacy, locale)}
            </a>
            {' · '}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noreferrer"
            >
              {pickLocale(contactCopy.form.captchaTerms, locale)}
            </a>
          </p>
        ) : (
          <span />
        )}

        <Button
          className="contact-form__submit"
          type="submit"
          variant="contained"
          sx={{ gap: '6px !important' }}
          endIcon={
            <SendRoundedIcon
              sx={{ transform: 'skewX(15deg) rotate(-90deg)', marginTop: '-0.4rem' }}
            />
          }
          disabled={isPending}
        >
          {pickLocale(contactCopy.form.submit, locale)}
        </Button>
      </Box>

      {isPending ? (
        <div
          className={`contact-form__overlay contact-form__overlay--${status}`}
          role={status === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          <div className="contact-form__overlay-card">
            {status === 'loading' ? (
              <>
                <div className="contact-form__spinner" aria-hidden />
                <p className="contact-form__overlay-title">
                  {pickLocale(contactCopy.form.sending, locale)}
                </p>
              </>
            ) : null}

            {status === 'success' ? (
              <>
                <div className="contact-form__status-icon contact-form__status-icon--ok" aria-hidden>
                  <CheckRoundedIcon fontSize="inherit" />
                </div>
                <p className="contact-form__overlay-title">
                  {pickLocale(contactCopy.form.successTitle, locale)}
                </p>
                <p className="contact-form__overlay-text">
                  {pickLocale(contactCopy.form.success, locale)}
                </p>
              </>
            ) : null}

            {status === 'error' ? (
              <>
                <div
                  className="contact-form__status-icon contact-form__status-icon--error"
                  aria-hidden
                >
                  <ErrorOutlineRoundedIcon fontSize="inherit" />
                </div>
                <p className="contact-form__overlay-title">
                  {pickLocale(contactCopy.form.errorTitle, locale)}
                </p>
                <p className="contact-form__overlay-text">
                  {errorMessage ?? pickLocale(contactCopy.form.error, locale)}
                </p>
                <Button
                  className="contact-form__retry"
                  type="button"
                  variant="contained"
                  startIcon={<RefreshRoundedIcon />}
                  onClick={dismissOverlay}
                >
                  {pickLocale(contactCopy.form.retry, locale)}
                </Button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </Box>
  )
}
