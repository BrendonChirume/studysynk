import {extendTheme} from '@mui/joy/styles';
import {
    experimental_extendTheme as materialExtendTheme,
} from '@mui/material/styles';

declare module '@mui/joy/styles' {

}

const joyTheme = extendTheme({

    /**
     * Define styles for customised elements
     */

    components: {
        JoyInput: {
            defaultProps: {
                variant: "outlined",
            }
        },
        JoyAvatar: {
            defaultProps: {
                variant: "plain",
            }
        }
    }
})

const muiTheme = materialExtendTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent'
                }
            }
        }
    }
})

const vars = {joyTheme, muiTheme};

export default vars