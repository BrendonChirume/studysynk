"use client";
import Grid from "@mui/joy/Grid";
import PaperCard from "@/components/paperCard";
import * as React from "react";
import Styled from "@/components/Styled";
import Box from "@mui/joy/Box";
import FilterOptions from "@/components/papers/filterOptions";
import {Paper} from "@/lib/types";
import {usePaperPreview} from "@/context/viewPaperContext";

export default function Papers() {
    const [papers, setPapers] = React.useState<Paper[] | []>([]);
    const {paper} = usePaperPreview();
    const isOpen = Boolean(paper);

    React.useEffect(() => {

        (async () => {
            const papers = await fetch('/api/papers', {
                method: 'GET',
            }).then((response) => response.json());
            setPapers(papers)
        })();

    }, []);

    return (
        <Styled.Section>
            <Box>
                <FilterOptions/>
                <Grid container spacing={3} columns={12}>
                    {
                        papers?.map((paper: Paper, index: number) => (
                            <Grid xs={12} sm={6} md={4} lg={isOpen ? 6 : 3} key={index}>
                                <PaperCard paper={paper}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Styled.Section>
    )
}