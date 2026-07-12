import logoPlaceholder from '../assets/companies/logo-placeholder.svg'
import novatelLogo from '../assets/companies/novatel.png'
import galaxyVisionLogo from '../assets/companies/galaxy-vision.png'
import type { ExperienceItem } from '../model/types'
import { ls } from '../lib/localize'

export const experience: ExperienceItem[] = [
  {
    id: 'gostaran-arya-samane',
    title: ls('نواتل', 'Novatel'),
    company: ls(
      'شرکت مهندسی شبکه گستران آریا سامانه - نواتل',
      'Gostaran Arya Samane Engineering Co. - Novatel',
    ),
    role: ls('برنامه‌نویس ارشد Vue.js', 'Senior Vue.js Developer'),
    duration: ls('یک سال', '1 year'),
    logo: {
      src: novatelLogo,
      alt: ls('لوگوی نواتل', 'Novatel company logo'),
    },
    techStack: ['Vue.js', 'Nuxt', 'TypeScript', 'Vuetify', 'SCSS'],
    highlights: [
      ls(
        'Review و ریفکتور Legacy Code و طراحی معماری جهت افزایش نگهداری‌پذیری پروژه.',
        'Reviewed and refactored legacy code and designed architecture to improve project maintainability.',
      ),
      ls(
        'ارزیابی کتابخانه‌های استفاده‌شده و تهیه اسناد جهت انتخاب و استانداردسازی کتابخانه‌ها.',
        'Evaluated libraries in use and prepared documentation for selection and standardization.',
      ),
      ls(
        'ارائه مشاوره فنی، برآورد و زمان‌بندی پروژه و تدوین استانداردهای توسعه.',
        'Provided technical consulting, project estimation, scheduling, and development standards.',
      ),
    ],
    relatedProjectIds: ['crm', 'chat'],
  },
  {
    id: 'galaxy-vision',
    title: ls('گلکسی ویژن', 'Galaxy Vision'),
    company: ls('شرکت گلکسی ویژن', 'Galaxy Vision Co.'),
    role: ls('برنامه‌نویس Vue.js', 'Vue.js Developer'),
    duration: ls('ده ماه', '10 months'),
    logo: {
      src: galaxyVisionLogo,
      alt: ls('لوگوی گلکسی ویژن', 'Galaxy Vision company logo'),
    },
    techStack: ['Vue 3', 'Nuxt 3', 'TypeScript', 'Tailwind CSS', 'Pinia'],
    highlights: [
      ls(
        'توسعه صفحات Responsive، SEO-friendly و Dynamic.',
        'Developed responsive, SEO-friendly, and dynamic pages.',
      ),
      ls('پیاده‌سازی CMS Web Application.', 'Implemented a CMS web application.'),
    ],
    relatedProjectIds: ['cms'],
  },
  {
    id: 'sama-tarash-pardaz',
    title: ls('تراشه پرداز سما', 'Sama Tarash Pardaz'),
    company: ls('شرکت تراشه پرداز سما', 'Sama Tarash Pardaz Co.'),
    role: ls('برنامه‌نویس Vue.js', 'Vue.js Developer'),
    duration: ls('یک سال و چهار ماه', '1 year and 4 months'),
    logo: {
      src: logoPlaceholder,
      alt: ls('لوگوی تراشه پرداز سما', 'Sama Tarash Pardaz company logo'),
    },
    techStack: ['Vue 2', 'Vue 3', 'PWA', 'Capacitor.js', 'Electron.js'],
    highlights: [
      ls(
        'ارائه محصولات Zero-pixel مطابق طرح و توسعه و پیاده‌سازی PWA.',
        'Delivered zero-pixel designs per mockups and developed PWA implementations.',
      ),
      ls(
        'طراحی و بهینه‌سازی کدها برای تبدیل به اپلیکیشن Native توسط Capacitor JS.',
        'Designed and optimized code for native app conversion using Capacitor JS.',
      ),
      ls(
        'تجارب کسب‌شده در پروژه‌های مختلف و یادگیری.',
        'Gained experience across diverse projects and continuous learning.',
      ),
    ],
    relatedProjectIds: ['vue-migration'],
  },
]
