import * as React from 'react';
import Box, {BoxProps} from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';

function Root(props: BoxProps) {
    return (
        <Box
            {...props}
            sx={
                [
                    {
                        display: 'grid',
                        gridTemplateColumns: '300px 1fr',
                        gridTemplateRows: '64px 1fr',
                        height: '100vh',
                    },
                    ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
                ]
            }
        />
    );
}

function Header(props: BoxProps) {
    return (
        <Box
            component="header"
            className="Header"
            {...
                props
            }
            sx={
                [
                    {
                        py: 1, px: 2,
                        gap: 1,
                        bgcolor: 'background.surface',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gridColumn: '1 / -1',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1100,
                    },
                    ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
                ]
            }
        />
    )
        ;
}

function SideNav(props: BoxProps) {
    return (
        <Box
            component="nav"
            className="Navigation"
            {...
                props
            }
            sx={
                [
                    {
                        p: 2,
                        bgcolor: 'background.surface',
                        borderRight: '1px solid',
                        borderColor: 'divider',
                        position: 'sticky',
                        top: 60,
                        height: 'calc(100vh - 60px)',
                        display: {
                            xs: 'none',
                            md: 'initial',
                        },
                    },
                    ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
                ]
            }
        />
    )
        ;
}

function SidePane(props: BoxProps) {
    return (
        <Box
            className="Filter"
            {...
                props
            }
            sx={
                [
                    {
                        bgcolor: 'background.surface',
                        borderRight: '1px solid',
                        borderColor: 'divider',
                        display: {
                            xs: 'none',
                            md: 'initial',
                        },
                    },
                    ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
                ]
            }
        />
    )
        ;
}

function Main(props: BoxProps) {
    return (
        <Box
            component="main"
            className="Main"
            {...props}
            sx={[{p: 4, height: 'calc(100vh - 64px)', overflowX: 'hidden', overflowY: 'auto'}, ...(Array.isArray(props.sx) ? props.sx : [props.sx])
            ]
            }
        />
    )
        ;
}

function SideDrawer(
    {
        onClose,
        ...props
    }: BoxProps & { onClose: React.MouseEventHandler<HTMLDivElement> }) {
    return (
        <Box
            {...props}
            sx={
                [
                    {position: 'fixed', zIndex: 1200, width: '100%', height: '100%'},
                    ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
                ]
            }
        >
            <Box
                role="button"
                onClick={onClose}
                sx={
                    {
                        position: 'absolute',
                        inset:
                            0,
                        bgcolor:
                            (theme) =>
                                `rgba(${theme.vars.palette.neutral.darkChannel} / 0.8)`,
                    }
                }
            />
            < Sheet
                sx={
                    {
                        minWidth: 256,
                        width:
                            'max-content',
                        height:
                            '100%',
                        p:
                            2,
                        boxShadow:
                            'lg',
                        bgcolor:
                            'background.surface',
                    }
                }
            >
                {
                    props.children
                }
            </Sheet>
        </Box>
    )
        ;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    Root,
    Header,
    SideNav,
    SidePane,
    SideDrawer,
    Main,
};