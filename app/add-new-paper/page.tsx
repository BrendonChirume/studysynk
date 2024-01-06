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
import {ToastContainer} from "react-toastify";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import SelectDepartment from "@/components/addnewpaper/select-department";
import {useSession} from "next-auth/react";
import {IDepartment, IFaculty, IProgram, IUniversity} from "@/lib/types";
import {handleApiResponse} from "@/lib/utils/helper";


export default function AddNewPage() {
    const {data: session} = useSession();
    const [paperType, setPaperType] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [university, setUniversity] = React.useState<IUniversity | null>(null);
    const [faculty, setFaculty] = React.useState<IFaculty | null>(null);
    const [department, setDepartment] = React.useState<IDepartment | null>(null);
    const [program, setProgram] = React.useState<IProgram | null>(null);

    const handleChange = (
        _event: React.SyntheticEvent | null,
        newValue: string | null,
    ) => setPaperType(newValue)

    // Handle form submit
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        const withAuthor = {
            ...data,
            paperType,
            author: {
                id: session?.user?.email,
                name: session?.user?.name
            }
        }

        await fetch('/api/papers', {
            method: 'POST',
            body: JSON.stringify(withAuthor),
        }).then(handleApiResponse(event)).finally(() => {
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
                                            <SelectUniversity setSelected={(token) => setUniversity(token)}/>
                                        </Grid>
                                        <Grid xs={12}>
                                            <SelectFaculty
                                                university={university?.name}
                                                setSelected={(token) => setFaculty(token)}/>
                                        </Grid>
                                        <Grid xs={12}>
                                            <SelectDepartment
                                                faculty={faculty?.name} setSelected={(token) => setDepartment(token)}/>
                                        </Grid>
                                        <Grid xs={12}>
                                            <SelectProgram department={department?.name}
                                                           setSelected={(token) => setProgram(token)}/>
                                        </Grid>
                                        <Grid xs={12}>
                                            <SelectCourse program={program?.name}/>
                                        </Grid>
                                        <Grid xs={6}>
                                            <FormControl id="year" sx={{flexGrow: 1}}>
                                                <FormLabel htmlFor="year" id="paper-year">Paper year</FormLabel>
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
                                                <Select defaultValue="1" onChange={handleChange}>
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

                                <Styled.Item sx={{p: {xs: 2, md: 3}, mt: 3}}>
                                    <Grid container spacing={3}>
                                        <Grid xs={6}>
                                            <FormControl id="year" sx={{flexGrow: 1}}>
                                                <FormLabel htmlFor="internalExaminer"
                                                           id="paper-internal-examiner">Internal examiner</FormLabel>
                                                <Input name={"internalExaminer"}/>
                                            </FormControl>
                                        </Grid>
                                        <Grid xs={6}>
                                            <FormControl id="year" sx={{flexGrow: 1}}>
                                                <FormLabel htmlFor="externalExaminer"
                                                           id="paper-external-examiner">External examiner</FormLabel>
                                                <Input name={"externalExaminer"}/>
                                            </FormControl>
                                        </Grid>
                                        <Grid xs={12}>

                                        </Grid>
                                        <Grid xs={12}>

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