import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import DocumentArrowUpIcon from "@heroicons/react/24/outline/DocumentArrowUpIcon";
import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
import Link from "@mui/joy/Link";
import Avatar from "@mui/joy/Avatar";
import Image from "next/image";

export default function PositionedMenu() {
    return (
        <Dropdown>
            <MenuButton
                slots={{root: IconButton}}
                slotProps={{
                    root: {
                        variant: 'plain', color: 'neutral', sx: {
                            '--IconButton-radius': '50%',
                            height: 40,
                            width: 40,
                            overflow: 'hidden'
                        },
                    }
                }}
            >
                <Avatar variant="outlined">
                    <Image src="/avatar.jpg" alt={'student avatar'} width={40} height={40}/>
                </Avatar>
            </MenuButton>
            <Menu placement="bottom-end" sx={{
                zIndex: 1501
            }}>
                <MenuItem
                    underline="none"
                    component={Link}
                    href={"/profile/brendon chirume"}>
                    <ListItemDecorator>
                        <UserIcon className={"w-5 h-5 ss-icon"}/>
                    </ListItemDecorator>{' '}
                    Profile
                </MenuItem>
                <MenuItem sx={{
                    "&:hover": {
                        color: "primary"
                    }
                }}>
                    <ListItemDecorator>
                        <DocumentArrowUpIcon className={"w-5 h-5 ss-icon"}/>
                    </ListItemDecorator>{' '}
                    Add new paper
                </MenuItem>
                <ListDivider/>
                <MenuItem>
                    <ListItemDecorator sx={{color: 'inherit'}}>
                        <ArrowRightOnRectangleIcon className={"w-5 h-5 ss-icon"}/>
                    </ListItemDecorator>
                    Sign out
                </MenuItem>
            </Menu>
        </Dropdown>
    )
        ;
}
