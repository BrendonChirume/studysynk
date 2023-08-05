import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import MuiLogo from './muiLogo';
import ColorSchemeToggle from './colorSchemeToggle';
import { toggleSidebar } from '@/utils';
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";

export default function Header() {
    return (
        <Sheet
            sx={{
                display: { xs: 'flex', md: 'none' },
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                width: '100vw',
                height: 'var(--Header-height)',
                zIndex: 9995,
                py: 1,
                px: 2,
                gap: 1,
                boxShadow: 'sm',
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Header-height': '52px',
                        [theme.breakpoints.up('md')]: {
                            '--Header-height': '0px',
                        },
                    },
                })}
            />
            <IconButton
                onClick={() => toggleSidebar()}
                variant="outlined"
                color="neutral"
                size="sm"
            >
                <Bars3Icon className={"w-6 h-6 ss-icon"} />
            </IconButton>
            <MuiLogo variant="plain" sx={{ boxShadow: 'none', mr: 'auto' }} />
            <ColorSchemeToggle id={undefined} />
        </Sheet>
    );
}
