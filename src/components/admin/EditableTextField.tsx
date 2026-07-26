"use client";

import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";

import {
  OrderFieldsText,
  updateOrderField,
} from "../../../app/(admin)/orders/actions";
import { CopyTextButton } from "./CopyTextButton";

interface EditableTextFieldProps {
  copy: boolean;
  orderId: string;
  label: string;
  value: string;
  field: OrderFieldsText;
  type?: "text" | "email" | "tel" | "number" | "textarea";
}

export default function EditableTextField({
  copy,
  orderId,
  label,
  value,
  field,
  type = "text",
}: EditableTextFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  function handleCancel() {
    setNewValue(value);
    setIsEditing(false);
    setError("");
  }

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSave() {
    if (!newValue.trim()) {
      setError("This field cannot be empty.");
      return;
    }

    if (type === "email" && !isValidEmail(newValue)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      await updateOrderField(orderId, field, newValue);

      setIsEditing(false);

      // Reload
      window.location.reload();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong while saving.");
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      {label != "Special Requests" && (
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </h3>
      )}

      {!isEditing ? (
        <div className="mt-1 flex items-center gap-3">
          {copy ? (
            <CopyTextButton text={value} name={label} />
          ) : (
            <span className="font-semibold text-slate-900">
              {label === "Price" && "$"}
              {value}
              {label === "Capacity (Size)" && " people"}
            </span>
          )}
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label={`Edit ${label}`}
            title={`Edit ${label}`}
          >
            <Pencil className="h-4 w-4 text-black" />
          </button>
        </div>
      ) : (
        <div className="mt-2">
          <div className="flex items-center gap-2">
            {type === "textarea" ? (
              <textarea
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                rows={5}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                autoFocus
              />
            ) : (
              <input
                type={type}
                step={label === "Price" ? "0.01" : undefined}
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                autoFocus
              />
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-lg bg-green-600 p-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={`Save ${label}`}
              title={`Save ${label}`}
            >
              <Check className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="rounded-lg bg-slate-200 p-2 text-slate-700 transition hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={`Cancel editing ${label}`}
              title={`Cancel editing ${label}`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {error && (
            <p className="mt-1 text-xs font-medium text-red-600">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}
