import * as React from 'react';
import PhoneIcon from "@heroicons/react/24/outline/PhoneIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import DocumentArrowUpIcon from "@heroicons/react/24/outline/DocumentArrowUpIcon";
import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
import Link from "next/link";
import Avatar from "@mui/joy/Avatar";
import {signOut, useSession} from "next-auth/react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

export default function PositionedMenu() {
    const {data: session} = useSession();
    return (
        <Dropdown>
            <MenuButton
                variant="plain"
                size="sm"
                sx={{maxWidth: '40px', maxHeight: '40px', borderRadius: '9999999px'}}
            >
                {/*TODO: set up next Image*/}
                <Avatar
                    src={session?.user?.image || undefined}
                    sx={{maxWidth: '38px', maxHeight: '38px'}}
                >
                    {session?.user?.name?.match(/(\b\S)?/g)?.join("")}
                </Avatar>
            </MenuButton>
            <Menu
                placement="bottom-end"
                size="sm"
                sx={{
                    zIndex: '99999',
                    p: 1,
                    gap: 1,
                    '--ListItem-radius': 'var(--joy-radius-sm)',
                }}
            >
                <MenuItem component={Link}
                          sx={{
                              "&:hover": {
                                  textDecoration: "none"
                              }
                          }}
                          href={`/students/${session?.user?.name}`}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            src="https://i.pravatar.cc/40?img=2"
                            srcSet="https://i.pravatar.cc/80?img=2"
                            sx={{borderRadius: '50%'}}
                        />
                        <Box sx={{ml: 1.5, display: 'flex', flexDirection: 'column'}}>
                            <Typography level="title-sm" textColor="text.primary">
                                {session?.user?.name}
                            </Typography>
                            <Typography level="body-xs" textColor="text.tertiary">
                                {session?.user?.email}
                            </Typography>
                        </Box>
                    </Box>
                </MenuItem>
                <ListDivider/>
                <MenuItem>
                    <ListItemDecorator>
                        <PhoneIcon className={"w-6 h-6 ss-icon"}/>
                    </ListItemDecorator>
                    Contact us
                </MenuItem>
                <MenuItem component={Link}
                          sx={{
                              "&:hover": {
                                  textDecoration: "none"
                              }
                          }}
                          href={"/admin"}>
                    <ListItemDecorator>
                        <Cog6ToothIcon className={"w-6 h-6 ss-icon"}/>
                    </ListItemDecorator>
                    Settings
                </MenuItem>
                <ListDivider/>
                <MenuItem
                    sx={{
                        "&:hover": {
                            textDecoration: "none"
                        }
                    }}
                    component={Link} href={"/add-new-paper"}>
                    <ListItemDecorator>
                        <DocumentArrowUpIcon className={"w-6 h-6 ss-icon"}/>
                    </ListItemDecorator>{' '}
                    Add new paper
                </MenuItem>
                <ListDivider/>
                <MenuItem onClick={() => signOut()}>
                    <ListItemDecorator sx={{color: 'inherit'}}>
                        <ArrowRightOnRectangleIcon className={"w-6 h-6 ss-icon"}/>
                    </ListItemDecorator>
                    Sign out
                </MenuItem>
            </Menu>
        </Dropdown>
    )
}
