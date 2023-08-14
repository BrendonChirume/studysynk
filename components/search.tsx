import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import Input from "@mui/joy/Input";
import * as React from "react";
import IconButton from "@mui/joy/IconButton";

export default function Search() {
    return (
        <>
            <Input
                size="sm"
                variant="soft"
                placeholder="Search anything…"
                endDecorator={
                    <MagnifyingGlassIcon className="w-5 h-5 ss-icon"/>
                }
                sx={{
                    flexBasis: '500px',
                    p: 1, px: 1.5,
                    display: {
                        xs: 'none',
                        sm: 'flex',
                    },
                }}
            />
            <IconButton
                sx={{
                    '--IconButton-radius': '50%',
                    width: 38,
                    height: 38,
                    ml: 'auto',
                    mr: 0.5,
                    display: {xs: 'inline-flex', sm: 'none'},
                }}
                id="toggle-mode"
                size="sm"
                variant="outlined"
                color="neutral">
                <MagnifyingGlassIcon className="w-5 h-5 ss-icon"/>
            </IconButton>
        </>
    )
}