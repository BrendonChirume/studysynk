"use client";
import Box from '@mui/joy/Box';
import Sidebar from '@/components/sidebar';
import Header from '@/components/Header';
import {ReactNode} from "react";
import {usePathname, useRouter} from "next/navigation";
import EnhancedBreadcrumbs from "@/components/breadcrumbs";

interface StudySynkProps {
    children: ReactNode;
}

export default function Studysynk({children}: StudySynkProps) {
    const currentRoute = usePathname();
    const navigate = useRouter();

    return (
        <>
            <Box sx={{display: 'flex', minHeight: '100dvh'}}>
                <Header/>
                <Sidebar currentRoute={currentRoute} navigate={navigate.push}/>
                <Box
                    component="main"
                    className="MainContent"
                    sx={(theme) => ({
                        '--main-paddingTop': {
                            xs: `calc(${theme.spacing(2)} + var(--Header-height, 0px))`,
                            md: '32px',
                        },
                        px: {
                            xs: 2,
                            md: 3,
                        },
                        pt: 'var(--main-paddingTop)',
                        pb: {
                            xs: 2,
                            sm: 2,
                            md: 3,
                        },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100dvh',
                        gap: 1,
                        overflow: 'auto',
                    })}
                >
                    <EnhancedBreadcrumbs pathname={currentRoute}/>
                    {children}
                </Box>
            </Box>
        </>
    );
}
