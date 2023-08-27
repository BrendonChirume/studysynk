import Card, {CardProps} from "@mui/joy/Card";
import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon"
import TrashIcon from "@heroicons/react/24/outline/TrashIcon"
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";

export default function FileCard(
    {
        fileName,
        fileSize,
        handleDelete,
        sx,
        ...props
    }: CardProps & {
        fileName: string;
        fileSize: number;
        handleDelete: () => void
    }
) {

    const formatBytes = (bytes: number) => {
        const k = 1024;
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(0))} ${sizes[i]}`
    }

    return (
        <Card
            variant="outlined"
            orientation={"horizontal"}
            {...props}
            sx={[
                {
                    gap: 1.5,
                    boxShadow: 'none',
                    alignItems: 'flex-start',
                    borderColor: 'primary.600'
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
        >
            <AspectRatio
                ratio="1"
                variant="soft"
                color={"primary"}
                sx={{
                    minWidth: 35,
                    borderRadius: '50%',
                    "--Icon-fonSize": '1rem'
                }}>
                <div><DocumentIcon className={"h-5 w-5 ss-icon"}/></div>
            </AspectRatio>
            <CardContent>
                <Typography fontSize={"sm"}>{fileName}</Typography>
                <Typography level={"body-xs"}>{formatBytes(fileSize)}</Typography>
            </CardContent>
            <IconButton
                variant={"plain"}
                color={"neutral"}
                size={"sm"}
                onClick={handleDelete}
                sx={{mt: -1, mr: -1}}
            >
                <TrashIcon className={"h-5 w-5 ss-icon"}/>
            </IconButton>
        </Card>
    )
}