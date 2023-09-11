import * as React from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';

// Icons import
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import DocumentArrowUpIcon from '@heroicons/react/24/outline/DocumentArrowUpIcon';
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";

interface Options {
    name: string;
    href: string;
    icon: React.ReactNode;
}

export const sidebarLinks: readonly Options[] = [
    {
        name: 'Home',
        href: '/',
        icon: (
            <HomeIcon className="w-5 h-5 ss-icon"/>
        )
    }, {
        name: 'Papers',
        href: '/papers',
        icon: (
            <DocumentIcon className="w-5 h-5 ss-icon"/>
        )
    }, {
        name: 'Add new paper',
        href: '/add-new-paper',
        icon: (
            <DocumentArrowUpIcon className={"w-5 h-5 ss-icon"}/>
        )
    },
]

// sidebar props
interface SidebarProps {
    currentRoute: string;
    navigate: (path: string) => void;
}

export default function Sidebar({currentRoute, navigate}: SidebarProps) {
    return (
        <List size="sm" sx={{
            '--ListItem-radius': '8px', '--List-gap': '4px',
        }}>
            <ListItem nested>
                <ListSubheader id="expand-browse">
                    Browse
                    <IconButton
                        size="sm"
                        variant="plain"
                        color="primary"
                        sx={{'--IconButton-size': '24px', ml: 'auto'}}
                    >
                        <ChevronDownIcon className="w-4 h-4 ss-icon"/>
                    </IconButton>
                </ListSubheader>
                <List
                    aria-labelledby="nav-list-browse"
                    sx={{
                        '& .JoyListItemButton-root': {p: '8px'},
                    }}
                >
                    {
                        sidebarLinks.map((option, index) => {
                            let route = currentRoute;
                            const ref = option.name.toLowerCase().split(' ')[0];
                            route = currentRoute.length === 1 ? 'home' : route;

                            return (
                                <ListItem key={index} onClick={() => navigate(option.href)}>
                                    <ListItemButton
                                        role="button"
                                        selected={route.includes(ref)}>
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
            </ListItem>
            <ListItem nested sx={{mt: 2}}>
                <ListSubheader id="expand-tags">
                    Tags
                    <IconButton
                        size="sm"
                        variant="plain"
                        color="primary"
                        sx={{'--IconButton-size': '24px', ml: 'auto'}}
                    >
                        <ChevronDownIcon className="w-4 h-4 ss-icon"/>
                    </IconButton>
                </ListSubheader>
                <List
                    aria-labelledby="nav-list-tags"
                    size="sm"
                    sx={{
                        '--ListItemDecorator-size': '32px',
                    }}
                >
                    <ListItem>
                        <ListItemButton>
                            <ListItemDecorator>
                                <Box
                                    sx={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '99px',
                                        bgcolor: 'primary.300',
                                    }}
                                />
                            </ListItemDecorator>
                            <ListItemContent>Personal</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemDecorator>
                                <Box
                                    sx={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '99px',
                                        bgcolor: 'danger.400',
                                    }}
                                />
                            </ListItemDecorator>
                            <ListItemContent>Work</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemDecorator>
                                <Box
                                    sx={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '99px',
                                        bgcolor: 'warning.500',
                                    }}
                                />
                            </ListItemDecorator>
                            <ListItemContent>Travels</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemDecorator>
                                <Box
                                    sx={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '99px',
                                        bgcolor: 'success.400',
                                    }}
                                />
                            </ListItemDecorator>
                            <ListItemContent>Concert tickets</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                </List>
            </ListItem>
        </List>
    );
}
