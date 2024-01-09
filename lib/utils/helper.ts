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

type Lower = { [key: string]: string | number | boolean | Lower | Array<string | number | boolean | Lower> };

export async function lower<T extends Lower>(obj: T, exclude?: string[] | string) {
    const clean = (token: string) => token.toLowerCase().trim();

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const property = obj[key];

            if (exclude && exclude.indexOf(key) > -1) {
                // Exclude specified keys
            } else if (typeof property === 'string') {
                obj[key as keyof T] = clean(property) as T[keyof T];
            } else if (Array.isArray(property)) {
                for (let i = 0; i < property.length; i++) {
                    if (typeof property[i] === 'object' && property[i] !== null) {
                        await lower(property[i] as Lower, exclude);
                    } else if (typeof property[i] === 'string') {
                        property[i] = clean(property[i] as string);
                    }
                }
            } else if (typeof property === 'object' && property !== null) {
                await lower(property, exclude);
            }
        }
    }
}
