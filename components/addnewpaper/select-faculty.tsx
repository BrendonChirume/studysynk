"use client";

import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption/AutocompleteOption";
import CircularProgress from "@mui/joy/CircularProgress";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import React from "react";

interface SelectUniversityProps {
    setSelected: (token: { faculty?: string }) => void;
    universityId?: string;
}

export default function SelectFaculty(props: SelectUniversityProps) {
    const {setSelected, universityId} = props;
    const [faculties, setFaculties] = React.useState<Faculty[]>([]);
    const [open, setOpen] = React.useState(false);
    const loading = open && faculties.length === 0;

    const [value, setValue] = React.useState<Faculty | null>(null);
    const [inputValue, setInputValue] = React.useState('');

    const getFaculties = React.useCallback(async () => {
        const data = await fetch(`/api/faculties?id=${universityId}`, {
            method: "GET",
        }).then(res => res.json());
        setFaculties(data);
    }, [universityId]);

    React.useEffect(() => {
        if (!loading) {
            if (!universityId) {
                setFaculties([])
            }
            return;
        } else {
            getFaculties().then(r => r);
        }

    }, [universityId, loading, getFaculties]);

    React.useEffect(() => {
        getFaculties().then(r => r)
    }, [getFaculties]);

    return (
        <FormControl sx={{flexGrow: 1}}>
            <FormLabel htmlFor={"faculty"} id="paper-faculty">Faculty</FormLabel>
            <Autocomplete
                id="faculty"
                name="faculty"
                autoHighlight
                value={value}
                onChange={(_event, newValue) => {
                    setValue(newValue);
                    setSelected({faculty: newValue?.id});
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
                            {`${option.name}`}
                        </AutocompleteOption>
                    )
                }}
            />
        </FormControl>
    )
}