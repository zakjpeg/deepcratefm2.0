"use client";

import { Song } from '@/types/song';
import { create } from 'zustand';
import { useRecentStore } from './useRecentStore';
import { getRelease } from '@/api/discogs/discogs';

interface PlayerState {
  song: Song | null;
  setSong: (inSong: Song | null) => void;
  clearSong: () => void;
  newSong: () => Promise<void>;
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
  newSong: async () => {
    const {release, error} = await getRelease();

    if (error || !release) {
      return;
    }

    set({ song: release })
    // Add to recent songs
    useRecentStore.getInitialState().addToRecent(release);
  },
}));