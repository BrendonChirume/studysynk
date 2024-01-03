import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Link from "@mui/joy/Link";
import Image from "next/image";
import {Paper} from "@/lib/types";

interface FileCardProps {
    paper: Paper
}

export default function PaperCard({paper}: FileCardProps) {
    return (
        <Card
            variant="outlined"
            component={Link}
            underline={"none"}
            href={`/papers/${paper.title}`}
            sx={{
                p: 0,
                boxShadow: 'none',
                cursor: 'pointer',
                overflow: 'hidden',
                width: 230,
                height: 280,
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
                <Box sx={{flex: 1, maxHeight: 54, pb: 2}}>
                    <Typography level="title-sm" noWrap sx={{textTransform: 'capitalize'}}>
                        {paper.title}
                    </Typography><br/>
                    <Typography level="body-xs">
                        Added 25 May {paper.year}
                    </Typography>
                </Box>
            </Box>
        </Card>

    )
}