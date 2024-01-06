import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@/components/menu";
import * as React from "react";
import DocumentMagnifyingGlassIcon from "@heroicons/react/24/solid/DocumentMagnifyingGlassIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import ColorSchemeToggle from "@/components/colorSchemeToggle";
import Search from "@/components/search";
import Stack from "@mui/joy/Stack";

export default function Navbar({setDrawerOpen}: { setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: {xs: 0, md: 1.5},
                    flex: {xs: 1, sm: 0}
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
                <Stack direction={"row"} gap={1} justifyContent={"center"} sx={{flex: 1}}>
                    <IconButton
                        size="sm"
                        variant="soft"
                        sx={{
                            width: 35,
                            height: 35
                        }}
                    >
                        <DocumentMagnifyingGlassIcon className="w-6 h-6 ss-icon"/>
                    </IconButton>
                    <Typography component="h1" fontWeight="xl" sx={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        StudySynk
                    </Typography>
                </Stack>
            </Box>
            <Search/>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 1.5}}>
                <ColorSchemeToggle/>
                <Menu/>
            </Box>
        </>
    )
}