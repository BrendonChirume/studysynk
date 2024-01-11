import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import CircularProgress from '@mui/joy/CircularProgress';
import {ICourse} from "@/lib/types";
import AutocompleteOption from "@mui/joy/AutocompleteOption";

interface SelectCourseProps {
    setSelected?: (token: ICourse) => void;
    programId?: string;
}

export default function SelectCourse(props: SelectCourseProps) {
    const {setSelected, programId} = props;
    const [options, setOptions] = React.useState<ICourse[] | []>([]);
    const [open, setOpen] = React.useState(false);
    const loading = open && options.length === 0;

    const [value, setValue] = React.useState<ICourse | null>(null);
    const [inputValue, setInputValue] = React.useState('');

    React.useEffect(() => {
        if (!loading) {
            return undefined;
        }

        (async () => {
            const courses = await fetch("/api/courses", {
                method: "GET",
            }).then(res => res.json());
            setOptions(courses);
        })();

    }, [loading, programId]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <FormControl sx={{flexGrow: 1}}>
            <FormLabel htmlFor={"course"} id="paper-course">Course</FormLabel>
            <Autocomplete
                id="course"
                name="course"
                autoHighlight
                value={value}
                onChange={(_event, newValue) => {
                    setValue(newValue)
                    if (newValue?.names && setSelected) {
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
                getOptionLabel={(option) => option.names.join(' / ')}
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
                            {`${option.names.join(' / ') ?? ''}`}
                        </AutocompleteOption>
                    )
                }}
            />
        </FormControl>
    );
}