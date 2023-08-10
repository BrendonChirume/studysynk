import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import * as React from 'react';
import Chip from "@mui/joy/Chip";


export default function RangeSlider() {
    let [minYear, maxYear] = [1999, 2023]
    const [value, setValue] = React.useState<number[]>([2016, maxYear]);

    const handleChange = (_event: unknown, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setValue(newValue);
        } else {
            setValue([minYear, newValue]);
        }
    };

    return (
        <Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Chip
                    sx={{
                        "--Chip-radius": '8px'
                    }}
                    variant="soft" slotProps={{label: {id: 'filter-year-from'}}}>
                    from: {value[0]}
                </Chip>
                <Chip
                    sx={{
                        "--Chip-radius": '8px'
                    }}
                    variant="soft" slotProps={{label: {id: 'filter-year-from'}}}>
                    to: {value[1]}
                </Chip>
            </Box>
            <Box sx={{px: 1}}>
                <Slider
                    getAriaLabel={() => 'Year of papers'}
                    min={minYear}
                    max={maxYear}
                    value={value}
                    step={1}
                    onChange={handleChange}
                    valueLabelDisplay="off"
                />
            </Box>
        </Box>
    );
}