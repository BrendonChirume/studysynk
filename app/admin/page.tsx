"use client";

import * as React from "react";
import {ToastContainer} from "react-toastify";
import AddUniversity from "@/components/admin/add-university";
import Stack from "@mui/joy/Stack";
import AddFaculty from "@/components/admin/add-faculty";
import AddProgram from "@/components/admin/add-program";
import AddDepartment from "@/components/admin/add-department";


export default function Admin() {
    return (
        <Stack
            spacing={4}
            sx={{
                display: 'flex',
                maxWidth: '800px',
                mx: 'auto',
                px: {
                    xs: 2,
                    md: 6,
                },
                py: {
                    xs: 2,
                    md: 3,
                },
            }}
        >
            <AddUniversity/>
            <AddFaculty/>
            <AddDepartment/>
            <AddProgram/>
            <ToastContainer/>
        </Stack>

    )
}