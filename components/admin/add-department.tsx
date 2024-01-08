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
import SelectFaculty from "@/components/addnewpaper/select-faculty";
import {IFaculty, IUniversity} from "@/lib/types";
import SelectUniversity from "@/components/addnewpaper/select-university";
import {handleApiResponse} from "@/lib/utils/helper";

export default function AddDepartment() {
    const [loading, setLoading] = React.useState(false);
    const [university, setUniversity] = React.useState<IUniversity | null>(null);
    const [faculty, setFaculty] = React.useState<IFaculty | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        const data = {
            ...Object.fromEntries(formData.entries()),
            university: {
                id: faculty?.university.id,
                name: faculty?.university.name,
            },
            faculty: {
                id: faculty?._id,
                name: faculty?.name
            }
        };

        await fetch("/api/departments", {
            method: "POST",
            body: JSON.stringify(data),
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
                    <Typography level="title-md">Department</Typography>
                    <Typography level="body-sm">
                        Add new department
                    </Typography>
                </Box>
                <Divider/>
                <Stack spacing={3} sx={{py: 1}}>
                    <SelectFaculty setSelected={(token) => setFaculty(token)}/>
                    <FormControl required id="name">
                        <FormLabel htmlFor="name" id="label-name">Department name</FormLabel>
                        <Input name="name" slotProps={{
                            input: {
                                sx: {
                                    textTransform: 'capitalize'
                                }
                            }
                        }}/>
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
