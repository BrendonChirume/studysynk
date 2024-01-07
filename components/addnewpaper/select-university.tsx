import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import CircularProgress from '@mui/joy/CircularProgress';
import {IUniversity} from "@/lib/types";
import AutocompleteOption from "@mui/joy/AutocompleteOption";

interface SelectUniversityProps {
    setSelected?: (token: IUniversity) => void;
}

export default function SelectUniversity(props: SelectUniversityProps) {
    const {setSelected} = props;
    const [options, setOptions] = React.useState<IUniversity[] | []>([]);
    const [open, setOpen] = React.useState(false);
    const loading = open && options.length === 0;

    const [value, setValue] = React.useState<IUniversity | null>(null);
    const [inputValue, setInputValue] = React.useState('');

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
                options={options}
                loading={loading}
                slotProps={{
                    input: {
                        sx: {
                            textTransform: 'capitalize'
                        }
                    }
                }}
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
                            sx={{px: 2, py: 0.5, cursor: "pointer", textTransform: "capitalize"}}
                            key={id} {...rest}>
                            {`${option.name} (${option.code.toUpperCase()})`}
                        </AutocompleteOption>
                    )
                }}
            />
        </FormControl>
    );
}