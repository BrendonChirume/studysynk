import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import {IProgram} from "@/lib/types";
import SelectProgram from "@/components/addnewpaper/select-program";
import {handleApiResponse} from "@/lib/utils/helper";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

export default function AddCourse() {
    const [loading, setLoading] = React.useState(false);
    const [level, setLevel] = React.useState<string | null>(null);
    const [program, setProgram] = React.useState<IProgram | null>(null);

    const handleChange = (
        _event: React.SyntheticEvent | null,
        newValue: string | null,
    ) => setLevel(newValue)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        await fetch("/api/courses", {
            method: "POST",
            body: JSON.stringify({
                ...data,
                level,
                progId: program?._id,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(handleApiResponse(event)).finally(() => {
            setLoading(false);
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <Box sx={{mb: 1}}>
                    <Typography level="title-md">Course</Typography>
                    <Typography level="body-sm">
                        Add new course
                    </Typography>
                </Box>
                <Divider/>
                <Stack spacing={3} sx={{py: 1}}>
                    <SelectProgram setSelected={(token) => setProgram(token)}/>
                    <FormControl required id="course-name">
                        <FormLabel htmlFor="course-name" id="label-name">Course name</FormLabel>
                        <Input name="name"/>
                    </FormControl>
                    <FormControl id="course-level">
                        <FormLabel htmlFor="course-level" id="level">Course level</FormLabel>
                        <Select onChange={handleChange}>
                            <Option value="1.1">1.1</Option>
                            <Option value="1.2">1.2</Option>
                            <Option value="2.1">2.1</Option>
                            <Option value="2.2">2.2</Option>
                            <Option value="3.0">3.0</Option>
                            <Option value="3.1">3.1</Option>
                            <Option value="3.2">3.2</Option>
                            <Option value="4.1">4.1</Option>
                            <Option value="4.2">4.2</Option>
                            <Option value="5.1">5.1</Option>
                            <Option value="5.2">5.2</Option>
                            <Option value="5.2">5.2</Option>
                            <Option value="6.1">6.1</Option>
                            <Option value="6.2">6.2</Option>
                            <Option value="7.1">7.1</Option>
                            <Option value="7.2">7.2</Option>
                        </Select>
                    </FormControl>
                    <FormControl required id="course-lecturer">
                        <FormLabel htmlFor="course-lecturer" id="label-lecturer">Lecturer</FormLabel>
                        <Input name="lecturer"/>
                    </FormControl>
                </Stack>
                <CardOverflow sx={{borderTop: '1px solid', borderColor: 'divider'}}>
                    <CardActions sx={{alignSelf: 'flex-end', pt: 2}}>
                        <Button size="sm" variant="soft" type={"submit"} loading={loading}>
                            Save
                        </Button>
                    </CardActions>
                </CardOverflow>
            </Card>
        </form>
    )
}