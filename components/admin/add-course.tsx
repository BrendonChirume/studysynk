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

export default function AddProgram() {
    const [loading, setLoading] = React.useState(false);
    const [program, setProgram] = React.useState<IProgram | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());


        await fetch("/api/programs", {
            method: "POST",
            body: JSON.stringify({
                ...data,
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
                    <FormControl required id="course">
                        <FormLabel htmlFor="course" id="label-course">Program</FormLabel>
                        <Input name="course"/>
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