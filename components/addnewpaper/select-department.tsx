import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import {Department, Program} from "@/lib/types";
import AutocompleteOption from "@mui/joy/AutocompleteOption/AutocompleteOption";


interface SelectDepartmentProps {
    departments: Department[] | [];
    setPrograms: React.Dispatch<React.SetStateAction<Program[] | []>>;
    setInputValue: React.Dispatch<React.SetStateAction<{ university: string, course: string, program: string, department: string, faculty: string }>>;
    inputValue: {university: string, course: string, program: string, department: string, faculty: string};
}

export default function SelectDepartment(props: SelectDepartmentProps) {
    const {departments, setPrograms, inputValue, setInputValue} = props
    const [value, setValue] = React.useState<Department | null>(null);

    return (
        <FormControl id="select-department">
            <FormLabel htmlFor={"department"} id="paper-department">Department</FormLabel>
            <Autocomplete
                id="department"
                name="department"
                autoHighlight
                value={value}
                onChange={(_event, newValue) => {
                    setValue(newValue);
                    if (newValue) {
                        setPrograms(newValue?.programs);
                    } else {
                        setPrograms([]);
                    }
                }}
                inputValue={inputValue.department}
                onInputChange={(_event, newInputValue) => {
                    if (newInputValue === "") {
                        setInputValue({
                            ...inputValue,
                            department: newInputValue,
                            program: newInputValue,
                            course: newInputValue,
                        });
                    } else {
                        setInputValue({
                            ...inputValue,
                            department: newInputValue,
                        });
                    }
                }}
                options={departments}
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