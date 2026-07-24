"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyTextButton({
  text,
  name,
  order,
}: {
  text: string;
  name: string;
  order: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying:", error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center text-left gap-2 text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
      title={`Copy ${name}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-600" />
          <span className="text-green-600 font-medium">Copied!</span>
        </>
      ) : (
        <>
          {!order && <Copy className="w-4 h-4" />}
          <span>{text}</span>
        </>
      )}
    </button>
  );
}
