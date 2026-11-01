"use client";

import { useRecentStore } from "@/stores/useRecentStore";
import SongListing from "../songs/SongListing";
import { useState } from "react";
import { Song } from "@/types/song";

export default function RecentTab() {
    const {recent} = useRecentStore();

    /*
    To prevent the order from changing when a user plays another song,
    we use a stale list of recent songs that persists through re-renders
    */
    const [staleRecent, setStaleRecent] = useState<Song[]>(recent);

    return (
        <div className="flex flex-col gap-2">
            <p className="font-semibold">Recently Played</p>
            <div className="flex flex-col gap-2 scrollbar-none">
            {staleRecent.map((song, index) => (
                <SongListing key={song.id} song={song} expandOnHover={false}/>
            ))}
            </div>
        </div>
    )
}