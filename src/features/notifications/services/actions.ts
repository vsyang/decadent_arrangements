"use server";

import { db } from "@/db";
import { Notification } from "@/db/schema";
import { getSessionAction } from "@/app/actions/auth";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { checkAdminPrivilege } from "@/lib/auth-utils";

export async function markAsReadAction(notificationId: string) {
  const session = await getSessionAction();
  if (!session?.user?.id || !session.user.email) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;
  // Validación híbrida estricta
  const verifiedRole = checkAdminPrivilege(
    session.user.email,
    session.user.role,
  );
  const isAdmin = verifiedRole === "admin";

  if (isAdmin) {
    await db
      .update(Notification)
      .set({ isRead: true, updatedAt: new Date() })
      .where(eq(Notification.id, notificationId));
  } else {
    await db
      .update(Notification)
      .set({ isRead: true, updatedAt: new Date() })
      .where(
        and(
          eq(Notification.id, notificationId),
          eq(Notification.userId, userId),
        ),
      );
  }

  revalidatePath("/notifications");
}

export async function deleteNotificationAction(notificationId: string) {
  const session = await getSessionAction();
  if (!session?.user?.id || !session.user.email) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;
  const verifiedRole = checkAdminPrivilege(
    session.user.email,
    session.user.role,
  );
  const isAdmin = verifiedRole === "admin";

  if (isAdmin) {
    await db.delete(Notification).where(eq(Notification.id, notificationId));
  } else {
    await db
      .delete(Notification)
      .where(
        and(
          eq(Notification.id, notificationId),
          eq(Notification.userId, userId),
        ),
      );
  }

  revalidatePath("/notifications");
}
