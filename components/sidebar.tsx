import * as React from 'react';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';

// Icons import
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon';
import DocumentArrowUpIcon from '@heroicons/react/24/outline/DocumentArrowUpIcon';
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import Link from "next/link";

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
}

export default function Sidebar({currentRoute}: SidebarProps) {
    return (
        <List size="sm" sx={{
            '--ListItem-radius': '8px', '--List-gap': '4px',
        }}>
            <ListItem nested>
                <ListSubheader id="expand-browse" sx={{letterSpacing: '2px', fontWeight: '600'}}>
                    Browse
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
                                <Link href={option.href} key={index}>
                                    <ListItem key={index}>
                                        <ListItemButton
                                            role="button"
                                            selected={route.includes(ref)}>
                                            <ListItemDecorator>
                                                {option.icon}
                                            </ListItemDecorator>
                                            <ListItemContent>{option.name}</ListItemContent>
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            )
                        })
                    }
                </List>
            </ListItem>

        </List>
    );
}
