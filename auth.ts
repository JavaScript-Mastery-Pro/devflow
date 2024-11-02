import Credentials from "@auth/core/providers/credentials";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { api } from "./lib/api";
import { SignInSchema } from "./lib/validations";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const existingAccount = await api.accounts.getByProvider(email);
          if (!existingAccount) return null;

          const existingUser = await api.users.getById(existingAccount.userId);
          if (!existingUser) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            existingAccount.password
          );

          if (passwordsMatch)
            return {
              id: existingUser.id,
              name: existingUser.name,
              email: existingUser.email,
              image: existingUser.image,
            };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        const existingAccount = await api.accounts.getByProvider(
          account?.providerAccountId
        );
        const userId = existingAccount.userId;

        if (userId) token.sub = userId;
      }

      return token;
    },
  },
});
