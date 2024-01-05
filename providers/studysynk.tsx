"use client";

import * as Layout from "@/components/stracture";
import Sidebar from "@/components/sidebar";
import * as React from "react";
import {usePathname} from "next/navigation";
import Navbar from "@/components/navbar";
import EnhancedBreadcrumbs from "@/components/breadcrumbs";
import {AuthProvider} from "@/providers/authProvider";
import PaperPreview from "@/components/paperPreview";
import {usePaperPreview} from "@/context/viewPaperContext";

interface StudySynkProps {
    children: React.ReactNode;
}

export default function StudySynk({children}: StudySynkProps) {
    const currentRoute = usePathname();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const {paper} = usePaperPreview();
    const isOpen = Boolean(paper);

    return (

        <AuthProvider>
            {['/signin', '/signup'].includes(currentRoute) ? children : (
                <>
                    {drawerOpen && (
                        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
                            <Sidebar currentRoute={currentRoute}/>
                        </Layout.SideDrawer>
                    )}
                    <Layout.Root
                        sx={{
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
                            <Sidebar currentRoute={currentRoute}/>
                        </Layout.SideNav>
                        <Layout.Main
                            sx={{
                                overflow: 'auto',
                                height: 'calc(100vh - 64px)'
                            }}>
                            <EnhancedBreadcrumbs pathname={currentRoute}/>
                            {children}
                        </Layout.Main>

                        <PaperPreview/>

                    </Layout.Root>
                </>
            )}
        </AuthProvider>
    );
}
