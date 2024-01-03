"use client";
import Grid from "@mui/joy/Grid";
import PaperCard from "@/components/paperCard";
import * as React from "react";
import Styled from "@/components/Styled";
import Box from "@mui/joy/Box";
import FilterOptions from "@/components/papers/filterOptions";
import FolderPlusIcon from "@heroicons/react/24/outline/FolderPlusIcon";
import {Paper} from "@/lib/types";
import Typography from "@mui/joy/Typography";
import Link from "next/link";

export default function Papers() {
    const [papers, setPapers] = React.useState<Paper[] | []>([]);

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
                        papers.length === 0 ?
                            (
                                <Grid xs={12}
                                      sx={{
                                          display: "flex",
                                          pt: 10,
                                          justifyContent: "center",
                                          height: 400,
                                      }}>
                                    <Link href={"/add-new-paper"}>
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}>
                                            <Box sx={{width: 120, height: 120}}>
                                                <FolderPlusIcon className="ss-icon"/>
                                            </Box>
                                            <Typography>
                                                Library empty! Click to upload.
                                            </Typography>
                                        </Box>
                                    </Link>
                                </Grid>
                            ) :
                            papers?.map((paper: Paper, index: number) => (
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