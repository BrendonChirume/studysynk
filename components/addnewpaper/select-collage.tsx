import {Collage} from "@/lib/types";
import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption/AutocompleteOption";
import CircularProgress from "@mui/joy/CircularProgress";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import React from "react";

interface SelectCollageProps {
    collages: Collage[];
    handleCollageChange: (collage: Collage | null) => void;
}

export default function (props: SelectCollageProps) {
    const {collages, handleCollageChange} = props;
    const [open, setOpen] = React.useState(false);
    const loading = open && collages.length === 0;

    const [value, setValue] = React.useState<Collage | null>(collages[0]);
    const [inputValue, setInputValue] = React.useState('');

    return (
        <FormControl sx={{flexGrow: 1}}>
            <FormLabel htmlFor={"collage"} id="paper-collage">Collage</FormLabel>
            <Autocomplete
                id="collage"
                name="collage"
                autoHighlight
                value={value}
                onChange={(_event, newValue) => {
                    setValue(newValue);
                    handleCollageChange(newValue);
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
                options={collages}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => {
                    // @ts-ignore
                    const {key, ...rest} = props;
                    return (
                        <AutocompleteOption
                            sx={{px: 2, py: 0.5, cursor: "pointer"}}
                            key={key} {...rest}>
                            {`${option.name} (${option.shortName})`}
                        </AutocompleteOption>
                    )
                }}
            />
        </FormControl>
    )
}