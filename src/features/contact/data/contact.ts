import type { LocalizedString } from '@/shared/types'

export const contactCopy = {
  eyebrow: {
    fa: 'ارتباط با من',
    en: 'Get in touch',
  },
  title: {
    before: {
      fa: 'بیایید با هم',
      en: "Let's work",
    },
    accent: {
      fa: 'کار کنیم',
      en: 'together',
    },
  },
  subtitle: {
    fa: 'رابط‌های تمیز و پویا برای تیم‌های در حال رشد می‌سازم. ایده‌ات را بگو — خوشحال می‌شم کمک کنم.',
    en: 'I build polished, animated interfaces for startups and growing teams. Share your idea — I’m happy to help.',
  },
  info: {
    email: {
      label: { fa: 'ایمیل', en: 'Email' },
      hint: {
        fa: 'خلاصه پروژه و زمان‌بندی را بفرست.',
        en: 'Send project summary & timeline.',
      },
    },
    location: {
      label: { fa: 'موقعیت', en: 'Location' },
      value: { fa: 'تهران، ایران', en: 'Tehran, Iran' },
      hint: {
        fa: 'آماده همکاری ریموت در سراسر دنیا.',
        en: 'Remote work available worldwide.',
      },
    },
    response: {
      label: { fa: 'زمان پاسخ', en: 'Response time' },
      value: { fa: 'کمتر از ۲۴ ساعت', en: 'Within 24 hours' },
      hint: {
        fa: 'معمولاً در یک روز کاری جواب می‌دم.',
        en: 'Usually reply within 1 business day.',
      },
    },
    schedule: {
      label: { fa: 'ترجیح می‌دی حرف بزنیم؟', en: 'Prefer to talk?' },
      value: { fa: 'مستقیم تماس بگیر', en: 'Book a call directly' },
      action: { fa: 'تماس', en: 'Call' },
    },
  },
  services: {
    title: {
      fa: 'در چه زمینه‌هایی کمک می‌کنم',
      en: 'What I can help with',
    },
    items: [
      { fa: 'توسعه فرانت‌اند', en: 'Frontend Development' },
      { fa: 'پیاده‌سازی UI/UX', en: 'UI/UX Implementation' },
      { fa: 'اپلیکیشن‌های Vue.js / React', en: 'Vue.js / React Apps' },
      { fa: 'بهینه‌سازی پرفورمنس', en: 'Performance Optimization' },
    ] satisfies LocalizedString[],
  },
  social: {
    github: { fa: 'گیت‌هاب', en: 'GitHub' },
    linkedin: { fa: 'لینکدین', en: 'LinkedIn' },
    email: { fa: 'ایمیل', en: 'Email' },
  },
  form: {
    firstName: { fa: 'نام', en: 'First name' },
    firstNamePlaceholder: { fa: 'مثلاً عرفان', en: 'e.g. Alex' },
    lastName: { fa: 'نام خانوادگی', en: 'Last name' },
    lastNamePlaceholder: { fa: 'مثلاً مرادی', en: 'e.g. Morgan' },
    email: { fa: 'ایمیل *', en: 'Email address *' },
    emailPlaceholder: { fa: 'you@example.com', en: 'you@example.com' },
    phone: { fa: 'شماره تماس', en: 'Phone number' },
    phonePlaceholder: { fa: '+۹۸ ۹۱۲ ۱۲۳ ۴۵۶۷', en: '+98 912 123 4567' },
    subject: { fa: 'موضوع', en: 'Subject' },
    subjectPlaceholder: { fa: 'درخواست پروژه', en: 'Project Inquiry' },
    message: { fa: 'پیام *', en: 'Message *' },
    messagePlaceholder: {
      fa: 'درباره پروژه، اهداف و زمان‌بندی بگو...',
      en: 'Tell me about your project, goals, timeline...',
    },
    submit: { fa: 'ارسال پیام', en: 'Send message' },
  },
} as const

export const contactLinks = {
  github: 'https://github.com/ErikMorsh',
  githubUsername: 'ErikMorsh',
  phoneHref: 'tel:+989037579839',
} as const
