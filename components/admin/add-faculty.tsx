import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import SelectUniversity from "@/components/addnewpaper/select-university";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import notify from "@/lib/utils/notify";

export default function AddFaculty() {
    const [loading, setLoading] = React.useState(false);
    const [university, setUniversity] = React.useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());


        await fetch("/api/faculties", {
            method: "POST",
            body: JSON.stringify({...data, university}),
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
                    <Typography level="title-md">Faculty</Typography>
                    <Typography level="body-sm">
                        Add new faculty
                    </Typography>
                </Box>
                <Divider/>
                <Stack spacing={1} sx={{py: 1}}>
                    <FormControl required id="name">
                        <FormLabel htmlFor="name" id="label-name">Faculty name</FormLabel>
                        <Input name="name"/>
                    </FormControl>
                    <SelectUniversity setSelected={(token) => setUniversity(token.university as string)}/>
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