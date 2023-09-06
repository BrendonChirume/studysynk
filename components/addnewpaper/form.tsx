"use client";

import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Divider from "@mui/joy/Divider";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import Styled from "@/components/Styled";
import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import DropZone from "@/components/dropZone";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import PaperAirplaneIcon from "@heroicons/react/24/outline/PaperAirplaneIcon";
import * as React from "react";

interface FormProps {
    collages: any;
}

export default function Form(props: FormProps) {
    const {collages} = props;
    const [open, setOpen] = React.useState(false);
    const loading = open && options.length === 0;
    const courses = [{name: ''}];
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(event.currentTarget)
            // Handle response if necessary
            const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/papers`, {
                method: 'POST',
                body: formData,
            });

            console.log(data)

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={{xs: 3, md: 5}}>
                <Box>
                    <FormControl sx={{flex: 1, mt: 2.5}}>
                        <FormLabel htmlFor="title" id="paper-title" sx={{display: {sm: 'none'}}}>
                            Paper title
                        </FormLabel>
                        <Input
                            sx={{
                                "& .MuiInput-input": {
                                    textTransform: 'capitalize'
                                },
                                "--Input-radius": "10px",
                                py: 2, px: 2.5,
                            }}
                            slotProps={{input: {id: "title", name: 'title'}}}
                            placeholder="Paper title" variant="soft" size="lg" color="neutral"/>
                    </FormControl>
                </Box>
                <Divider/>
                <Grid container spacing={1}>
                    <Grid xs={12} md={4}>
                        <Typography level="h5">Paper description</Typography>
                        <Typography level="body-sm" sx={{mt: 1}}>
                            This information will help us organize and process your submission accurately.
                        </Typography>
                    </Grid>
                    <Grid xs={12} md={8}>
                        <Styled.Item sx={{p: {xs: 2, md: 3}, mt: {xs: 2, md: 0}}}>
                            <Grid container spacing={3}>
                                <Grid xs={12}>
                                    <FormControl sx={{flexGrow: 1}}>
                                        <FormLabel htmlFor={"collage"} id="paper-collage">Collage</FormLabel>
                                        <Autocomplete
                                            id="collage"
                                            name="collage"
                                            autoHighlight
                                            options={collages}
                                            getOptionLabel={(option) => option.name}
                                            renderOption={(props, option) => {
                                                // @ts-ignore
                                                const {key, ...rest} = props;
                                                return (
                                                    <AutocompleteOption
                                                        sx={{px: 2, py: 0.5, cursor: "pointer"}}
                                                        key={key} {...rest}>{option.name}
                                                    </AutocompleteOption>
                                                )
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={6}>
                                    <FormControl>
                                        <FormLabel htmlFor="faculty" id="paper-faculty">Faculty</FormLabel>
                                        <Autocomplete
                                            id="faculty"
                                            name="faculty"
                                            autoHighlight
                                            options={courses}
                                            getOptionLabel={(option) => option.name}
                                            renderOption={(props, option) => {
                                                // @ts-ignore
                                                const {key, ...rest} = props;
                                                return (
                                                    <AutocompleteOption
                                                        sx={{px: 2, py: 0.5, cursor: "pointer"}}
                                                        key={key} {...rest}>{option.name}
                                                    </AutocompleteOption>
                                                )
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={6}>
                                    <FormControl>
                                        <FormLabel htmlFor="department"
                                                   id="paper-department">Department</FormLabel>
                                        <Autocomplete
                                            id="department"
                                            name="department"
                                            autoHighlight
                                            options={courses}
                                            getOptionLabel={(option) => option.name}
                                            renderOption={(props, option) => {
                                                // @ts-ignore
                                                const {key, ...rest} = props;
                                                return (
                                                    <AutocompleteOption
                                                        sx={{px: 2, py: 0.5, cursor: "pointer"}}
                                                        key={key} {...rest}>{option.name}
                                                    </AutocompleteOption>
                                                )
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={12}>
                                    <FormControl>
                                        <FormLabel htmlFor="department"
                                                   id="paper-department">Course name</FormLabel>
                                        <Autocomplete
                                            id="course-name"
                                            name="course"
                                            autoHighlight
                                            options={courses}
                                            getOptionLabel={(option) => option.name}
                                            renderOption={(props, option) => {
                                                // @ts-ignore
                                                const {key, ...rest} = props;
                                                return (
                                                    <AutocompleteOption
                                                        sx={{px: 2, py: 0.5, cursor: "pointer"}}
                                                        key={key} {...rest}>{option.name}
                                                    </AutocompleteOption>
                                                )
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={6}>
                                    <FormControl sx={{flexGrow: 1}}>
                                        <FormLabel htmlFor="courseCode" id="paper-code">Course code</FormLabel>
                                        <Input slotProps={{input: {id: "courseCode"}}} name="courseCode" sx={{
                                            "& .MuiInput-input": {
                                                textTransform: 'uppercase'
                                            }
                                        }}/>
                                    </FormControl>
                                </Grid>
                                <Grid xs={6}>
                                    <FormControl sx={{flexGrow: 1}}>
                                        <FormLabel htmlFor="year" id="paper-year">Year</FormLabel>
                                        <Input slotProps={{input: {id: "year"}}} name={"year"}/>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12}>
                                    <FormControl sx={{flexGrow: 1}}>
                                        <FormLabel htmlFor="paper-type" id="paper-year">Paper type</FormLabel>
                                        <Autocomplete
                                            id="paper-type"
                                            name={"paperType"}
                                            autoHighlight
                                            options={['Practice Questions', 'Exam Paper']}
                                            renderOption={(props, option) => {
                                                // @ts-ignore
                                                const {key, ...rest} = props;
                                                return (
                                                    <AutocompleteOption
                                                        sx={{px: 2, py: 0.5, cursor: "pointer"}}
                                                        key={key} {...rest}>{option}
                                                    </AutocompleteOption>
                                                )
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Styled.Item>
                    </Grid>

                </Grid>
                <Divider/>
                <Grid container spacing={1}>
                    <Grid xs={12} md={4}>
                        <Typography level="h5">Upload question paper</Typography>
                        <Typography level="body-sm" sx={{mt: 1}}>
                            Please upload a pdf file of the question paper and enter a short description of the
                            paper.
                        </Typography>
                    </Grid>
                    <Grid xs={12} md={8}>
                        <Styled.Item
                            sx={{
                                p: {xs: 2, md: 3},
                                mt: {xs: 2, md: 0},
                                display: 'flex',
                                gap: 3,
                                flexDirection: 'column'
                            }}>

                            <DropZone/>

                            <FormControl sx={{flexGrow: 1}}>
                                <FormLabel htmlFor="description" id="paper-description">Description&nbsp;
                                    <Typography
                                        level={"body-xs"}>(Optional)</Typography></FormLabel>
                                <Textarea
                                    name="description"
                                    slotProps={{textarea: {id: "description"}}}
                                    placeholder="Try to put text longer than 4 lines."
                                    minRows={3}
                                    maxRows={7}
                                />
                            </FormControl>
                        </Styled.Item>
                    </Grid>
                </Grid>
                <Divider/>
                <Box sx={{display: 'flex', justifyContent: "flex-end"}}>
                    <span>
                    <Button
                        loading={isLoading}
                        variant="soft" type="submit" sx={{fontWeight: 500}}
                        endDecorator={
                            <PaperAirplaneIcon className="w-5 h-5 ss-icon"/>
                        }>
                        Submit for review
                    </Button>
                    </span>
                </Box>
            </Stack>
        </form>
    )
}

