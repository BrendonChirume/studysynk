import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Link from "@mui/joy/Link";

interface FileCardProps {
    paper: { name: string }
}

const truncate = (token: string) => {
    const tokenArray = token.split(' ')
    const len = token.length;
    const averageWordLen = Math.floor(tokenArray.reduce((acc, crr) => acc + crr.length, 0) / tokenArray.length);

    if (averageWordLen > 4) {
        return `${token.slice(0, 47)}...`;
    }
    return token
}

export default function FileCard({paper}: FileCardProps) {
    return (
        <Card
            variant="outlined"
            component={Link}
            underline={"none"}
            href={`/library/course/${paper.name}`}
            sx={{
                '--Card-radius': (theme) => theme.vars.radius.sm,
                boxShadow: 'none',
                cursor: 'pointer'
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
                    <Typography level="title-sm" sx={{textTransform: 'capitalize'}}>
                        {truncate(paper.name)}
                    </Typography><br/>
                    <Typography level="body-xs" mt={0.5}>
                        Added 25 May 2011
                    </Typography>
                </Box>
            </Box>
        </Card>

    )
}