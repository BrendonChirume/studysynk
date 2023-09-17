import Grid from "@mui/joy/Grid";
import PaperCard from "@/components/paperCard";
import React from "react";
import Styled from "@/components/Styled";
import Box from "@mui/joy/Box";
import FilterOptions from "@/components/papers/filterOptions";

const getPapers = async () => {
    const response = fetch('/api/papers');
    return response.json();
}

export default async function Papers() {
    const papers = await getPapers()

    return (
        <Styled.Section>
            <Box>
                <FilterOptions/>
                <Grid container spacing={3} columns={12}>
                    {
                        papers?.map((paper: QuestionPaper, index: number) => (
                            <Grid xs={12} sm={6} md={4} lg={3} key={index}>
                                <PaperCard paper={paper}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Styled.Section>
    )
}