"use client";

import { useLikedStore } from "@/stores/useLikedStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types/song";
import clsx from "clsx";
import { motion } from "motion/react";

export default function GenericSongCard({
    song,
    loading = false,
}: {
    song?: Song;
    loading?: boolean;
}) {
    const { song: playerSong, setSong, clearSong } = usePlayerStore();
    const { liked, addToLiked, removeFromLiked } = useLikedStore();

    // Empty State
    if (loading) {
        return (
        <motion.div
        animate={{
            opacity: [0.75, 1, 0.75]
        }}
        transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
        }}
        className={clsx(
            "w-full h-full rounded-lg bg-neutral-900 shadow-xl",
        )}
        />
        )
    }

    // Error State
    if (!song || !song.title) {
        return null;
    }

    // Success State
    const isPlaying = playerSong === song;
    const isLiked = liked.includes(song);

    return (
        <motion.div
            animate={{
                opacity: [0, 1]
            }}
            key={song.title}
            className={clsx(
                "p-3 overflow-hidden shadow-xl relative w-full h-full flex flex-col justify-end gap-2 rounded-lg cursor-pointer text-white/50 hover:text-white/75 hover:bg-white/10 transition-all hover:scale-103",
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

        </motion.div>
    );
}
