import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import * as React from 'react';
import Stack from "@mui/joy/Stack";
import Chip from "@mui/joy/Chip";


export default function RangeSlider() {
    const [[from, to], setValue] = React.useState<number[]>([0, 40]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const rangeMax = (): number => {
        const year = new Date().getFullYear();

        const result = to / 100 * year
        console.log('values: ', to, year)
        return Math.round(result)
    }

    return (
        <Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Chip
                    sx={{
                        "--Chip-radius": '8px'
                    }}
                    variant="soft" slotProps={{label: {id: 'filter-year-from'}}}>
                    from: {from}
                </Chip>
                <Chip
                    sx={{
                        "--Chip-radius": '8px'
                    }}
                    variant="soft" slotProps={{label: {id: 'filter-year-from'}}}>
                    to: {rangeMax()}
                </Chip>
            </Box>
            <Box sx={{px: 1}}>
                <Slider
                    getAriaLabel={() => 'Year of papers'}
                    value={[from, to]}
                    step={1}
                    onChange={handleChange}
                    valueLabelDisplay="off"
                />
            </Box>
        </Box>
    );
}