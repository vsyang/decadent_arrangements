//app/(admin)/orders/page.tsx

import "../../globals.css";

import type { Metadata } from "next";
import IsAdminProtection from "../actions";

export const metadata: Metadata = {
    title: 'Orders Admin',
};

export default async function OrderManagementPage() {

    const authorized = await IsAdminProtection();

    return (
        <>
        {(authorized) ? (
        
        <div>
            <h1 className="text-2xl font-bold text-primary">Orders Overview</h1>
            <p>Aqui irían las órdenes... Si tuviera alguna!</p>
        </div>

        ) : (
                
        <div className="max-w-7xl m-auto py-5">
            <p className="text-muted mt-2">No orders yet</p>
        </div>
        )}
            
        </>
    );
}