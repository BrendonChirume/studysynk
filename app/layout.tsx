import './globals.css'
import type {Metadata} from 'next'
import {ReactNode} from "react";
import StudySynk from "@/providers/studysynk";
import ThemeRegistry from "@/providers/themeRegistry";

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
            <StudySynk>{children}</StudySynk>
        </ThemeRegistry>
        </body>
        </html>
    )
}
