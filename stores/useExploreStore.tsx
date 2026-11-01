"use client";

import { getTrendingReleases } from '@/api/discogs/discogs';
import { Song } from '@/types/song';
import logToFile from '@/util/log/logToFile';
import { initialize } from 'next/dist/server/lib/render-server';
import { create } from 'zustand';

interface ExploreState {

    explore: Song[],
    initialized: boolean,
    loading: boolean,
    refreshExplore: () => Promise<void>,

}

export const useExploreStore = create<ExploreState>((set, get) => ({

  explore: [],
  initialized: false,
  loading: false,

  refreshExplore: async () => {

    // Prevent unnecessary requests
    if (get().initialized || get().loading) return;

    // Begin loading
    set({loading: true});

    // Get releases
    const {releases, error} = await getTrendingReleases();
    console.log(JSON.stringify(releases));

    if (error) {
        set({
            loading: false,
        })
        return;
    } else {
        set({
            explore: releases,
            initialized: true,
            loading: false,
        });
    }
  },
  
}));