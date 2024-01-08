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

type Lower = { [key: string]: string | number | boolean | Lower };

export async function lower<T extends Lower>(obj: T, exclude?: string[] | string) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const property = obj[key];

            if (exclude && exclude.indexOf(key) > -1) {
            } else if (typeof property === 'string') {
                obj[key as keyof T] = property.toLowerCase().trim() as T[keyof T];
            } else if (typeof property === 'object' && property !== null) {
                await lower(property, exclude);
            }
        }
    }
}

