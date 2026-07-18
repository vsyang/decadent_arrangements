//app/(admin)/dashboard/page.tsx

import "../../globals.css"

import { redirect } from "next/navigation";
import { IsAdminProtection } from "./adminAction";
import Link from "next/link";

export default async function DashboardPage() {

    const authorized = await IsAdminProtection();

    if (!authorized) {
        redirect("/orders");
    }

    return (
        <>
            <div className="mx-auto max-w-7xl px-6 py-12">

                <Link
                    href="/products"
                    className="text-xl font-bold text-primary"
                >
                    Catalog
                </Link>

                <p className="text-muted">
                    In this part you can add, edit, and delete the products. Change prices or any other detail of the arrangements.
                </p>
            </div>

            <div className="mx-auto max-w-7xl px-6">

                <Link
                    href="/orders"
                    className="text-xl font-bold text-primary"
                >
                    Orders
                </Link>

                <p className="text-muted">
                    This one is for editing, deleting or adding orders. Any ingredients, details you forgot to add or you want to clarify. It also works as a browser of orders.
                </p>
            </div>
        </>
    );
}