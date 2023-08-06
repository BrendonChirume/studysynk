import AutocompleteOption from "@mui/joy/AutocompleteOption";
import ListItemContent from "@mui/joy/ListItemContent";
import Autocomplete from "@mui/joy/Autocomplete";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import ChipDelete from '@mui/joy/ChipDelete';
import React from "react";
import Stack from "@mui/joy/Stack";

interface FilterFacultyProps {
    options: string[];
    handleSelect: (selection: string[]) => void;
}

export default function FilterFaculty(props: FilterFacultyProps) {
    const [value, setValue] = React.useState<string[]>([]);

    const handleChipDelete = (select: string) => {
        const filtered = value.filter((val) => val !== select);
        setValue(filtered)
    }

    React.useEffect(() => props.handleSelect(value), [value])

    return (
        <Box sx={{mt: 2}}>
            <Autocomplete
                id="lib-filter-faculty"
                placeholder="Choose faculties"
                multiple
                limitTags={2}
                value={value}
                disableListWrap
                filterSelectedOptions
                options={props.options}
                onChange={(event, newValue, reason) => {
                    if (
                        event.type === 'keydown' &&
                        (event as React.KeyboardEvent).key === 'Backspace' &&
                        reason === 'removeOption'
                    ) {
                        return;
                    }
                    setValue(newValue);
                }}
                renderTags={() => null}
                renderOption={(props, option) => {
                    const {id, ...rest} = props;
                    return (
                        <AutocompleteOption {...rest} key={id}>
                            <ListItemContent sx={{fontSize: 'sm'}}>
                                {option}
                            </ListItemContent>
                        </AutocompleteOption>
                    )
                }}
                getOptionLabel={(option) => option}
            />
            <Stack sx={{mt: 2, display: 'flex'}} spacing={1}>
                {
                    value.length === 0 ? (
                        <Chip
                            variant="soft"
                            slotProps={{label: {id: 'lib-chip-1'}}}
                        >
                            No selected faculty
                        </Chip>
                    ) : value.map((select, index) => (
                        <Chip
                            key={index}
                            variant="soft"
                            color="primary"
                            sx={{
                                "--Chip-decoratorChildHeight": 30
                            }}
                            slotProps={{label: {id: 'lib-chip-1'}}}
                            endDecorator={<ChipDelete onDelete={() => handleChipDelete(select)}/>}
                        >
                            {select}
                        </Chip>

                    ))
                }
            </Stack>
        </Box>
    )
}