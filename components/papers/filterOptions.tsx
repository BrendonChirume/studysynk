"use client";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import IconButton from "@mui/joy/IconButton";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import ListBulletIcon from "@heroicons/react/24/outline/ListBulletIcon";
import Box from "@mui/joy/Box";
import React from "react";

export default function FilterOptions() {
    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Box></Box>
            <ToggleButtonGroup value="grid" color="neutral" size={"sm"}>
                <IconButton value="grid" sx={{px: 1}}>
                    <Squares2X2Icon className="w-5 h-5 ss-icon"/>
                </IconButton>
                <IconButton value="list" sx={{px: 1}}>
                    <ListBulletIcon className="w-5 h-5 ss-icon"/>
                </IconButton>
            </ToggleButtonGroup>
        </Box>
    )
}