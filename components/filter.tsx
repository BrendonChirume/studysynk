"use client";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import ChevronUpIcon from "@heroicons/react/24/outline/ChevronUpIcon";
import Autocomplete from "@mui/joy/Autocomplete";
import Chip from "@mui/joy/Chip";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Divider from "@mui/joy/Divider";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import ListItemContent from "@mui/joy/ListItemContent";
import FilterFaculty from "@/components/filterFaculty";
import FilterYear from "@/components/filterYear";
import React from "react";
import data from "@/app/data.json"

interface FilterProps {
    handleSelect: (selection: string[]) => void;
}

export default function Filter({handleSelect}: FilterProps) {

    return (
        <>
            <Box
                sx={{
                    p: 1,
                    pb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography level="title-sm">Filter by</Typography>
                <Button size="sm" variant="plain" sx={{fontSize: 'xs', px: 1}}>
                    Clear filters
                </Button>
            </Box>
            <Box sx={{p: 2}}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography level="body-sm" textColor="text.primary">
                        University
                    </Typography>
                    <IconButton
                        size="sm"
                        variant="plain"
                        color="primary"
                        sx={{'--IconButton-size': '24px'}}
                    >
                        <ChevronUpIcon className="w-5 h-5 ss-icon"/>
                    </IconButton>
                </Box>
                <Box sx={{mt: 2}}>
                    <Autocomplete
                        id="lib-filter-universities"
                        placeholder="Choose university"
                        disableListWrap
                        filterSelectedOptions
                        options={data.universities}
                        renderOption={(props, option) => {
                            const {id, ...rest} = props;
                            return (
                                <AutocompleteOption {...rest} key={id}>
                                    <ListItemContent sx={{fontSize: 'sm'}}>
                                        {option.name}
                                        <Typography level="body-xs" sx={{color: "neutral.600"}} slots={{root: "span"}}>
                                            &nbsp;({option.abbreviation})
                                        </Typography>
                                    </ListItemContent>
                                </AutocompleteOption>
                            )
                        }}
                        getOptionLabel={(option) => option.name}
                    />
                    <Box sx={{mt: 2, display: 'flex', gap: 1}}>
                        <Chip
                            variant="soft"
                            size="sm"
                            slotProps={{label: {id: 'lib-chip-1'}}}
                            endDecorator={<XMarkIcon className="w-5 h-5 ss-icon"/>}
                            sx={{'--Chip-radius': (theme) => theme.vars.radius.sm}}
                        >
                            UI designer
                        </Chip>
                    </Box>
                </Box>
            </Box>
            <Divider/>
            <Box sx={{p: 2}}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography level="body-sm" textColor="text.primary">
                        Faculty
                    </Typography>
                    <IconButton
                        size="sm"
                        variant="plain"
                        color="primary"
                        sx={{'--IconButton-size': '24px'}}
                    >
                        <ChevronUpIcon className="w-5 h-5 ss-icon"/>
                    </IconButton>
                </Box>
                <FilterFaculty handleSelect={handleSelect} options={data.faculties.map((faculty) => faculty.name)}/>
            </Box>
            <Divider/>
            <Box sx={{p: 2}}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography level="body-sm" textColor="text.primary">
                        Year
                    </Typography>
                    <IconButton
                        size="sm"
                        variant="plain"
                        color="primary"
                        sx={{'--IconButton-size': '24px'}}
                    >
                        <ChevronUpIcon className="w-5 h-5 ss-icon"/>
                    </IconButton>
                </Box>
                <Box sx={{py: 2}}>
                    <FilterYear/>
                </Box>
            </Box>
            <Divider/>
            <Box sx={{p: 2}}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography level="body-sm" textColor="text.primary">
                        Education
                    </Typography>
                    <IconButton
                        size="sm"
                        variant="plain"
                        color="primary"
                        sx={{'--IconButton-size': '24px'}}
                    >
                        <ChevronUpIcon className="w-5 h-5 ss-icon"/>
                    </IconButton>
                </Box>
                <Box sx={{mt: 2}}>
                    <RadioGroup id="lib-radio-group" name="education" defaultValue="any">
                        <Radio id="lib-radio-1" label="Any" value="any" size="sm"/>
                        <Radio id="lib-radio-1" label="High School" value="high-school" size="sm"/>
                        <Radio id="lib-radio-1" label="College" value="college" size="sm"/>
                        <Radio id="lib-radio-1" label="Post-graduate" value="post-graduate" size="sm"/>
                    </RadioGroup>
                </Box>
            </Box>
            <Divider/>
            <Box sx={{p: 2}}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography level="body-sm" textColor="text.primary">
                        Previous experience
                    </Typography>
                    <IconButton
                        size="sm"
                        variant="plain"
                        color="primary"
                        sx={{'--IconButton-size': '24px'}}
                    >
                        <ChevronUpIcon className="w-5 h-5 ss-icon"/>
                    </IconButton>
                </Box>
            </Box>

        </>
    )
}