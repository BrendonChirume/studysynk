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

export default function MyProfile() {
    return (
        <Box
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
                    <Input placeholder="first name" defaultValue="Siriwat"/>
                </FormControl>
                <FormControl sx={{flex: 1}}>
                    <FormLabel sx={{display: {sm: 'none'}}}>Last name</FormLabel>
                    <Input placeholder="last name" defaultValue="K."/>
                </FormControl>
            </Box>

            <Divider role="presentation"/>

            <FormControl sx={{display: {sm: 'contents'}}}>
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    startDecorator={<EnvelopeIcon className="w-6 h-6 ss-icon"/>}
                    placeholder="email"
                    defaultValue="siriwatk@test.com"
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
                    src="/static/images/avatar/1.jpg"
                    sx={{'--Avatar-size': '64px'}}
                />
                <DropZone/>
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
                    defaultValue="I'm a software developer based in Bangkok, Thailand. My goal is to solve UI problems with neat CSS without using too much JavaScript."
                />
                <FormHelperText sx={{mt: 0.75, fontSize: 'xs'}}>
                    275 characters left
                </FormHelperText>
            </Box>
            <Divider role="presentation"/>

            <FormControl sx={{display: {sm: 'contents'}}}>
                <FormLabel>University</FormLabel>
                <Input
                    startDecorator={<BuildingOffice2Icon className="w-6 h-6 ss-icon"/>}
                    placeholder="university"
                />
            </FormControl>

            <FormControl sx={{display: {sm: 'contents'}}}>
                <FormLabel>Program</FormLabel>
                <Input
                    startDecorator={<AcademicCapIcon className="w-6 h-6 ss-icon"/>}
                    placeholder="Program"
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
                    endDecorator={
                        <CheckIcon className="w-5 h-5 ss-icon"/>
                    }>
                    Save
                </Button>
            </Box>
        </Box>
    );
}
