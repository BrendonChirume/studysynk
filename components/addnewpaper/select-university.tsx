"use client";

import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption/AutocompleteOption";
import CircularProgress from "@mui/joy/CircularProgress";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import React from "react";

interface SelectUniversityProps {
    setSelected: (token: { university?: string }) => void;
}

export default function SelectUniversity(props: SelectUniversityProps) {
    const {setSelected} = props;
    const [universities, setUniversities] = React.useState<University[]>([]);
    const [open, setOpen] = React.useState(false);
    const loading = open && universities.length === 0;

    const [value, setValue] = React.useState<University | null>(null);
    const [inputValue, setInputValue] = React.useState('');

    React.useEffect(() => {
        if (!loading) {
            return undefined;
        }

        (async () => {
            const universities = await fetch("/api/universities", {
                method: "GET",
            }).then(res => res.json());
            setUniversities(universities);
        })();
    }, [loading]);

    return (
        <FormControl sx={{flexGrow: 1}}>
            <FormLabel htmlFor={"university"} id="paper-university">University</FormLabel>
            <Autocomplete
                id="university"
                name="university"
                autoHighlight
                value={value}
                onChange={(_event, newValue) => {
                    setValue(newValue);
                    setSelected({university: newValue?.id});
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
                options={universities}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => {
                    // @ts-ignore
                    const {key, id, ...rest} = props;
                    return (
                        <AutocompleteOption
                            sx={{px: 2, py: 0.5, cursor: "pointer"}}
                            key={id} {...rest}>
                            {`${option.name} (${option.acronym})`}
                        </AutocompleteOption>
                    )
                }}
            />
        </FormControl>
    )
}