"use client";

import { useTabStore } from "@/stores/useTabStore";
import { TABS } from "@/types/tab";
import clsx from "clsx";
import { CiSearch } from "react-icons/ci";
import { IoGrid, IoGridOutline } from "react-icons/io5";
import { RiHomeFill, RiHomeLine, RiSearchFill } from "react-icons/ri";

export default function NavMenu() {

    const {tab, setTab} = useTabStore();

    return (
        <div className="flex flex-col gap-3 p-5 boxy w-full ">
        {
            TABS.filter(t => !t.hidden).map((t) => (
            <div
            key={t.id} 
            onClick={() => {setTab(t)}}
            className={clsx(
                "flex flex-row gap-3 items-center cursor-pointer transition-colors",
                tab === t ? "text-white" : "text-white/60",
            )}
            >
                {tab === t ? t.icon[1] : t.icon[0]}{t.name}
            </div>
            ))
        }
        </div>
    )
}