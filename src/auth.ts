import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import { ZodError } from "zod"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials)
          if (email === "greatokedev@gmail.com" && password === "password") {
            return { id: "1", name: "Test User" }
          }
          return null
        } catch (error) {
            if (error instanceof ZodError) {
                console.log(error.errors)
                // Return `null` to indicate that the credentials are invalid
                return null
              }
          console.error(error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log("session", JSON.stringify(session, null, 2))
      console.log("token", JSON.stringify(token, null, 2))
      session.user.id = token.sub as string
      return session
    },
  },
})