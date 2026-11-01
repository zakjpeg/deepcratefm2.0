"use client";

import { usePlayerStore } from "@/stores/usePlayerStore";
import getYTEmbedLink from "@/util/youtube/getYTEmbedLink";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
import { BiCategoryAlt, BiWorld } from "react-icons/bi";
import { FaBackward, FaForward, FaPause } from "react-icons/fa";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { TbMetronome } from "react-icons/tb";

export default function PlayerTab() {

    const {song, setSong, clearSong, newSong} = usePlayerStore();
    const [seeDetails, setSeeDetails] = useState<boolean>(false);

    const handleSeeDetails = () => {
      setSeeDetails(prev => !prev);
    }

    const handleNewSong = async () => {
      await newSong();
    }

    return (
        <div className="flex flex-col gap-0 w-fullmb-20">
          {song?.videos &&
          <iframe width="560" height="315" src={getYTEmbedLink(song?.videos[0]?.uri)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="rounded-2xl w-full bg-black/50"></iframe>
          }
          <p className="mt-5 text-2xl font-bold line-clamp-1 text-ellipsis">{song?.title}</p>
          <p className="text-lg text-white/50 line-clamp-1 mb-1">{song?.artists_sort}</p>
          <p className={clsx(
            "text-sm text-white/75 text-ellipsis font-light",
            seeDetails ? "" : "line-clamp-3"
          )}
          >{song?.notes}</p>
          <div className="mt-5 flex flex-row flex-wrap gap-10 justify-start items-center text-white/90">
          {
            song?.genres && song?.genres[0] &&
            <div className="flex flex-col">
              <p className="text-white/65">Style</p>
              <p className="flex flex-row gap-1 items-center font-semibold"><BiCategoryAlt /> {[song?.genres[0], ...song?.styles.slice(0, 2)].join(', ')}</p>
            </div>
          }
            {
            song?.country &&
            <div className="flex flex-col">
              <p className="text-white/65">Country</p>
              <p className="flex flex-row gap-1 items-center font-semibold"><BiWorld />{song?.country}</p>
            </div>
            }
            {
            song?.year &&
            <div className="flex flex-col">
              <p className="text-white/65">Year</p>
              <p className="flex flex-row gap-1 items-center font-semibold"><AiTwotoneCalendar   />{song?.year}</p>
            </div>
            }
          </div>

          {/* Player Controls */}
          <div className="absolute flex flex-row justify-evenly items-center px-3 bottom-0 left-0 backdrop-blur-xl backdrop-brightness-160 w-full h-20 z-10 ">
            {/* Current Song */}
            <Link href={song?.uri ?? '/'} target="_blank" className="hidden lg:flex flex-1 flex-row gap-4 left-4 h-14">
              <img src={song?.images ? song.images[0].uri : song?.thumb} alt="" className="aspect-square h-full rounded-sm cursor-pointer object-cover shrink-0" />
              <div className="flex flex-col justify-center cursor-pointer">
                <p className="font-semibold text-wrap text-ellipsis line-clamp-2 leading-5">{song?.title}</p>
                <p className="text-sm font-regular text-white/60 line-clamp-1 leading-5">{song?.artists_sort}</p>
              </div>
              </Link>


            {/* Player Controls */}
            <div className="flex flex-1 flex-row gap-8 justify-center items-center h-full w-full">
              <FaBackward
              size={25}
              className="cursor-pointer hover:scale-110 transition-all"
            //   onClick={handleBackward}
              />
              <FaPause size={25}
              className="cursor-pointer hover:scale-110 transition-all"/>
              <FaForward size={25}
              className="cursor-pointer hover:scale-110 transition-all"
              onClick={handleNewSong}
              />

            </div>


            {/* Right side */}
            <div className="hidden lg:flex flex-1 flex-row gap-8 justify-end items-center h-full">
              <div>
                {/* {
                  liked.includes(track) ?
                  <FaHeart size={25}
                  className="cursor-pointer mr-5 hover:scale-105 transition-all"
                  onClick={() => {handleLike(track)}}
                  />
                  :
                  <FaRegHeart size={25}
                  className="cursor-pointer mr-5 hover:scale-105 transition-all"
                  onClick={() => {handleLike(track)}}
                  />
                } */}
              </div>

            </div>


          </div>
        </div>
    )
}