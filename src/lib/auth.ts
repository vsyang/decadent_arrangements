// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { users, accounts, sessions, verificationTokens } from "@/db/schema";
import type { Adapter } from "next-auth/adapters";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts as any,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            } else if (token.id && !token.role) {
                const [dbUser] = await db.select({ role: users.role })
                    .from(users)
                    .where(eq(users.id, token.id as string))
                    .limit(1);
                if (dbUser) {
                    token.role = dbUser.role;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                if (token.id) session.user.id = token.id as string;
                if (token.role) session.user.role = token.role as "user" | "admin";
            }
            return session;
        },
    },
};