"use client";

import Layout from "@/components/stracture";
import Sidebar from "@/components/sidebar";
import * as React from "react";
import {store} from '@/redux/store'
import {Provider} from 'react-redux'
import {usePathname, useRouter} from "next/navigation";
import Navbar from "@/components/navbar";
import EnhancedBreadcrumbs from "@/components/breadcrumbs";

interface StudySynkProps {
    children: React.ReactNode;
}

export default function Studysynk({children}: StudySynkProps) {
    const currentRoute = usePathname();
    const navigate = useRouter();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [openFilter] = React.useState(false)
    return (
        <Provider store={store}>
            {drawerOpen && (
                <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
                    <Sidebar navigate={navigate.push} currentRoute={currentRoute}/>
                </Layout.SideDrawer>
            )}
            <Layout.Root
                sx={{
                    gridTemplateColumns: openFilter ? {xs: '100%', md: "300px 1fr 280px"} : {
                        xs: '100%',
                        md: "300px 1fr"
                    },
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
                {/*</Box>*/}
            </Layout.Root>
        </Provider>
    );
}
