import * as React from 'react';
import Box from '@mui/joy/Box';
import Card, {CardProps} from '@mui/joy/Card';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import CloudArrowUpIcon from "@heroicons/react/24/outline/CloudArrowUpIcon";

export default function DropZone({sx, ...props}: CardProps) {
    return (
        <Card
            variant="plain"
            {...props}
            sx={[
                {
                    borderRadius: 'lg',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'none',
                    border: (theme) => `2px dashed ${theme.palette.background.level3}`,
                    '&:hover': {
                        bgcolor: 'background.level1',
                        borderColor: 'background.surface'
                    },
                    gap: 1,
                    alignItems: 'center',
                    px: 3,
                    py: 4,
                    flexGrow: 1,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <Box sx={{p: 1, bgcolor: 'background.level1', mb: 2, borderRadius: '50%'}}>
                <Box
                    sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: 'background.level2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <CloudArrowUpIcon className="w-8 h-8 ss-icon"/>
                </Box>
            </Box>
            <Typography level="body-md" textAlign="center">
                <Link component="button" overlay>
                    Click to upload
                </Link>{' '}
                or drag and drop
                <br/> SVG, PNG, JPG or GIF (max. 800x400px)
            </Typography>
        </Card>
    );
}
