//app/(admin)/orders/page.tsx

import "../../globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Orders Admin',
};

export default function OrderManagementPage() {
    return (
        <>
            <div className="max-w-7xl m-auto py-5">
                <h1 className="text-2xl font-bold text-primary">Orders Overview</h1>
                <p className="text-muted mt-2">Manage incoming client requests here.</p>
            </div>
        </>
    );
}