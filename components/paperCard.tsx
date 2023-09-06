import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Link from "@mui/joy/Link";
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
                '--Card-radius': '8px',
                boxShadow: 'none',
                cursor: 'pointer',
                minWidth: 200,
                maxWidth: 300,
                mx: 'auto'
            }}
        >
            <CardOverflow
                sx={{
                    borderBottom: '1px solid',
                    borderColor: 'neutral.outlinedBorder',
                }}
            >
                <AspectRatio ratio="4/3" color="primary">
                    <Typography
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'primary.plainColor',
                        }}
                    >
                        .zip
                    </Typography>
                </AspectRatio>
            </CardOverflow>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Box sx={{flex: 1, maxHeight: 72}}>
                    <Typography level="title-sm" noWrap sx={{textTransform: 'capitalize'}}>
                        {paper.title}
                    </Typography><br/>
                    <Typography level="body-xs" mt={0.5}>
                        Added 25 May {paper.year}
                    </Typography>
                </Box>
            </Box>
        </Card>

    )
}