"use client";

import {useState} from "react";
import {signIn} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
    persistent: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export default function Form() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<SignInFormElement>) => {
        event.preventDefault();
        const formElements = event.currentTarget.elements;

        await signIn("credentials", {
            redirect: false,
            email: formElements.email.value,
            password: formElements.password.value,
            // @ts-ignore
        }).then((res) => {
            if (res?.ok) {
                router.refresh();
                return router.push('/');
            } else {
                console.log(res);
            }
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormControl required id="email-wrapper">
                <FormLabel htmlFor="signin-email" id="email">Email</FormLabel>
                <Input type="email" name="email" id="signin-email"/>
            </FormControl>
            <FormControl required id="password-wrapper">
                <FormLabel htmlFor="signin-password" id="password">Password</FormLabel>
                <Input type="password" name="password" id="signin-password"/>
            </FormControl>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Link href={"#"}> Forgot your password? </Link>
            </Box>
            <Button type="submit" fullWidth loading={loading}>
                Sign in
            </Button>
        </form>
    );
}