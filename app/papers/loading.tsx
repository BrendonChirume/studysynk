import Box from "@mui/joy/Box";
import Styled from "@/components/Styled";
import FilterOptions from "@/components/papers/filterOptions";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import {Skeleton} from "@mui/joy";

const loading = () => {
    return (
        <Styled.Section>
            <Box>
                <FilterOptions/>
                <Grid container spacing={3} columns={12}>
                    {
                        new Array(7).map((index) => (
                            <Grid xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card variant="outlined"
                                      sx={{width: 230, height: 280, display: 'flex', gap: 1, overflow: "hidden"}}>
                                    <AspectRatio ratio={"1"}>
                                        <Skeleton>
                                            <Box sx={{height: 185, width: "100%"}}/>
                                        </Skeleton>
                                    </AspectRatio>
                                    <Typography>
                                        <Skeleton>
                                            <Box sx={{height: 16, width: "100%"}}/>
                                        </Skeleton>
                                    </Typography>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Styled.Section>
    )
}

export default loading;