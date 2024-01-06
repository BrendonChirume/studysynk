import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import notify from "@/lib/utils/notify";

export default function AddUniversity() {
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        await fetch("/api/universities", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 30
            }
        }).then(async (response) => {
            if (response.ok) {
                const res = await response.json();
                if (res.message.includes("exists")) {
                    return notify(res.message, "warning")
                }
                (event.target as HTMLFormElement).reset();
                return notify(res.message, "success");
            } else {
                notify("Error creating university!", "error");
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <Card>
                <Box sx={{mb: 1}}>
                    <Typography level="title-md">University name</Typography>
                    <Typography level="body-sm">
                        Add new university
                    </Typography>
                </Box>
                <Divider/>
                <Stack spacing={3} sx={{py: 1}}>
                    <FormControl required id="university">
                        <FormLabel htmlFor="university" id="label-university">University</FormLabel>
                        <Input name="name"/>
                    </FormControl>
                    <FormControl id="code">
                        <FormLabel htmlFor="code" id="label-code">Code (e.g NUST)</FormLabel>
                        <Input name="code"/>
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