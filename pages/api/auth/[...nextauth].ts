import NextAuth, { type DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }

  interface JWT {
    id?: string;
    role?: string;
  }
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
      authorization:
        "https://www.facebook.com/v11.0/dialog/oauth?scope=public_profile",
    }),
    CredentialsProvider({
      name: "Login",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const sql = neon(process.env.DATABASE_URL!);

        try {
          const users = await sql`
            SELECT * FROM users WHERE email = ${credentials?.username} OR name = ${credentials?.username} LIMIT 1
          `;

          if (users.length > 0) {
            const user = users[0];
            const isPasswordMatch = await bcrypt.compare(
              credentials?.password || "",
              user.password,
            );

            if (isPasswordMatch) {
              return {
                id: user.id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
              };
            }
          }
        } catch (error) {
          console.error("Auth Error:", error);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
