"use client";

import { useExploreStore } from "@/stores/useExploreStore";
import SongListing from "../songs/SongListing";
import { useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import GenericSongCard from "../songs/GenericSongCard";
import clsx from "clsx";

export default function ExploreTab() {

    const {explore, loading, refreshExplore} = useExploreStore();

    useEffect(() => {
        refreshExplore();
    }, [])

    if (loading) {
        return <CgSpinner className="animate-spin"/>
    }

    return (
        <div className="flex flex-col gap-2">
            <p className="font-semibold">Explore</p>

            <div className="flex flex-row flex-wrap gap-2 scrollbar-none">
            {explore?.map((song, index) => (
                <div key={song.id} className={clsx(
                    "h-60 min-w-40",
                    (
                        index !== 0 && (
                            (index+1) % 9 === 0
                        )
                    )
                        ? "w-1/2" 
                        : "flex-1/5"
                )}>
                <GenericSongCard song={song}/>
                </div>
            ))}
            </div>
        </div>
    )
}