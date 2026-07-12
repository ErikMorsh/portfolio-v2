import type { ProjectItem } from '../model/types'
import { ls } from '../lib/localize'

export const projects: ProjectItem[] = [
  {
    id: 'crm',
    title: ls('وب اپلیکیشن CRM', 'CRM Web Application'),
    subtitle: ls(
      'Enterprise CRM · Admin Panel · Microservice · Scalable Frontend Architecture',
      'Enterprise CRM · Admin Panel · Microservice · Scalable Frontend Architecture',
    ),
    goals: ls(
      'بازطراحی زیرساخت Frontend پروژه CRM با افزایش Performance، Scalability، Maintainability و Developer Experience. این بازطراحی شامل مهاجرت به معماری Feature-Based، توسعه زیرساخت‌های API Layer و State Management، بهینه‌سازی فرآیند Build، توسعه قابلیت‌های کلیدی Component Architecture و Role Management، Multi-language و Push Notification بود.',
      'Redesigned the CRM project frontend infrastructure to improve performance, scalability, maintainability, and developer experience. This included migration to feature-based architecture, API layer and state management infrastructure, build process optimization, component architecture, role management, multi-language support, and push notifications.',
    ),
    actions: [
      ls(
        'مهاجرت پروژه از ساختار Legacy به معماری Feature-Based.',
        'Migrated the project from a legacy structure to feature-based architecture.',
      ),
      ls(
        'طراحی OOP State Management با Type Safety کامل و پشتیبانی از Nested Moduleها.',
        'Designed OOP state management with full type safety and nested module support.',
      ),
      ls(
        'توسعه لایه متمرکز API Management بر پایه Nuxt Fetch Interceptor.',
        'Built a centralized API management layer based on Nuxt fetch interceptors.',
      ),
      ls(
        'یکپارچه‌سازی ارتباط با Microserviceها و Third-party Serviceها.',
        'Integrated communication with microservices and third-party services.',
      ),
      ls(
        'استانداردسازی Base Componentها و توسعه Dynamic Component Factory.',
        'Standardized base components and developed a dynamic component factory.',
      ),
      ls(
        'طراحی سیستم Role & Permission Management با استفاده از Custom Directive.',
        'Designed role and permission management using custom directives.',
      ),
      ls(
        'پیاده‌سازی زیرساخت Multi-language با i18n.',
        'Implemented multi-language infrastructure with i18n.',
      ),
      ls('شخصی‌سازی Design System بر اساس Vuetify.', 'Customized a design system based on Vuetify.'),
      ls(
        'بهینه‌سازی عملکرد با Lazy Loading، Code Splitting و Tree Shaking.',
        'Optimized performance with lazy loading, code splitting, and tree shaking.',
      ),
      ls(
        'بهینه‌سازی تنظیمات TypeScript و tsconfig برای افزایش کیفیت توسعه و کاهش خطاهای Runtime.',
        'Optimized TypeScript and tsconfig settings to improve development quality and reduce runtime errors.',
      ),
      ls(
        'توسعه زیرساخت Push Notification با استفاده از FCM و Service Worker.',
        'Built push notification infrastructure using FCM and service workers.',
      ),
    ],
    techStack: [
      'Vue.js',
      'Nuxt',
      'TypeScript',
      'Vuetify',
      'SCSS',
      'i18n',
      'FCM',
      'Service Worker',
    ],
    tags: ['CRM', 'Enterprise', 'Microservice', 'Admin Panel'],
  },
  {
    id: 'chat',
    title: ls('وب اپلیکیشن چت', 'Chat Web Application'),
    subtitle: ls(
      'Real-time Messaging · WebSocket · Peer-to-Peer Communication · Microservice',
      'Real-time Messaging · WebSocket · Peer-to-Peer Communication · Microservice',
    ),
    goals: ls(
      'طراحی و توسعه زیرساخت ارتباط بلادرنگ پروژه با تمرکز بر Performance، Scalability و User Experience. این پروژه شامل پیاده‌سازی معماری WebSocket برای ارتباط با Microserviceها، توسعه قابلیت‌های اصلی پیام‌رسان و برقراری تماس صوتی و تصویری Peer-to-Peer بود.',
      'Designed and developed real-time communication infrastructure with a focus on performance, scalability, and user experience. This included WebSocket architecture for microservices, core messaging features, and peer-to-peer audio/video communication.',
    ),
    actions: [
      ls(
        'طراحی معماری OOP WebSocket برای مدیریت ارتباط پایدار با Microserviceها.',
        'Designed OOP WebSocket architecture for stable communication with microservices.',
      ),
      ls(
        'یکپارچه‌سازی Connection Management و Error Handling جهت افزایش پایداری ارتباطات.',
        'Integrated connection management and error handling to improve communication stability.',
      ),
      ls(
        'پیاده‌سازی Infinite Scroll و مدیریت Local State برای کاهش درخواست‌های تکراری و بهبود عملکرد.',
        'Implemented infinite scroll and local state management to reduce duplicate requests and improve performance.',
      ),
      ls(
        'توسعه قابلیت ارسال متن، تصویر، ویدئو، فایل و پیام صوتی.',
        'Developed sending text, image, video, file, and voice messages.',
      ),
      ls(
        'پیاده‌سازی تماس صوتی و تصویری One-to-One با استفاده از PeerJS.',
        'Implemented one-to-one audio and video calls using PeerJS.',
      ),
      ls('مدیریت Authentication و Session.', 'Managed authentication and sessions.'),
    ],
    techStack: [
      'Vue.js',
      'TypeScript',
      'Vuetify',
      'SCSS',
      'Peer.js',
      'FCM',
      'Service Worker',
    ],
    tags: ['Real-time', 'WebSocket', 'P2P', 'Messaging'],
  },
  {
    id: 'cms',
    title: ls('وب اپلیکیشن CMS', 'CMS Web Application'),
    subtitle: ls(
      'CMS · Multi-Website Platform · SEO · Page Builder · Nuxt Architecture',
      'CMS · Multi-Website Platform · SEO · Page Builder · Nuxt Architecture',
    ),
    goals: ls(
      'طراحی و توسعه یک پلتفرم CMS چندمنظوره مبتنی بر Nuxt، برای مدیریت وبسایت‌های مختلف، با تمرکز بر معماری قابل توسعه، تولید صفحات پویا، بهینه‌سازی SEO و ایجاد تجربه مدیریتی بدون نیاز به دخالت تیم فنی.',
      'Designed and developed a multi-purpose Nuxt-based CMS platform for managing multiple websites, focused on scalable architecture, dynamic page generation, SEO optimization, and a management experience without requiring technical team involvement.',
    ),
    actions: [
      ls(
        'توسعه معماری Multi-Website با استفاده از Nuxt Layers برای جداسازی محصولات و مدیریت کانفیگ مستقل هر وبسایت.',
        'Developed multi-website architecture using Nuxt Layers for product separation and independent per-site configuration.',
      ),
      ls(
        'کاهش پیچیدگی توسعه و نگهداری با ایجاد ساختار مشترک برای کامپوننت‌ها و قابلیت توسعه مستقل پروژه‌ها.',
        'Reduced development and maintenance complexity with shared component structure and independent project extensibility.',
      ),
      ls(
        'طراحی صفحات Responsive و اجرای دقیق Zero-Pixel Design مطابق با طرح‌های UI.',
        'Designed responsive pages with precise zero-pixel implementation matching UI designs.',
      ),
      ls(
        'بهینه‌سازی ساختار صفحات، Scriptها، Meta Tagها و Animationها برای بهبود SEO و Performance.',
        'Optimized page structure, scripts, meta tags, and animations for SEO and performance.',
      ),
      ls(
        'بهبود Semantic HTML، ساختار لینک‌ها و نحوه رندر صفحات جهت افزایش سازگاری با موتورهای جستجو و LLMها.',
        'Improved semantic HTML, link structure, and page rendering for search engines and LLMs.',
      ),
      ls(
        'توسعه Page Builder مشابه Elementor برای ساخت صفحات پویا با کامپوننت‌های قابل استفاده مجدد.',
        'Developed an Elementor-like page builder for dynamic pages with reusable components.',
      ),
      ls(
        'ایجاد سیستم مدیریت کامپوننت برای ساخت، شخصی‌سازی و توسعه بلوک‌های جدید توسط کاربران غیر فنی.',
        'Built a component management system for non-technical users to create, customize, and extend blocks.',
      ),
      ls(
        'توسعه پنل مدیریت SEO شامل کنترل Meta Data، Indexing و Robots و تنظیمات صفحات.',
        'Developed an SEO admin panel for meta data, indexing, robots, and page settings.',
      ),
      ls(
        'ایجاد File Management System داخلی برای مدیریت Assetها و استفاده مستقیم در کامپوننت‌ها.',
        'Created an internal file management system for assets used directly in components.',
      ),
      ls(
        'توسعه Blog Management System مشابه WordPress شامل مدیریت مقالات، دسته‌بندی‌ها، فایل‌ها و Activity Log ادمین‌ها.',
        'Developed a WordPress-like blog management system with articles, categories, files, and admin activity logs.',
      ),
    ],
    techStack: [
      'Vue 3',
      'Nuxt 3',
      'TypeScript',
      'Nuxt Layers',
      'Tailwind CSS',
      'Pinia',
      'TinyMCE',
      'SEO Optimization',
      'CI/CD',
    ],
    tags: ['CMS', 'SEO', 'Page Builder', 'Multi-site'],
  },
  {
    id: 'vue-migration',
    title: ls(
      'ارتقای پروژه‌های Frontend',
      'Frontend Project Modernization',
    ),
    subtitle: ls(
      'Vue Migration · PWA · Desktop Application · Mobile Application · State Management',
      'Vue Migration · PWA · Desktop Application · Mobile Application · State Management',
    ),
    goals: ls(
      'ارتقای ساختار پروژه‌های Frontend با تمرکز بر مهاجرت Vue 2 به Vue 3، توسعه اپلیکیشن‌های Cross-Platform و استفاده از تکنولوژی‌های Mobile، Desktop و PWA.',
      'Modernized frontend projects with a focus on Vue 2 to Vue 3 migration, cross-platform application development, and mobile, desktop, and PWA technologies.',
    ),
    actions: [
      ls(
        'Migration پروژه‌ها از Vue 2 به Vue 3 و استفاده از Composition API و Options API.',
        'Migrated projects from Vue 2 to Vue 3 using both Composition API and Options API.',
      ),
      ls(
        'پیاده‌سازی Zero-Pixel Design بر اساس طرح‌های Figma.',
        'Implemented zero-pixel designs based on Figma mockups.',
      ),
      ls('مدیریت State با VueX و Pinia.', 'Managed state with VueX and Pinia.'),
      ls(
        'توسعه ارتباط با Backend از طریق API، Async و REST API.',
        'Developed backend integration via API, async patterns, and REST API.',
      ),
      ls(
        'تبدیل Web App رستوران به Desktop App با Electron.js و دسترسی به امکانات OS.',
        'Converted a restaurant web app to a desktop app with Electron.js and OS-level features.',
      ),
      ls(
        'مدیریت Printer و فرآیند چاپ رسید در نسخه Desktop.',
        'Managed printer integration and receipt printing in the desktop version.',
      ),
      ls(
        'تبدیل Web App ترید به Android App با Capacitor.js.',
        'Converted a trading web app to an Android app with Capacitor.js.',
      ),
      ls(
        'توسعه PWA با Service Worker و Local Caching.',
        'Developed PWA with service workers and local caching.',
      ),
    ],
    techStack: [
      'Vue 2',
      'Vue 3',
      'Composition API',
      'Options API',
      'VueX',
      'Pinia',
      'Electron.js',
      'Capacitor.js',
      'PWA',
      'Service Worker',
      'REST API',
      'Figma',
    ],
    tags: ['Migration', 'PWA', 'Electron', 'Capacitor'],
  },
]
