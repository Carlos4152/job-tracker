import { loginSchema } from '@/modules/auth/auth.schema';
import { authService } from '@/modules/auth/auth.service';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async ({ email, password }) => {
        if (!email || !password) {
          return null;
        }

        const parsed = loginSchema.safeParse({ email, password});

        if (!parsed.success) {
          return null;
        }

        const result = await authService.signin(parsed.data);
        if (!result?.user) {
          return null;
        }

        return {
          id: result.user.id,
          email: result.user.email,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }

      if (trigger === 'update' && session?.user) {
        token.businessName = session.user.businessName ?? token.businessName;
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
        },
      };
    },
  },
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
});
