import {extendTheme} from '@mui/joy/styles';
import {Inter} from 'next/font/google';

export const inter = Inter({
    weight: '400',
    subsets: ['latin'],
})

declare module '@mui/joy/styles' {
    interface PaletteBackground {
        scrollbarThumb: string;
        scrollbarTrack: string;
    }

    interface TypographySystemOverrides {
        h5: true
    }
}

const joyTheme = extendTheme({

    typography: {
        h5: {
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.2,
            fontFamily: inter.style.fontFamily,
            color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #23272B))',
        }
    },
    colorSchemes: {
        dark: {
            palette: {
                background: {
                    scrollbarThumb: '#636b74',
                    scrollbarTrack: '#23272b',
                }
            },
        },
        light: {
            palette: {
                background: {
                    scrollbarThumb: '#9fa6ad',
                    scrollbarTrack: '#dde7ee',
                }
            }
        }
    },
    fontFamily: {
        body: `${inter.style.fontFamily}, var(--joy-fontFamily-fallback)`,
        display: `${inter.style.fontFamily}, var(--joy-fontFamily-fallback)`,
    },
    components: {
        JoyInput: {
            defaultProps: {
                variant: "outlined",
            }
        },
        JoyButton: {
            styleOverrides: {
                root: {
                    fontWeight: 500
                }
            }
        },
        JoyAvatar: {
            defaultProps: {
                variant: "plain",
            }
        },
        JoyAutocompleteListbox: {
            styleOverrides: {
                root: {
                    '&::-webkit-scrollbar': {
                        width: 5
                    }
                }
            }
        },
    }
})

export default joyTheme