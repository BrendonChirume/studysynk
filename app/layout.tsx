import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type {Metadata} from 'next'
import {ReactNode} from "react";
import StudySynk from "@/providers/studysynk";
import ThemeRegistry from "@/providers/themeRegistry";
import PaperPreviewProvider from "@/context/viewPaperContext";
import {Inter} from 'next/font/google';

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
            <PaperPreviewProvider>
                <StudySynk>{children}</StudySynk>
            </PaperPreviewProvider>
        </ThemeRegistry>
        </body>
        </html>
    )
}
