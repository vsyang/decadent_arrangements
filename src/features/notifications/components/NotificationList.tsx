"use client";

import { useState, useTransition } from "react";
import {
  markAsReadAction,
  deleteNotificationAction,
} from "../services/actions";
import Link from "next/link";

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  category: "orders" | "promotions" | "account";
  isRead: boolean;
  actionUrl: string | null;
  createdAt: Date;
  user?: {
    name: string | null;
    email: string;
  } | null;
};

interface NotificationListProps {
  initialNotifications: NotificationItem[];
  userRole: string; // "user" | "admin"
}

export function NotificationList({
  initialNotifications,
  userRole,
}: NotificationListProps) {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<
    "all" | "orders" | "promotions" | "account"
  >("all");
  const [isPending, startTransition] = useTransition();

  const isAdmin = userRole === "admin";

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "all") return true;
    return notif.category === activeTab;
  });

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );

    startTransition(async () => {
      try {
        await markAsReadAction(id);
      } catch (error) {
        console.error("Failed to mark read:", error);
      }
    });
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));

    startTransition(async () => {
      try {
        await deleteNotificationAction(id);
      } catch (error) {
        console.error("Failed to delete notification:", error);
      }
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {isAdmin ? "System Notification Center" : "My Notifications"}
          </h1>
          {/* Corregido: 'text-muted' para contraste accesible en fondo claro */}
          <p className="text-sm text-muted">
            {isAdmin
              ? "Global control and audit panel for system alerts."
              : "Keep track of your order updates and account changes."}
          </p>
        </div>
      </div>

      {/* Selector de Categorías (Tabs) */}
      <div className="flex gap-2 border-b border-border pb-px overflow-x-auto">
        {(["all", "orders", "promotions", "account"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize whitespace-nowrap ${
              activeTab === tab
                ? "border-primary text-foreground"
                : "border-transparent text-muted hover:text-foreground" // Corregido de '' a 'text-muted'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Listado de Notificaciones */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          /* Corregido: Usamos bg-border/10 como superficie neutral en vez de bg-stone-50 */
          <div className="text-center py-12 border border-dashed border-border rounded-lg bg-border/10">
            <p className="text-muted text-sm">
              No notifications found in this category.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-xl border transition-all duration-200 flex items-start justify-between gap-4 ${
                notif.isRead
                  ? "bg-background border-border/40 opacity-70"
                  : "bg-border/20 border-border shadow-sm" // Corregido: Usamos opacidades del color de borde semántico
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Badges de Categorías adaptados a las paletas semánticas */}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      notif.category === "orders"
                        ? "bg-secondary/15 text-secondary"
                        : notif.category === "promotions"
                          ? "bg-accent/15 text-accent"
                          : "bg-primary/15 text-primary"
                    }`}
                  >
                    {notif.category}
                  </span>

                  {isAdmin && notif.user && (
                    <span className="text-xs font-semibold text-muted">
                      For: {notif.user.name || notif.user.email}
                    </span>
                  )}

                  <span className="text-[10px] text-muted">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3
                  className={`text-sm font-semibold ${notif.isRead ? "text-muted" : "text-foreground"}`}
                >
                  {notif.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed max-w-2xl">
                  {notif.message}
                </p>

                {notif.actionUrl && (
                  <div className="pt-1.5">
                    <Link
                      href={notif.actionUrl}
                      className="text-xs font-semibold text-primary hover:text-accent transition-colors hover:underline"
                    >
                      View Details &rarr;
                    </Link>
                  </div>
                )}
              </div>

              {/* Botones de acción individual */}
              <div className="flex items-center gap-1.5 shrink-0">
                {!notif.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(notif.id)}
                    className="p-1 rounded-md text-muted hover:text-foreground hover:bg-border/20 transition-colors"
                    title="Mark as Read"
                    disabled={isPending}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </button>
                )}
                <button
                  onClick={() => handleDelete(notif.id)}
                  className="p-1 rounded-md text-muted hover:text-danger hover:bg-danger/10 transition-colors"
                  title="Delete Alert"
                  disabled={isPending}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
