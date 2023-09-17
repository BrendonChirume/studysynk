"use client";

import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import * as React from "react";
import Box from "@mui/joy/Box";
import {toast, ToastContainer} from "react-toastify";
import notify from "@/lib/utils/notify";

export default function Admin() {
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        await fetch("/api/universities", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData.entries())),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            if (response.ok) {
                notify("University created successfully!", "success");
                (event.target as HTMLFormElement).reset();
            } else {
                notify("Error creating university!", "error");
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <Box
            sx={{
                width: "80%",
                height: 500,
                bgcolor: 'background.paper',
                borderRadius: 1,
                boxShadow: 1,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
            }}
            component={"form"}
            onSubmit={handleSubmit}>
            <FormControl required id="university">
                <FormLabel htmlFor="university" id="label-university">University</FormLabel>
                <Input name="name"/>
            </FormControl>
            <FormControl id="acronym">
                <FormLabel htmlFor="acronym" id="label-acronym">Acronym</FormLabel>
                <Input name="acronym"/>
            </FormControl>
            <Button type="submit" loading={loading}>
                Save
            </Button>
            <ToastContainer/>
        </Box>

    )
}