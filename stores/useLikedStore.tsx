"use client";

import { Song } from '@/types/song';
import { create } from 'zustand';

interface LikedState {
  liked: Song[];
  setLiked: (songs: Song[]) => void;
  addToLiked: (songs: Song[] | Song) => void;
  removeFromLiked: (songs: Song[] | Song) => void;
  clearLiked: () => void;
}

export const useLikedStore = create<LikedState>((set) => ({
  liked: [],
  setLiked: (songs) => set({ liked: songs }),
  addToLiked: (songs) => set(state => {
    let newSongs = Array.isArray(songs) ? songs : [songs];
    newSongs = newSongs.filter(s => !state.liked.includes(s));
    return {
        liked: [...newSongs.toReversed(), ...state.liked, ]
    }
  }),
  removeFromLiked: (songs) => set(state => {
    const songsToRemove = Array.isArray(songs) ? songs : [songs];
    const newLiked = state.liked.filter(s => !songsToRemove.includes(s));
    return {
        liked: newLiked
    }
  }),
  clearLiked: () => set({liked: []}),
}));