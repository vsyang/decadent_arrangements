// app/(public)/account/actions.ts
"use server";

import { db } from "@/db";
import { users, type UserAddress } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function updateAccountAction(data: {
    phones: string[];
    addresses: UserAddress[];
    preferredContactMethod: "whatsapp" | "email" | "call";
}) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return { success: false, error: "Unauthorized access" };
    }

    try {
        await db
            .update(users)
            .set({
                phones: data.phones,
                addresses: data.addresses,
                preferredContactMethod: data.preferredContactMethod,
                updatedAt: new Date(),
            })
            .where(eq(users.id, session.user.id));

        return { success: true };
    } catch (err: any) {
        console.error("Failed to update the account:", err);
        return { success: false, error: "Failed to update profile data." };
    }
}