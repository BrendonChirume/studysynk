import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Image from "next/image";
import {IPaper} from "@/lib/types";
import {usePaperPreview} from "@/context/paperPreviewContext";
import {getMonth} from "@/lib/utils/helper";

interface FileCardProps {
    paper: IPaper
}

export default function PaperCard({paper}: FileCardProps) {
    const {showPaperPreview} = usePaperPreview();
    const {createdAt} = paper;
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
                maxWidth: 270,
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
                    sx={{
                        borderRadius: 0,
                        overflow: 'hidden',

                    }}
                    ratio="10/9" color="neutral">
                    <Image
                        src={'/thumbnail3.png'}
                        width={280}
                        height={280}
                        style={{
                            objectPosition: 'top',
                        }}
                        alt="PDF Thumbnail"
                    />
                </AspectRatio>
            </CardOverflow>
            <Box sx={{display: 'flex', alignItems: 'start', width: '100%', px: 2}}>
                <Box sx={{flex: 1, maxHeight: 54, pb: 2, width: '100%'}}>
                    <Typography level="title-sm"
                                sx={{
                                    textTransform: 'capitalize',
                                    width: 196,
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