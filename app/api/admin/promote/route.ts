// app/api/admin/promote/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        // 1. Validate header
        const authHeader = request.headers.get("Authorization");
        if (!authHeader) {
            return NextResponse.json({ error: "Missing authorization header" }, { status: 401 });
        }

        // format: "DA <secret> <email>"
        const match = authHeader.match(/^DA\s+(\S+)\s+(\S+)$/);
        if (!match) {
            return NextResponse.json({ error: "Invalid Authorization format. Expected: 'DA <secret> <email>'" }, { status: 400 });
        }

        const [, providedSecret, providedEmail] = match;
        const systemSecret = process.env.NEXTAUTH_SECRET;

        // 2. Verificate secret
        if (!systemSecret || providedSecret !== systemSecret) {
            return NextResponse.json({ error: "Unauthorized access token validation failed" }, { status: 403 });
        }

        // 3. Layer SESSION
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: "Active user session not found. Please log in first" }, { status: 401 });
        }

        const sessionEmail = session.user.email.toLowerCase();
        const targetEmail = providedEmail.toLowerCase();

        // Double-check; do not validate third parties
        if (sessionEmail !== targetEmail) {
            return NextResponse.json({ error: "Session mismatch. You can only promote your authenticated account" }, { status: 403 });
        }

        // 4. Layer WHITELIST
        const whitelist: string[] = JSON.parse(process.env.WHITELIST ?? "[]");
        const isWhitelisted = whitelist.map((e) => e.toLowerCase()).includes(targetEmail);

        if (!isWhitelisted) {
            return NextResponse.json({
                error: "Defensive trigger: This email is not declared within the infrastructure WHITELIST env variable"
            }, { status: 403 });
        }

        // 5. UPDATE DB
        const updateResult = await db
            .update(users)
            .set({ role: "admin" })
            .where(eq(users.email, targetEmail))
            .returning({ id: users.id, email: users.email, role: users.role });

        if (updateResult.length === 0) {
            return NextResponse.json({ error: "User account not found in database records" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: `Account successfully promoted to admin in Decadent Arrangements`,
            user: updateResult[0]
        }, { status: 200 });

    } catch (error) {
        console.error("Promotion Error:", error);
        return NextResponse.json({ error: "Internal Server Error during promotion sequence" }, { status: 500 });
    }
}