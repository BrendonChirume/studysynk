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
import notify from "@/lib/utils/notify";
import SelectUniversity from "@/components/addnewpaper/select-university";
import {IDepartment, IFaculty, IUniversity} from "@/lib/types";
import SelectDepartment from "@/components/addnewpaper/select-department";
import SelectFaculty from "@/components/addnewpaper/select-faculty";
import {handleApiResponse} from "@/lib/utils/helper";

export default function AddProgram() {
    const [loading, setLoading] = React.useState(false);
    const [university, setUniversity] = React.useState<IUniversity | null>(null);
    const [faculty, setFaculty] = React.useState<IFaculty | null>(null);
    const [department, setDepartment] = React.useState<IDepartment | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());


        await fetch("/api/programs", {
            method: "POST",
            body: JSON.stringify({
                ...data,
                progId: department?._id,
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
                    <Typography level="title-md">Program</Typography>
                    <Typography level="body-sm">
                        Add new program
                    </Typography>
                </Box>
                <Divider/>
                <Stack spacing={3} sx={{py: 1}}>
                    <SelectUniversity setSelected={(token) => setUniversity(token)}/>
                    <SelectFaculty setSelected={(token) => setFaculty(token)}/>
                    <SelectDepartment setSelected={(token) => setDepartment(token)}/>
                    <FormControl required id="program">
                        <FormLabel htmlFor="program" id="label-program">Program name</FormLabel>
                        <Input name="program"/>
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