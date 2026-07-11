import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/not-found");
    }    

    const whitelistRaw = process.env.WHITELIST || "";
    const adminWhitelist = whitelistRaw.split(",").map((email) => email.trim().toLowerCase());
    
    const userEmail = session.user.email?.toLowerCase() || ""; // prod

    // const userEmail = ""; // dev

    const isAuthorizedAdmin = adminWhitelist.includes(userEmail);
    
    const managementPages = ["Catalog" , "Orders"];
    
    return (
    <>

        {(isAuthorizedAdmin) ? (
        
        <div>
            <div className="mx-auto max-w-7xl px-6 py-12">

                <Link href={"/manage"} >
                    <h1 className="text-3xl font-bold text-primary">General Management</h1>
                </Link>
                <p className="text-muted">Welcome back, Admin. Select a module to manage.</p>

            </div>

            <div className="items-center flex flex-col md:flex-row md:justify-center gap-4 max-w-7xl md:m-auto">
                {managementPages?.map((p) => (
                <Link
                    key={p}
                    href={`/manage/${p.toLowerCase()}`}
                    className="group text-center bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-100 w-full"
                >

                    <div className="p-5 flex flex-col flex-grow justify-between bg-white">
                        <div>
                            <h3 className="text-[#2e2e2e] font-serif text-xl leading-tight group-hover:text-[#c97c5d] transition-colors line-clamp-1">
                                {p}
                            </h3>
                        </div>
                    </div>
                </Link>
                ))}
            </div>
        </div>

        ) : (
                
        <div className="mx-auto max-w-7xl px-6 py-12">
            
            <h1 className="text-3xl font-bold text-primary">My orders</h1>
            <p className="text-muted">Hello! These are your orders up until now.</p>

        </div>
        )}

            <div>
                {children}
            </div>

    </>);
}