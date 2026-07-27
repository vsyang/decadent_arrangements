import { useState } from "react";

export function SidebarButton() {
  const [isOpen, setIsOpen] = useState(false);
  return(
    <>
    {/* TOP BAR */}
      <div className="absolute z-500 top-0 right-12 m-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="md:hidden rounded-md p-2 hover:bg-muted/50 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent text-white border-l-1 border-r-1 border-[#00BCD4]"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}