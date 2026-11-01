'use client';

import NavMenu from "@/components/menus/NavMenu";
import Recent from "@/components/menus/Recent";
import Trending from "@/components/menus/Trending";
import ExploreTab from "@/components/tabs/ExploreTab";
import LikedTab from "@/components/tabs/LikedTab";
import PlayerTab from "@/components/tabs/PlayerTab";
import RecentTab from "@/components/tabs/RecentTab";
import BlurredBackground from "@/components/ui/BlurredBackground";
import { useTabStore } from "@/stores/useTabStore";
import { TAB_EXPLORE, TAB_HOME, TAB_LIKED, TAB_RECENT } from "@/types/tab";
import Image from "next/image";

export default function Home() {

  const {tab} = useTabStore();

  return (
    <div className="relative flex flex-wrap lg:flex-nowrap flex-row gap-4 min-h-screen bg-black font-sans p-2 lg:p-10">

      {/* Background Image */}
      <BlurredBackground />

      {/* Left Side */}    
      <div className="self-start sticky top-10 order-2 lg:order-0 flex flex-col gap-4 items-start w-full lg:min-w-50 lg:max-w-60 z-1">
        {/* Header */}
        <div className="flex w-full ">
          <Image src="/logo-deepcrate.png" width={400} height={100} alt="" className="hidden lg:block px-10 opacity-90 scale-75"  />
        </div>

        <NavMenu />
        <Trending />
      </div>

      {/* Center */}
      <div className="relative flex flex-col gap-0 p-5 w-full boxy z-1 overflow-clip pb-30 lg:pb-5">
        {
          tab === TAB_HOME
          ? <PlayerTab /> : 
          tab === TAB_EXPLORE
          ? <ExploreTab /> : 
          tab === TAB_RECENT
          ? <RecentTab /> : 
          tab === TAB_LIKED
          ? <LikedTab />
          : null
        }
      </div>

      {/* Right Side */}    
      <div className="self-start sticky top-10 order-1 lg:order-0 flex flex-col gap-4 items-start w-full lg:min-w-50 lg:max-w-90 z-1">
        <Recent />
      </div>

    </div>
  );
}
