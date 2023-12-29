import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import {Course} from "@/lib/types";
import AutocompleteOption from "@mui/joy/AutocompleteOption/AutocompleteOption";


interface SelectCourseProps {
    courses: Course[] | [];
    setInputValue: React.Dispatch<React.SetStateAction<{ university: string, course: string, program: string, department: string, faculty: string }>>;
    inputValue: { university: string, course: string, program: string, department: string, faculty: string };
}

export default function SelectCourse(props: SelectCourseProps) {
    const {courses, inputValue, setInputValue} = props;
    const [value, setValue] = React.useState<Course | null>(null);

    return (
        <FormControl id="select-course">
            <FormLabel htmlFor={"course"} id="paper-course">Course</FormLabel>
            <Autocomplete
                id="course"
                name="course"
                autoHighlight
                value={value}
                onChange={(_event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={inputValue.course}
                onInputChange={(_event, newInputValue) => {
                    setInputValue({
                        ...inputValue,
                        course: newInputValue,
                    });
                }}
                options={courses}
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