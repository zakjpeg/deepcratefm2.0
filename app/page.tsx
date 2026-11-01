'use client';

import NavMenu from "@/components/menus/NavMenu";
import Recent from "@/components/menus/Recent";
import Trending from "@/components/menus/Trending";
import Player from "@/components/songs/Player";
import BlurredBackground from "@/components/ui/BlurredBackground";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useRecentStore } from "@/stores/useRecentStore";
import { useTabStore } from "@/stores/useTabStore";
import { Song } from "@/types/song";
import { TAB_EXPLORE, TAB_HOME } from "@/types/tab";
import clsx from "clsx";
import Image from "next/image";
import { useEffect } from 'react';

import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaBackward, FaCalendar, FaCalendarAlt, FaForward, FaHeart, FaHistory, FaHotjar, FaMusic, FaPause, FaPlay, FaRegCalendar, FaRegHeart, FaSearch } from "react-icons/fa";

export default function Home() {

  const {tab} = useTabStore();
  const {recent, setRecent, addToRecent, clearRecent} = useRecentStore();
  const {song} = usePlayerStore();


  const handleBackward = () => {
  }
  
  const handleForward = () => {
  }
  
  const handleClearRecent = () => {
  }

  const handleLike = (song: Song) => {
  }

  useEffect(() => {

  }, []);


  return (
    <div className="relative flex flex-wrap lg:flex-nowrap flex-row gap-4  min-h-screen bg-black font-sans overflow-hidden p-2 lg:p-10">
      {/* Background Image */}
      <BlurredBackground />

      {/* Left Side */}    
      <div className="order-2 lg:order-0 flex flex-col gap-4 items-start w-full lg:min-w-50 lg:max-w-60 z-1">

        {/* Header */}
        <div className="flex w-full ">
          <Image src="/logo-deepcrate.png" width={400} height={100} alt="" className="hidden lg:block px-10 opacity-90 scale-75"  />
        </div>

        {/* Navigation */}
        <NavMenu />
        

        {/* Hot Today */}
        <Trending />

      </div>

      {/* Center */}
      <div className="relative flex flex-col gap-0 p-5 w-full boxy z-1 overflow-clip pb-30 lg:pb-0">

        {
          tab === TAB_HOME
          ? <Player /> : 
          tab === TAB_EXPLORE
          ? <Player /> : null
        }
      </div>

      {/* Right Side */}    
      <div className="order-1 lg:order-0 flex flex-col gap-4 items-start w-full lg:min-w-50 lg:max-w-90 z-1">

        {/* Hot Today */}
        <Recent />

      </div>
    </div>
  );
}
