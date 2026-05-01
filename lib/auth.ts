import { loginSchema } from '@/modules/auth/auth.schema';
import { authService } from '@/modules/auth/auth.service';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { connectDB } from './db';
import { User } from '@/modules/auth/user.model';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async ({ email, password }) => {
        if (!email || !password) {
          return null;
        }

        const parsed = loginSchema.safeParse({ email, password });

        if (!parsed.success) {
          return null;
        }

        const result = await authService.signin(parsed.data);
        if (!result?.user) {
          return null;
        }

        return result.user;
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
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        return authService.upsertGoogleUser(user);
      }
      return true;
    },
    async jwt({ token, user }) {
      await connectDB();
      if (user?.email) {
        if (user?.email && !token.id) {
          const dbUser = await User.findOne({ email: user.email });
          if (!dbUser) return token;

          token.id = dbUser._id.toString();
          token.email = dbUser.email;
          token.firstName = dbUser.firstName ?? '';
          token.lastName = dbUser.lastName ?? '';
        }
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
