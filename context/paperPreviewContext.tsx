"use client";

import React from 'react';
import {IPaper} from "@/lib/types";
import {usePathname} from "next/navigation";

interface PaperPreviewContextType {
    paper: IPaper | null;
    showPaperPreview: (paper: IPaper | null) => void;
}

const PaperPreviewContext = React.createContext<PaperPreviewContextType>({
        paper: {
            _id: "",
            author: {id: "", name: ""},
            course: {name: [''], id: '', code: ['']},
            department: {name: '', id: ''},
            description: "",
            externalExaminer: "",
            faculty: {name: '', id: ''},
            internalExaminer: "",
            program: {name: '', id: ''},
            title: "",
            paperType: "",
            university: {name: '', id: '', code: ''},
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

    const [paper, setPaper] = React.useState<IPaper | null>(null);

    React.useEffect(() => {
        if (!currentRoute.includes("papers")) {
            setPaper(null)
        }
    }, [currentRoute])

    const showPaperPreview = (paper: IPaper | null) => setPaper(paper);

    return (
        <PaperPreviewContext.Provider value={{paper, showPaperPreview}}>
            {children}
        </PaperPreviewContext.Provider>
    );
}
