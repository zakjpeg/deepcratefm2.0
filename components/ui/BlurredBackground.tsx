"use client";
import { usePlayerStore } from "@/stores/usePlayerStore";
import {motion, AnimatePresence} from "motion/react"
import Image from "next/image";

export default function BlurredBackground() {
    const {song} = usePlayerStore();
    const currentSrc = song?.cover ?? "https://picsum.photos/200/300";

    return (
        <AnimatePresence>
            <motion.div
            key={currentSrc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="z-0 noselect absolute inset-0 w-full h-full"
            >
                <Image 
                src={currentSrc} 
                width={1920} 
                height={1080} 
                alt="" 
                className="w-full h-full object-cover blur-3xl opacity-25 scale-110" 
                />
            </motion.div>
        </AnimatePresence>
    )

}