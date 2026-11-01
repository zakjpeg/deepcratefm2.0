"use client";

import { useLikedStore } from "@/stores/useLikedStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types/song";
import clsx from "clsx";
import { motion } from "motion/react";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function GenericSongCard({
    song,
}: {
    song: Song;
}) {
    const { song: playerSong, setSong, clearSong } = usePlayerStore();
    const { liked, addToLiked, removeFromLiked } = useLikedStore();

    if (!song) {
        return null;
    }

    const isPlaying = playerSong === song;
    const isLiked = liked.includes(song);

    if (!song.title) {
        return null;
    }

    return (
        <div
            key={song.title}
            className={clsx(
                "p-3 overflow-hidden relative w-full h-full flex flex-col justify-end gap-2 rounded-lg cursor-pointer text-white/50 hover:text-white/75 hover:bg-white/10 transition-all hover:scale-103",
                isPlaying && "bg-white/10",
            )}
            onClick={() => setSong(song)}
        >
            <img
                src={song?.images ? song?.images[0]?.uri : song?.thumb}
                alt=""
                draggable={false}
                className="absolute inset-0 aspect-square w-full object-cover select-none"
            />

            <img
                src={song?.images ? song?.images[0]?.uri : song?.thumb}
                alt=""
                draggable={false}
                className="absolute left-0 -bottom-5/10 blur-xl scale-x-200 brightness-35 saturate-200 aspect-square w-full h-full object-cover select-none"
            />

            <div className="absolute inset-0 border-[2px] border-white/25 rounded-lg mix-blend-overlay"/>

            <div className="flex flex-col z-1">
                <p className="font-bold tracking-tight text-xl text-white line-clamp-2 text-ellipsis">
                    {song.title.split(' - ')[1]}
                </p>
                <p className="opacity-50 text-sm text-white line-clamp-2 text-ellipsis">
                    {song.title.split(' - ')[0]}
                </p>
            </div>

        </div>
    );
}
