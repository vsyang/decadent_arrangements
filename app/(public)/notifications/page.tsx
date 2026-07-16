import { redirect } from "next/navigation";
import { getSessionAction } from "@/app/actions/auth";
import { db } from "@/db";
import { Notification, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { NotificationList, NotificationItem } from "@/features/notifications/components/NotificationList";
import { checkAdminPrivilege } from "@/lib/auth-utils";

export const metadata = {
    title: "Notification Center | Decadent Arrangements",
};

// ==========================================
// INTERFACES DE TIPADO DE CONSULTAS (DB ROW SHAPES)
// ==========================================

interface AdminNotificationRow {
    id: string;
    title: string;
    message: string;
    category: string;
    isRead: boolean;
    actionUrl: string | null;
    createdAt: Date;
    user: {
        name: string | null;
        email: string;
    } | null; // El leftJoin puede resultar en null si no hay un usuario asociado
}

interface UserNotificationRow {
    id: string;
    title: string;
    message: string;
    category: string;
    isRead: boolean;
    actionUrl: string | null;
    createdAt: Date;
}

export default async function NotificationsPage() {
    const session = await getSessionAction();

    if (!session?.user?.id || !session.user.email) {
        redirect("/");
    }

    const userId = session.user.id;

    // Validación robusta y segura
    const verifiedRole = checkAdminPrivilege(session.user.email, session.user.role);
    const isAdmin = verifiedRole === "admin";

    let formattedNotifications: NotificationItem[] = [];

    if (isAdmin) {
        // Especificamos el tipo de retorno esperado en la consulta de Drizzle
        const notificationsRaw = await db
            .select({
                id: Notification.id,
                title: Notification.title,
                message: Notification.message,
                category: Notification.category,
                isRead: Notification.isRead,
                actionUrl: Notification.actionUrl,
                createdAt: Notification.createdAt,
                user: {
                    name: users.name,
                    email: users.email,
                },
            })
            .from(Notification)
            .leftJoin(users, eq(Notification.userId, users.id))
            .orderBy(desc(Notification.createdAt)) as AdminNotificationRow[];

        formattedNotifications = notificationsRaw.map((n) => ({
            id: n.id,
            title: n.title,
            message: n.message,
            category: n.category as "orders" | "promotions" | "account",
            isRead: n.isRead,
            actionUrl: n.actionUrl,
            createdAt: n.createdAt,
            user: n.user ? {
                name: n.user.name,
                email: n.user.email,
            } : null,
        }));

    } else {
        const notificationsRaw = await db
            .select({
                id: Notification.id,
                title: Notification.title,
                message: Notification.message,
                category: Notification.category,
                isRead: Notification.isRead,
                actionUrl: Notification.actionUrl,
                createdAt: Notification.createdAt,
            })
            .from(Notification)
            .where(eq(Notification.userId, userId))
            .orderBy(desc(Notification.createdAt)) as UserNotificationRow[];

        formattedNotifications = notificationsRaw.map((n) => ({
            id: n.id,
            title: n.title,
            message: n.message,
            category: n.category as "orders" | "promotions" | "account",
            isRead: n.isRead,
            actionUrl: n.actionUrl,
            createdAt: n.createdAt,
            user: null, // Los usuarios regulares no ven información de otros usuarios
        }));
    }

    return (
        <main className="mx-auto max-w-4xl px-4 py-8 md:py-12">
            <NotificationList
                initialNotifications={formattedNotifications}
                userRole={verifiedRole}
            />
        </main>
    );
}