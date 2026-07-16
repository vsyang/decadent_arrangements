// app/(public)/account/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import AccountForm, { UserProfile } from "./AccountForm";
import { updateAccountAction } from "./actions";

export const metadata = {
    title: "My Account | Decadent Arrangements",
};

export default async function AccountPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect("/");
    }

    const [currentUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, session.user.id))
        .limit(1);

    if (!currentUser) {
        redirect("/");
    }

    // Cumplimos estrictamente con la definición tipada de UserProfile
    const initialData: UserProfile = {
        name: currentUser.name || "",
        email: currentUser.email || "",
        phones: currentUser.phones || [],
        addresses: currentUser.addresses || [],
        preferredContactMethod: (currentUser.preferredContactMethod as any) || "whatsapp",
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Account Settings</h1>
                <p className=" mt-1">
                    Keep your contact details and delivery preferences up-to-date.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <AccountForm initialData={initialData} updateAccountAction={updateAccountAction} />
                </div>

                <div className="space-y-4">
                    <div className="p-5 rounded-lg border border-border bg-muted/10">
                        <h3 className="font-semibold text-foreground text-sm">Security & Access</h3>
                        <p className="text-xs  mt-2">
                            Your profile is managed securely via Google authentication. Change your password and account credentials directly through your Google Account settings.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}