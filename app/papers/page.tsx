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
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import {Skeleton} from "@mui/joy";
import Image from "next/image";

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
                    <Card variant="outlined" sx={{ width: 230, height: 280, display: 'flex', gap: 2}}>
                        <AspectRatio ratio="21/9">
                            <Skeleton variant="overlay">
                                <Image
                                    src={'/data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='}
                                    width={280}
                                    height={280}
                                    style={{
                                        objectPosition: 'top',
                                    }}
                                    alt="PDF Thumbnail"
                                />
                            </Skeleton>
                        </AspectRatio>
                        <Typography>
                            <Skeleton>
                                Lorem ipsum is placeholder.
                            </Skeleton>
                        </Typography>
                    </Card>
                </Grid>
            </Box>
        </Styled.Section>
    )
}