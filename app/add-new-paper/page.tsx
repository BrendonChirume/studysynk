"use client";

import Styled from "@/components/Styled";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import {inputClasses} from "@mui/joy";
import Grid from "@mui/joy/Grid";
import Autocomplete from "@mui/joy/Autocomplete";
import * as React from "react";
import {useAppSelector} from "@/utils/reduxHooks";
import Textarea from "@mui/joy/Textarea";
import DropZone from "@/components/dropZone";

export default function AddNewPage() {
    const courses = useAppSelector(({papers}) => papers)
    return (
        <Styled.Section>
            <Box sx={{pt: 4}}>
                <Typography level="h5">Add New Paper</Typography>
                <Typography level="body-sm" sx={{mt: 1}}>The credibility of this information is at your
                    discretion.</Typography>
                <Stack spacing={5}>
                    <Box>
                        <FormControl sx={{flex: 1, mt: 2.5}}>
                            <FormLabel sx={{display: {sm: 'none'}}}>Paper title</FormLabel>
                            <Input
                                sx={{
                                    [`& .${inputClasses.input}`]: {
                                        textTransform: 'capitalize'
                                    },
                                    "--Input-radius": "10px",
                                    py: 2, px: 2.5,
                                }}
                                placeholder="Paper title" variant="soft" size="lg" color="primary"/>
                        </FormControl>
                    </Box>
                    <Divider/>
                    <Grid container spacing={1}>
                        <Grid xs={4}>
                            <Typography level="h5">Paper description</Typography>
                            <Typography level="body-sm" sx={{mt: 1}}>
                                This information will help us organize and process your submission accurately.
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                            <Styled.Item sx={{p: 3}}>
                                <Grid container spacing={3}>
                                    <Grid xs={12}>
                                        <FormControl sx={{flexGrow: 1}}>
                                            <FormLabel>University</FormLabel>
                                            <Autocomplete
                                                id="course-university"
                                                autoHighlight
                                                options={courses}
                                                getOptionLabel={(option) => option.name}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={12}>
                                        <FormControl sx={{flexGrow: 1}}>
                                            <FormLabel>Paper type</FormLabel>
                                            <Autocomplete
                                                id="course-university"
                                                autoHighlight
                                                options={['Practice Questions', 'Exam Paper']}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={6}>
                                        <FormControl>
                                            <FormLabel>Faculty</FormLabel>
                                            <Autocomplete
                                                id="courses-list-id"
                                                autoHighlight
                                                options={courses}
                                                getOptionLabel={(option) => option.name}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={6}>
                                        <FormControl>
                                            <FormLabel>Department</FormLabel>
                                            <Autocomplete
                                                id="courses-list-id"
                                                autoHighlight
                                                options={courses}
                                                getOptionLabel={(option) => option.name}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={6}>
                                        <FormControl sx={{flexGrow: 1}}>
                                            <FormLabel>Course code</FormLabel>
                                            <Input sx={{
                                                [`& .${inputClasses.input}`]: {
                                                    textTransform: 'uppercase'
                                                }
                                            }}/>
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={6}>
                                        <FormControl sx={{flexGrow: 1}}>
                                            <FormLabel>Year</FormLabel>
                                            <Input/>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Styled.Item>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={1}>
                        <Grid xs={4}>
                            <Typography level="h5">Upload question paper</Typography>
                            <Typography level="body-sm" sx={{mt: 1}}>
                                Please upload a pdf file of the question paper and enter a short description of the
                                paper.
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                            <Styled.Item sx={{p: 3, display: 'flex', gap: 3, flexDirection: 'column'}}>
                                <DropZone/>
                                <FormControl sx={{flexGrow: 1}}>
                                    <FormLabel>Description&nbsp;<Typography
                                        level={"body-xs"}>(Optional)</Typography></FormLabel>
                                    <Textarea
                                        placeholder="Try to put text longer than 4 lines."
                                        minRows={3}
                                        maxRows={7}
                                    />
                                </FormControl>
                            </Styled.Item>
                        </Grid>
                    </Grid>

                </Stack>
            </Box>
        </Styled.Section>
    )
        ;
}