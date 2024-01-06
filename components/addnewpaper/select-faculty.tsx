import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import CircularProgress from '@mui/joy/CircularProgress';
import {IFaculty} from "@/lib/types";
import AutocompleteOption from "@mui/joy/AutocompleteOption";

interface SelectFacultyProps {
    setSelected?: (token: IFaculty) => void;
    university?: string;
}

export default function SelectFaculty(props: SelectFacultyProps) {
    const {setSelected, university} = props;
    const [options, setOptions] = React.useState<IFaculty[] | []>([]);
    const [open, setOpen] = React.useState(false);
    const loading = open && options.length === 0;

    const [value, setValue] = React.useState<IFaculty | null>(null);
    const [inputValue, setInputValue] = React.useState('');

    React.useEffect(() => {
        if (!loading) {
            return undefined;
        }

        (async () => {
            let faculties;
            if (university) {
                faculties = await fetch(`/api/faculties?university=${university}`, {
                    method: "GET",
                }).then(res => res.json());
                return setOptions(faculties);
            }
            faculties = await fetch("/api/faculties", {
                method: "GET",
            }).then(res => res.json());
            setOptions(faculties);
        })();

    }, [loading, university]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <FormControl sx={{flexGrow: 1}}>
            <FormLabel htmlFor={"faculty"} id="paper-faculty">Faculty</FormLabel>
            <Autocomplete
                id="faculty"
                name="faculty"
                autoHighlight
                value={value}
                onChange={(_event, newValue) => {
                    setValue(newValue)
                    if (newValue?.name && setSelected) {
                        setSelected(newValue)
                    }
                }}
                inputValue={inputValue}
                onInputChange={(_event, newInputValue) => {
                    setInputValue(newInputValue)
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
                groupBy={(option) => option.university}
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
                            {option.name}
                        </AutocompleteOption>
                    )
                }}
            />
        </FormControl>
    );
}