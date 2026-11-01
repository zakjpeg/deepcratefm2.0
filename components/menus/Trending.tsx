"use client";

import clsx from "clsx";
import { useState } from "react";
import Image from "next/image";
import { FaHotjar } from "react-icons/fa";
import SongListing from "../songs/SongListing";
import { Song } from "@/types/song";

const TRENDING_CATEGORIES = [
  {
    id: 0,
    name: 'Today',
    link: "",
  },
  {
    id: 1,
    name: 'Week',
    link: "",
  },
  {
    id: 2,
    name: 'Month',
    link: "",
  },
]

// const TRENDING_LIST: Song[] = [
//     {
//         id: "132409243",
//         url: "",
//         video: "",
//         title: "A Change Is Gonna Come",
//         description: "",
//         artist: "Aretha Franklin",
//         genre: "",
//         styles: [],
//         tempo: "",
//         musicalKey: "",
//         year: "",
//         cover: "https://upload.wikimedia.org/wikipedia/en/8/88/ACIGCcover.jpg",
//     },
//     {
//         id: "123403294",
//         url: "",
//         video: "",
//         title: "Try a Little Tenderness (Remastered)",
//         description: "",
//         artist: "Otis Redding",
//         genre: "",
//         styles: [],
//         tempo: "",
//         musicalKey: "",
//         year: "",
//         cover: "https://i.discogs.com/l1ZvggXmUlDmV8sHUhsV6DmI5z5hduH9fH75obOqdYk/rs:fit/g:sm/q:90/h:585/w:600/czM6Ly9kaXNjb2dzLWRhdGFiYXNlLWlt/YWdlcy9SLTY2MjQx/NzgtMTU0MTMyODcxMi04MDUwLmpwZWc.jpeg",
//     },
//     {
//         id: "12340125392035",
//         url: "",
//         video: "",
//         title: "What's Going On",
//         description: "",
//         artist: "Marvin Gaye",
//         genre: "",
//         styles: [],
//         tempo: "",
//         musicalKey: "",
//         year: "",
//         cover: "https://upload.wikimedia.org/wikipedia/en/8/84/MarvinGayeWhat%27sGoingOnalbumcover.jpg",
//     },
//     {
//         id: "1230943240329",
//         url: "https://www.youtube.com/watch?v=Bcus42ihkTI",
//         video: "https://www.youtube.com/watch?v=Bcus42ihkTI",
//         title: "I'd Rather Go Blind",
//         description: "Etta James sings a song",
//         artist: "Etta James",
//         genre: "Jazz",
//         styles: ["Motown", "R&B"],
//         tempo: "93 BPM",
//         musicalKey: "Amaj",
//         year: "1967",
//         cover: "https://i.scdn.co/image/ab67616d0000b2730b8b305d5ced2160f20cf265",
//     },
// ];


export default function Trending() {
    const [category, setCategory] = useState<string>(TRENDING_CATEGORIES[0].name ?? '');
    return (
        <div className="flex flex-col gap-3 p-5 boxy w-full overflow-clip">
            <div
            className={"flex flex-row gap-2 items-center transition-colors text-white/60"}
            >
              <FaHotjar />Trending
            </div>
            <div 
            className="flex flex-row justify-start items-center gap-2 scroll-smooth mb-2"
            >
            {
              TRENDING_CATEGORIES.map((cat, idx) => (
                <div
                key={cat.name} 
                onClick={() => {setCategory(cat.name)}}
                className={clsx(
                  "flex flex-row text-sm gap-3 items-center cursor-pointer transition-colors  py-0.5 px-3 rounded-full" ,
                  category === cat.name ? "text-black bg-white" : "text-white/80 bg-white/10",
                )}
                >
                  {cat.name}
                </div>
              ))
            }
            </div>
            {/* {
              TRENDING_LIST.map((song) => (
                <SongListing key={song.id} song={song}/>
              ))
            } */}


        </div>
    )
}