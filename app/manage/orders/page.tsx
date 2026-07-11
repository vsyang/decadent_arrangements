//app/(admin)/orders/page.tsx

import { getServerSession } from "next-auth";
import "../../globals.css";

import type { Metadata } from "next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Orders Admin',
};

export default async function OrderManagementPage() {

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/not-found");
    }    

    const whitelistRaw = process.env.WHITELIST || "";
    const adminWhitelist = whitelistRaw.split(",").map((email) => email.trim().toLowerCase());
    
    const userEmail = session.user.email?.toLowerCase() || ""; // prod

    // const userEmail = ""; // dev

    const isAuthorizedAdmin = adminWhitelist.includes(userEmail);


    return (
        <>
        {(isAuthorizedAdmin) ? (
        
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