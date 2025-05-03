import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    // Credentials({
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    // }),
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