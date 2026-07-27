import { Menu, X } from "lucide-react";

export function SidebarButton({ isOpen }: { isOpen: boolean }) {
  return (
    <>
      {/* TOP BAR */}
      <div className="z-[80] top-0">
        <button
          type="button"
          className="rounded-md p-2 hover:bg-muted/50 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent text-white border-l-1 border-r-1 border-[#00BCD4]"
          aria-label={isOpen ? "Menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </>
  );
}
