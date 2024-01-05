"use client";

import Styled from "@/components/Styled";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import * as React from "react";
import Stack from "@mui/joy/Stack";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Divider from "@mui/joy/Divider";
import Grid from "@mui/joy/Grid";
import SelectUniversity from "@/components/addnewpaper/select-university";
import DropZone from "@/components/dropZone";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import PaperAirplaneIcon from "@heroicons/react/24/outline/PaperAirplaneIcon";
import SelectFaculty from "@/components/addnewpaper/select-faculty";
import SelectCourse from "@/components/addnewpaper/select-course";
import SelectProgram from "@/components/addnewpaper/select-program";
import notify from "@/lib/utils/notify";
import {ToastContainer} from "react-toastify";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import {Course, Department, Faculty, Program} from "@/lib/types";
import SelectDepartment from "@/components/addnewpaper/select-department";
import {useSession} from "next-auth/react";


export default function AddNewPage() {
    const {data: session} = useSession();
    const [faculties, setFaculties] = React.useState<Faculty[] | []>([]);
    const [departments, setDepartments] = React.useState<Department[] | []>([]);
    const [programs, setPrograms] = React.useState<Program[] | []>([]);
    const [courses, setCourses] = React.useState<Course[] | []>([]);
    const [inputValue, setInputValue] = React.useState<{
        university: string,
        faculty: string
        department: string,
        program: string,
        course: string,
    }>({
        university: "",
        faculty: "",
        department: "",
        program: "",
        course: ""
    });

    const [isLoading, setIsLoading] = React.useState<boolean>(false);


    // Handle form submit
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        const withAuthor = {
            ...data,
            author: {
                id: session?.user?.email,
                name: session?.user?.name
            }
        }

        await fetch('/api/papers', {
            method: 'POST',
            body: JSON.stringify(withAuthor),
        }).then((response) => {
            if (response.ok) {
                notify("Submitted for verification!", "success");
                (event.target as HTMLFormElement).reset();
            } else {
                notify("An error occurred while submitting!", "error");
            }
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <Styled.Section>
            <Box sx={{pt: 4}}>
                <Typography level="h5">Add New Paper</Typography>
                <Typography level="body-sm" sx={{mt: 1}}>The credibility of this information is at your
                    discretion.</Typography>
                <form onSubmit={handleSubmit} encType={"multipart/form-data"}>
                    <Stack spacing={{xs: 3, md: 5}}>
                        <Box>
                            <FormControl sx={{flex: 1, mt: 2.5}} id="title">
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
                                    placeholder="Paper title" variant="soft" name="title" size="lg" color="neutral"/>
                            </FormControl>
                        </Box>
                        <Divider/>
                        <Grid container spacing={1}>
                            <Grid xs={12} lg={4}>
                                <Typography level="h5">Paper details</Typography>
                                <Typography level="body-sm" sx={{mt: 1}}>
                                    This information will help us organize and process your submission accurately.
                                </Typography>
                            </Grid>
                            <Grid xs={12} lg={8}>
                                <Styled.Item sx={{p: {xs: 2, md: 3}, mt: {xs: 2, md: 0}}}>
                                    <Grid container spacing={3}>
                                        <Grid xs={12}>
                                            <SelectUniversity
                                                inputValue={inputValue}
                                                setInputValue={setInputValue}
                                                setFaculties={setFaculties}/>
                                        </Grid>
                                        <Grid xs={12}>
                                            <SelectFaculty
                                                inputValue={inputValue}
                                                setInputValue={setInputValue}
                                                faculties={faculties}
                                                setDepartments={setDepartments}
                                            />
                                        </Grid>
                                        <Grid xs={12}>
                                            <SelectDepartment
                                                inputValue={inputValue}
                                                setInputValue={setInputValue}
                                                departments={departments}
                                                setPrograms={setPrograms}
                                            />
                                        </Grid>
                                        <Grid xs={12}>
                                            <SelectProgram
                                                inputValue={inputValue}
                                                setInputValue={setInputValue}
                                                programs={programs}
                                                setCourses={setCourses}
                                            />
                                        </Grid>
                                        <Grid xs={12}>
                                            <SelectCourse
                                                inputValue={inputValue}
                                                setInputValue={setInputValue}
                                                courses={courses}/>
                                        </Grid>
                                        <Grid xs={6}>
                                            <FormControl id="year" sx={{flexGrow: 1}}>
                                                <FormLabel htmlFor="year" id="paper-year">Year</FormLabel>
                                                <Input name={"year"} type="number"
                                                       slotProps={{
                                                           input: {
                                                               min: 2000,
                                                               max: 2024,
                                                               step: 1,
                                                           }
                                                       }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid xs={6}>
                                            <FormControl id={"paper-type"} sx={{display: {sm: 'contents'}}}>
                                                <FormLabel htmlFor="paper-type" id="paper-year">Paper type</FormLabel>
                                                <Select
                                                    defaultValue="1"
                                                >
                                                    <Option value="1">
                                                        Exam paper
                                                    </Option>
                                                    <Option value="2">
                                                        Question paper
                                                    </Option>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Styled.Item>
                            </Grid>

                        </Grid>
                        <Divider/>
                        <Grid container spacing={1}>
                            <Grid xs={12} lg={4}>
                                <Typography level="h5">Upload question paper</Typography>
                                <Typography level="body-sm" sx={{mt: 1}}>
                                    Please upload a pdf file of the question paper and enter a short description of the
                                    paper.
                                </Typography>
                            </Grid>
                            <Grid xs={12} lg={8}>
                                <Styled.Item
                                    sx={{
                                        p: {xs: 2, md: 3},
                                        mt: {xs: 2, md: 0},
                                        display: 'flex',
                                        gap: 3,
                                        flexDirection: 'column'
                                    }}>

                                    <DropZone inputId={"file"} accept={"application/pdf"}/>

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
            </Box>
            <ToastContainer/>
        </Styled.Section>
    );
}