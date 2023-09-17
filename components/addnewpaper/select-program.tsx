"use client";

import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption/AutocompleteOption";
import CircularProgress from "@mui/joy/CircularProgress";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import React from "react";

interface SelectProgramProps {
    setSelected: (token: { program?: string }) => void;
    facultyId?: string;
}

export default function SelectProgram(props: SelectProgramProps) {
    const {setSelected, facultyId} = props;
    const [programs, setFaculties] = React.useState<Program[]>([]);
    const [open, setOpen] = React.useState(false);
    const loading = open && programs.length === 0;

    const [value, setValue] = React.useState<Program | null>(null);
    const [inputValue, setInputValue] = React.useState('');

    const getPrograms = React.useCallback(async () => {
        const data = await fetch(`/api/programs?id=${facultyId}`).then(res => res.json());
        setFaculties(data);
    }, [facultyId]);

    React.useEffect(() => {
        if (!loading) {
            if (!facultyId) {
                setFaculties([])
            }
            return;
        } else {
            getPrograms().then(r => r);
        }

    }, [facultyId, getPrograms, loading]);

    React.useEffect(() => {
        getPrograms().then(r => r)
    }, [getPrograms]);

    return (
        <FormControl sx={{flexGrow: 1}}>
            <FormLabel htmlFor={"program"} id="paper-program">Program</FormLabel>
            <Autocomplete
                id="program"
                name="program"
                autoHighlight
                value={value}
                onChange={(_event, newValue) => {
                    setValue(newValue);
                    setSelected({program: newValue?.id});
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
                options={programs}
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