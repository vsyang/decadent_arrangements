import {
  EnvelopeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { BookOpenIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarLinkMobile({
  label,
  linkRef,
}: {
  label: string;
  linkRef: string;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      <Link
        href={linkRef}
        aria-current={isActive(linkRef) ? "page" : undefined}
        className={`flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors w-16 ${
          isActive(linkRef)
            ? "text-primary font-bold scale-105"
            : "text-muted hover:text-foreground"
        }`}
      >
        {label === "Home" ? (
          <HomeIcon className="h-5 w-5" />
        ) : label === "Catalog" ? (
          <BookOpenIcon className="h-5 w-5" />
        ) : label === "Contact" ? (
          <EnvelopeIcon className="h-5 w-5" />
        ) : (
          <InformationCircleIcon className="h-5 w-5" />
        )}
        <span>{label}</span>
      </Link>
    </>
  );
}
