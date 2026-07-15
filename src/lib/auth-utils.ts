/**
 * Valida si un usuario califica como administrador cruzando base de datos y variable de entorno.
 */
export function checkAdminPrivilege(email: string | null | undefined, dbRole: string): "admin" | "user" {
    if (!email) return "user";

    try {
        const whitelistRaw = process.env.WHITELIST || "[]";
        const whitelist: string[] = JSON.parse(whitelistRaw);

        const isInWhitelist = whitelist.includes(email.toLowerCase());
        const isDbAdmin = dbRole === "admin";

        // Solo si cumple ambos lados, es considerado Admin real
        if (isInWhitelist && isDbAdmin) {
            return "admin";
        }
    } catch (error) {
        console.error("Error validando whitelist en servidor:", error);
    }

    return "user";
}