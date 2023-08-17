import './globals.css'
import type {Metadata} from 'next'
import {ReactNode} from "react";
import StudySynk from "@/providers/studysynk";
import ThemeRegistry from "@/providers/themeRegistry";
import FilterProvider from "@/containers/filterContext";

export const metadata: Metadata = {
    title: 'StudySynk',
    description: 'An ultimate study resource for university students',
}

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <html lang="en">
        <body>
        <ThemeRegistry options={{key: "ss"}}>
            <FilterProvider>
                <StudySynk>{children}</StudySynk>
            </FilterProvider>
        </ThemeRegistry>
        </body>
        </html>
    )
}
