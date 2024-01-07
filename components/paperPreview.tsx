import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Divider from "@mui/joy/Divider";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import DocumentArrowDownIcon from "@heroicons/react/24/outline/DocumentArrowDownIcon";
import * as React from "react";
import {usePaperPreview} from "@/context/paperPreviewContext";
import Chip from "@mui/joy/Chip";

export default function PaperPreview() {
    let {paper, showPaperPreview} = usePaperPreview();

    if (!paper) {
        return <Box>No paper selected</Box>
    }
    const {title, year, university, author, course, faculty, department, createdAt} = paper;

    const isOpen = !Boolean(paper?.title === paper?.createdAt);

    return (
        <Sheet
            sx={{
                display: {xs: 'none', sm: isOpen ? 'initial' : 'none'},
                borderLeft: '1px solid',
                borderColor: 'neutral.outlinedBorder',
                overflow: 'auto',
                height: "calc(100vh - 64px)",
            }}
        >
            <Box sx={{p: 2, display: 'flex', alignItems: 'center'}}>
                <Typography level="h5" sx={{flex: 1}}>Paper Preview</Typography>
                <IconButton variant="outlined" color="neutral" size="sm"
                            onClick={() => showPaperPreview(null)}>
                    <XMarkIcon className="w-4 h-4 ss-icon"/>
                </IconButton>
            </Box>
            <Divider/>
            <AspectRatio ratio="21/9">
                {/*<img*/}
                {/*    alt=""*/}
                {/*    src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=774"*/}
                {/*/>*/}
            </AspectRatio>
            <Box sx={{p: 2, display: 'flex', gap: 1, alignItems: 'center'}}>
                <Typography level="body-sm" mr={1}>
                    Shared with
                </Typography>
                <Chip>{author?.name}</Chip>
            </Box>
            <Divider/>
            <Box
                sx={{
                    gap: 2,
                    p: 2,
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    '& > *:nth-child(odd)': {color: 'text.secondary'},
                }}
            >
                <Typography level="body-sm">Title</Typography>
                <Typography level="body-sm" textColor="text.primary">
                    {title}
                </Typography>

                <Typography level="body-sm">Year</Typography>
                <Typography level="body-sm" textColor="text.primary">
                    {year}
                </Typography>

                <Typography level="body-sm">University</Typography>
                <Typography level="body-sm" textColor="text.primary">
                    {university}
                </Typography>

                <Typography level="body-sm">Faculty</Typography>
                <Typography level="body-sm" textColor="text.primary">
                    {faculty}
                </Typography>

                <Typography level="body-sm">Department</Typography>
                <Typography level="body-sm" textColor="text.primary">
                    {department}
                </Typography>

                <Typography level="body-sm">Course</Typography>
                <Typography level="body-sm" textColor="text.primary">
                    {course}
                </Typography>

                <Typography level="body-sm">Created</Typography>
                <Typography level="body-sm" textColor="text.primary">
                    {new Date(createdAt).toString().slice(4, 15)}
                </Typography>

            </Box>
            <Divider/>
            <Box sx={{py: 2, px: 1}}>
                <Button variant="plain" size="sm" endDecorator={<DocumentArrowDownIcon className="ss-icon w-5 h-5"/>}>
                    Download paper
                </Button>
            </Box>
        </Sheet>
    )
}