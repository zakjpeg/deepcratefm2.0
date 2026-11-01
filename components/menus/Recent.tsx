"use client";

import { useRecentStore } from "@/stores/useRecentStore";
import SongListing from "../songs/SongListing";
import { FaHeart, FaHistory } from "react-icons/fa";
import { useTabStore } from "@/stores/useTabStore";
import { TAB_LIKED, TAB_RECENT } from "@/types/tab";

export default function Recent() {

    const {tab, setTab} = useTabStore();
    const {recent} = useRecentStore();

    const mostRecentSongs = recent.slice(0, 6);

    return (
            <div className="flex flex-col gap-3 p-5 boxy w-full">
            <div
            className={"flex flex-row justify-between gap-2 items-center transition-colors text-white/60"}
            >
              <p className="text-white/90 font-semibold">Recently Played</p>
              <p className="text-sm hover:text-white hover:scale-105 transition-all cursor-pointer"
              onClick={() => setTab(TAB_RECENT)}
              >See all</p>
            </div>
            <div className="grid grid-cols-1 gap-2 h-min">
            {
              mostRecentSongs.map((song, idx) => (
                  <SongListing key={song.id} song={song}/>
              ))
            }

            {/* See all */}
            {recent.length > 6 &&
            <div 
            className="flex flex-row gap-2 rounded-md items-center justify-start cursor-pointer text-white/50 hover:text-white/75 hover:bg-white/10 hover:scale-103 transition-all"
            >
                <div className="flex justify-center items-center aspect-square w-15 h-15 rounded-md bg-white/10">
                <FaHistory size={20}/>
                </div>
                <div className="flex flex-col"
                onClick={() => setTab(TAB_RECENT)}
                >
                <p className="font-semibold text-sm text-white line-clamp-2 text-ellipsis">See All</p>
                <p className="text-xs line-clamp-1 text-ellipsis">Browse recent songs</p>
                </div>
            </div>
            }

            <div 
              className="flex flex-row gap-2 rounded-md items-center justify-start cursor-pointer text-white/50 hover:text-white/75 hover:bg-white/10 hover:scale-103 transition-all"
              >
                <div className="flex justify-center items-center aspect-square w-15 h-15 rounded-md bg-white/10">
                  <FaHeart size={20}/>
                </div>
                <div className="flex flex-col"
                onClick={() => setTab(TAB_LIKED)}
                >
                  <p className="font-semibold text-sm text-white line-clamp-2 text-ellipsis">Liked Songs</p>
                  <p className="text-xs line-clamp-1 text-ellipsis">Browse your liked songs</p>
                </div>
              </div>
            </div>


        </div>
    )

}