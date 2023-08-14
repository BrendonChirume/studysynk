import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@/components/menu";
import * as React from "react";
import DocumentMagnifyingGlassIcon from "@heroicons/react/24/solid/DocumentMagnifyingGlassIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import ColorSchemeToggle from "@/components/colorSchemeToggle";
import Search from "@/components/search";

export default function Navbar({setDrawerOpen}: { setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 1.5,
                }}
            >
                <IconButton
                    variant="outlined"
                    size="sm"
                    onClick={() => setDrawerOpen(true)}
                    sx={{
                        display: {sm: 'none'},
                        width: 35,
                        height: 35
                    }}
                >
                    <Bars3Icon className={"w-5 h-5 ss-icon"}/>
                </IconButton>
                <IconButton
                    size="sm"
                    variant="soft"
                    sx={{
                        display: {xs: 'none', sm: 'inline-flex'}, width: 35,
                        height: 35
                    }}
                >
                    <DocumentMagnifyingGlassIcon className="w-6 h-6 ss-icon"/>
                </IconButton>
                <Typography component="h1" fontWeight="xl" tw="font-lighter">
                    StudySynk
                </Typography>
            </Box>
            <Search/>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 1.5}}>
                <ColorSchemeToggle/>
                <Menu/>
            </Box>
        </>
    )
}