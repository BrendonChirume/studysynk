import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";

interface FileCardProps {
    paper: { name: string }
}

export default function FileCard({paper}: FileCardProps) {
    return (
        <Card
            variant="outlined"
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
                <Box sx={{flex: 1}}>
                    <Typography sx={{textTransform: 'capitalize'}}>
                        {paper.name}
                    </Typography>
                    <Typography level="body-xs" mt={0.5}>
                        Added 25 May 2011
                    </Typography>
                </Box>
            </Box>
        </Card>

    )
}