"use client";
import Grid from "@mui/joy/Grid";
import PaperCard from "@/components/paperCard";
import * as React from "react";
import Styled from "@/components/Styled";
import Box from "@mui/joy/Box";
import FilterOptions from "@/components/papers/filterOptions";
import {IPaper} from "@/lib/types";
import {usePaperPreview} from "@/context/paperPreviewContext";

export default function Papers() {
    const [papers, setPapers] = React.useState<IPaper[] | []>([]);
    const {paper, showPaperPreview} = usePaperPreview();
    const isOpen = !Boolean(paper?.title === paper?.createdAt);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {

        (async () => {
            const papers = await fetch('/api/papers', {
                method: 'GET',
            }).then((response) => response.json());
            setPapers(papers)
        })();

    }, []);

    const handlePaperViewClose = () => {
        showPaperPreview(null)
    }

    React.useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('click', handlePaperViewClose)
        }
        return () => {
            if (container) {
                container.removeEventListener('click', handlePaperViewClose)
            }
        }
    });

    return (
        <Styled.Section>
            <Box>
                <FilterOptions/>
                <Grid ref={containerRef} container spacing={3} columns={12}>
                    {
                        papers?.map((paper: IPaper, index: number) => (
                            <Grid xs={12} sm={6} md={4} lg={isOpen ? 4 : 3} key={index}>
                                <PaperCard paper={paper}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Styled.Section>
    )
}