import notify from "@/lib/utils/notify";
import React from "react";
export const handleApiResponse = (event: React.FormEvent<HTMLFormElement>) => async (response: Response) => {
    if (response.ok) {
        const res = await response.json();
        if (res.message.includes("exists")) {
            return notify(res.message, "warning")
        }
        (event.target as HTMLFormElement).reset();
        return notify(res.message, "success");
    } else {
        return notify(response.statusText, "error");
    }
}