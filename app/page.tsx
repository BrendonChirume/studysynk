import * as React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Styled from "@/components/Styled";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import {getServerSession} from "next-auth";
import RecentTable from "@/components/home/RecentTable";
import Square3Stack3DIcon from "@heroicons/react/24/outline/Square3Stack3DIcon";
import authOptions from "@/lib/utils/authOptions";

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <Styled.Section sx={{pt: 4, pb: 12}}>

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
                    height: 250,
                }}>
                    <Typography
                        sx={{color: '#198aca'}}
                        startDecorator={<BoltIcon className={"w-8 h-8 ss-icon"}/>}
                        level={"h2"}>
                        {session?.user?.streak} day{session?.user?.streak !== 1 && 's'} streak!
                    </Typography>
                    <Typography sx={{pl: 6, pt: 1.5, fontWeight: '500', fontSize: '18px'}}>
                        Welcome back 👋
                    </Typography>
                    <Typography
                        sx={{pl: 6, pt: 1, fontWeight: '500', fontSize: '24px', textTransform: 'capitalize'}}>
                        {session?.user?.name}
                    </Typography>
                    <Typography level="body-md" sx={{pl: 6, pt: 2, pb: 0.5}}>
                        Your&apos;e a learning machine!
                    </Typography>
                    <Typography level="body-md" sx={{pl: 6}}>
                        Learning everyday, increases retention capacity!
                    </Typography>
                </Box>
            </Card>
            <Typography level="body-md" sx={{pt: 5}} startDecorator={
                <Square3Stack3DIcon className="w-6 h-6 ss-icon"/>
            }>
                Recent
            </Typography>
            <RecentTable/>
        </Styled.Section>
    )
}
