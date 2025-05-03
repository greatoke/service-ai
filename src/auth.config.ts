import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";
import { prisma } from "./lib/prisma";

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
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );
          if (email === "greatokedev1@gmail.com" && password === "password") {
            const user = await prisma.user.create({
              data: {
                email: "greatokedev1@gmail.com",
                name: "Test User",
              },
            });
            console.log("user", user);
            return { id: user.id, name: user.name };
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
