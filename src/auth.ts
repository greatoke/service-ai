import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
 
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async session({ session, token }) {
      console.log("session", JSON.stringify(session, null, 2));
      console.log("token", JSON.stringify(token, null, 2));
      session.user.id = token.sub as string;
      return session;
    },
  }
})