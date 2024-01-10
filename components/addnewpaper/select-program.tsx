import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import CircularProgress from '@mui/joy/CircularProgress';
import {IProgram} from "@/lib/types";
import AutocompleteOption from "@mui/joy/AutocompleteOption";

interface SelectProgramProps {
    setSelected?: (token: IProgram) => void;
    departmentId?: string;
}

export default function SelectProgram(props: SelectProgramProps) {
    const {setSelected, departmentId} = props;
    const [options, setOptions] = React.useState<IProgram[] | []>([]);
    const [open, setOpen] = React.useState(false);
    const loading = open && options.length === 0;

    const [value, setValue] = React.useState<IProgram | null>(null);
    const [inputValue, setInputValue] = React.useState('');

    React.useEffect(() => {
        if (!loading) {
            return undefined;
        }

        (async () => {
            let programs;
            if (departmentId) {
                programs = await fetch(`/api/programs?departmentId=${departmentId}`, {
                    method: "GET",
                }).then(res => res.json());
                return setOptions(programs);
            }
            programs = await fetch("/api/programs", {
                method: "GET",
            }).then(res => res.json());
            setOptions(programs);
        })();

    }, [loading, departmentId]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <FormControl sx={{flexGrow: 1}}>
            <FormLabel htmlFor={"program"} id="paper-program">Program</FormLabel>
            <Autocomplete
                id="program"
                name="program"
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
                getOptionLabel={(option) => option.name ?? ''}
                groupBy={(option) => option.department.name}
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
                            {option.name}
                        </AutocompleteOption>
                    )
                }}
            />
        </FormControl>
    );
}