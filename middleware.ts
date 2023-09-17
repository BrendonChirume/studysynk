export {default} from "next-auth/middleware";

export const config = {matcher: ["/", "/add-new-paper", "/admin", "/profile/*", "/papers"]}