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
// import SelectFaculty from "@/components/addnewpaper/select-faculty";

export default function AddDepartment() {
    const [loading, setLoading] = React.useState(false);
    const [department, setDepartment] = React.useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());


        await fetch("/api/departments", {
            method: "POST",
            body: JSON.stringify({...data, department}),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(async (response) => {
            const res = await response.json();
            if (response.ok) {
                notify(res.message, "success");
                (event.target as HTMLFormElement).reset();
            } else {
                notify("No faculties! Enquire with the admin", "error");
            }
        }).finally(() => {
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
                <Stack spacing={1} sx={{py: 1}}>
                    <FormControl required id="name">
                        <FormLabel htmlFor="name" id="label-name">Department name</FormLabel>
                        <Input name="name"/>
                    </FormControl>
                    {/*<SelectFaculty setSelected={(token) => setDepartment(token.faculty as string)}/>*/}
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
