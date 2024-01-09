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
import Image from "next/image"
import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon"
import UserIcon from "@heroicons/react/24/solid/UserIcon"
import FormHelperText from "@mui/joy/FormHelperText";
import {ToastContainer} from "react-toastify";
import notify from "@/lib/utils/notify";
import {IStudent} from "@/lib/types";

function isEmpty(obj: FormDataEntryValue) {
    return Object.keys(obj).length === 0;
}

export default function Signup() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [imageSrc, setImageSrc] = React.useState<string>('');
    const [password, setPassword] = React.useState({
        password: '',
        confirmPassword: '',
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name !== "image") {
            return setPassword((prevState) => ({...prevState, [event.target.name]: event.target.value}));
        }
        return event.target.files && event.target.files[0] && setImageSrc(URL.createObjectURL(event.target.files[0]));
    }

    React.useEffect(() => {
        if (password.password.length > 3 && password.confirmPassword.length > 3)
            setError(password.password !== password.confirmPassword);
    }, [password])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // setLoading(true)

        const formData = new FormData(event.currentTarget);
        let data = Object.fromEntries(formData) as unknown as IStudent & { confirmPassword?: string };
        if (data.password !== data.confirmPassword) {
            setLoading(false)
            return;
        }
        delete data.confirmPassword;

        if (isEmpty(data.image)) {
            data.image = imageSrc;
        }

        data = {
            ...data,
            streak: '',
            image: 'https://i.pravatar.cc/40?img=2',
            bio: '',
            university: {name: '', id: ''},
            faculty: {name: '', id: ''},
            department: {name: '', id: ''},
            program: {name: '', id: ''},
        }

        await fetch('/api/students', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response) => {
            if (response.ok) {
                setLoading(false);
                const res = await response.json()
                if (res.message.includes("exists")) {
                    return notify(res.message, "warning")
                }
                return router.push('/signin');
            } else {
                return notify(response.statusText, "error");
            }
        }).finally(() => setLoading(false))

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
                            Create your account in minutes and have access to unlimited papers
                        </Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid xs={12}>
                        <Stack direction={{xs: "column", md: "row"}}
                               sx={{alignItems: {xs: "center", md: "flex-start"}}} spacing={2}>
                            <Stack direction="column" spacing={1} sx={{
                                position: "relative",
                                width: 108,
                                height: 108,
                                margin: "0 auto",
                            }}>
                                <AspectRatio
                                    ratio="1"
                                    maxHeight={108}
                                    sx={{flex: 1, width: 108, borderRadius: '100%'}}
                                >
                                    {
                                        imageSrc.length > 0 ?
                                            <Image alt={"profile image"} width={108} height={108}
                                                   src={imageSrc as string}/> :
                                            <UserIcon className={"ss-icon"} style={{padding: 12}}/>
                                    }
                                </AspectRatio>
                                <Input
                                    sx={{
                                        display: "none",
                                    }}
                                    onChange={handleChange}
                                    slotProps={{
                                        input: {
                                            id: "image",
                                            accept: "image/*",
                                            name: "image",
                                        }
                                    }} component="div" type={"file"}/>
                                <IconButton
                                    aria-label="upload new profile picture"
                                    variant="outlined"
                                    color="neutral"
                                    type={"button"}
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
                                        component={"label"} htmlFor={"image"}>
                                        <PencilIcon className={"w-5 h-5 ss-icon"}/>
                                    </Box>
                                </IconButton>
                            </Stack>
                            <Grid container spacing={2} sx={{flexGrow: 1}}>
                                <Grid xs={12}>
                                    <FormControl required id="name-label">
                                        <FormLabel htmlFor="signin-name" id="label-name">
                                            Full name
                                        </FormLabel>
                                        <Input type="text" name="name"/>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12}>
                                    <FormControl required id="email-wrapper">
                                        <FormLabel htmlFor="email-wrapper" id="label-email">Your email</FormLabel>
                                        <Input type="email" name="email"/>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} md={6}>
                                    <FormControl required id="password-wrapper" error={error}>
                                        <FormLabel htmlFor="password-wrapper" id="label-password">Password</FormLabel>
                                        <Input type="password" name="password" value={password.password}
                                               onChange={handleChange}/>
                                        <FormHelperText sx={{display: error ? "flex" : "none", alignItems: 'center'}}>
                                            <InformationCircleIcon className={"w-5 h-5 ss-icon"}/>
                                            &nbsp;Passwords do not match!
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} md={6}>
                                    <FormControl required id="confirmPassword-wrapper" error={error}>
                                        <FormLabel htmlFor="confirmPassword-wrapper" id="label-password">
                                            Confirm password
                                        </FormLabel>
                                        <Input type="password" name="confirmPassword" value={password.confirmPassword}
                                               onChange={handleChange}/>
                                        <FormHelperText sx={{display: error ? "flex" : "none", alignItems: 'center'}}>
                                            <InformationCircleIcon className={"w-5 h-5 ss-icon"}/>
                                            &nbsp;Passwords do not match!
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Stack>

                    </Grid>


                    <Grid xs={12} sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <Button type="submit" sx={{width: {xs: "100%", md: 250}}} loading={loading}>
                            Sign up
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
            <ToastContainer/>
        </Container>
    )
}