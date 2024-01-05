"use client";

import React from 'react';
import {Paper} from "@/lib/types";

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
            name: "",
            program: "",
            title: "",
            university: "",
            url: "",
            year: ""
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
    const [paper, setPaper] = React.useState<Paper | null>(null);

    const showPaperPreview = (paper: Paper | null) => setPaper(paper);

    return (
        <PaperPreviewContext.Provider value={{paper, showPaperPreview}}>
            {children}
        </PaperPreviewContext.Provider>
    );
}
