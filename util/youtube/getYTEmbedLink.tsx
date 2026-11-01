"use client";

export default function getYTEmbedLink(link: string | null | undefined) {

    if (!link) {
        return undefined;
    }

    const embedLink = "https://www.youtube.com/embed/" + link.split('=')[1]

    return embedLink;
}