"use client";

import React from 'react';
import {Paper} from "@/lib/types";
import {usePathname} from "next/navigation";

interface PaperPreviewContextType {
    paper: Paper | null;
    showPaperPreview: (paper: Paper | null) => void;
}

const PaperPreviewContext = React.createContext<PaperPreviewContextType>({
        paper: {
            _id: "",
            author: {id: "", name: ""},
            course: "",
            date: "",
            department: "",
            description: "",
            externalExaminer: "",
            faculty: "",
            internalExaminer: "",
            program: "",
            title: "",
            university: "",
            url: "",
            year: "",
            createdAt: "",
            updatedAt: "",
        },
        showPaperPreview:
            () => undefined,
    })
;

export const usePaperPreview = () => {
    return React.useContext(PaperPreviewContext);
};

export default function PaperPreviewProvider(
    {children}: {
        children: React.ReactNode;
    }) {
    const currentRoute = usePathname();

    const [paper, setPaper] = React.useState<Paper | null>(null);

    React.useEffect(() => {
        if (!currentRoute.includes("papers")) {
            setPaper(null)
        }
    }, [currentRoute])

    const showPaperPreview = (paper: Paper | null) => setPaper(paper);

    return (
        <PaperPreviewContext.Provider value={{paper, showPaperPreview}}>
            {children}
        </PaperPreviewContext.Provider>
    );
}
