"use client";

import { Song } from '@/types/song';
import { create } from 'zustand';

interface RecentState {
  recent: Song[];
  setRecent: (songs: Song[]) => void;
  addToRecent: (songs: Song[] | Song) => void;
  clearRecent: () => void;
}

export const useRecentStore = create<RecentState>((set) => ({
  recent: [],
  setRecent: (songs) => set({ recent: songs }),
  addToRecent: (songs) => set(state => {
    const newSongs: Song[] = Array.isArray(songs) ? songs : [songs];
    const newRecent: Song[] = state.recent.filter(s => !newSongs.map(b => b.id).includes(s.id));
    // Add new songs before recent songs
    return {
        recent: [...newSongs.toReversed(), ...newRecent, ]
    }
  }),
  clearRecent: () => set({recent: []}),
}));