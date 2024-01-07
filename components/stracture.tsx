import * as React from 'react';
import Box, {BoxProps} from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import {usePaperPreview} from "@/context/paperPreviewContext";

function Root(props: BoxProps) {
    const {paper} = usePaperPreview();
    const isOpen = !Boolean(paper?.title === paper?.createdAt);

    return (
        <Box
            {...props}
            sx={[
                {
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: `minmax(200px, 300px) minmax(450px, 1fr) ${isOpen ? 'minmax(200px, 300px)' : 'minmax(0px, 0px)'}`,
                    },
                    gridTemplateRows: '64px 1fr',
                    minHeight: '100vh',
                },
                ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        />
    );
}

function Header(props: BoxProps) {
    return (
        <Box
            component="header"
            className="Header"
            {...props}
            sx={[
                {
                    p: 2,
                    gap: 2,
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
            ]}
        />
    );
}

function SideNav(props: BoxProps) {
    return (
        <Box
            component="nav"
            className="Navigation"
            {...props}
            sx={[
                {
                    p: 2,
                    bgcolor: 'background.surface',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    display: {
                        xs: 'none',
                        sm: 'initial',
                    },
                },
                ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        />
    );
}

function Main(props: BoxProps) {
    return (
        <Box
            component="main"
            className="Main"
            {...props}
            sx={[{p: 2}, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
        />
    );
}


function SideDrawer(
    props: BoxProps & { onClose: React.MouseEventHandler<HTMLDivElement> },
) {
    const {onClose, ...other} = props;
    return (
        <Box
            {...other}
            sx={[
                {position: 'fixed', zIndex: 1200, width: '100%', height: '100%'},
                ...(Array.isArray(other.sx) ? other.sx : [other.sx]),
            ]}
        >
            <Box
                role="button"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: (theme) =>
                        `rgba(${theme.vars.palette.neutral.darkChannel} / 0.8)`,
                }}
            />
            <Sheet
                sx={{
                    minWidth: 256,
                    width: 'max-content',
                    height: '100%',
                    p: 2,
                    boxShadow: 'lg',
                    bgcolor: 'background.surface',
                }}
            >
                {props.children}
            </Sheet>
        </Box>
    );
}

export {
    Root,
    Header,
    SideNav,
    SideDrawer,
    Main,
}
