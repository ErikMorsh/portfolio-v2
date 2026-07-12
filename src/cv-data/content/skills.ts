import type { SkillItem } from '../model/types'
import { ls } from '../lib/localize'

export const skills: SkillItem[] = [
  {
    id: 'vue-nuxt',
    title: ls('Vue & Nuxt JS', 'Vue & Nuxt JS'),
    icons: ['vue', 'nuxt'],
    glowColor: '#42b883',
    highlights: [
      ls('توسعه پروژه‌های Nuxt با SSR، SSG و CSR.', 'Nuxt project development with SSR, SSG, and CSR.'),
      ls(
        'پیاده‌سازی Composition API و TypeScript در مقیاس بزرگ.',
        'Large-scale Composition API and TypeScript implementation.',
      ),
      ls('مدیریت State با Pinia و Vuex.', 'State management with Pinia and Vuex.'),
      ls(
        'بهینه‌سازی Performance با Lazy Loading، Code Splitting و Tree Shaking.',
        'Performance optimization with lazy loading, code splitting, and tree shaking.',
      ),
      ls(
        'پیاده‌سازی SEO، i18n و Meta Tags در Nuxt.',
        'SEO, i18n, and meta tags implementation in Nuxt.',
      ),
    ],
  },
  {
    id: 'typescript',
    title: ls('TypeScript', 'TypeScript'),
    icons: ['typescript'],
    glowColor: '#3178c6',
    highlights: [
      ls(
        'توسعه پروژه‌های TypeScript با Strict Mode.',
        'TypeScript project development with strict mode.',
      ),
      ls('طراحی Generic Types و Utility Types.', 'Generic types and utility types design.'),
      ls(
        'توسعه ساختارهای Type-safe برای API و Component Props.',
        'Type-safe structures for APIs and component props.',
      ),
      ls(
        'مهاجرت پروژه‌های JavaScript به TypeScript.',
        'Migrating JavaScript projects to TypeScript.',
      ),
    ],
  },
  {
    id: 'react-next',
    title: ls('React & Next JS', 'React & Next JS'),
    icons: ['react', 'nextjs'],
    glowColor: '#61dafb',
    highlights: [
      ls(
        'توسعه پروژه‌های Next.js با SSG، SSR و CSR.',
        'Next.js project development with SSG, SSR, and CSR.',
      ),
      ls(
        'مدیریت State با Zustand، Redux و React Context.',
        'State management with Zustand, Redux, and React Context.',
      ),
      ls('ساخت Reusable Components و Custom Hooks.', 'Reusable components and custom hooks.'),
      ls(
        'اتصال به REST API با TanStack Query و Axios.',
        'REST API integration with TanStack Query and Axios.',
      ),
    ],
  },
  {
    id: 'tailwind',
    title: ls('Tailwind CSS', 'Tailwind CSS'),
    icons: ['tailwind'],
    glowColor: '#38bdf8',
    highlights: [
      ls('Tailwind & Bootstrap + Shadcn', 'Tailwind & Bootstrap + Shadcn'),
      ls('طراحی Responsive و Utility-first.', 'Responsive, utility-first design.'),
    ],
  },
  {
    id: 'vuetify',
    title: ls('Vuetify', 'Vuetify'),
    icons: ['vuetify'],
    glowColor: '#1867c0',
    highlights: [
      ls('شخصی‌سازی Design System بر اساس Vuetify.', 'Customized design system based on Vuetify.'),
      ls('ساخت کامپوننت‌های قابل استفاده مجدد.', 'Building reusable components.'),
    ],
  },
  {
    id: 'quasar',
    title: ls('Quasar', 'Quasar'),
    icons: ['quasar'],
    glowColor: '#1976d2',
    highlights: [
      ls('توسعه اپلیکیشن‌های Cross-Platform با Quasar.', 'Cross-platform application development with Quasar.'),
    ],
  },
  {
    id: 'mui',
    title: ls('MUI', 'MUI'),
    icons: ['mui'],
    glowColor: '#007fff',
    highlights: [
      ls('پیاده‌سازی رابط کاربری با Material UI.', 'UI implementation with Material UI.'),
      ls('سفارشی‌سازی Theme و Design Tokens.', 'Theme and design token customization.'),
    ],
  },
  {
    id: 'nest-express',
    title: ls('Nest & Express', 'Nest & Express'),
    icons: ['nestjs', 'express'],
    glowColor: '#e0234e',
    highlights: [
      ls('توسعه API با NestJS و Express.', 'API development with NestJS and Express.'),
      ls('طراحی معماری Modular و RESTful.', 'Modular and RESTful architecture design.'),
    ],
  },
  {
    id: 'fiber',
    title: ls('Fiber', 'Fiber'),
    icons: ['go'],
    glowColor: '#00acd7',
    highlights: [
      ls('توسعه سرویس‌های Backend با Go Fiber.', 'Backend services development with Go Fiber.'),
    ],
  },
  {
    id: 'databases',
    title: ls('SQL & NoSQL', 'SQL & NoSQL'),
    icons: ['postgresql', 'mongodb'],
    glowColor: '#336791',
    highlights: [
      ls('طراحی و بهینه‌سازی پایگاه داده SQL.', 'SQL database design and optimization.'),
      ls('کار با پایگاه‌های داده NoSQL.', 'Working with NoSQL databases.'),
    ],
  },
  {
    id: 'version-control',
    title: ls('Version Control', 'Version Control'),
    icons: ['git', 'github', 'gitlab'],
    glowColor: '#f05032',
    highlights: [
      ls('مدیریت Repository و Pull Request در GitHub.', 'Repository and pull request management on GitHub.'),
      ls('CI/CD Pipeline با GitLab.', 'CI/CD pipelines with GitLab.'),
      ls('مدیریت Branch و Release با Gitflow.', 'Branch and release management with Gitflow.'),
    ],
  },
  {
    id: 'english',
    title: ls('انگلیسی', 'English'),
    icons: ['translate'],
    glowColor: '#5c6bc0',
    highlights: [
      ls('مکالمه و نوشتار حرفه‌ای در محیط کاری.', 'Professional spoken and written communication.'),
    ],
  },
]
