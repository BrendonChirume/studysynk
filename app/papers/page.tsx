"use client";

import Grid from "@mui/joy/Grid";
import FileCard from "@/components/fileCard";
import React from "react";
import Styled from "@/components/Styled";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import IconButton from "@mui/joy/IconButton";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import ListBulletIcon from "@heroicons/react/24/outline/ListBulletIcon";
import {useAppSelector} from "@/utils/reduxHooks";

export default function Library() {
    const programs: { name: string; }[] = useAppSelector(({papers}) => papers)

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
                <Grid container spacing={3} columns={{xs: 12, sm: 6, md: 12}}>
                    {
                        programs.map((paper, index) => (
                            <Grid xs={6} md={3} lg={3} key={index}>
                                <FileCard paper={paper}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Styled.Section>
    )
}