"use client";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Grid from "@mui/joy/Grid";
import Filter from "@/components/filter";
import Styled from "@/components/Styled";
import FileCard from "@/components/fileCard";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import IconButton from "@mui/joy/IconButton";
import ListBulletIcon from "@heroicons/react/24/outline/ListBulletIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import Stack from "@mui/joy/Stack";
import React from "react";
import data from "@/app/data.json"

export default function Library() {
    const [selected, setSelected] = React.useState<{ name: string }[]>([]);
    const faculties: { name: string; programs: { name: string }[] }[] = data.faculties

    const handleSelect = (selection: string[]) => {
        selection.map((select) => {
            faculties.map((faculty) => {
                if (faculty.name === select) {
                    setSelected((prevState) => [...prevState, ...faculty.programs])
                }
            })
        })
    }

    return (
        <Styled.Section>
            <Styled.Header> Library </Styled.Header>
            <Grid container spacing={3}>
                <Grid xs={0} lg={4}>
                    <Styled.Item sx={{
                        position: 'sticky',
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        display: {
                            xs: 'none',
                            lg: 'block'
                        },
                        top: '-1.5%',
                        height: "calc(100vh - 48px)",
                        '&::-webkit-scrollbar': {
                            width: 5
                        },
                        '&::-webkit-scrollbar-track, &::-webkit-scrollbar-thumb': {
                            backgroundColor: ({vars}) => `var(--Body-background, ${vars.palette.background.surface})`
                        },
                        '&:hover::-webkit-scrollbar-track': {
                            backgroundColor: ({vars}) => `var(--Body-background, ${vars.palette.background.scrollbarTrack})`
                        },
                        '&:hover::-webkit-scrollbar-thumb': {
                            backgroundColor: ({vars}) => `var(--Body-background, ${vars.palette.background.scrollbarThumb})`
                        }
                    }}>
                        <Filter handleSelect={handleSelect}/>
                    </Styled.Item>
                </Grid>
                <Grid xs={12} lg={8}>
                    <Styled.Item sx={{p: 2}}>
                        <Stack direction="row" sx={{pb: 2}}>
                            <Typography level="h3" fontSize="xl">
                                Modules / Courses
                            </Typography>
                            <Box sx={{flex: 999}}/>
                            <Box sx={{display: 'flex', gap: 1, '& > *': {flexGrow: 1}}}>
                                <ToggleButtonGroup value="grid" size={"sm"}>
                                    <IconButton value="grid">
                                        <Squares2X2Icon className="w-5 h-5 ss-icon"/>
                                    </IconButton>
                                    <IconButton value="list">
                                        <ListBulletIcon className="w-5 h-5 ss-icon"/>
                                    </IconButton>
                                </ToggleButtonGroup>

                            </Box>
                        </Stack>

                        <Grid container spacing={2}>
                            {
                                selected.map((paper, index) => (
                                    <Grid xs={6} sm={4} md={3} lg={4} key={index}>
                                        <FileCard paper={paper}/>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Styled.Item>
                </Grid>
            </Grid>
        </Styled.Section>
    )
}