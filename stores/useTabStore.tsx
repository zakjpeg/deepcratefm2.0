"use client";

import { Tab, TABS } from '@/types/tab';
import { create } from 'zustand';

interface TabState {
  tab: Tab;
  setTab: (newTab: Tab) => void;
}

export const useTabStore = create<TabState>((set) => ({
  tab: TABS[0],
  setTab: (newTab: Tab) => set({ tab: newTab })
}));