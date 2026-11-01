"use client";

import { usePlayerStore } from "@/stores/usePlayerStore";
import Link from "next/link";
import { AiTwotoneCalendar } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FaBackward, FaForward, FaPause } from "react-icons/fa";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { TbMetronome } from "react-icons/tb";

export default function Player() {
    const {song, setSong, clearSong} = usePlayerStore();



    return (
        <div className="flex flex-col gap-0 w-fullmb-20">
          <iframe width="560" height="315" src={song?.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="rounded-2xl w-full"></iframe>
          <p className="mt-5 text-2xl font-bold line-clamp-1 text-ellipsis">{song?.title}</p>
          <p className="text-lg text-white/50 line-clamp-1 mb-1">{song?.artist}</p>
          <p className="text-sm text-white/75 line-clamp-3 text-ellipsis">{song?.description}</p>
          <div className="mt-5 flex flex-row flex-wrap gap-10 justify-start items-center text-white/90">
          {
            song?.styles[0] &&
            <div className="flex flex-col">
              <p className="text-white/65">Style</p>
              <p className="flex flex-row gap-1 items-center font-semibold"><BiCategoryAlt /> {song?.genre}, {song?.styles[0]}</p>
            </div>
          }
            {
            song?.tempo &&
            <div className="flex flex-col">
              <p className="text-white/65">Tempo</p>
              <p className="flex flex-row gap-1 items-center font-semibold"><TbMetronome />{song?.tempo}</p>
            </div>
            }
            {
            song?.musicalKey &&
            <div className="flex flex-col">
              <p className="text-white/65">Key</p>
              <p className="flex flex-row gap-1 items-center font-semibold"><IoMusicalNotesSharp  />{song?.musicalKey}</p>
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
          <div className="absolute flex flex-row justify-evenly items-center px-3 bottom-0 left-0 rounded-t-2xl backdrop-blur-xl backdrop-brightness-160 w-full h-20 z-10 ">
            {/* Current Track */}
            <div className="hidden lg:flex flex-1 flex-row gap-4 left-4 h-14">
                <Link href={song?.url ?? '/'} target="_blank">
                    <img src={song?.cover} alt="" className="aspect-square h-full rounded-sm cursor-pointer object-cover" />
                </Link>
              <div className="flex flex-col justify-center cursor-pointer">
                <a className="font-semibold text-wrap text-ellipsis" href={song?.url} target="_blank">{song?.title}</a>
                <a className="text-sm font-regular text-white/60" href={song?.url} target="_blank">{song?.artist}</a>
              </div>
            </div>

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
            //   onClick={handleForward}
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