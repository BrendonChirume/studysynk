import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import {Department, Faculty} from "@/lib/types";
import AutocompleteOption from "@mui/joy/AutocompleteOption/AutocompleteOption";


interface SelectFacultyProps {
    faculties: Faculty[] | [];
    setDepartments: React.Dispatch<React.SetStateAction<Department[] | []>>
    setInputValue: React.Dispatch<React.SetStateAction<{ university: string, course: string, program: string, department: string, faculty: string }>>;
    inputValue: { university: string, course: string, program: string, department: string, faculty: string }
}

export default function SelectFaculty(props: SelectFacultyProps) {
    const {faculties, setDepartments, inputValue, setInputValue} = props
    const [value, setValue] = React.useState<Faculty | null>(null);

    return (
        <FormControl id="select-faculty">
            <FormLabel htmlFor={"faculty"} id="paper-faculty">Faculty</FormLabel>
            <Autocomplete
                id="faculty"
                name="faculty"
                autoHighlight
                value={value}
                onChange={(_event, newValue) => {
                    setValue(newValue);
                    if (newValue) {
                        setDepartments(newValue?.departments);
                    } else {
                        setDepartments([]);
                    }
                }}
                inputValue={inputValue.faculty}
                onInputChange={(_event, newInputValue) => {
                    if (newInputValue === "") {
                        setInputValue({
                            ...inputValue,
                            faculty: newInputValue,
                            department: newInputValue,
                            program: newInputValue,
                            course: newInputValue,
                        });
                    } else {
                        setInputValue({
                            ...inputValue,
                            faculty: newInputValue,
                        });
                    }
                }}
                options={faculties}
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