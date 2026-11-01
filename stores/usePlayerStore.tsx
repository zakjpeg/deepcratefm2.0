"use client";

import { Song } from '@/types/song';
import { create } from 'zustand';
import { useRecentStore } from './useRecentStore';

interface PlayerState {
  song: Song | null;
  setSong: (inSong: Song | null) => void;
  clearSong: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  song: null,
  setSong: (inSong) => {
    set({ song: inSong })
    if (inSong) {
      // Add to recent songs
      useRecentStore.getInitialState().addToRecent(inSong);
    }
  },
  clearSong: () => set({ song: null }),
}));