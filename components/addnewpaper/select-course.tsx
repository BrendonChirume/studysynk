"use client";

import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption/AutocompleteOption";
import CircularProgress from "@mui/joy/CircularProgress";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import React from "react";

interface SelectCourseProps {
    setSelected: (token: { course?: string }) => void;
    programId?: string;
}

export default function SelectCourse(props: SelectCourseProps) {
    const {setSelected, programId} = props;
    const [faculties, setFaculties] = React.useState<Course[]>([]);
    const [open, setOpen] = React.useState(false);
    const loading = open && faculties.length === 0;

    const [value, setValue] = React.useState<Course | null>(null);
    const [inputValue, setInputValue] = React.useState('');

    const getFaculties = React.useCallback(async () => {
        const data = await fetch(`/api/courses?id=${programId}`, {
            method: "GET",
        }).then(res => res.json());
        setFaculties(data);
    }, [programId]);

    React.useEffect(() => {
        if (!loading) {
            if (!programId) {
                setFaculties([])
            }
            return;
        } else {
            getFaculties().then(r => r);
        }

    }, [programId, loading, getFaculties]);

    React.useEffect(() => {
        getFaculties().then(r => r);
    }, [getFaculties]);

    return (
        <FormControl sx={{flexGrow: 1}}>
            <FormLabel htmlFor={"course"} id="paper-course">Course</FormLabel>
            <Autocomplete
                id="course"
                name="course"
                autoHighlight
                value={value}
                onChange={(_event, newValue) => {
                    setValue(newValue);
                    setSelected({course: newValue?.id});
                }}
                inputValue={inputValue}
                onInputChange={(_event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                loading={loading}
                endDecorator={
                    loading ? (
                        <CircularProgress size="sm" sx={{bgcolor: 'background.surface'}}/>
                    ) : null
                }
                options={faculties}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => {
                    // @ts-ignore
                    const {key, id, ...rest} = props;
                    return (
                        <AutocompleteOption
                            sx={{px: 2, py: 0.5, cursor: "pointer"}}
                            key={id} {...rest}>
                            {`${option.code} ${option.name}`}
                        </AutocompleteOption>
                    )
                }}
            />
        </FormControl>
    )
}