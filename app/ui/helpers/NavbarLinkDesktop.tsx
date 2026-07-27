import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarLinkDesktop({
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
        className={`transition-colors hover:text-[#00BCD4] ${
          isActive(linkRef)
            ? "text-primary font-bold underline underline-offset-4 decoration-2 decoration-[#00BCD4]"
            : "text-muted hover:text-foreground"
        }`}
      >
        {label}
      </Link>
    </>
  );
}
