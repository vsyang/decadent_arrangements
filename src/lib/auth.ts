import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db"; // Ahora apunta a la instancia Postgres de src/db/index.ts
import { users, accounts, sessions, verificationTokens } from "@/db/schema";
import type { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
    // Realizamos el cast a 'Adapter' para que NextAuth v4 acepte la estructura de 
    // tablas relacionales de Postgres configuradas mediante el adaptador unificado.
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
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.id) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
};