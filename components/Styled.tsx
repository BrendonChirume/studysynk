import Sheet, {SheetProps} from "@mui/joy/Sheet";
import Box, {BoxProps} from "@mui/joy/Box";
import Typography, {TypographyProps} from "@mui/joy/Typography";

const Item = (props: SheetProps) => {
    return (
        <Sheet
            variant="outlined"
            {...props}
            sx={[{
                borderRadius: 'lg',
                p: 1,
                listStyle: 'none',
            }, ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}/>
    )
}

const Section = (props: BoxProps) => {
    return (
        <Box
            {...props}
            component={"section"}
            sx={[{
                flex: 1,
                maxWidth: 1200,
                width: '100%',
                mx: 'auto',
            }, ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}/>
    )
}

const Header = (props: TypographyProps) => {
    return (
        <Typography
            {...props}
            level={"h1"}
            fontSize="xl4"
            sx={[{
                background:
                    'linear-gradient(-30deg, var(--joy-palette-neutral-700), var(--joy-palette-neutral-100))',
                // `Webkit*` properties must come later.
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                my: 2,
                mx: 'auto',
            }, ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}/>
    )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    Header,
    Item,
    Section
}