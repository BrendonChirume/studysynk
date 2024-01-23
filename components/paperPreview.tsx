import * as React from "react";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Divider from "@mui/joy/Divider";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import DocumentArrowDownIcon from "@heroicons/react/24/outline/DocumentArrowDownIcon";
import {usePaperPreview} from "@/context/paperPreviewContext";
import Chip from "@mui/joy/Chip";
import ShareIcon from "@heroicons/react/24/outline/ShareIcon";
import {getMonth, trimProgram} from "@/lib/utils/helper";

export default function PaperPreview() {
    const {paper, showPaperPreview} = usePaperPreview();
    const links = process.env.NEXT_PUBLIC_URL;
    const [isCopied, setIsCopied] = React.useState(false);

    const copyLink = () => {
        try {
            navigator.clipboard.writeText(links ?? '').then(() => {
                setIsCopied(true)
            })
        } catch (error) {
            console.error('Error copying to clipboard:', error);
        }
    }

    React.useEffect(() => {
        if (isCopied) {
            const resetCopiedState = setTimeout(() => {
                setIsCopied(false);
            }, 1500);

            return () => clearTimeout(resetCopiedState);
        }
    }, [isCopied]);

    if (!paper) {
        return null
    }
    const {title, year, university, program, author, course, faculty, department, createdAt} = paper;

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
            <Box sx={{px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography level="body-sm">
                    Share
                </Typography>
                <Box sx={{position: 'relative'}}>
                    <Chip
                        color={"primary"}
                        variant={"solid"}
                        size={"sm"} sx={{
                        position: 'absolute',
                        opacity: isCopied ? 1 : 0,
                        left: '50%',
                        transform: isCopied ? 'translate(-50%, -28px)' : 'translate(-50%, -10px)',
                        transition: 'opacity 0.2s ease, transform 0.2s ease'
                    }}>
                        Copied!
                    </Chip>
                    <IconButton onClick={copyLink}>
                        <ShareIcon className={"ss-icon w-5 h-5"}/>
                    </IconButton>
                </Box>
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
                <Typography level="body-sm" textColor="text.primary" sx={{textTransform: 'capitalize'}}>
                    {title}
                </Typography>

                <Typography level="body-sm">Year</Typography>
                <Typography level="body-sm" textColor="text.primary" sx={{textTransform: 'capitalize'}}>
                    {year}
                </Typography>

                <Typography level="body-sm">University</Typography>
                <Typography level="body-sm" textColor="text.primary" sx={{textTransform: 'uppercase'}}>
                    {university.code}
                </Typography>

                <Typography level="body-sm">Faculty</Typography>
                <Typography level="body-sm" textColor="text.primary" sx={{textTransform: 'capitalize'}}>
                    {faculty.name}
                </Typography>

                <Typography level="body-sm">Department</Typography>
                <Typography level="body-sm" textColor="text.primary" sx={{textTransform: 'capitalize'}}>
                    {department.name}
                </Typography>

                <Typography level="body-sm">Program</Typography>
                <Typography level="body-sm" textColor="text.primary" sx={{textTransform: 'capitalize'}}>
                    {trimProgram(program.name)}
                </Typography>

                <Typography level="body-sm">Course</Typography>
                <Typography level="body-sm" textColor="text.primary" sx={{textTransform: 'capitalize'}}>
                    {course.name}
                </Typography>

                <Typography level="body-sm">Created</Typography>
                <Typography level="body-sm" textColor="text.primary" sx={{textTransform: 'capitalize'}}>
                    {new Date(createdAt).getDate()} {getMonth(new Date(createdAt).getMonth(), 'short')} {new Date(createdAt).getFullYear()}
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