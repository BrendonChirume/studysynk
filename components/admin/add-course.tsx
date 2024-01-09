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
import {ICourse, IProgram} from "@/lib/types";
import SelectProgram from "@/components/addnewpaper/select-program";
import {handleApiResponse} from "@/lib/utils/helper";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Grid from "@mui/joy/Grid";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import PlusCircleIcon from "@heroicons/react/24/solid/PlusCircleIcon"
import MinusCircleIcon from "@heroicons/react/24/solid/MinusCircleIcon"

interface RepeatInput {
    item: 'names' | 'codes' | 'lecturers';
}

interface AugmentedObject {
    [key: string]: string | number | boolean | string[] | number[] | boolean[];
}

const AddRepeatInput = ({item}: RepeatInput) => {
    const [selected, setSelected] = React.useState<readonly number[]>([0]);

    const handleClick = (id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex > selected.length - 1) {
            newSelected = newSelected.concat(selected, id + 1);
        } else if (selectedIndex === 0 && selected.length !== 1) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };


    return (
        <Grid xs={12}>
            <Typography component="label" htmlFor={`course-${item}`} id={`label-${item}`}>
                Course {item}
            </Typography>
            <Stack direction={"row"} alignItems={"flex-end"} gap={2} sx={{mt: 0.5}}>
                <Grid container spacing={3} sx={{flex: 1}}>
                    {
                        selected.map((index) => (
                            <Grid xs={12} md={selected.length === 1 ? 12 : 6} key={index}>
                                <Input name={`${item}-${index}`}
                                       id={`course-${item}-${index}`}
                                       {
                                           ...(selected.length !== 1 && {
                                               endDecorator: (
                                                   <IconButton
                                                       onClick={() => handleClick(index)}>
                                                       <MinusCircleIcon className={"ss-icon w-6 h-6"}/>
                                                   </IconButton>
                                               )
                                           })
                                       }
                                       slotProps={{
                                           input: {
                                               sx: {
                                                   textTransform: 'capitalize'
                                               }
                                           }
                                       }}/>
                            </Grid>
                        ))
                    }
                </Grid>

                <IconButton onClick={() => handleClick(selected.length + selected[selected.length - 1])}>
                    <PlusCircleIcon className={"ss-icon w-6 h-6"}/>
                </IconButton>
            </Stack>
        </Grid>
    )
}

export default function AddCourse() {
    const [loading, setLoading] = React.useState(false);
    const [level, setLevel] = React.useState<string | null>('1.1');
    const [program, setProgram] = React.useState<IProgram | null>(null);

    const handleChange = (
        _event: React.SyntheticEvent | null,
        newValue: string | null,
    ) => setLevel(newValue);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        const course = Object.fromEntries(formData);


        function augmentKeys(obj: AugmentedObject): AugmentedObject {
            const result: AugmentedObject = {};

            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const splitKey = key.split('-');
                    if (splitKey.length > 1) {
                        const newKey = splitKey[0];
                        const value = obj[key];

                        if (!result[newKey]) {
                            result[newKey] = [];
                        }

                        if (value !== "") {
                            (result[newKey] as Array<string | number | boolean>).push(value as string);
                        }
                    } else {
                        result[key] = obj[key];
                    }
                }
            }

            return result;
        }

        const data = {
            level,
            ...augmentKeys(course as AugmentedObject),
            university: program?.university,
            faculty: program?.faculty,
            department: program?.department,
            programs: [{
                name: program?.name,
                programId: program?._id
            }]
        } as unknown as ICourse;

        await fetch("/api/courses", {
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
                    <Typography level="title-md">Course</Typography>
                    <Typography level="body-sm">
                        Add new course
                    </Typography>
                </Box>
                <Divider/>
                <Grid container spacing={3} sx={{py: 1}}>
                    <Grid xs={12}>
                        <SelectProgram setSelected={(token) => setProgram(token)}/>
                    </Grid>

                    {
                        ['names', 'codes', 'lecturers'].map((item) => {
                            return (
                                <AddRepeatInput
                                    key={item}
                                    item={item as "names" | "codes" | "lecturers"}
                                />
                            )
                        })
                    }

                    <Grid xs={12}>
                        <FormControl id="course-level">
                            <FormLabel htmlFor="course-level" id="level">Course level</FormLabel>
                            <Select onChange={handleChange} value={level}>
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