"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function SpecialRequestsModal({
  requestTitle,
  specialRequest,
  isAllergy,
}: {
  requestTitle: string;
  specialRequest?: string[] | string | null;
  isAllergy: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const renderContent = (isModalView: boolean) => {
    if (!specialRequest || specialRequest.length === 0) {
      return <span>None</span>;
    }

    if (Array.isArray(specialRequest)) {
      return (
        <ul
          className={`list-disc list-inside ${isModalView ? "space-y-1" : "inline-flex gap-2"}`}
        >
          {specialRequest.map((item, index) => (
            <li
              key={index}
              className={
                isModalView
                  ? ""
                  : "inline after:content-[','] last:after:content-none"
              }
            >
              {/* This is for the preview */}
              {isModalView ? item : item}
            </li>
          ))}
        </ul>
      );
    }

    return <span>{specialRequest}</span>;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col gap-2 text-left bg-transparent border-none cursor-pointer w-full group p-2"
        type="button"
      >
        <h3
          className={`text-xs font-semibold uppercase tracking-wider ${
            isAllergy
              ? "text-red-800 group-hover:text-orange-600 group-hover:bg-white"
              : "text-slate-500 group-hover:text-blue-600 group-hover:bg-slate-100"
          }
        `}
        >
          {requestTitle}
        </h3>
        <div className="whitespace-pre-wrap text-s font-bold text-slate-900 leading-none line-clamp-1 w-full">
          {renderContent(false)}
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur fro back things */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Box for modal */}
          <div className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal top */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                {requestTitle} Detail
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                type="button"
              >
                <X className="h-5 w-5 cursor-pointer" />
              </button>
            </div>

            {/* Info long */}
            <div className="mt-4">
              <div className="text-sm font-medium text-slate-900 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 max-h-[60vh] overflow-y-auto">
                {renderContent(true)}
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
