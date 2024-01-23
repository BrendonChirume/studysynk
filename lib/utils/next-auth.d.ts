import type {DefaultSession} from 'next-auth';
import {IStudent} from "@/lib/types";

declare module 'next-auth' {
    interface Session {
        user: DefaultSession['user'] & IStudent
    }

    interface Profile {
        email_verified: boolean;
    }
}