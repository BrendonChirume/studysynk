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
import SelectUniversity from "@/components/addnewpaper/select-university";
import {IDepartment, IFaculty, IUniversity} from "@/lib/types";
import SelectDepartment from "@/components/addnewpaper/select-department";
import SelectFaculty from "@/components/addnewpaper/select-faculty";
import {handleApiResponse} from "@/lib/utils/helper";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Grid from "@mui/joy/Grid";

export default function AddProgram() {
    const [loading, setLoading] = React.useState(false);
    const [university, setUniversity] = React.useState<IUniversity | null>(null);
    const [faculty, setFaculty] = React.useState<IFaculty | null>(null);
    const [department, setDepartment] = React.useState<IDepartment | null>(null);
    const [level, setLevel] = React.useState<string | null>(null);
    const handleChange = (
        _event: React.SyntheticEvent | null,
        newValue: string | null,
    ) => setLevel(newValue)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        const data = {...Object.fromEntries(formData.entries()), level, deptId: department?._id};


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
                        <SelectUniversity setSelected={(token) => setUniversity(token)}/>
                    </Grid>
                    <Grid xs={12}>
                        <SelectFaculty university={university?.name} setSelected={(token) => setFaculty(token)}/>
                    </Grid>
                    <Grid xs={12}>
                        <SelectDepartment faculty={faculty?.name} setSelected={(token) => setDepartment(token)}/>
                    </Grid>
                    <Grid xs={4}>
                        <FormControl id="program-level">
                            <FormLabel htmlFor="program-level" id="level">Program level</FormLabel>
                            <Select onChange={handleChange} defaultValue="Undergraduate">
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