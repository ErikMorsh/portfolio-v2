import type { NextAuthConfig } from 'next-auth'

/** Edge-safe auth config (no Node-only imports like bcrypt). */
export const authConfig = {
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7,
  },
  providers: [],
  trustHost: true,
} satisfies NextAuthConfig
