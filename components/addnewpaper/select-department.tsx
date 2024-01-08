import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import CircularProgress from '@mui/joy/CircularProgress';
import {IDepartment} from "@/lib/types";
import AutocompleteOption from "@mui/joy/AutocompleteOption";

interface SelectDepartmentProps {
    setSelected?: (token: IDepartment) => void;
    facultyId?: string;
}

export default function SelectDepartment(props: SelectDepartmentProps) {
    const {setSelected, facultyId} = props;
    const [options, setOptions] = React.useState<IDepartment[] | []>([]);
    const [open, setOpen] = React.useState(false);
    const loading = open && options.length === 0;

    const [value, setValue] = React.useState<IDepartment | null>(null);
    const [inputValue, setInputValue] = React.useState('');

    React.useEffect(() => {
        if (!loading) {
            return undefined;
        }

        (async () => {
            let departments;
            if (facultyId) {
                departments = await fetch(`/api/departments?facultyId=${facultyId}`, {
                    method: "GET",
                }).then(res => res.json());
                return setOptions(departments);
            }
            departments = await fetch("/api/departments", {
                method: "GET",
            }).then(res => res.json());
            setOptions(departments);
        })();

    }, [facultyId, loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <FormControl sx={{flexGrow: 1}}>
            <FormLabel htmlFor={"department"} id="paper-department">Department</FormLabel>
            <Autocomplete
                id="department"
                name="department"
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
                groupBy={(option) => option.faculty.name}
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