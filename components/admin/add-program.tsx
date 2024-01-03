import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
// import SelectProgram from "@/components/addnewpaper/select-program";
// import SelectCourse from "@/components/addnewpaper/select-course";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import notify from "@/lib/utils/notify";

export default function AddProgram() {
    const [loading, setLoading] = React.useState(false);
    const [program, setProgram] = React.useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());


        await fetch("/api/programs", {
            method: "POST",
            body: JSON.stringify({...data, program}),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(async (response) => {
            const res = await response.json();
            if (response.ok) {
                notify(res.message, "success");
                (event.target as HTMLFormElement).reset();
            } else {
                notify("Failed to create program", "error");
            }
        }).finally(() => {
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
                <Stack spacing={1} sx={{py: 1}}>
                    <FormControl required id="name">
                        <FormLabel htmlFor="name" id="label-name">Program name</FormLabel>
                        <Input name="name"/>
                    </FormControl>
                    {/*<SelectProgram setSelected={(token) => setProgram(token.program as string)}/>*/}
                    {/*<SelectCourse setSelected={(token) => setProgram(token.course as string)} courses={}/>*/}
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