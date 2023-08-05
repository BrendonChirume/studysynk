import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import MuiLogo from '@/components/muiLogo';
import ColorSchemeToggle from '@/components//colorSchemeToggle';
import {closeSidebar} from '@/utils';
import {ReactNode} from "react";
import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
import BuildingLibraryIcon from "@heroicons/react/24/outline/BuildingLibraryIcon";
import DocumentCheckIcon from "@heroicons/react/24/outline/DocumentCheckIcon";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Image from "next/image";

interface Options {
    name: string;
    href: string;
    icon: ReactNode;
}

export const sidebarLinks: readonly Options[] = [
    {
        name: 'Home',
        href: '/',
        icon: (
            <HomeIcon className="h-6 w-6 ss-icon"/>
        )
    }, {
        name: 'Library',
        href: '/library',
        icon: (
            <BuildingLibraryIcon className="h-6 w-6 ss-icon"/>
        )
    }, {
        name: 'Learning check',
        href: '/learning-check',
        icon: (
            <DocumentCheckIcon className="h-6 w-6 ss-icon"/>
        )
    }
]

// sidebar props
interface SidebarProps {
    currentRoute: string;
    navigate: (path: string) => void;
}

export default function Sidebar({currentRoute, navigate}: SidebarProps) {
    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: {
                    xs: 'fixed',
                    md: 'sticky',
                },
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none',
                },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: 10000,
                height: '100dvh',
                width: 'var(--Sidebar-width)',
                top: 0,
                p: 1.5,
                py: 3,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider',
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': '224px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '256px',
                        },
                    },
                })}
            />
            <Box
                className="Sidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',

                    opacity: 'calc(var(--SideNavigation-slideIn, 0) - 0.2)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
                onClick={() => closeSidebar()}
            />
            <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                <MuiLogo/>
                <Typography fontWeight="xl">MUI</Typography>
                <ColorSchemeToggle sx={{ml: 'auto'}}/>
            </Box>
            <Input startDecorator={<MagnifyingGlassIcon className="h-5 w-5 ss-icon"/>} placeholder="Search"/>
            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <List
                    sx={{
                        '--ListItem-radius': '8px',
                        '--List-gap': '4px',
                    }}
                >
                    {
                        sidebarLinks.map((option, index) => {
                            let route = currentRoute;
                            const ref = option.name.toLowerCase().split(' ')[0];
                            route = currentRoute.length === 1 ? 'home' : route;

                            return (
                                <ListItem key={index}>
                                    <ListItemButton
                                        role="button"
                                        selected={route.includes(ref)}
                                        onClick={() => navigate(option.href)}>
                                        <ListItemDecorator>
                                            {option.icon}
                                        </ListItemDecorator>
                                        <ListItemContent>{option.name}</ListItemContent>
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Box>
            <Divider/>
            <Stack spacing={0.4} direction="row" alignItems="center">
                <Link
                    underline="none"
                    textColor="inherit"
                    href={"/profile/brendon chirume"}
                    sx={{
                        display: 'flex', gap: 1, alignItems: 'center',
                        borderRadius: 8,
                        p: 1,
                        '&:hover': {
                            backgroundColor: ({vars}) => `var(--Body-background, ${vars.palette.background.level1})`,
                            color: 'primary.500'
                        }
                    }}>
                    <Avatar
                        variant="outlined"
                        sx={{
                            display: {xs: 'none', lg: 'inline-block'}
                        }}>
                        <Image src="/avatar.jpg" alt={'student avatar'} layout="fill" objectFit="contain"/>
                    </Avatar>
                    <Stack spacing={0.4}>
                        <Typography fontSize="sm" fontWeight="lg" noWrap>
                            Siriwat K.
                        </Typography>
                        <Typography
                            level="body-sm" noWrap
                            sx={{width: {xs: '8.5rem', lg: '8rem'}}}>
                            chirumebrendon7@gmail.com
                        </Typography>
                    </Stack>
                </Link>
                <div>
                    <IconButton variant="outlined" color="neutral">
                        <ArrowRightOnRectangleIcon className="h-6 w-6"/>
                    </IconButton>
                </div>
            </Stack>
        </Sheet>
    );
}
