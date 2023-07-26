import { type GetServerSidePropsContext } from 'next';
import bcrypt from 'bcryptjs';
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { env } from '~/env.mjs';
import { prisma } from '~/server/db';
import { type Role } from '@prisma/client';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  interface User {
    role: Role;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: Role;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, user, session, trigger }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
        token.picture = user.image;
      }

      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role,
          name: token.name,
          email: token.email,
          image: token.picture,
        },
      };
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) return null;
        if (!credentials?.password) return null;
        if (!(await bcrypt.compare(credentials.password, user.password))) {
          return null;
        }

        return { ...user, id: user.id.toString() };
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
