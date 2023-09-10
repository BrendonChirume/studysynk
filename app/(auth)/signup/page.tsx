"use client";

import Container from "@mui/joy/Container";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Link from "next/link";
import Button from "@mui/joy/Button";
import * as React from "react";
import Divider from "@mui/joy/Divider";
import Grid from "@mui/joy/Grid";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function Signup() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true)

        const formData = new FormData(event.currentTarget);

        await axios.post('/api/signup', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res)
        }).finally(() => {
            setLoading(false);
            router.push('/signin')
        });

    }

    return (
        <Container>
            <Stack justifyContent="center" alignItems={"center"} height={"100vh"}>
                <Grid
                    container
                    component={"form"}
                    spacing={3}
                    sx={(theme) => ({
                        width: {xs: "100%", md: "70%"},
                        backgroundColor: 'rgba(255 255 255 / 0.6)',
                        [theme.getColorSchemeSelector('dark')]: {
                            backgroundColor: 'rgba(19 19 24 / 0.4)',
                        },
                        display: "flex",
                        p: 4,
                        boxShadow: "md",
                        borderRadius: "md"
                    })}
                    onSubmit={handleSubmit}>
                    <Grid xs={12}>
                        <Typography component={"h1"} level={"h3"}>Sign Up</Typography>
                        <Typography level={"body-sm"} sx={{mt: 1}}>
                            Create your account in minutes and start have access to unlimited papers
                        </Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid xs={6}>
                        <FormControl required id="firstname-label">
                            <FormLabel htmlFor="signin-firstname" id="label-firstname">First name</FormLabel>
                            <Input type="text" name="firstName"/>
                        </FormControl>
                    </Grid>
                    <Grid xs={6}>
                        <FormControl required id="lastname-wrapper">
                            <FormLabel htmlFor="lastname-wrapper" id="label-email">Last name</FormLabel>
                            <Input type="text" name="lastName"/>
                        </FormControl>
                    </Grid>
                    <Grid xs={6}>
                        <FormControl required id="email-wrapper">
                            <FormLabel htmlFor="email-wrapper" id="label-email">Email</FormLabel>
                            <Input type="email" name="email"/>
                        </FormControl>
                    </Grid>
                    <Grid xs={6}>
                        <FormControl required id="password-wrapper">
                            <FormLabel htmlFor="password-wrapper" id="label-password">Password</FormLabel>
                            <Input type="password" name="password"/>
                        </FormControl>
                    </Grid>
                    <Grid xs={6}>
                        <FormControl required id="confirmPassword-wrapper">
                            <FormLabel htmlFor="confirmPassword-wrapper" id="label-password">
                                Confirm password
                            </FormLabel>
                            <Input type="password" name="password"/>
                        </FormControl>
                    </Grid>
                    <Grid xs={12}>
                        <Button type="submit" fullWidth loading={loading}>
                            Sign in
                        </Button>
                    </Grid>
                    <Grid xs={12}>
                        <Typography
                            level="body-md"
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            Already have an Account?&nbsp;<Link href={"/signin"}>Sign up</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    )
}