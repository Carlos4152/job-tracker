import { loginSchema } from '@/features/auth/schema/auth.schema';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { connectDB } from './db';
import { User } from '@/features/auth/models/user.model';
import { authService } from '@/features/auth/services/auth.service';

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
        if (!email || !password) return null;

        const parsed = loginSchema.safeParse({ email, password });

        if (!parsed.success) return null;

        const result = await authService.signin(parsed.data);
        if (!result?.user) return null;

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
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        return authService.upsertGoogleUser(user);
      }
      return true;
    },
    async jwt({ token, user }) {
      // user is only available on first sign in
      if (user) {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email });
        if (!dbUser) return token;

        token.id = dbUser._id.toString();
        token.email = dbUser.email;
        token.firstName = dbUser.firstName ?? '';
        token.lastName = dbUser.lastName ?? '';
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
