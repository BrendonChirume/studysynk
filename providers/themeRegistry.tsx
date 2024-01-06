"use client";

import createCache, {Options} from '@emotion/cache';
import {useServerInsertedHTML} from 'next/navigation';
import {CacheProvider} from '@emotion/react';
import {CssVarsProvider} from '@mui/joy/styles';
import {ReactNode, useState} from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import theme from "@/lib/utils/theme";
import CssBaseline from "@mui/joy/CssBaseline";

interface ThemeRegistryProps {
    children: ReactNode;
    options: Options
}

export default function ThemeRegistry(props: ThemeRegistryProps) {
    const {options, children} = props;

    const [{cache, flush}] = useState(() => {
        const cache = createCache(options);
        cache.compat = true;
        const prevInsert = cache.insert;

        let inserted: string[] = [];
        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };
        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return {cache, flush};
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) {
            return null;
        }
        let styles = '';
        for (const name of names) {
            styles += cache.inserted[name];
        }
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(' ')}`}
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />
        );
    });

    return (
        <CacheProvider value={cache}>
                <CssVarsProvider disableTransitionOnChange theme={theme}>
                    <CssBaseline/>
                    <GlobalStyles
                        styles={(theme) => ({
                            ':root': {
                                '--Collapsed-breakpoint': '769px', // form will stretch when viewport is below `769px`
                                '--Cover-width': '40vw', // must be `vw` only
                                '--Form-maxWidth': '700px',
                                '--Transition-duration': '0.4s', // set to `none` to disable transition
                            },
                            '::-webkit-scrollbar': {
                                width: 8
                            },
                            '::-webkit-scrollbar-thumb': {
                                borderRadius: 8,
                                backgroundColor: `var(--Body-background, ${theme.vars.palette.background.scrollbarThumb})`
                            },
                            '::-webkit-scrollbar-track': {
                                backgroundColor: `var(--Body-background, ${theme.vars.palette.background.scrollbarTrack})`
                            },
                            body: {
                                overflow: 'hidden',
                                backgroundColor: `var(--Body-background, ${theme.vars.palette.background.body})`,
                                fontFamily: `var(--Body-fontFamily, ${theme.vars.fontFamily})`,
                            },
                            '.w-4': {
                                width: '1rem',
                            },
                            '.w-5': {
                                width: '1.25rem',
                            },
                            '.w-6': {
                                width: '1.5rem',
                            },
                            '.w-8': {
                                width: '2rem',
                            },
                            '.h-4': {
                                height: '1rem',
                            },
                            '.h-5': {
                                height: '1.25rem',
                            },
                            '.h-6': {
                                height: '1.5rem',
                            },
                            '.h-8': {
                                height: '2rem',
                            },
                            '.ss-icon': {
                                color: `var(--Icon-color, ${theme.vars.palette.text})`,
                                margin: 'var(--Icon-margin)',
                                fontSize: `var(--Icon-fontSize, ${theme.vars.fontSize.xl})`,
                            },

                        })}
                    />
                    {/* the custom theme is optional */}
                    {children}
                </CssVarsProvider>
        </CacheProvider>
    );
}