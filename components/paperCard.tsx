import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import {IPaper} from "@/lib/types";
import {usePaperPreview} from "@/context/paperPreviewContext";
import {getMonth, useThumbnail} from "@/lib/utils/helper";
import * as React from "react";


interface FileCardProps {
    paper: IPaper
}

export default function PaperCard({paper}: FileCardProps) {
    const {showPaperPreview} = usePaperPreview();
    const canvasContainer = React.useRef<HTMLDivElement | null>(null);
    const {createdAt} = paper;
    useThumbnail(canvasContainer, '/sample.pdf');

    return (
        <Card
            variant="outlined"
            onClick={() => showPaperPreview(paper)}
            sx={{
                p: 0,
                boxShadow: 'none',
                cursor: 'pointer',
                overflow: 'hidden',
                minWidth: 230,
                maxWidth: 310,
                minHeight: 280,
                mx: 'auto',
            }}
        >
            <CardOverflow
                sx={{
                    borderBottom: '1px solid',
                    borderColor: 'neutral.outlinedBorder',
                    borderRadius: 0,
                }}
            >
                <AspectRatio
                    ref={canvasContainer}
                    sx={{
                        borderRadius: 0,
                        overflow: 'hidden',
                        position: 'relative',
                        height: 230,
                        width: 'auto',
                    }} color="neutral">

                </AspectRatio>
            </CardOverflow>
            <Box sx={{display: 'flex', alignItems: 'start', width: '100%', px: 2}}>
                <Box sx={{flex: 1, maxHeight: 54, pb: 2, width: '100%'}}>
                    <Typography level="title-sm"
                                sx={{
                                    textTransform: 'capitalize',
                                    width: '100%',
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    display: "inline-block",
                                    overflow: "hidden"
                                }}>
                        {paper.title}
                    </Typography><br/>
                    <Typography level="body-xs">
                        Added {new Date(createdAt).getDate()} {getMonth(new Date(createdAt).getMonth(), 'short')} {new Date(createdAt).getFullYear()}
                    </Typography>
                </Box>
            </Box>
        </Card>

    )
}