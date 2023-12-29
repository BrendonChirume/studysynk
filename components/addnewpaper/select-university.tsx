import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import CircularProgress from '@mui/joy/CircularProgress';
import {Faculty, University} from "@/lib/types";
import AutocompleteOption from "@mui/joy/AutocompleteOption";

interface SelectUniversityProps {
    setFaculties: React.Dispatch<React.SetStateAction<Faculty[] | []>>;
    setInputValue: React.Dispatch<React.SetStateAction<{ university: string, course: string, program: string, department: string, faculty: string }>>;
    inputValue: { university: string, course: string, program: string, department: string, faculty: string }
}

export default function SelectUniversity(props: SelectUniversityProps) {
    const {setFaculties, setInputValue, inputValue} = props;
    const [options, setOptions] = React.useState<University[] | []>([]);
    const [open, setOpen] = React.useState(false);
    const loading = open && options.length === 0;

    const [value, setValue] = React.useState<University | null>(null);

    React.useEffect(() => {
        if (!loading) {
            return undefined;
        }

        (async () => {
            const universities = await fetch("/api/universities", {
                method: "GET",
            }).then(res => res.json());
            setOptions(universities);
        })();

    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

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
                    if (newValue) {
                        setFaculties(newValue?.faculties);
                    } else {
                        setFaculties([]);
                    }
                }}
                inputValue={inputValue.university}
                onInputChange={(_event, newInputValue) => {
                    if (newInputValue === "") {
                        setInputValue({
                            university: newInputValue,
                            faculty: newInputValue,
                            department: newInputValue,
                            program: newInputValue,
                            course: newInputValue,
                        });
                    }else {
                        setInputValue({
                            ...inputValue,
                            university: newInputValue,
                        });
                    }
                }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => option._id === value._id}
                getOptionLabel={(option) => option.name}
                options={options}
                loading={loading}
                endDecorator={
                    loading ? (
                        <CircularProgress size="sm" sx={{bgcolor: 'background.surface'}}/>
                    ) : null
                }
                renderOption={(props, option) => {
                    // @ts-ignore
                    const {key, id, ...rest} = props;
                    return (
                        <AutocompleteOption
                            sx={{px: 2, py: 0.5, cursor: "pointer"}}
                            key={id} {...rest}>
                            {`${option.name} (${option.code})`}
                        </AutocompleteOption>
                    )
                }}
            />
        </FormControl>
    );
}