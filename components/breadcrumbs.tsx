import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import Typography from "@mui/joy/Typography";
import React from "react";

interface EnhancedBreadcrumbsProps {
    pathname: string;
}

type BreadcrumbsParams = { name: string; url: string; }

export default function EnhancedBreadcrumbs(props: EnhancedBreadcrumbsProps) {
    const {pathname} = props;
    let breadcrumbs: BreadcrumbsParams[] = [];
    const breadcrumbItems = pathname.split('/');


    breadcrumbItems.forEach((breadcrumb, index) => {
        if (breadcrumb !== '') {
            breadcrumbs.push({
                name: breadcrumb.replaceAll('%20', ' '),
                url: `${breadcrumbItems.slice(0, index + 1).join('/')}`
            })
        }
    })


    return (
        <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={
                <ChevronRightIcon className="h-4 w-4"/>
            }
            sx={{
                '--Breadcrumbs-gap': '1rem',
                fontWeight: 'lg',
                color: 'neutral.400',
                p: 0
            }}
        >
            <Link
                underline="none"
                color="neutral"
                fontSize="inherit"
                sx={{
                    '&:hover': {
                        color: 'primary.500'
                    },
                    '--Link-gap': '15px'
                }}
                href="/"
                aria-label="Home"
            >
                <HomeIcon className="h-5 w-5 ss-icon"/>
            </Link>
            {
                breadcrumbs.map((breadcrumb, index) => {
                    return !(index === breadcrumbs.length - 1) ? (
                        <Link
                            key={index}
                            underline="none"
                            color="neutral"
                            fontSize="inherit"
                            sx={{
                                textTransform: 'capitalize',
                                '&:hover': {
                                    color: 'primary.500'
                                }
                            }}
                            href={breadcrumb.url}
                            aria-label="Home"
                        >
                            {breadcrumb.name}
                        </Link>) : (
                        <Typography
                            key={index}
                            sx={{
                                textTransform: 'capitalize',
                            }}
                            level="body-sm"
                            variant="plain"
                            fontWeight="inherit"
                            color="primary">
                            {breadcrumb.name}
                        </Typography>
                    )
                })
            }
        </Breadcrumbs>

    )
}
