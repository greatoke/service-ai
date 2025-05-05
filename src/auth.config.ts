import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

export default {
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;

          const user = await prisma.user.findUnique({
            where: { email: email as string },
          });
          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password as string, user.password as string);
          console.log("passwordsMatch", passwordsMatch);
          console.log("user", user);
          if (passwordsMatch) {
            return { id: user.id, name: user.name, email: user.email };
          }

          return null;
        } catch (error) {
          if (error instanceof ZodError) {
            console.log(error.errors);
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
          console.error( typeof error);
          throw error;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
