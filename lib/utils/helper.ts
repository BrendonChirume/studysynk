import notify from "@/lib/utils/notify";
import React from "react";
import {RenderParameters} from "pdfjs-dist/types/src/display/api";

export const handleApiResponse = (event: React.FormEvent<HTMLFormElement>) => async (response: Response) => {
    if (response.ok) {
        const res = await response.json();
        if (res.message.includes("exists")) {
            return notify(res.message, "warning")
        }
        (event.target as HTMLFormElement).reset();
        return notify(res.message, "success");
    } else {
        return notify(response.statusText, "error");
    }
}

type Lower = { [key: string]: string | number | boolean | Lower | Array<string | number | boolean | Lower> };

export async function lower<T extends Lower>(obj: T, exclude?: string[] | string) {
    const clean = (token: string) => token.toLowerCase().trim();

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const property = obj[key];

            if (exclude && exclude.indexOf(key) > -1) {
                // Exclude specified keys
            } else if (typeof property === 'string') {
                obj[key as keyof T] = clean(property) as T[keyof T];
            } else if (Array.isArray(property)) {
                for (let i = 0; i < property.length; i++) {
                    if (typeof property[i] === 'object' && property[i] !== null) {
                        await lower(property[i] as Lower, exclude);
                    } else if (typeof property[i] === 'string') {
                        property[i] = clean(property[i] as string);
                    }
                }
            } else if (typeof property === 'object' && property !== null) {
                await lower(property, exclude);
            }
        }
    }
}

export const getMonth = (month: number, length: 'long' | 'short'): string => {
    const monthNames = [
        {
            long: 'January',
            short: 'Jan'
        }, {
            long: 'February',
            short: 'Feb'
        }, {
            long: 'March',
            short: 'Mar'
        }, {
            long: 'April',
            short: 'Apr'
        }, {
            long: 'May',
            short: 'May'
        }, {
            long: 'June',
            short: 'Jun'
        }, {
            long: 'July',
            short: 'Jul'
        }, {
            long: 'August',
            short: 'Aug'
        }, {
            long: 'September',
            short: 'Sep'
        }, {
            long: 'October',
            short: 'Oct'
        }, {
            long: 'November',
            short: 'Nov'
        }, {
            long: 'December',
            short: 'Dec'
        }
    ];
    return monthNames[month][length]
}

export const trimProgram = (program: string): string => {

    return program.replace('bachelor of science honours degree', 'BSc (hons)')
}

export const useThumbnail = (canvasContainer: React.RefObject<HTMLDivElement>, uri: string) => {
    React.useEffect(() => {
        (async function () {
            import('pdfjs-dist').then(async (pdfJS) => {

                // We import this here so that it's only loaded during client-side rendering.
                pdfJS.GlobalWorkerOptions.workerSrc =
                    window.location.origin + '/pdf.worker.min.mjs';
                const pdf = await pdfJS.getDocument(uri).promise;
                const canvas = document.createElement("canvas");
                canvas.style.position = 'absolute';
                canvas.style.left = '50%';
                canvas.style.transform = 'translate(-50%, 0)';

                const page = await pdf.getPage(1);
                const viewport = page.getViewport({scale: 0.55});

                // Prepare canvas using PDF page dimensions.
                const canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;
                canvas.height = 230;
                canvas.width = 321;

                // Render PDF page into canvas context.
                const renderContext = {canvasContext, viewport, background: '#fff'} as RenderParameters;
                page.render(renderContext);

                if (!canvasContainer.current) {
                    return null;
                }
                const existingCanvas = canvasContainer.current.childNodes[0];

                if (existingCanvas) {
                    // Replace existing canvas with the new one
                    canvasContainer.current.replaceChild(canvas, existingCanvas);
                } else {
                    // Append the new canvas if there is no existing canvas
                    canvasContainer.current.appendChild(canvas);
                }
            });
        })();
    }, [canvasContainer, uri]);
}