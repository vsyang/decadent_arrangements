import Link from "next/link";
import { NavActionButton } from "./NavActionButton";

function BookOpenIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
    );
}

function EnvelopeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
    );
}

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
    );
}

export function Navbar() {
    return (
        <>
            {/* DESKTOP HEADER */}
            <header className="hidden md:sticky md:top-0 md:z-50 md:block w-full border-b border-border bg-background/80 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="text-xl font-bold tracking-tight text-primary">
                        Decadent Arrangements
                    </Link>

                    <nav className="flex items-center gap-6 text-sm font-medium">
                        <Link href="/catalog" className="text-muted hover:text-foreground transition-colors">
                            Catalog
                        </Link>
                        <Link href="/contact" className="text-muted hover:text-foreground transition-colors">
                            Contact
                        </Link>
                        <NavActionButton />
                    </nav>
                </div>
            </header>

            {/* MOBILE TOP BRAND HEADER */}
            <header className="sticky top-0 z-50 block md:hidden w-full border-b border-border bg-background/80 backdrop-blur">
                <div className="flex h-14 items-center justify-between px-4">
                    <Link href="/" className="text-md font-bold tracking-tight text-primary">
                        Decadent Arrangements
                    </Link>

                    {/* TO-DO Breadcrumbs */}
                    <div id="mobile-breadcrumbs" className="text-xs text-muted font-medium" />
                </div>
            </header>

            {/* MOBILE BOTTOM NAVIGATION */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 block border-t border-border bg-background/95 pb-safe backdrop-blur md:hidden">
                <div className="flex h-16 items-center justify-around px-2">

                    {/* Home Link */}
                    <Link
                        href="/"
                        className="flex flex-col items-center justify-center gap-1 text-[10px] font-medium text-muted hover:text-foreground transition-colors w-16"
                    >
                        <HomeIcon className="h-5 w-5" />
                        <span>Home</span>
                    </Link>

                    {/* Catalog Link */}
                    <Link
                        href="/catalog"
                        className="flex flex-col items-center justify-center gap-1 text-[10px] font-medium text-muted hover:text-foreground transition-colors w-16"
                    >
                        <BookOpenIcon className="h-5 w-5" />
                        <span>Catalog</span>
                    </Link>

                    {/* Orders / Admin Action CTA */}
                    <div className="relative -top-3 flex flex-col items-center justify-center scale-105 drop-shadow-sm z-10">
                        <NavActionButton />
                    </div>

                    {/* Contact Link */}
                    <Link
                        href="/contact"
                        className="flex flex-col items-center justify-center gap-1 text-[10px] font-medium text-muted hover:text-foreground transition-colors w-16"
                    >
                        <EnvelopeIcon className="h-5 w-5" />
                        <span>Contact</span>
                    </Link>

                </div>
            </nav>
        </>
    );
}