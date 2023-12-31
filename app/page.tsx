import Grid from "@mui/joy/Grid";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Image from "next/image";
import Styled from "@/components/Styled";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import {getServerSession} from "next-auth";
import RecentTable from "@/components/home/RecentTable";
import Square3Stack3DIcon from "@heroicons/react/24/outline/Square3Stack3DIcon";

export default async function Home() {
    const session = await getServerSession();

    return (
        <Styled.Section sx={{pt: 4}}>
            <Grid container spacing={3}>
                <Grid xs={12} lg={8}>
                    <Card
                        variant="soft" color="primary" invertedColors
                        sx={{
                            boxShadow: 'none',
                            "--Card-radius": '15px',

                        }}>
                        <Box sx={{
                            background: {xs: 'none', md: "url('/home-hero.svg') no-repeat"},
                            backgroundPositionX: {md: 'right'},
                            backgroundSize: {md: 270},
                            py: 2.5,
                            height: 270,
                        }}>
                            <Typography
                                startDecorator={<BoltIcon className={"w-8 h-8 ss-icon"}/>}
                                level={"h2"}>
                                15 days!
                            </Typography>
                            <Typography sx={{pl: 6, pt: 1.5,fontWeight: '500', fontSize: '18px'}}>
                                Welcome back 👋
                            </Typography>
                            <Typography
                                sx={{pl: 6, pt: 1, fontWeight: '500', fontSize: '24px', textTransform: 'capitalize'}}>
                                {session?.user?.name}
                            </Typography>
                            <Typography level="body-md" sx={{pl: 6, pt: 2, pb: 0.5}}>
                                Your&apos;e a learning machine!
                            </Typography>
                            <Typography level="body-sm" sx={{pl: 6}}>
                                Learning everyday, increases retention capacity!
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid xs={12} lg={4}>
                    <Card
                        variant="solid"
                        invertedColors
                        sx={{
                            "--Card-radius": '15px',
                            boxShadow: 'none',
                            minHeight: 282
                        }}
                    >
                        <CardCover>
                            <Image width={300} height={300} style={{width: 326, height: "auto"}} alt=""
                                   src="/thumbnail.png"/>
                        </CardCover>
                        <CardCover
                            sx={{
                                background:
                                    'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1))',
                            }}
                        />
                        <CardContent>
                            <Box sx={{flex: 1}}>
                                <Typography
                                    level="body-lg"
                                    fontWeight="lg"
                                    textColor="#fff"
                                    mt={{xs: 14, sm: 24}}
                                >
                                    New uploads
                                </Typography>
                                <Typography level="body-xs" mt={0.5}>
                                    Added 5 Aug 2016
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
            <Typography level="body-md" sx={{pt: 5}} startDecorator={
                <Square3Stack3DIcon className="w-6 h-6 ss-icon"/>
            }>
                Recent
            </Typography>
            <RecentTable/>
        </Styled.Section>
    )
}
