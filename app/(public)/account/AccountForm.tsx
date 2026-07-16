// app/(public)/account/AccountForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { type UserAddress } from "@/db/schema";

export interface UserProfile {
    name: string;
    email: string;
    phones: string[];
    addresses: UserAddress[];
    preferredContactMethod: "whatsapp" | "email" | "call";
}

interface AccountFormProps {
    initialData: UserProfile;
    updateAccountAction: (data: {
        phones: string[];
        addresses: UserAddress[];
        preferredContactMethod: "whatsapp" | "email" | "call";
    }) => Promise<{ success: boolean; error?: string }>;
}

export default function AccountForm({ initialData, updateAccountAction }: AccountFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<UserProfile>(initialData);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // Mapeamos el campo de texto a 'streetAddress' que es la propiedad física real en el JSONB
    const [addressText, setAddressText] = useState(
        initialData.addresses[0]?.streetAddress || ""
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        // Re-estructuramos al formato estricto de tu base de datos
        const updatedAddresses: UserAddress[] = addressText.trim()
            ? [{
                id: initialData.addresses[0]?.id || crypto.randomUUID(),
                label: initialData.addresses[0]?.label || "Home",
                streetAddress: addressText,
                city: initialData.addresses[0]?.city || "",
                state: initialData.addresses[0]?.state || "",
                postalCode: initialData.addresses[0]?.postalCode || "",
                deliveryNotes: initialData.addresses[0]?.deliveryNotes || ""
            }]
            : [];

        const res = await updateAccountAction({
            phones: formData.phones,
            addresses: updatedAddresses,
            preferredContactMethod: formData.preferredContactMethod,
        });

        setLoading(false);
        if (res.success) {
            setMessage({ type: "success", text: "Profile updated successfully!" });
            router.refresh();
        } else {
            setMessage({ type: "error", text: res.error || "Something went wrong." });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl bg-card p-6 rounded-lg border border-border">
            {message && (
                <div className={`p-4 rounded-md text-sm ${message.type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>
                    {message.text}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium ">Full Name</label>
                <input
                    type="text"
                    disabled
                    value={formData.name}
                    className="mt-1 block w-full rounded-md border border-border bg-muted/40 px-3 py-2 text-sm text-muted"
                />
            </div>

            <div>
                <label className="block text-sm font-medium ">Email Address</label>
                <input
                    type="email"
                    disabled
                    value={formData.email}
                    className="mt-1 block w-full rounded-md border border-border bg-muted/40 px-3 py-2 text-sm text-muted"
                />
            </div>

            {/* Teléfono */}
            <div>
                <label className="block text-sm font-medium text-foreground">Phone Number</label>
                <input
                    type="text"
                    value={formData.phones[0] || ""}
                    onChange={(e) => setFormData({ ...formData, phones: e.target.value ? [e.target.value] : [] })}
                    placeholder="+123456789"
                    className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>

            {/* Dirección */}
            <div>
                <label className="block text-sm font-medium text-foreground">Delivery Address</label>
                <input
                    type="text"
                    value={addressText}
                    onChange={(e) => setAddressText(e.target.value)}
                    placeholder="123 Main Street, Apt 4B"
                    className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>

            {/* Método de Contacto Preferido */}
            <div>
                <label className="block text-sm font-medium text-foreground">Preferred Contact Method</label>
                <select
                    value={formData.preferredContactMethod}
                    onChange={(e) => setFormData({ ...formData, preferredContactMethod: e.target.value as any })}
                    className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                    <option value="call">Phone Call</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full justify-center rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/95 transition-colors disabled:opacity-50"
            >
                {loading ? "Saving Changes..." : "Save Profile Details"}
            </button>
        </form>
    );
}