"use client";

import SongListing from "../songs/SongListing";
import { useState } from "react";
import { Song } from "@/types/song";
import { useLikedStore } from "@/stores/useLikedStore";

export default function LikedTab() {
    const {liked} = useLikedStore();

    /*
    To prevent the order from changing when a user plays another song,
    we use a stale list of liked songs that persists through re-renders
    */
    const [staleLiked, setStaleLiked] = useState<Song[]>(liked);

    return (
        <div className="flex flex-col gap-2">
            <p className="font-semibold">Liked Songs</p>
            <div className="flex flex-col gap-2 scrollbar-none">
            {staleLiked.map((song, index) => (
                <SongListing key={song.id} song={song} expandOnHover={false}/>
            ))}
            </div>
        </div>
    )
}