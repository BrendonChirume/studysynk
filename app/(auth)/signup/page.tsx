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
import {useRouter} from "next/navigation";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import IconButton from "@mui/joy/IconButton";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";

export default function Signup() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true)

        const formData = new FormData(event.currentTarget);

        await fetch('/api/student', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response.ok)
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
                    <Grid xs={12}>
                        <Stack direction="row" spacing={2}>
                            <Stack direction="column" spacing={1} sx={{position: "relative"}}>
                                <AspectRatio
                                    ratio="1"
                                    maxHeight={108}
                                    sx={{flex: 1, minWidth: 108, borderRadius: '100%'}}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                                        srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                                        loading="lazy"
                                        alt=""
                                    />
                                </AspectRatio>
                                <Input
                                    sx={{
                                        display: "none",
                                    }}
                                    slotProps={{
                                        input: {
                                            id: "file",
                                            accept: "image/*",
                                            name: "profileImage",
                                        }
                                    }} component="div" type={"file"}/>
                                <IconButton
                                    aria-label="upload new profile picture"
                                    variant="outlined"
                                    color="neutral"
                                    sx={{
                                        bgcolor: 'background.body',
                                        position: 'absolute',
                                        zIndex: 2,
                                        left: 72,
                                        overflow: "hidden",
                                        top: 62,
                                        borderRadius: '50%',
                                        boxShadow: 'sm',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: 30,
                                            height: 30,
                                            borderRadius: '50%',

                                        }}
                                        component={"label"} htmlFor={"file"}>
                                        <PencilIcon className={"w-5 h-5 ss-icon"}/>
                                    </Box>
                                </IconButton>
                            </Stack>
                            <Grid container spacing={2} sx={{flexGrow: 1}}>
                                <Grid xs={6}>
                                    <FormControl required id="firstname-label">
                                        <FormLabel htmlFor="signin-firstname" id="label-firstname">First
                                            name</FormLabel>
                                        <Input type="text" name="firstName"/>
                                    </FormControl>
                                </Grid>
                                <Grid xs={6}>
                                    <FormControl required id="lastname-wrapper">
                                        <FormLabel htmlFor="lastname-wrapper" id="label-email">Last name</FormLabel>
                                        <Input type="text" name="lastName"/>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12}>
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
                            </Grid>
                        </Stack>

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
                            Already have an Account?&nbsp;<Link href={"/signin"}>Sign in</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    )
}