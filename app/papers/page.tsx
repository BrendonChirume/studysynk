import Grid from "@mui/joy/Grid";
import PaperCard from "@/components/paperCard";
import React from "react";
import Styled from "@/components/Styled";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import IconButton from "@mui/joy/IconButton";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import ListBulletIcon from "@heroicons/react/24/outline/ListBulletIcon";
import {Paper} from "@/lib/types";
import { getPapers } from "@/lib/prisma/papers";


export default async function Papers() {
    const papers = await getPapers();

    return (
        <Styled.Section>
            <Box>
                <Box
                    sx={{
                        py: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Button
                        color={"neutral"}
                        // onClick={() => showFilter(!isOpen)}
                        startDecorator={
                            <FunnelIcon className="h-4 w-4 ss-icon"/>
                        } size={"sm"} sx={{fontWeight: 'normal', py: 1, px: 2}}
                        variant="outlined">
                        Filters
                    </Button>
                    <ToggleButtonGroup value="grid" color="neutral" size={"sm"}>
                        <IconButton value="grid" sx={{px: 1}}>
                            <Squares2X2Icon className="w-5 h-5 ss-icon"/>
                        </IconButton>
                        <IconButton value="list" sx={{px: 1}}>
                            <ListBulletIcon className="w-5 h-5 ss-icon"/>
                        </IconButton>
                    </ToggleButtonGroup>
                </Box>
                <Grid container spacing={3} columns={12}>
                    {
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