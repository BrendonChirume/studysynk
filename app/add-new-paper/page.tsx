import Styled from "@/components/Styled";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import * as React from "react";
import Form from "@/components/addnewpaper/form";
import { getCollages } from "@/lib/prisma/collages";

export default async function AddNewPage() {
    const collages = await getCollages();
    return (
        <Styled.Section>
            <Box sx={{pt: 4}}>
                <Typography level="h5">Add New Paper</Typography>
                <Typography level="body-sm" sx={{mt: 1}}>The credibility of this information is at your
                    discretion.</Typography>
                <Form collages={collages}/>
            </Box>
        </Styled.Section>
    );
}