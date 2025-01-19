import type { FilterType } from './repo.types';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/react/shallow';
import { createStoreHook } from '../config';

type GithubStore = {
  filter: Record<string, string>;
  error: string | null;
  loading: boolean;
  resetFormError: () => void;
  setLoading: (loading: boolean) => Promise<void>;
  setFilter: (filter: FilterType) => void;
  setFormError: (error: string) => void;
};

export const githubStore = create(immer<GithubStore>(set => ({
  filter: {},
  error: null,
  loading: false,

  setLoading: async (loading: boolean) => set({ loading }),

  setFormError: (error: string) => {
    set({ error });
  },
  resetFormError: () => set({ error: null }),

  setFilter: (filterType) => {
    set((state) => {
      if (state.filter[filterType]) {
        delete state.filter[filterType];
      } else {
        state.filter[filterType] = filterType;
      }
    });
  },
})));

export const useGithubStore = createStoreHook<GithubStore>({ store: githubStore, useShallow });
