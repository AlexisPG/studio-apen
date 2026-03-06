'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Tier = 'A' | 'B' | 'C' | 'D';
export type Level = 'L1' | 'L2' | 'L3' | 'L4';
export type OutputStatus = 'READY' | 'PENDING';

export type OutputImage = {
  id: string;
  url: string;
  status: OutputStatus;
  prompt: string;
  tier: Tier;
  level: Level;
  isFavorited: boolean;
  isSaved: boolean;
  createdAt: string;
};

type SessionState = {
  inspirations: string[];
  tier: Tier;
  level: Level;
  prompt: string;
  outputs: OutputImage[];
  selectedOutputId: string | null;
  setTier: (tier: Tier) => void;
  setLevel: (level: Level) => void;
  setPrompt: (prompt: string) => void;
  addInspiration: (dataUrl: string) => void;
  removeInspiration: (index: number) => void;
  reorderInspiration: (from: number, to: number) => void;
  addOutputs: (outputs: OutputImage[]) => void;
  selectOutput: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleSaved: (id: string) => void;
  clearOutputs: () => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      inspirations: [],
      tier: 'A',
      level: 'L1',
      prompt: '',
      outputs: [],
      selectedOutputId: null,
      setTier: (tier) => set({ tier }),
      setLevel: (level) => set({ level }),
      setPrompt: (prompt) => set({ prompt }),
      addInspiration: (dataUrl) =>
        set((state) => {
          if (state.inspirations.length >= 10) return state;
          return { inspirations: [...state.inspirations, dataUrl] };
        }),
      removeInspiration: (index) =>
        set((state) => ({ inspirations: state.inspirations.filter((_, i) => i !== index) })),
      reorderInspiration: (from, to) =>
        set((state) => {
          if (to < 0 || to >= state.inspirations.length) return state;
          const cloned = [...state.inspirations];
          const [moved] = cloned.splice(from, 1);
          cloned.splice(to, 0, moved);
          return { inspirations: cloned };
        }),
      addOutputs: (outputs) =>
        set((state) => {
          const allOutputs = [outputs[0], outputs[1], ...state.outputs].filter(Boolean) as OutputImage[];
          return { outputs: allOutputs, selectedOutputId: outputs[0]?.id ?? state.selectedOutputId };
        }),
      selectOutput: (id) => set({ selectedOutputId: id }),
      toggleFavorite: (id) =>
        set((state) => ({
          outputs: state.outputs.map((output) =>
            output.id === id ? { ...output, isFavorited: !output.isFavorited } : output
          )
        })),
      toggleSaved: (id) =>
        set((state) => ({
          outputs: state.outputs.map((output) =>
            output.id === id ? { ...output, isSaved: !output.isSaved } : output
          )
        })),
      clearOutputs: () => set({ outputs: [], selectedOutputId: null })
    }),
    {
      name: 'studio-apen-session',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
