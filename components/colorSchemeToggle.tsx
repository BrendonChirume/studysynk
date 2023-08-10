import * as React from 'react';
import {useColorScheme} from '@mui/joy/styles';
import IconButton, {IconButtonProps} from '@mui/joy/IconButton';
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";

export default function ColorSchemeToggle(
    {
        onClick,
        sx,
        ...props
    }: IconButtonProps) {
    const {mode, setMode} = useColorScheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return (
            <IconButton
                size="sm"
                variant="outlined"
                color="neutral"
                {...props}
                sx={sx}
                disabled
            />
        );
    }
    return (
        <IconButton
            id="toggle-mode"
            size="sm"
            variant="outlined"
            color="neutral"
            {...props}
            onClick={(event) => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
                onClick?.(event);
            }}
            sx={[
                {
                    '& > *:first-of-type': {
                        display: mode === 'dark' ? 'none' : 'initial',
                    },
                    '& > *:last-of-type': {
                        display: mode === 'light' ? 'none' : 'initial',
                    },
                    '--IconButton-radius': '50%',
                    width: 38,
                    height: 38,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <MoonIcon className="w-5 h-5 ss-icon"/>
            <SunIcon className="w-5 h-5 ss-icon"/>
        </IconButton>
    );
}
