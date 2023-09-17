"use client";
import Button from "@mui/joy/Button";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import IconButton from "@mui/joy/IconButton";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import ListBulletIcon from "@heroicons/react/24/outline/ListBulletIcon";
import Box from "@mui/joy/Box";
import React from "react";
import {useFilter} from "@/context/filterContext";

export default function FilterOptions() {
    const {isOpen, showFilter} = useFilter();

    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Button
                color={"neutral"}
                onClick={() => showFilter(!isOpen)}
                startDecorator={
                    <FunnelIcon className="h-4 w-4 ss-icon"/>
                } size={"sm"} sx={{fontWeight: 'normal', py: 1, px: 2}}
                variant="outlined">
                Filters
            </Button>
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