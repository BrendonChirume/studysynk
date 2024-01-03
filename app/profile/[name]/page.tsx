"use client";
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import DropZone from '@/components/dropZone';
import EditorToolbar from '@/components/editorToolbar';
import EnvelopeIcon from "@heroicons/react/24/outline/EnvelopeIcon";
import BuildingOffice2Icon from "@heroicons/react/24/outline/BuildingOffice2Icon";
import AcademicCapIcon from "@heroicons/react/24/outline/AcademicCapIcon";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import {useSession} from "next-auth/react";
import React from "react";
import notify from "@/lib/utils/notify";

export default function MyProfile() {
    const {data: session} = useSession();
    const [name, surname] = session?.user?.name?.split(" ") || ["", ""];
    const [bio, setBio] = React.useState(
        "I am a 🚀 SoftwareSorcerer who likes to play around with solutions✨"
    );
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [wordCount, setWordCount] = React.useState(275 - bio.length)

    const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBio(event.target.value);
        const words = event.target.value.length;
        setWordCount(275 - words)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        await fetch(`/api/profile`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response) => {
            if (response.ok) {
                const res = await response.json();
                notify(res.message, "success");
                (event.target as HTMLFormElement).reset();
            } else {
                notify(response.statusText, "error");
                setIsLoading(false);
            }
        })

    }

    return (
        <Box
            component={"form"}
            onSubmit={handleSubmit}
            sx={{
                pt: 4,
                display: 'grid',
                gridTemplateColumns: {
                    xs: '100%',
                    sm: 'minmax(120px, 30%) 1fr',
                    lg: '320px 1fr',
                },
                columnGap: {xs: 2, sm: 3, md: 3},
                rowGap: {xs: 2, sm: 4},
                '& > hr': {
                    gridColumn: '1/-1',
                },
            }}>
            <FormLabel sx={{display: {xs: 'none', sm: 'block'}}}>Name</FormLabel>
            <Box sx={{display: {xs: 'contents', sm: 'flex'}, gap: 2}}>
                <FormControl sx={{flex: 1}}>
                    <FormLabel sx={{display: {sm: 'none'}}}>First name</FormLabel>
                    <Input placeholder="first name" defaultValue={name}/>
                </FormControl>
                <FormControl sx={{flex: 1}}>
                    <FormLabel sx={{display: {sm: 'none'}}}>Last name</FormLabel>
                    <Input placeholder="last name" defaultValue={surname}/>
                </FormControl>
            </Box>

            <Divider role="presentation"/>

            <FormControl sx={{display: {sm: 'contents'}}}>
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    startDecorator={<EnvelopeIcon className="w-6 h-6 ss-icon"/>}
                    placeholder="email"
                    name="email"
                    defaultValue={session?.user?.email || ""}
                />
            </FormControl>

            <Divider role="presentation"/>

            <Box>
                <FormLabel>Your photo</FormLabel>
                <FormHelperText>This will be displayed on your profile.</FormHelperText>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: 2.5,
                }}
            >
                <Avatar
                    size="lg"
                    src="/avatar.jpg"
                    sx={{'--Avatar-size': '64px'}}
                />
                <DropZone accept={"image/*"} inputId={"image"}/>
            </Box>

            <Divider role="presentation"/>

            <Box>
                <FormLabel>Bio</FormLabel>
                <FormHelperText>Write a short introduction.</FormHelperText>
            </Box>
            <Box>
                <EditorToolbar/>
                <Textarea
                    minRows={4}
                    sx={{mt: 1.5}}
                    slotProps={{
                        textarea: {
                            maxLength: 275
                        }
                    }}
                    value={bio}
                    name={"bio"}
                    onChange={handleBioChange}
                />
                <FormHelperText sx={{mt: 0.75, fontSize: 'xs'}}>
                    {wordCount} characters left
                </FormHelperText>
            </Box>
            <Divider role="presentation"/>

            <FormControl sx={{display: {sm: 'contents'}}}>
                <FormLabel>University</FormLabel>
                <Input
                    startDecorator={<BuildingOffice2Icon className="w-6 h-6 ss-icon"/>}
                    placeholder="university"
                    name={"university"}
                />
            </FormControl>

            <FormControl sx={{display: {sm: 'contents'}}}>
                <FormLabel>Program</FormLabel>
                <Input
                    startDecorator={<AcademicCapIcon className="w-6 h-6 ss-icon"/>}
                    placeholder="Program"
                    name="program"
                />
            </FormControl>
            <Divider role="presentation"/>
            <Box
                sx={{
                    gridColumn: '1/-1',
                    justifySelf: 'flex-end',
                    display: 'flex',
                    gap: 1,
                }}
            >
                <Button variant="outlined" color="neutral">
                    Cancel
                </Button>
                <Button
                    variant="soft" type="submit"
                    loading={isLoading}
                    endDecorator={
                        <CheckIcon className="w-5 h-5 ss-icon"/>
                    }>
                    Save
                </Button>
            </Box>
        </Box>
    );
}
