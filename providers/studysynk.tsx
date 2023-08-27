"use client";

import Layout from "@/components/stracture";
import Sidebar from "@/components/sidebar";
import * as React from "react";
import {store} from '@/redux/store'
import {Provider} from 'react-redux'
import {usePathname, useRouter} from "next/navigation";
import Navbar from "@/components/navbar";
import EnhancedBreadcrumbs from "@/components/breadcrumbs";
import {useFilter} from "@/containers/filterContext";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import Sheet from "@mui/joy/Sheet";
import {AvatarGroup} from "@mui/joy";
import Avatar from "@mui/joy/Avatar";
import AspectRatio from "@mui/joy/AspectRatio";

interface StudySynkProps {
    children: React.ReactNode;
}

export default function Studysynk({children}: StudySynkProps) {
    const currentRoute = usePathname();
    const navigate = useRouter();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const {isOpen, showFilter} = useFilter();

    return (
        <Provider store={store}>
            {drawerOpen && (
                <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
                    <Sidebar navigate={navigate.push} currentRoute={currentRoute}/>
                </Layout.SideDrawer>
            )}
            <Layout.Root
                sx={{
                    gridTemplateColumns: isOpen ? {xs: '100%', md: "300px 1fr minmax(280px, 300px)"} : {
                        xs: '100%',
                        md: "300px 1fr"
                    },
                    // transform: 'translateX(calc(100% * (var(1, 0) - 1)))',
                    transition: '0.3s ease',
                    ...(drawerOpen && {
                        height: '100vh',
                        overflow: 'hidden',
                    }),
                }}
            >
                <Layout.Header>
                    <Navbar setDrawerOpen={setDrawerOpen}/>
                </Layout.Header>
                <Layout.SideNav>
                    <Sidebar navigate={navigate.push} currentRoute={currentRoute}/>
                </Layout.SideNav>
                <Layout.Main>
                    <EnhancedBreadcrumbs pathname={currentRoute}/>
                    {children}
                </Layout.Main>
                <Sheet
                    sx={{
                        display: {xs: 'none', sm: 'initial'},
                        borderLeft: '1px solid',
                        borderColor: 'neutral.outlinedBorder',
                    }}
                >
                    <Box sx={{p: 2, display: 'flex', alignItems: 'center'}}>
                        <Typography level="h5" sx={{flex: 1}}>Filters</Typography>
                        <IconButton variant="outlined" color="neutral" size="sm" onClick={() => showFilter(!isOpen)}>
                            <XMarkIcon className="w-4 h-4 ss-icon"/>
                        </IconButton>
                    </Box>
                    <Divider/>
                    <AspectRatio ratio="21/9">
                        {/*<img*/}
                        {/*    alt=""*/}
                        {/*    src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=774"*/}
                        {/*/>*/}
                    </AspectRatio>
                    <Box sx={{p: 2, display: 'flex', gap: 1, alignItems: 'center'}}>
                        <Typography level="body-sm" mr={1}>
                            Shared with
                        </Typography>
                        <AvatarGroup size="sm" sx={{'--Avatar-size': '24px'}}>
                            <Avatar
                                src="https://i.pravatar.cc/24?img=6"
                                srcSet="https://i.pravatar.cc/48?img=6 2x"
                            />
                            <Avatar
                                src="https://i.pravatar.cc/24?img=7"
                                srcSet="https://i.pravatar.cc/48?img=7 2x"
                            />
                            <Avatar
                                src="https://i.pravatar.cc/24?img=8"
                                srcSet="https://i.pravatar.cc/48?img=8 2x"
                            />
                            <Avatar
                                src="https://i.pravatar.cc/24?img=9"
                                srcSet="https://i.pravatar.cc/48?img=9 2x"
                            />
                        </AvatarGroup>
                    </Box>
                    <Divider/>
                    <Box
                        sx={{
                            gap: 2,
                            p: 2,
                            display: 'grid',
                            gridTemplateColumns: 'auto 1fr',
                            '& > *:nth-child(odd)': {color: 'text.secondary'},
                        }}
                    >
                        <Typography level="body-sm">Type</Typography>
                        <Typography level="body-sm" textColor="text.primary">
                            Image
                        </Typography>

                        <Typography level="body-sm">Size</Typography>
                        <Typography level="body-sm" textColor="text.primary">
                            3,6 MB (3,258,385 bytes)
                        </Typography>

                        <Typography level="body-sm">Storage used</Typography>
                        <Typography level="body-sm" textColor="text.primary">
                            3,6 MB (3,258,385 bytes)
                        </Typography>

                        <Typography level="body-sm">Location</Typography>
                        <Typography level="body-sm" textColor="text.primary">
                            Travel pictures
                        </Typography>

                        <Typography level="body-sm">Owner</Typography>
                        <Typography level="body-sm" textColor="text.primary">
                            Michael Scott
                        </Typography>

                        <Typography level="body-sm">Modified</Typography>
                        <Typography level="body-sm" textColor="text.primary">
                            26 October 2016
                        </Typography>

                        <Typography level="body-sm">Created</Typography>
                        <Typography level="body-sm" textColor="text.primary">
                            5 August 2016
                        </Typography>
                    </Box>
                    <Divider/>
                    <Box sx={{py: 2, px: 1}}>
                        <Button variant="plain" size="sm" endDecorator={<PencilSquareIcon/>}>
                            Add a description
                        </Button>
                    </Box>
                </Sheet>

            </Layout.Root>
        </Provider>
    );
}
