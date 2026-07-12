import profilePlaceholder from '../assets/profile/profile.jpg'
import type { PersonalInfo } from '../model/types'
import { ls } from '../lib/localize'

export const personal: PersonalInfo = {
  fullName: ls('عرفان مرشدزاده', 'Erfan Morshedzadeh'),
  title: ls('توسعه‌دهنده فرانت‌اند', 'Front-End Developer'),
  email: {
    href: 'mailto:erfanmorshedzade1376@gmail.com',
    label: 'erfanmorshedzade1376',
  },
  phone: '+98 903 757 9839',
  location: ls('تهران', 'Tehran'),
  age: 29,
  militaryService: ls('پایان خدمت', 'Completed military service'),
  profilePhoto: {
    src: profilePlaceholder,
    alt: ls('عرفان مرشدزاده', 'Erfan Morshedzadeh'),
  },
  linkedin: {
    href: 'https://www.linkedin.com/in/ErfanMorshedzadeh',
    username: 'ErfanMorshedzadeh',
  },
}
