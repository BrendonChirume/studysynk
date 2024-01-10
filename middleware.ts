export {default} from "next-auth/middleware";

export const config = {matcher: ["/", "/add-new-paper", "/admin", "/students/:name*", "/papers"]}