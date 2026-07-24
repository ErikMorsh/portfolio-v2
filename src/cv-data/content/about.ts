import type { AboutInfo } from '../model/types'
import { ls } from '../lib/localize'

export const about: AboutInfo = {
  headline: ls('آشنا بشیم؟', "Let's get acquainted"),
  paragraphs: [
    ls(
      'برنامه‌نویسی را با Vue شروع کردم و پس از تسلط به Nuxt، شروع به یادگیری React کردم و گذاری به دنیای بک‌اند با زبان‌های JS و Go  داشته‌ام. از این رو توانایی قابل توجهی در ارتباط‌گیری با تیم‌های توسعه و ساخت حرفه‌ای محصول دارم.',
      'I started programming with Vue and, after mastering Nuxt, began learning backend development and moved into the React ecosystem. I have worked with JS and Go. As a result, I have strong ability to collaborate with development teams and build professional products.',
    ),
    ls(
      '۲۹ سالمه و خدمت سربازی را اتمام کردم.',
      'I am 29 years old and have completed my military service.',
    ),
  ],
}
