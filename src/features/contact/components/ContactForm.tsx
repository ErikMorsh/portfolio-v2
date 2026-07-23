import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { Box, Button } from '@mui/material'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { personal, pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { contactCopy } from '../data/contact'

type ContactFormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
}

const initialState: ContactFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export function ContactForm() {
  const { locale } = useAppTheme()
  const [form, setForm] = useState<ContactFormState>(initialState)

  const update =
    (field: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }))
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const fullName = [form.firstName, form.lastName].filter(Boolean).join(' ')
    const subject =
      form.subject.trim() ||
      pickLocale(contactCopy.form.subjectPlaceholder, locale)
    const body = [
      fullName ? `Name: ${fullName}` : null,
      form.email ? `Email: ${form.email}` : null,
      form.phone ? `Phone: +98 ${form.phone}` : null,
      '',
      form.message,
    ]
      .filter((line) => line !== null)
      .join('\n')

    const mailto = `${personal.email.href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
  }

  return (
    <Box
      className="contact-form"
      component="form"
      onSubmit={handleSubmit}
      noValidate
    >
      <Box className="contact-form__row">
        <label className="contact-form__field">
          <span className="contact-form__label">
            {pickLocale(contactCopy.form.firstName, locale)}
          </span>
          <input
            className="contact-form__input"
            name="firstName"
            autoComplete="given-name"
            value={form.firstName}
            onChange={update('firstName')}
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
            value={form.lastName}
            onChange={update('lastName')}
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
        />
      </label>

      <label className="contact-form__field">
        <span className="contact-form__label">
          {pickLocale(contactCopy.form.phone, locale)}
        </span>
        <Box className="contact-form__phone">
          <span className="contact-form__country">
            {pickLocale(contactCopy.form.countryCode, locale)}
          </span>
          <input
            className="contact-form__input"
            type="tel"
            name="phone"
            autoComplete="tel-national"
            placeholder={pickLocale(contactCopy.form.phonePlaceholder, locale)}
            value={form.phone}
            onChange={update('phone')}
          />
        </Box>
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
          rows={6}
          placeholder={pickLocale(contactCopy.form.messagePlaceholder, locale)}
          value={form.message}
          onChange={update('message')}
        />
      </label>

      <Button
        className="contact-form__submit"
        type="submit"
        variant="contained"
        endIcon={<SendRoundedIcon />}
      >
        {pickLocale(contactCopy.form.submit, locale)}
      </Button>
    </Box>
  )
}
