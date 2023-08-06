import Grid from "@mui/joy/Grid";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Image from "next/image";
import Styled from "@/components/Styled";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";

export default function Home() {
    return (
       <Styled.Section>
           <Grid container spacing={3} >
               <Grid xs={8}>
                   <Card
                       variant="soft" color="primary" invertedColors
                       sx={{
                           boxShadow: 'none',
                       }}>
                       <Grid container>
                           <Grid xs={7}>
                               <Typography
                                   level={"h4"}
                                   startDecorator={<BoltIcon className={"w-8 h-8 ss-icon"}/>}
                                   fontSize="xx-large">
                                   15 days!
                               </Typography>
                               <Typography level={"h4"} sx={{pl: 6, fontSize: "24px"}}>
                                   Welcome back 👋 <br/>
                                   Brendon Chirume
                               </Typography>
                               <Typography level="body-lg" sx={{pl: 6, pt: 1, pb: 0.5}}>
                                   Your&apos;e a learning machine!
                               </Typography>
                               <Typography level="body-sm" sx={{pl: 6}}>
                                   Learning everyday, increases retention capacity!
                               </Typography>
                           </Grid>
                           <Grid xs={5} sx={{display: 'flex', justifyContent: 'center'}}>
                               <Image src={'/home-hero.svg'} alt={'home hero svg'} width={250} height={250}/>
                           </Grid>
                       </Grid>
                   </Card>
               </Grid>
               <Grid xs={4}>
                   <Card
                       variant="solid"
                       invertedColors
                       sx={{
                           borderRadius: 8,
                           boxShadow: 'none',
                           minHeight: 282
                       }}
                   >
                       <CardCover>
                           <Image width={300} height={282} alt="" src="/thumbnail.png"/>
                       </CardCover>
                       <CardCover
                           sx={{
                               background:
                                   'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1))',
                           }}
                       />
                       <CardContent >
                           <Box sx={{flex: 1}}>
                               <Typography
                                   level="body-lg"
                                   fontWeight="lg"
                                   textColor="#fff"
                                   mt={{ xs: 14, sm: 22 }}
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
       </Styled.Section>
    )
}
