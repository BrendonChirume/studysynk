import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import {IDepartment, IProgram} from "@/lib/types";
import SelectDepartment from "@/components/addnewpaper/select-department";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Grid from "@mui/joy/Grid";
import {handleApiResponse} from "@/lib/utils/helper";

export default function AddProgram() {
    const [loading, setLoading] = React.useState(false);
    const [department, setDepartment] = React.useState<IDepartment | null>(null);
    const [level, setLevel] = React.useState<string>("Undergraduate");
    const handleChange = (
        _event: React.SyntheticEvent | null,
        newValue: string | null,
    ) => newValue && setLevel(newValue)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        const data = {
            ...Object.fromEntries(formData.entries()), level,
            faculty: department?.faculty,
            university: department?.university,
            department: {
                name: department?.name,
                id: department?._id
            }
        } as unknown as IProgram;

        await fetch("/api/programs", {
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
                    <Typography level="title-md">Program</Typography>
                    <Typography level="body-sm">
                        Add new program
                    </Typography>
                </Box>
                <Divider/>
                <Grid container spacing={3} sx={{py: 1}}>
                    <Grid xs={12}>
                        <SelectDepartment setSelected={(token) => setDepartment(token)}/>
                    </Grid>
                    <Grid xs={4}>
                        <FormControl id="program-level">
                            <FormLabel htmlFor="program-level" id="level">Program level</FormLabel>
                            <Select onChange={handleChange} value={level}>
                                <Option value="Undergraduate">Undergraduate</Option>
                                <Option value="Masters">Masters</Option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={8}>
                        <FormControl required id="program">
                            <FormLabel htmlFor="program" id="label-program">Program name</FormLabel>
                            <Input name="name" slotProps={{
                                input: {
                                    sx: {
                                        textTransform: 'capitalize'
                                    }
                                }
                            }}/>
                        </FormControl>
                    </Grid>
                </Grid>
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