"use client";

import { useLikedStore } from "@/stores/useLikedStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types/song";
import clsx from "clsx";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function SongListing({ song, expandOnHover = true }: { song: Song, expandOnHover?: boolean }) {
    const { song: playerSong, setSong, clearSong } = usePlayerStore();
    const { liked, addToLiked, removeFromLiked } = useLikedStore();

    if (!song) {
        return null;
    }

    const isPlaying = playerSong === song;
    const isLiked = liked.includes(song);

    return (
        <div
            key={song.title}
            className={clsx(
                "flex flex-row gap-2 rounded-md items-center justify-start cursor-pointer text-white/50 hover:text-white/75 hover:bg-white/10 transition-all",
                isPlaying && "bg-white/10",
                expandOnHover && "hover:scale-103 "
            )}
            onClick={() => setSong(song)}
        >
            <img
                src={song?.images[0]?.uri}
                alt=""
                className={clsx(
                    "aspect-square w-15 h-15 object-cover select-none",
                    isPlaying ? "rounded-full spin-slow" : "rounded-md",
                )}
            />
            <div className="flex flex-col">
                <p className="font-semibold text-sm text-white line-clamp-2 text-ellipsis">
                    {song.title}
                </p>
                <p className="text-xs line-clamp-1 text-ellipsis">{song.artist}</p>
            </div>
            <div className="ml-auto mr-5 w-fit">
                <div className="text-white">
                    {isLiked ? (
                        <FaHeart
                            size={20}
                            title="Unlike"
                            className="cursor-pointer hover:scale-105 transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeFromLiked(song);
                            }}
                        />
                    ) : (
                        <FaRegHeart
                            size={20}
                            title="Like"
                            className="cursor-pointer hover:scale-105 transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                addToLiked(song);
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
