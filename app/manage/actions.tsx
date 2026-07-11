import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ManageActions() {

      const session = await getServerSession(authOptions);

      if (!session || !session.user) {
          redirect("/not-found");
      }

      const whitelistRaw = process.env.WHITELIST || "";
      const adminWhitelist = whitelistRaw.split(",").map((email) => email.trim().toLowerCase());
  
      const userEmail = session.user.email?.toLowerCase() || ""; // prod
  
      // const userEmail = ""; // dev
  
      const isAuthorizedAdmin = adminWhitelist.includes(userEmail);
  
      if (!isAuthorizedAdmin) {
          redirect("/manage/orders");
      }
}