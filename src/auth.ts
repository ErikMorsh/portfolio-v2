import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { authConfig } from './auth.config'

const credentialsSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials)
        if (!parsed.success) return null

        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
        const passwordHash = process.env.ADMIN_PASSWORD_HASH
        if (!adminEmail || !passwordHash) return null

        const email = parsed.data.email.toLowerCase()
        if (email !== adminEmail) return null

        const valid = await bcrypt.compare(parsed.data.password, passwordHash)
        if (!valid) return null

        return {
          id: 'admin',
          email: adminEmail,
          name: 'Admin',
        }
      },
    }),
  ],
})
