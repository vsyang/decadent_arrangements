"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyTextButton({ text, name }: { text: string; name: string }) {
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
      className="flex items-center text-left gap-2 hover:underline bg-transparent border-none cursor-pointer"
      title={`Copy ${name}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-600" />
          <span className="text-green-600 font-medium">Copied!</span>
        </>
      ) : (
        <>
          <span className="font-semibold text-slate-900">{text}</span>
          <Copy className="w-4 h-4 text-blue-500" />
        </>
      )}
    </button>
  );
}
