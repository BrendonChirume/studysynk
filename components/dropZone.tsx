import * as React from 'react';
import Box from '@mui/joy/Box';
import Card, {CardProps} from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import CloudArrowUpIcon from "@heroicons/react/24/outline/CloudArrowUpIcon";
import Input from "@mui/joy/Input";
import FileCard from "@/components/fileCard";
import {CSSObject} from "@mui/material";

const activeStyles: CSSObject = {
    bgcolor: 'background.level1',
    borderColor: 'background.surface'
}

export default function DropZone({sx, ...props}: CardProps) {
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const [file, setFile] = React.useState<FileList | null>(null);
    const [dragActive, setDragActive] = React.useState<boolean>(false)

    const handleFileDrag = (event: React.DragEvent<HTMLLabelElement | HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(event.type === "dragenter" || event.type === "dragover");
    }
    const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false)
        if (event.dataTransfer.files[0]) {
            setFile(event.dataTransfer.files)
            if (inputRef.current) {
                inputRef.current.files = event.dataTransfer.files
            }
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files);
        }
    }
    console.log(file)

    const handleDelete = () => setFile(null);

    return (
        <>
            {
                file ? <FileCard fileName={file[0].name} fileSize={file[0].size} handleDelete={handleDelete}/>
                    : (
                        <Card
                            variant="outlined"
                            component="label"
                            onDragEnter={handleFileDrag}
                            htmlFor="file"
                            {...props}
                            sx={[
                                {
                                    position: 'relative',
                                    borderRadius: 'lg',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    boxShadow: 'none',
                                    '&:hover': activeStyles,
                                    ...(dragActive && activeStyles),
                                    gap: 1,
                                    alignItems: 'center',
                                    px: 3,
                                    py: 4,
                                    flexGrow: 1,
                                },
                                ...(Array.isArray(sx) ? sx : [sx]),
                            ]}
                        >
                            {
                                dragActive && <Box
                                    onDragEnter={handleFileDrag}
                                    onDragOver={handleFileDrag}
                                    onDrop={handleFileDrop}
                                    sx={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}}/>
                            }
                            <Box sx={{p: 1, bgcolor: 'background.level1', mb: 2, borderRadius: '50%'}}>
                                <Box
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: '50%',
                                        bgcolor: 'background.level2',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <CloudArrowUpIcon className="w-8 h-8 ss-icon"/>
                                </Box>
                            </Box>
                            <Typography level="body-md" textAlign="center">
                                Click to upload here, or drag and drop
                                <br/>
                                File here&nbsp;<Typography level={"body-xs"}>(PDF only)</Typography>
                            </Typography>
                        </Card>
                    )
            }
            <Input
                sx={{
                    display: "none",
                }}
                onChange={handleChange}
                slotProps={{
                    input: {
                        id: "file",
                        accept: "application/pdf",
                        name: "file",
                        ref: inputRef
                    }
                }} component="div" type={"file"}/>
        </>
    )
}
