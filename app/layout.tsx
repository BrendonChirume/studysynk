import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ReactNode} from "react";
import StudySynk from "@/providers/studysynk";
import ThemeRegistry from "@/providers/themeRegistry";

const inter = Inter({subsets: ['latin']})

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
        <body className={inter.className}>
        <ThemeRegistry options={{key: "ss"}}>
            <StudySynk>{children}</StudySynk>
        </ThemeRegistry>
        </body>
        </html>
    )
}
