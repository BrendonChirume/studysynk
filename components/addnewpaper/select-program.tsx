import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import {Course, Program} from "@/lib/types";
import AutocompleteOption from "@mui/joy/AutocompleteOption/AutocompleteOption";


interface SelectProgramProps {
    programs: Program[] | [];
    setCourses: React.Dispatch<React.SetStateAction<Course[] | []>>;
    setInputValue: React.Dispatch<React.SetStateAction<{ university: string, course: string, program: string, department: string, faculty: string }>>;
    inputValue: { university: string, course: string, program: string, department: string, faculty: string };
}

export default function SelectProgram(props: SelectProgramProps) {
    const {programs, setCourses, inputValue, setInputValue} = props
    const [value, setValue] = React.useState<Program | null>(null);

    return (
        <FormControl id="select-program">
            <FormLabel htmlFor={"program"} id="paper-program">Program</FormLabel>
            <Autocomplete
                id="program"
                name="program"
                autoHighlight
                value={value}
                onChange={(_event, newValue) => {
                    setValue(newValue);
                    if (newValue) {
                        setCourses(newValue?.courses);
                    } else {
                        setCourses([]);
                    }
                }}
                inputValue={inputValue.program}
                onInputChange={(_event, newInputValue) => {
                    if (newInputValue === "") {
                        setInputValue({
                            ...inputValue,
                            program: newInputValue,
                            course: newInputValue,
                        });
                    } else {
                        setInputValue({
                            ...inputValue,
                            program: newInputValue,
                        });
                    }
                }}
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

    );
}