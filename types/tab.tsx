"use client";

import { ReactElement } from "react";
import { IoGridOutline, IoGrid } from "react-icons/io5";
import { RiHomeFill, RiHomeLine } from "react-icons/ri";

export type Tab = {
    id: number,
    name: string,
    icon: ReactElement[],
    link: string,
    hidden: boolean,
}

export const TAB_HOME = {
    id: 0,
    name: 'Home',
    icon: [<RiHomeLine key={0} size={20} />, <RiHomeFill key={1} size={20} />],
    link: "",
    hidden: false,
}

export const TAB_EXPLORE = {
    id: 2,
    name: 'Explore',
    icon: [<IoGridOutline key={0} size={20}/>, <IoGrid key={1} size={20}/>],
    link: "",
    hidden: false,
}

export const TAB_RECENT = {
    id: 3,
    name: 'Recent',
    icon: [<IoGridOutline key={0} size={20}/>, <IoGrid key={1} size={20}/>],
    link: "",
    hidden: true,
}

export const TAB_LIKED = {
    id: 4,
    name: 'Liked',
    icon: [<IoGridOutline key={0} size={20}/>, <IoGrid key={1} size={20}/>],
    link: "",
    hidden: true,
}

export const TABS: Tab[] = [
    TAB_HOME,
    TAB_EXPLORE,
    TAB_RECENT,
];